import { NextRequest } from "next/server";
import { proxyPost } from "@/lib/proxy";

/**
 * POST /api/v1/register/applications
 * 注册应用服务
 */
export async function POST(request: NextRequest) {
	return proxyPost(request, "/api/v1/register/applications", true);
}

