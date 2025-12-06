import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/config/redis-config
 * 查询配置中心Redis配置信息
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/redis-config");
}

