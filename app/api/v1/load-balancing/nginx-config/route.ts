import { NextRequest } from "next/server";
import { proxyPut } from "@/lib/proxy";

/**
 * PUT /api/v1/load-balancing/nginx-config
 * 更新Nginx配置
 */
export async function PUT(request: NextRequest) {
	return proxyPut(request, "/api/v1/load-balancing/nginx-config");
}

