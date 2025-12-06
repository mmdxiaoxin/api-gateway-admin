import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/gateway-servers/application-systems
 * 查询应用系统信息
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/gateway-servers/application-systems");
}

