import { NextRequest } from "next/server";
import { proxyPost } from "@/lib/proxy";

/**
 * POST /api/v1/register/events
 * 应用信息注册完成通知
 */
export async function POST(request: NextRequest) {
	return proxyPost(request, "/api/v1/register/events", true);
}

