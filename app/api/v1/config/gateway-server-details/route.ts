import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/config/gateway-server-details
 * 查询网关算力节点配置项
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/gateway-server-details");
}

