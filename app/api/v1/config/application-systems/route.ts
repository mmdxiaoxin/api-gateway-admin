import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/config/application-systems
 * 查询应用服务配置项
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/application-systems");
}

