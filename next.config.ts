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
  
  // 输出配置
  output: 'standalone', // 生成独立的部署包，减少体积
  
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
