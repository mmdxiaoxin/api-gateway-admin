import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 压缩优化
  compress: true,
  
  // 图片优化配置
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons'],
  },
  
  // 路径重写配置（用于开发模式代理）
  // 生产环境建议使用 Nginx 代理，性能更好
  async rewrites() {
    // 获取后端服务地址（从环境变量或使用默认值）
    const javaBackendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    
    return [
      // /api/center/* -> Java 后端 (localhost:8080)
      // 例如: /api/center/api/v1/xxx -> http://localhost:8080/api/v1/xxx
      {
        source: '/api/center/:path*',
        destination: `${javaBackendUrl}/:path*`,
      },
      // /api/admin/api/* -> Next.js 自己的 API
      // 例如: /api/admin/api/menu -> /api/menu
      // 例如: /api/admin/api/auth/login -> /api/auth/login
      {
        source: '/api/admin/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  // 输出配置
  // standalone 模式：生成独立的部署包，只包含运行所需的最小依赖
  // 主要用于 Docker 部署，减少部署时需要复制的文件
  // 注意：不会减少浏览器端的 bundle 体积，bundle 体积由代码分割和压缩优化控制
  // 如果不需要 Docker 部署，可以移除此配置以避免 Windows 权限问题
  // output: 'standalone',
  
  // 编译器配置
  compiler: {
    // 移除 console（生产环境）
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // 生产环境源码映射（可选，用于调试）
  productionBrowserSourceMaps: false,
  
  // 优化构建
  poweredByHeader: false, // 移除 X-Powered-By 头
  
  // Turbopack 配置（Next.js 16 默认使用 Turbopack）
  // Turbopack 会自动处理代码分割和优化，无需手动配置
  turbopack: {},
};

export default nextConfig;
