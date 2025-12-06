#!/bin/bash

# Nginx 启动脚本
# 用于快速启动 Nginx 代理服务

NGINX_CONF="nginx.conf"
NGINX_CONF_PATH="/etc/nginx/sites-available/api-gateway-admin"

echo "🚀 启动 Nginx 代理服务..."

# 检查 Nginx 是否已安装
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx 未安装，请先安装 Nginx"
    echo "Ubuntu/Debian: sudo apt install nginx"
    echo "macOS: brew install nginx"
    exit 1
fi

# 检查配置文件是否存在
if [ ! -f "$NGINX_CONF" ]; then
    echo "❌ 配置文件 $NGINX_CONF 不存在"
    exit 1
fi

# 复制配置文件
echo "📋 复制配置文件..."
sudo cp "$NGINX_CONF" "$NGINX_CONF_PATH"

# 创建符号链接（如果不存在）
if [ ! -L "/etc/nginx/sites-enabled/api-gateway-admin" ]; then
    echo "🔗 创建符号链接..."
    sudo ln -s "$NGINX_CONF_PATH" /etc/nginx/sites-enabled/
fi

# 测试配置
echo "🧪 测试 Nginx 配置..."
if sudo nginx -t; then
    echo "✅ 配置测试通过"
else
    echo "❌ 配置测试失败，请检查配置文件"
    exit 1
fi

# 重启 Nginx
echo "🔄 重启 Nginx..."
sudo systemctl restart nginx

# 检查 Nginx 状态
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx 启动成功"
    echo ""
    echo "📝 代理配置:"
    echo "  - /api/center/* -> http://localhost:8080/*"
    echo "  - /api/admin/* -> http://localhost:3000/api/*"
    echo "  - /* -> http://localhost:3000/*"
    echo ""
    echo "🌐 访问地址: http://localhost"
else
    echo "❌ Nginx 启动失败，请检查日志: sudo journalctl -u nginx"
    exit 1
fi

