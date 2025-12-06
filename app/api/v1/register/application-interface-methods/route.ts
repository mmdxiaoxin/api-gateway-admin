import { NextRequest } from "next/server";
import { proxyPost } from "@/lib/proxy";

/**
 * POST /api/v1/register/application-interface-methods
 * 注册应用接口方法
 */
export async function POST(request: NextRequest) {
	return proxyPost(request, "/api/v1/register/application-interface-methods", true);
}

