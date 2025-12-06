import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/config/application-interface-methods
 * 查询应用接口方法配置项
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/application-interface-methods");
}

