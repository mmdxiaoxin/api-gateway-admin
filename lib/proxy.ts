import { NextRequest, NextResponse } from "next/server";

/**
 * Java 后端服务地址
 */
const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

/**
 * 代理请求到后端服务
 */
export async function proxyRequest(
	request: NextRequest,
	backendPath: string,
	options?: {
		method?: string;
		transformRequest?: (req: NextRequest) => Promise<RequestInit | null>;
		transformResponse?: (response: Response) => Promise<NextResponse>;
	}
) {
	try {
		const method = options?.method || request.method;
		const url = new URL(backendPath, BACKEND_API_URL);

		// 复制查询参数
		request.nextUrl.searchParams.forEach((value, key) => {
			url.searchParams.append(key, value);
		});

		// 准备请求配置
		let requestInit: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		// 复制请求头（排除一些不需要的）
		const excludeHeaders = ["host", "content-length"];
		request.headers.forEach((value, key) => {
			if (!excludeHeaders.includes(key.toLowerCase())) {
				requestInit.headers = {
					...requestInit.headers,
					[key]: value,
				};
			}
		});

		// 如果有自定义请求转换
		if (options?.transformRequest) {
			const transformed = await options.transformRequest(request);
			if (transformed) {
				requestInit = { ...requestInit, ...transformed };
			}
		}

		// 处理请求体（POST、PUT 等）
		if (["POST", "PUT", "PATCH"].includes(method)) {
			try {
				const body = await request.text();
				if (body) {
					requestInit.body = body;
				}
			} catch {
				// 如果没有请求体，忽略错误
			}
		}

		// 转发请求到后端
		const backendResponse = await fetch(url.toString(), requestInit);

		// 如果有自定义响应转换
		if (options?.transformResponse) {
			return await options.transformResponse(backendResponse);
		}

		// 默认响应处理
		const data = await backendResponse.text();
		let jsonData;
		try {
			jsonData = JSON.parse(data);
		} catch {
			jsonData = data;
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

/**
 * 处理 GET 请求代理
 */
export async function proxyGet(request: NextRequest, backendPath: string) {
	return proxyRequest(request, backendPath, { method: "GET" });
}

/**
 * 处理 POST 请求代理（支持 URL 参数）
 */
export async function proxyPost(
	request: NextRequest,
	backendPath: string,
	useQueryParams = false
) {
	if (useQueryParams) {
		// POST 请求但使用查询参数（Java 后端使用 @RequestParam）
		return proxyRequest(request, backendPath, {
			method: "POST",
			transformRequest: async () => {
				// 对于使用 @RequestParam 的 POST 请求，参数已经在 URL 中
				return {
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				};
			},
		});
	}
	return proxyRequest(request, backendPath, { method: "POST" });
}

/**
 * 处理 PUT 请求代理
 */
export async function proxyPut(request: NextRequest, backendPath: string) {
	return proxyRequest(request, backendPath, { method: "PUT" });
}

/**
 * 处理 DELETE 请求代理
 */
export async function proxyDelete(request: NextRequest, backendPath: string) {
	return proxyRequest(request, backendPath, { method: "DELETE" });
}

