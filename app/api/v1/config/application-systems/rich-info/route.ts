import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/config/application-systems/rich-info
 * 查询分配到网关下的待注册系统信息
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/config/application-systems/rich-info");
}

