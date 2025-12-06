# 部署指南

本文档提供打包后项目的快速部署指南。

## 📦 构建项目

```bash
# 安装依赖
pnpm install

# 构建生产版本
pnpm build
```

构建完成后，`.next` 目录包含所有生产文件。

## 🚀 部署方式

### 方式 1: 直接运行（最简单）

```bash
# 设置环境变量
export NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com

# 启动生产服务器
pnpm start
```

访问: http://localhost:3000

### 方式 2: 使用 PM2（推荐用于服务器）

```bash
# 1. 安装 PM2
npm install -g pm2

# 2. 修改 ecosystem.config.js 中的环境变量

# 3. 启动应用
pm2 start ecosystem.config.js

# 4. 查看状态
pm2 status

# 5. 查看日志
pm2 logs api-gateway-center

# 6. 设置开机自启
pm2 startup
pm2 save
```

### 方式 3: 使用 Docker

```bash
# 1. 构建镜像
docker build -t api-gateway-center \
  --build-arg NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com .

# 2. 运行容器
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com \
  --name api-gateway-center \
  api-gateway-center

# 3. 查看日志
docker logs -f api-gateway-center
```

### 方式 4: 使用 Docker Compose

```bash
# 1. 创建 .env 文件
echo "NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com" > .env

# 2. 启动服务
docker-compose up -d

# 3. 查看日志
docker-compose logs -f
```

### 方式 5: 使用 Nginx 反向代理

1. 安装 Nginx
2. 创建配置文件 `/etc/nginx/sites-available/api-gateway-center`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. 启用配置并重启 Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/api-gateway-center /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## ⚙️ 环境变量

必需的环境变量：

- `NEXT_PUBLIC_API_BASE_URL`: API 服务器地址（必需）

可选的环境变量：

- `PORT`: 服务端口（默认: 3000）
- `NODE_ENV`: 环境模式（默认: production）

## 📋 部署检查清单

- [ ] 完成 `pnpm build` 构建
- [ ] 配置 `NEXT_PUBLIC_API_BASE_URL` 环境变量
- [ ] 确保 Node.js 版本 >= 18
- [ ] 确保服务器有足够内存（建议 >= 512MB）
- [ ] 配置防火墙开放端口（默认 3000）
- [ ] 配置 HTTPS（生产环境必需）
- [ ] 设置进程管理（PM2）确保服务稳定
- [ ] 配置日志轮转
- [ ] 设置监控和告警

## 🔧 常见问题

### 1. 端口被占用

```bash
# 使用其他端口
pnpm start -p 8080
```

### 2. 内存不足

使用 PM2 限制内存：

```javascript
// ecosystem.config.js
max_memory_restart: '512M'
```

### 3. 构建失败

- 检查 Node.js 版本（需要 >= 18）
- 清理缓存: `rm -rf .next node_modules pnpm-lock.yaml && pnpm install`
- 检查环境变量是否正确

### 4. 静态资源 404

确保 `public` 目录被正确复制到部署目录。

## 📊 性能优化

1. **启用 Gzip 压缩**（Nginx）:

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

2. **配置缓存**（Nginx）:

```nginx
location /_next/static {
    alias /app/.next/static;
    expires 365d;
    add_header Cache-Control "public, immutable";
}
```

3. **使用 CDN** 加速静态资源

4. **负载均衡**（多实例部署）

## 🔐 安全建议

1. 使用 HTTPS（Let's Encrypt）
2. 配置 CORS 策略
3. 设置安全响应头
4. 定期更新依赖
5. 使用环境变量管理敏感信息

## 📝 日志管理

### PM2 日志

```bash
# 查看日志
pm2 logs

# 清空日志
pm2 flush

# 配置日志轮转
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Docker 日志

```bash
# 查看日志
docker logs -f api-gateway-center

# 限制日志大小
docker run --log-opt max-size=10m --log-opt max-file=3 ...
```

