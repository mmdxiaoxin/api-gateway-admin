import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/gateway-servers/application-interfaces
 * 查询应用接口信息
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/gateway-servers/application-interfaces");
}

