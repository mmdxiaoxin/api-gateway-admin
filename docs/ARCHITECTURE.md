# 项目架构说明

## 📁 目录结构

```
api-gateway-center/
├── app/                    # Next.js App Router 路由目录
│   ├── (auth)/            # 认证相关路由组（可选）
│   │   └── login/         # 登录页面
│   ├── gateway/           # 网关管理模块
│   │   ├── list/          # 网关列表
│   │   └── config/        # 网关配置
│   ├── user/              # 用户管理
│   ├── settings/          # 系统设置
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
│
├── components/            # 组件目录
│   ├── layout/            # 布局组件
│   │   ├── MainLayout.tsx # 主布局
│   │   ├── Header/        # 头部组件
│   │   ├── Sidebar/       # 侧边栏（菜单）
│   │   ├── Footer/        # 底部组件
│   │   └── Tabs/          # 标签页组件
│   ├── ui/                # 通用 UI 组件
│   │   └── (未来可扩展)
│   └── features/          # 功能模块组件
│       └── (未来可扩展)
│
├── lib/                   # 工具函数和库
│   ├── utils.ts           # 通用工具函数
│   └── api/               # API 客户端（未来）
│
├── hooks/                 # 自定义 React Hooks
│   ├── useAuth.ts         # 认证相关 hooks
│   └── index.ts           # 统一导出
│
├── types/                 # TypeScript 类型定义
│   └── index.ts           # 统一类型定义
│
├── constants/             # 常量配置
│   ├── menu.ts            # 菜单配置
│   └── index.ts           # 统一导出
│
├── store/                 # 状态管理（Zustand）
│   ├── authStore.ts       # 认证状态
│   ├── layoutStore.ts     # 布局状态
│   └── index.ts           # 统一导出
│
└── public/                # 静态资源
```

## 🎯 设计原则

### 1. 单一职责
- 每个文件/目录只负责一个明确的功能
- 组件职责清晰，便于维护

### 2. 统一导出
- 每个目录都有 `index.ts` 统一导出
- 简化导入路径，提高代码可读性

### 3. 类型安全
- 所有类型定义集中在 `types/` 目录
- 使用 TypeScript 严格模式

### 4. 可扩展性
- 模块化设计，便于添加新功能
- 清晰的目录结构，新成员易于理解

## 📝 命名规范

### 文件命名
- **组件文件**: PascalCase，如 `UserProfile.tsx`
- **工具函数**: camelCase，如 `formatDate.ts`
- **常量文件**: camelCase，如 `menuConfig.ts`
- **类型文件**: camelCase，如 `userTypes.ts`
- **页面文件**: Next.js 默认 `page.tsx`, `layout.tsx`

### 目录命名
- 使用小写字母和连字符：`user-profile/`
- 或纯小写：`userprofile/`

### 组件命名
- 组件使用 PascalCase：`UserProfile`
- Hooks 使用 camelCase 且以 `use` 开头：`useAuth`

## 🔗 导入路径规范

使用 `@/` 作为项目根目录别名：

```typescript
// ✅ 推荐 - 使用别名
import { useAuth } from "@/hooks";
import { MENU_CONFIG } from "@/constants";
import type { User } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { useAuthStore } from "@/store";

// ❌ 不推荐 - 相对路径
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../types";
```

## 🏗️ 组件组织

### Layout 组件
位于 `components/layout/`，负责页面布局：
- `MainLayout` - 主布局容器
- `Header` - 顶部导航栏
- `Sidebar/Menu` - 侧边栏菜单
- `Footer` - 页面底部
- `Tabs` - 标签页导航

### UI 组件
位于 `components/ui/`，通用的可复用组件：
- 未来可扩展的通用组件库

### Feature 组件
位于 `components/features/`，特定业务功能的组件：
- 未来可按业务模块组织

## 🔐 状态管理

使用 Zustand 进行状态管理：
- **全局状态**: 放在 `store/` 目录
- **持久化**: 使用 `persist` 中间件
- **模块化**: 每个功能模块一个 store 文件

示例：
```typescript
import { useAuthStore } from "@/store";
const { token, user, logout } = useAuthStore();
```

## 🎨 类型定义

所有 TypeScript 类型定义在 `types/` 目录：
- 使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型或工具类型
- 统一从 `types/index.ts` 导出

## 📦 常量管理

所有常量配置在 `constants/` 目录：
- 菜单配置、路由路径等
- 使用常量对象，避免魔法字符串
- 统一导出，便于维护

## 🛠️ 工具函数

通用工具函数在 `lib/` 目录：
- 格式化函数
- 验证函数
- 数据处理函数
- 使用统一的导出

## 🎣 自定义 Hooks

自定义 React Hooks 在 `hooks/` 目录：
- 以 `use` 开头命名
- 封装常用逻辑
- 统一从 `hooks/index.ts` 导出

## 🚀 最佳实践

1. **组件拆分**: 保持组件小而专注
2. **类型优先**: 先定义类型，再实现功能
3. **统一导出**: 使用 index.ts 统一导出
4. **路径别名**: 使用 `@/` 别名简化导入
5. **代码复用**: 提取公共逻辑为 hooks 或工具函数

