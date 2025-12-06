import { NextRequest } from "next/server";
import { proxyGet, proxyPost } from "@/lib/proxy";

/**
 * GET /api/v1/config/gateway-servers
 * 查询网关服务配置项
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/gateway-servers");
}

/**
 * POST /api/v1/config/gateway-servers
 * 注册网关服务节点
 */
export async function POST(request: NextRequest) {
	return proxyPost(request, "/api/v1/config/gateway-servers", true);
}

