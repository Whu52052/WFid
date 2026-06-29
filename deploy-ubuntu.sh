#!/bin/bash
# ============================================================================
# WFid - Ubuntu 局域网一键部署脚本
# 包含：前端(Nginx静态托管) + 后端(Express + PM2)
# ============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo -e "${GREEN}"
echo "🚀 WFid - 局域网一键部署"
echo "========================"
echo -e "${NC}"

if [ "$EUID" -ne 0 ]; then
    echo -e "${YELLOW}⚠️  建议使用root用户运行，或使用sudo${NC}"
    SUDO="sudo"
else
    SUDO=""
fi

# 获取局域网IP
LAN_IP=$(ip addr show | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -1)

DOMAIN="${1:-$LAN_IP}"
FRONT_PORT=${2:-80}
API_PORT=${3:-3001}
FRONT_DIR="/var/www/wfid"
BACK_DIR="/opt/wfid/backend"

echo "📋 部署配置:"
echo "   项目目录: $PROJECT_DIR"
echo "   局域网IP: $LAN_IP"
echo "   域名/IP: $DOMAIN"
echo "   前端端口: $FRONT_PORT"
echo "   API端口: $API_PORT"
echo ""

# ========== 第一步：安装依赖 ==========
echo -e "${GREEN}📦 第一步：安装基础依赖...${NC}"

if ! command -v node &> /dev/null; then
    echo "   安装 Node.js 22..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | $SUDO bash -
    $SUDO apt-get install -y nodejs
else
    echo -e "   ✅ Node.js: $(node -v)"
fi

if ! command -v npm &> /dev/null; then
    echo "   安装 npm..."
    $SUDO apt-get install -y npm
else
    echo -e "   ✅ npm: $(npm -v)"
fi

if ! command -v nginx &> /dev/null; then
    echo "   安装 Nginx..."
    $SUDO apt-get update
    $SUDO apt-get install -y nginx
else
    echo -e "   ✅ Nginx: $(nginx -v 2>&1 | head -1)"
fi

if ! command -v pm2 &> /dev/null; then
    echo "   安装 PM2..."
    $SUDO npm install -g pm2
else
    echo -e "   ✅ PM2: $(pm2 -v)"
fi

echo ""

# ========== 第二步：构建前端 ==========
echo -e "${GREEN}🔨 第二步：构建前端...${NC}"

cd "$PROJECT_DIR"

if [ -f "package.json" ]; then
    echo "   安装前端依赖..."
    npm install
    echo "   构建前端..."
    npm run build
    echo -e "   ✅ 前端构建完成"
else
    echo -e "${RED}❌ 前端 package.json 不存在${NC}"
    exit 1
fi
echo ""

# ========== 第三步：部署前端到 Nginx ==========
echo -e "${GREEN}🌐 第三步：部署前端到 Nginx...${NC}"

$SUDO mkdir -p "$FRONT_DIR"
$SUDO rm -rf "$FRONT_DIR"/*
$SUDO cp -r "$PROJECT_DIR/dist/"* "$FRONT_DIR/"
echo -e "   ✅ 前端已部署到 $FRONT_DIR"
echo ""

# ========== 第四步：部署后端 ==========
echo -e "${GREEN}🔧 第四步：部署后端服务...${NC}"

$SUDO mkdir -p "$BACK_DIR"
$SUDO cp -r "$PROJECT_DIR/server/"* "$BACK_DIR/"

cd "$BACK_DIR"

if [ ! -f ".env" ]; then
    echo "   生成环境变量配置..."
    JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo "change-this-secret-$(date +%s)")
    $SUDO bash -c "cat > .env << EOF
DATABASE_URL=\"file:./prisma/dev.db\"
JWT_SECRET=\"$JWT_SECRET\"
PORT=$API_PORT
FRONTEND_URL=\"*\"
EOF"
    echo -e "   ✅ 环境变量已生成"
fi

if [ -f "package.json" ]; then
    echo "   安装后端依赖..."
    npm install
    echo "   初始化数据库..."
    npx prisma generate
    npx prisma db push
    echo -e "   ✅ 后端依赖安装完成"
else
    echo -e "${RED}❌ 后端 package.json 不存在${NC}"
    exit 1
fi

echo "   启动后端服务..."
cd "$BACK_DIR"
pm2 delete wfid-api 2>/dev/null || true
pm2 start src/index.js --name wfid-api
pm2 save
$SUDO env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root 2>/dev/null || true
echo -e "   ✅ 后端服务已启动"
echo ""

# ========== 第五步：配置 Nginx ==========
echo -e "${GREEN}⚙️  第五步：配置 Nginx...${NC}"

NGINX_CONF="/etc/nginx/sites-available/wfid"

$SUDO bash -c "cat > $NGINX_CONF << 'NGINX_EOF'
server {
    listen $FRONT_PORT;
    server_name _;

    root $FRONT_DIR;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        image/svg+xml;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:$API_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    location /socket.io/ {
        proxy_pass http://127.0.0.1:$API_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \"upgrade\";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }

    add_header X-Frame-Options \"SAMEORIGIN\" always;
    add_header X-Content-Type-Options \"nosniff\" always;
    add_header X-XSS-Protection \"1; mode=block\" always;
}
NGINX_EOF"

$SUDO ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/wfid"
$SUDO rm -f /etc/nginx/sites-enabled/default

echo "   测试 Nginx 配置..."
if $SUDO nginx -t 2>&1; then
    $SUDO systemctl reload nginx
    echo -e "   ✅ Nginx 配置成功"
else
    echo -e "${RED}❌ Nginx 配置错误${NC}"
    exit 1
fi
echo ""

# ========== 第六步：配置防火墙 ==========
echo -e "${GREEN}🔥 第六步：配置防火墙...${NC}"

if command -v ufw &> /dev/null; then
    if $SUDO ufw status | grep -q "active"; then
        $SUDO ufw allow $FRONT_PORT/tcp
        echo -e "   ✅ 防火墙已开放 $FRONT_PORT 端口"
    else
        echo -e "   ⚠️  防火墙未启用"
    fi
else
    echo -e "   ⚠️  未检测到 ufw 防火墙"
fi
echo ""

# ========== 完成 ==========
echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "🌐 局域网访问地址:"
echo "   http://$LAN_IP:$FRONT_PORT"
echo "   http://localhost:$FRONT_PORT (本机)"
echo ""
echo "🔌 API 地址: http://$LAN_IP:$FRONT_PORT/api"
echo "📡 WebSocket: ws://$LAN_IP:$FRONT_PORT/socket.io"
echo ""
echo "📁 前端目录: $FRONT_DIR"
echo "📁 后端目录: $BACK_DIR"
echo ""
echo "🔧 常用命令:"
echo "   查看后端状态: pm2 status"
echo "   查看后端日志: pm2 logs wfid-api"
echo "   重启后端: pm2 restart wfid-api"
echo "   查看 Nginx 日志: tail -f /var/log/nginx/access.log"
echo ""
echo -e "${YELLOW}⚠️  重要提示：${NC}"
echo "   1. 确保局域网内其他设备能访问此服务器的 $FRONT_PORT 端口"
echo "   2. 请修改 $BACK_DIR/.env 中的 JWT_SECRET"
echo "   3. 前端使用用户名密码登录，不需要短信验证码"
echo ""