# Nginx 代理配置说明

## 概述

项目已移除 Next.js 的代理代码，改用 Nginx 进行 API 代理。这样可以：
- 更好的性能
- 更灵活的配置
- 统一的网关入口

## 代理规则

### 1. `/center` 端点
- **前端请求**: `/center/api/v1/...`
- **代理到**: `http://localhost:8080/api/v1/...`
- **说明**: 所有网关中心（Java 后端）的 API 请求

### 2. `/admin` 端点
- **前端请求**: `/admin/...`
- **代理到**: `http://localhost:3000/api/...`
- **说明**: Next.js 自己的 API 路由（不走代理）

### 3. 其他请求
- **前端请求**: `/...`
- **代理到**: `http://localhost:3000/...`
- **说明**: Next.js 应用的其他请求（页面、静态资源等）

## 安装和配置

### 方式一：本地安装 Nginx

#### 1. 安装 Nginx

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nginx
```

**macOS:**
```bash
brew install nginx
```

**CentOS/RHEL:**
```bash
sudo yum install nginx
```

#### 2. 复制配置文件

```bash
# 复制配置文件到 Nginx 配置目录
sudo cp nginx.conf /etc/nginx/sites-available/api-gateway-admin
sudo ln -s /etc/nginx/sites-available/api-gateway-admin /etc/nginx/sites-enabled/

# 或者直接替换默认配置
sudo cp nginx.conf /etc/nginx/nginx.conf
```

#### 3. 测试配置

```bash
# 测试 Nginx 配置是否正确
sudo nginx -t
```

#### 4. 启动/重启 Nginx

```bash
# 启动 Nginx
sudo systemctl start nginx

# 重启 Nginx
sudo systemctl restart nginx

# 设置开机自启
sudo systemctl enable nginx
```

### 方式二：使用 Docker

#### 1. 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: api-gateway-nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.docker.conf:/etc/nginx/conf.d/default.conf
      - ./logs:/var/log/nginx
    depends_on:
      - nextjs
      - java-backend
    networks:
      - gateway-network

  nextjs:
    # Next.js 服务配置
    # ...

  java-backend:
    # Java 后端服务配置
    # ...
```

#### 2. 启动服务

```bash
docker-compose up -d
```

## 前端配置

前端代码已经配置好，使用相对路径：

- `PORT_GATEWAY_CENTER = '/center'` - 网关中心 API
- `PORT_GATEWAY_ADMIN = '/admin'` - 管理后台 API

所有请求会自动通过 Nginx 代理到对应的后端服务。

## 验证配置

### 1. 测试 `/center` 代理

```bash
# 测试网关中心 API
curl http://localhost/center/api/v1/config/gateway-servers
```

应该返回 Java 后端（localhost:8080）的响应。

### 2. 测试 `/admin` 代理

```bash
# 测试管理后台 API
curl http://localhost/admin/auth/login
```

应该返回 Next.js 后端（localhost:3000）的响应。

### 3. 测试 Next.js 应用

```bash
# 访问首页
curl http://localhost/
```

应该返回 Next.js 应用的响应。

## 常见问题

### 1. 502 Bad Gateway

**原因**: 后端服务未启动或无法访问

**解决**:
- 检查 Java 后端是否在 `localhost:8080` 运行
- 检查 Next.js 是否在 `localhost:3000` 运行
- 检查防火墙设置

### 2. 404 Not Found

**原因**: 路径重写规则不正确

**解决**:
- 检查 Nginx 配置中的 `rewrite` 规则
- 查看 Nginx 错误日志: `tail -f /var/log/nginx/error.log`

### 3. CORS 错误

**原因**: 跨域请求被阻止

**解决**:
- 在 Nginx 配置中添加 CORS 头
- 或者在 Java 后端配置 CORS

## 日志查看

```bash
# 查看访问日志
tail -f /var/log/nginx/api-gateway-admin-access.log

# 查看错误日志
tail -f /var/log/nginx/api-gateway-admin-error.log
```

## 性能优化

1. **启用 gzip 压缩**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

2. **启用缓存**:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

3. **连接池优化**:
```nginx
upstream nextjs_backend {
    server localhost:3000 max_fails=3 fail_timeout=30s;
    keepalive 32;
}
```

## 安全建议

1. 使用 HTTPS（配置 SSL 证书）
2. 限制请求频率（rate limiting）
3. 隐藏 Nginx 版本信息
4. 配置防火墙规则

