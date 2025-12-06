import { NextRequest } from "next/server";
import { proxyPost } from "@/lib/proxy";

/**
 * POST /api/v1/load-balancing/nginx-config/copy
 * 复制Nginx配置文件
 */
export async function POST(request: NextRequest) {
	return proxyPost(request, "/api/v1/load-balancing/nginx-config/copy");
}

