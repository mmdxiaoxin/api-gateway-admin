# API Gateway Center

网关管理后台系统，基于 Next.js 16 构建。

## 开发环境

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

**重要：必须配置后端 API 地址！**

1. 复制环境变量示例文件：

```bash
cp env.example .env.local
```

2. 编辑 `.env.local` 文件，设置你的 Java 后端服务地址：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

**注意：**

- 将 `http://localhost:8080` 替换为你的实际后端服务地址
- 如果不配置此环境变量，API 请求会发送到 Next.js 服务器，导致 404 错误
- 修改环境变量后需要重启开发服务器

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 生产环境构建与部署

### 1. 构建项目

```bash
pnpm build
```

构建完成后，会在 `.next` 目录生成优化后的生产文件。

### 2. 打包后的目录结构

```
.next/
├── static/          # 静态资源（JS、CSS、图片等）
├── server/          # 服务端代码
├── cache/           # 构建缓存
└── BUILD_ID         # 构建 ID
```

### 3. 启动生产服务器

#### 方式一：使用 Next.js 内置服务器（推荐）

```bash
# 设置环境变量
export NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com

# 启动生产服务器
pnpm start
```

默认端口：`3000`，可通过 `-p` 参数指定端口：

```bash
pnpm start -p 8080
```

#### 方式二：使用 PM2 进程管理

```bash
# 安装 PM2
npm install -g pm2

# 创建 ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'api-gateway-center',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_API_BASE_URL: 'http://your-api-server.com'
    }
  }]
}
EOF

# 启动应用
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs api-gateway-center

# 停止应用
pm2 stop api-gateway-center

# 重启应用
pm2 restart api-gateway-center
```

#### 方式三：使用 Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm build

# 运行应用
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

构建和运行：

```bash
# 构建镜像
docker build -t api-gateway-center .

# 运行容器
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com \
  api-gateway-center
```

#### 方式四：使用 Nginx 反向代理

创建 Nginx 配置 `nginx.conf`：

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

### 4. 环境变量配置

创建 `.env.production` 文件：

```env
# API 基础地址（必需）
NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com

# Node 环境
NODE_ENV=production

# 端口（可选，默认 3000）
PORT=3000
```

**重要提示：**

- `NEXT_PUBLIC_*` 开头的变量会在构建时嵌入到客户端代码中
- 修改环境变量后需要重新构建：`pnpm build`
- 服务端环境变量可以直接在运行时设置

### 5. 部署检查清单

- [ ] 完成 `pnpm build` 构建
- [ ] 配置 `NEXT_PUBLIC_API_BASE_URL` 环境变量
- [ ] 确保 Node.js 版本 >= 18
- [ ] 确保生产服务器有足够的内存（建议 >= 512MB）
- [ ] 配置反向代理（如 Nginx）处理 HTTPS
- [ ] 配置防火墙规则开放端口
- [ ] 设置进程管理（PM2）确保服务稳定运行

### 6. 性能优化建议

- 使用 CDN 加速静态资源
- 启用 Gzip/Brotli 压缩
- 配置缓存策略
- 使用负载均衡（多实例部署）

## 其他命令

```bash
# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 构建分析（需要安装 @next/bundle-analyzer）
pnpm build:analyze
```

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 库**: Ant Design 6
- **状态管理**: Zustand
- **样式**: Tailwind CSS 4
- **构建工具**: Turbopack
- **包管理**: pnpm

## 相关文档

- [Next.js 文档](https://nextjs.org/docs)
- [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)
