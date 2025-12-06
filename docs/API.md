# API 文档

## 概述

本项目使用 Next.js App Router 的 Route Handlers 实现后端 API。

## API 端点

### 1. 获取菜单数据

**GET** `/api/menu`

获取系统菜单配置数据。

**响应示例：**

```json
{
  "code": 0,
  "msg": "获取菜单成功",
  "data": [
    {
      "key": "/",
      "icon": "HomeOutlined",
      "label": "首页"
    },
    {
      "key": "/gateway",
      "icon": "ApiOutlined",
      "label": "网关管理",
      "children": [
        {
          "key": "/gateway/list",
          "label": "网关列表"
        }
      ]
    }
  ]
}
```

### 2. 用户登录

**POST** `/api/auth/login`

用户登录接口。

**请求体：**

```json
{
  "login": "admin",
  "password": "admin123"
}
```

**响应示例：**

```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "token": "token_admin_1234567890",
    "user": {
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

**测试账号：**

- 管理员：`admin` / `admin123`
- 普通用户：`user` / `user123`

### 3. 用户退出登录

**POST** `/api/auth/logout`

用户退出登录接口。

**响应示例：**

```json
{
  "code": 0,
  "msg": "退出登录成功",
  "data": null
}
```

## 前端使用

### API 客户端

项目提供了统一的 API 客户端工具，位于 `lib/api.ts`，基于 **axios** 实现。

**特性：**
- 自动添加认证 token
- 统一的错误处理
- 请求/响应拦截器
- 10秒请求超时
- TypeScript 类型支持

**示例：**

```typescript
import { login } from "@/lib/api/auth";
import { getMenuData } from "@/lib/api/menu";

// 登录
const result = await login({ login: "admin", password: "admin123" });

// 获取菜单
const menuData = await getMenuData();
```

### 认证状态管理

使用 Zustand 管理认证状态，store 位于 `store/authStore.ts`。

**示例：**

```typescript
import { useAuthStore } from "@/store/authStore";

const { token, user, setToken, setUser, logout } = useAuthStore();
```

## 注意事项

1. **Token 存储**：登录成功后，token 会同时存储在：
   - Zustand store（内存）
   - localStorage（持久化）
   - Cookie（服务端，可选）

2. **API 请求**：所有需要认证的 API 请求会自动在请求头中添加 `Authorization: Bearer {token}`。

3. **错误处理**：API 客户端会自动处理错误并抛出异常，前端需要 try-catch 捕获。

4. **生产环境**：在生产环境中，建议：
   - 使用真实的数据库进行用户验证
   - 使用 JWT 生成 token
   - 配置 HTTPS 以保护 cookie
   - 实现 token 刷新机制
