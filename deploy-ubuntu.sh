#!/bin/bash

set -e

echo "🚀 WFid - Ubuntu 部署脚本"
echo "=========================="
echo ""

# 检查是否为root
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  建议使用root用户运行，或使用sudo"
    SUDO="sudo"
else
    SUDO=""
fi

# 项目配置
PROJECT_NAME="wfid"
PROJECT_DIR="/opt/$PROJECT_NAME"
DOMAIN=${1:-"localhost"}
PORT=${2:-8080}

echo "📋 部署配置:"
echo "   项目目录: $PROJECT_DIR"
echo "   域名: $DOMAIN"
echo "   端口: $PORT"
echo ""

# 第一步：安装基础依赖
echo "📦 第一步：安装基础依赖..."

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "   安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | $SUDO bash -
    $SUDO apt-get install -y nodejs
else
    echo "   ✅ Node.js 已安装: $(node -v)"
fi

# 检查pnpm
if ! command -v pnpm &> /dev/null; then
    echo "   安装 pnpm..."
    npm install -g pnpm
else
    echo "   ✅ pnpm 已安装: $(pnpm -v)"
fi

# 检查nginx
if ! command -v nginx &> /dev/null; then
    echo "   安装 Nginx..."
    $SUDO apt-get update
    $SUDO apt-get install -y nginx
else
    echo "   ✅ Nginx 已安装: $(nginx -v 2>&1 | head -1)"
fi

echo ""

# 第二步：获取项目代码
echo "📥 第二步：获取项目代码..."

if [ -d "$PROJECT_DIR" ]; then
    echo "   项目目录已存在，更新代码..."
    cd "$PROJECT_DIR"
    git pull || echo "   ⚠️  Git pull 失败，保留现有代码"
else
    echo "   克隆项目..."
    $SUDO mkdir -p $(dirname "$PROJECT_DIR")
    git clone https://github.com/Whu52052/WFid.git "$PROJECT_DIR"
    $SUDO chown -R $USER:$USER "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"
echo ""

# 第三步：安装依赖并构建
echo "🔧 第三步：安装依赖并构建..."

if [ -d "node_modules" ]; then
    echo "   依赖已存在，跳过安装"
else
    echo "   安装依赖..."
    pnpm install
fi

echo "   构建项目..."
pnpm build

echo ""

# 第四步：配置Nginx
echo "🌐 第四步：配置 Nginx..."

NGINX_CONF="/etc/nginx/sites-available/$PROJECT_NAME"

$SUDO bash -c "cat > $NGINX_CONF << 'NGINX_EOF'
server {
    listen $PORT;
    server_name $DOMAIN;

    root $PROJECT_DIR/dist;
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

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }

    # SPA路由回退
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
NGINX_EOF"

# 启用站点
$SUDO ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$PROJECT_NAME"

# 测试Nginx配置
echo "   测试 Nginx 配置..."
if $SUDO nginx -t; then
    echo "   ✅ Nginx 配置正确"
    $SUDO systemctl reload nginx
    echo "   ✅ Nginx 已重载"
else
    echo "   ❌ Nginx 配置错误"
    exit 1
fi

echo ""

# 第五步：配置防火墙
echo "🔥 第五步：配置防火墙..."

if command -v ufw &> /dev/null; then
    if $SUDO ufw status | grep -q "active"; then
        $SUDO ufw allow $PORT/tcp
        echo "   ✅ 防火墙已开放 $PORT 端口"
    else
        echo "   ⚠️  防火墙未启用"
    fi
else
    echo "   ⚠️  未检测到ufw防火墙"
fi

echo ""

# 完成
echo "🎉 部署完成！"
echo ""
echo "🌐 访问地址: http://$DOMAIN:$PORT"
echo "📁 项目目录: $PROJECT_DIR"
echo "📜 日志查看: sudo tail -f /var/log/nginx/access.log"
echo ""
echo "🔄 更新项目:"
echo "   cd $PROJECT_DIR && git pull && pnpm build"
echo ""
echo "📋 常用命令:"
echo "   启动: sudo systemctl start nginx"
echo "   停止: sudo systemctl stop nginx"
echo "   重启: sudo systemctl restart nginx"
echo "   状态: sudo systemctl status nginx"