import { NextRequest, NextResponse } from "next/server";

/**
 * Java 后端服务地址
 */
const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

/**
 * 通用代理路由 - 处理所有 /api/v1/* 请求
 * 自动转发到 Java 后端
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> | { path: string[] } }
) {
	return proxyRequest(request, params);
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> | { path: string[] } }
) {
	return proxyRequest(request, params);
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> | { path: string[] } }
) {
	return proxyRequest(request, params);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> | { path: string[] } }
) {
	return proxyRequest(request, params);
}

/**
 * 代理请求到后端服务
 */
async function proxyRequest(
	request: NextRequest,
	params: Promise<{ path: string[] }> | { path: string[] }
) {
	try {
		// 处理 params（可能是 Promise 或直接对象）
		const resolvedParams = await Promise.resolve(params);
		const pathSegments = resolvedParams?.path;

		// 如果 params.path 不存在，从 URL 中提取路径
		let backendPath: string;
		if (pathSegments && Array.isArray(pathSegments) && pathSegments.length > 0) {
			backendPath = `/api/v1/${pathSegments.join("/")}`;
		} else {
			// 从 URL 中提取路径（备用方案）
			const urlPath = request.nextUrl.pathname;
			backendPath = urlPath.startsWith("/api/v1") ? urlPath : `/api/v1${urlPath.replace("/api/v1", "")}`;
		}

		const url = new URL(backendPath, BACKEND_API_URL);

		// 复制查询参数
		request.nextUrl.searchParams.forEach((value, key) => {
			url.searchParams.append(key, value);
		});

		// 准备请求配置
		const requestInit: RequestInit = {
			method: request.method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		// 复制请求头（排除一些不需要的）
		const excludeHeaders = ["host", "content-length"];
		request.headers.forEach((value, key) => {
			if (!excludeHeaders.includes(key.toLowerCase())) {
				(requestInit.headers as Record<string, string>)[key] = value;
			}
		});

		// 处理请求体（POST、PUT 等）
		// 注意：Java 后端使用 @RequestParam，参数在 URL 中，不需要请求体
		if (["POST", "PUT", "PATCH"].includes(request.method)) {
			try {
				const body = await request.text();
				// 只有当有请求体且不是空字符串时才添加
				if (body && body.trim()) {
					requestInit.body = body;
				} else {
					// 如果没有请求体，使用 form-urlencoded（Java @RequestParam 需要）
					(requestInit.headers as Record<string, string>)["Content-Type"] = "application/x-www-form-urlencoded";
				}
			} catch {
				// 如果没有请求体，使用 form-urlencoded
				(requestInit.headers as Record<string, string>)["Content-Type"] = "application/x-www-form-urlencoded";
			}
		}

		// 转发请求到后端
		const backendResponse = await fetch(url.toString(), requestInit);

		// 检查响应状态
		if (!backendResponse.ok) {
			console.error(`后端请求失败: ${backendResponse.status} ${backendResponse.statusText}`);
			return NextResponse.json(
				{
					code: backendResponse.status,
					msg: `后端请求失败: ${backendResponse.statusText}`,
					data: null,
				},
				{ status: backendResponse.status }
			);
		}

		// 处理响应
		const data = await backendResponse.text();

		// 如果响应为空
		if (!data || data.trim() === "") {
			console.error("后端返回空响应");
			return NextResponse.json(
				{
					code: 500,
					msg: "后端返回空响应",
					data: null,
				},
				{ status: 500 }
			);
		}

		let jsonData;
		try {
			jsonData = JSON.parse(data);
		} catch (parseError) {
			// 如果解析失败，返回原始数据
			console.error("解析后端响应失败:", parseError, "原始数据:", data.substring(0, 200));
			return NextResponse.json(
				{
					code: 500,
					msg: "后端响应格式错误",
					data: null,
				},
				{ status: 500 }
			);
		}

		// 确保返回的数据有正确的结构
		if (!jsonData || typeof jsonData !== "object") {
			console.error("后端返回数据格式错误:", jsonData);
			return NextResponse.json(
				{
					code: 500,
					msg: "后端返回数据格式错误",
					data: null,
				},
				{ status: 500 }
			);
		}

		// 确保有 code 属性（后端应该返回 { code, msg, data } 结构）
		if (typeof jsonData.code === "undefined") {
			console.warn("后端返回数据缺少 code 属性:", jsonData);
		}

		return NextResponse.json(jsonData, {
			status: backendResponse.status,
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});
	} catch (error) {
		console.error("代理请求失败:", error);
		return NextResponse.json(
			{
				code: 500,
				msg: error instanceof Error ? error.message : "代理请求失败",
				data: null,
			},
			{ status: 500 }
		);
	}
}

