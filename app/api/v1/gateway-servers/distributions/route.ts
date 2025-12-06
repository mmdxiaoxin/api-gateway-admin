import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

/**
 * GET /api/v1/gateway-servers/distributions
 * 查询网关分配数据
 */
export async function GET(request: NextRequest) {
	return proxyGet(request, "/api/v1/gateway-servers/distributions");
}

