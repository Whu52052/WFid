#!/bin/bash
# ============================================================================
# WFid - Ubuntu 一键部署脚本
# 包含：前端(Nginx静态托管) + 后端(Express + PM2)
# ============================================================================

set -e

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 获取脚本所在目录作为项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo -e "${GREEN}"
echo "🚀 WFid - 一键部署脚本"
echo "========================"
echo -e "${NC}"

# 检查是否为root
if [ "$EUID" -ne 0 ]; then
    echo -e "${YELLOW}⚠️  建议使用root用户运行，或使用sudo${NC}"
    SUDO="sudo"
else
    SUDO=""
fi

# 配置
DOMAIN=${1:-"localhost"}
FRONT_PORT=${2:-80}
API_PORT=${3:-3001}
FRONT_DIR="/var/www/wfid"
BACK_DIR="/opt/wfid/backend"

echo "📋 部署配置:"
echo "   项目目录: $PROJECT_DIR"
echo "   域名: $DOMAIN"
echo "   前端端口: $FRONT_PORT"
echo "   API端口: $API_PORT"
echo ""

# ========== 第一步：安装依赖 ==========
echo -e "${GREEN}📦 第一步：安装基础依赖...${NC}"

# Node.js
if ! command -v node &> /dev/null; then
    echo "   安装 Node.js 22..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | $SUDO bash -
    $SUDO apt-get install -y nodejs
else
    echo -e "   ✅ Node.js: $(node -v)"
fi

# npm
if ! command -v npm &> /dev/null; then
    echo "   安装 npm..."
    $SUDO apt-get install -y npm
else
    echo -e "   ✅ npm: $(npm -v)"
fi

# Nginx
if ! command -v nginx &> /dev/null; then
    echo "   安装 Nginx..."
    $SUDO apt-get update
    $SUDO apt-get install -y nginx
else
    echo -e "   ✅ Nginx: $(nginx -v 2>&1 | head -1)"
fi

# PM2
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

# 复制后端代码
$SUDO mkdir -p "$BACK_DIR"
$SUDO cp -r "$PROJECT_DIR/server/"* "$BACK_DIR/"

cd "$BACK_DIR"

# 安装后端依赖
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

# 配置环境变量
if [ ! -f ".env" ]; then
    echo "   生成环境变量配置..."
    JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo "change-this-secret-$(date +%s)")
    $SUDO bash -c "cat > .env << EOF
DATABASE_URL=\"file:./prisma/dev.db\"
JWT_SECRET=\"$JWT_SECRET\"
PORT=$API_PORT
FRONTEND_URL=\"http://$DOMAIN\"
EOF"
    echo -e "   ✅ 环境变量已生成"
fi

# 启动后端服务
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
    server_name $DOMAIN;

    root $FRONT_DIR;
    index index.html;

    # Gzip压缩
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

    # 前端静态文件
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # API 代理
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

    # WebSocket
    location /socket.io/ {
        proxy_pass http://127.0.0.1:$API_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }

    # 安全头
    add_header X-Frame-Options \"SAMEORIGIN\" always;
    add_header X-Content-Type-Options \"nosniff\" always;
    add_header X-XSS-Protection \"1; mode=block\" always;
}
NGINX_EOF"

# 启用站点
$SUDO ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/wfid"
$SUDO rm -f /etc/nginx/sites-enabled/default

# 测试配置
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
    if $SUDO ufw status | grep -q "Status: active"; then
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
echo "🌐 访问地址: http://$DOMAIN:$FRONT_PORT"
echo "🔌 API 地址: http://$DOMAIN:$FRONT_PORT/api"
echo "📡 WebSocket: ws://$DOMAIN:$FRONT_PORT/socket.io"
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
echo "   1. 请修改 $BACK_DIR/.env 中的 JWT_SECRET"
echo "   2. 生产环境请配置 HTTPS（建议使用 Let's Encrypt）"
echo "   3. 短信服务需要配置阿里云/腾讯云的密钥"
echo ""
