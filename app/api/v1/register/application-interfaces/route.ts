import { NextRequest } from "next/server";
import { proxyPost } from "@/lib/proxy";

/**
 * POST /api/v1/register/application-interfaces
 * 注册应用接口
 */
export async function POST(request: NextRequest) {
	return proxyPost(request, "/api/v1/register/application-interfaces", true);
}

