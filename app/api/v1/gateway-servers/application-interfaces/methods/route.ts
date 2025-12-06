import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/gateway-servers/application-interfaces/methods
 * 查询应用接口方法信息
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/gateway-servers/application-interfaces/methods");
}

