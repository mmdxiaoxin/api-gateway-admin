import { NextRequest } from "next/server";
import { proxyGet, proxyPost } from "@/lib/proxy";

/**
 * GET /api/v1/config/gateway-distributions
 * 查询网关分配配置项
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/gateway-distributions");
}

/**
 * POST /api/v1/config/gateway-distributions
 * 网关算力与系统挂载配置
 */
export async function POST(request: NextRequest) {
	return proxyPost(request, "/api/v1/config/gateway-distributions", true);
}

