import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/config/application-interfaces
 * 查询应用接口配置项
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/application-interfaces");
}

