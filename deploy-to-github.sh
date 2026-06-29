#!/bin/bash

# ============================================
# WFid 一键部署脚本
# ============================================

set -e

echo "🚀 WFid - 一键部署到GitHub Pages"
echo "================================"
echo ""

# 检查GitHub Token
if [ -z "$1" ]; then
    read -p "请输入你的GitHub Token: " GITHUB_TOKEN
else
    GITHUB_TOKEN="$1"
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ 错误: Token不能为空"
    exit 1
fi

echo ""
echo "📦 正在验证Token..."

# 验证Token
USER_INFO=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
USER_NAME=$(echo "$USER_INFO" | python3 -c "import sys,json; print(json.load(sys.stdin).get('login',''))" 2>/dev/null)

if [ -z "$USER_NAME" ]; then
    echo "❌ 错误: Token无效"
    exit 1
fi

echo "✅ Token有效! 欢迎, $USER_NAME"
echo ""

# 创建临时目录
TEMP_DIR=$(mktemp -d)
echo "📁 临时目录: $TEMP_DIR"

# 克隆仓库
echo "📥 正在克隆仓库..."
git clone "https://$GITHUB_TOKEN@github.com/Whu52052/WFid.git" "$TEMP_DIR/WFid" 2>/dev/null || {
    echo "⚠️  仓库不存在或无法克隆，将创建新仓库"
    mkdir -p "$TEMP_DIR/WFid"
    cd "$TEMP_DIR/WFid"
    git init
    git remote add origin "https://$GITHUB_TOKEN@github.com/Whu52052/WFid.git"
}

cd "$TEMP_DIR/WFid"

# 复制项目文件
echo "📋 正在复制项目文件..."

# 从原始位置复制
SOURCE_DIR="/workspace"

cp -r "$SOURCE_DIR/src" . 2>/dev/null || true
cp -r "$SOURCE_DIR/public" . 2>/dev/null || true
cp -r "$SOURCE_DIR/.github" . 2>/dev/null || true
cp "$SOURCE_DIR/package.json" . 2>/dev/null || true
cp "$SOURCE_DIR/package-lock.json" . 2>/dev/null || true
cp "$SOURCE_DIR/vite.config.ts" . 2>/dev/null || true
cp "$SOURCE_DIR/tailwind.config.js" . 2>/dev/null || true
cp "$SOURCE_DIR/postcss.config.js" . 2>/dev/null || true
cp "$SOURCE_DIR/tsconfig.json" . 2>/dev/null || true
cp "$SOURCE_DIR/index.html" . 2>/dev/null || true
cp "$SOURCE_DIR/eslint.config.js" . 2>/dev/null || true
cp "$SOURCE_DIR/.gitignore" . 2>/dev/null || true
cp "$SOURCE_DIR/README.md" . 2>/dev/null || true

# 提交
echo "📝 正在提交..."
git add -A
git commit -m "feat: 55+专业趣味测试平台 - 完整版

包含功能：
- 55+精选测试（人格、星座、塔罗、情感、职场、趣味等）
- MBTI 93题完整专业测试
- Big Five大五人格测试
- 九型人格测试
- DISC性格测试
- 12星座完整配对系统
- 22张塔罗牌占卜系统
- 专业计分引擎
- 响应式设计，支持移动端
- 用户中心与测试历史
- 收藏功能
- 雷达图结果可视化
- Framer Motion动画效果
- Zustand状态管理（持久化）
- TypeScript类型安全" 2>/dev/null || echo "⚠️  没有新的更改"

# 推送
echo "📤 正在推送到GitHub..."
git branch -M main
git push -u origin main 2>&1

echo ""
echo "✅ 代码推送成功！"
echo ""
echo "🌐 接下来配置GitHub Pages："
echo "1. 打开: https://github.com/Whu52052/WFid/settings/pages"
echo "2. Source 选择 GitHub Actions"
echo "3. 等待 2-3 分钟部署完成"
echo "4. 访问: https://Whu52052.github.io/WFid/"
echo ""
echo "🎉 部署完成！"

# 清理
rm -rf "$TEMP_DIR"
