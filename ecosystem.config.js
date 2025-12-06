/**
 * PM2 进程管理配置文件
 * 使用方法: pm2 start ecosystem.config.js
 */

module.exports = {
  apps: [
    {
      name: 'api-gateway-center',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max', // 使用所有 CPU 核心
      exec_mode: 'cluster', // 集群模式
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
      },
      // 日志配置
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      // 自动重启配置
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // 其他配置
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};

