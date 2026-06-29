#!/bin/bash

echo "🚀 趣味测试平台 - GitHub Pages 部署脚本"
echo "=========================================="
echo ""

# 检查git是否存在
if ! command -v git &> /dev/null; then
    echo "❌ 错误: 未找到git命令"
    exit 1
fi

# 检查远程仓库
echo "📦 远程仓库: $(git remote get-url origin)"
echo ""

# 确认部署
read -p "是否确认部署到 GitHub Pages? (y/N): " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ 部署已取消"
    exit 0
fi

echo ""
echo "📤 正在推送到 GitHub..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "📋 后续步骤："
    echo "1. 打开 GitHub 仓库: https://github.com/Whu52052/WFid"
    echo "2. 进入 Settings → Pages"
    echo "3. Source 选择 GitHub Actions"
    echo "4. 等待 Actions 部署完成"
    echo "5. 访问: https://Whu52052.github.io/WFid/"
    echo ""
    echo "⏳ 部署通常需要 1-3 分钟"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 可能的原因："
    echo "   1. 仓库不存在 - 请先在 GitHub 创建 WFid 仓库"
    echo "   2. 认证失败 - 请配置 GitHub Token 或 SSH 密钥"
    echo ""
    echo "🔧 解决方案："
    echo "   使用 Token 推送: git push -u origin https://<your-token>@github.com/Whu52052/WFid.git"
fi