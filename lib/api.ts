/**
 * API 响应类型
 */
export interface ApiResponse<T = unknown> {
	code: number;
	message: string;
	data: T;
}

/**
 * API 客户端配置
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * 获取认证 token
 */
function getAuthToken(): string | null {
	if (typeof window === "undefined") {
		return null;
	}
	try {
		return localStorage.getItem("auth-token");
	} catch {
		return null;
	}
}

/**
 * 通用请求函数
 */
async function request<T>(
	url: string,
	options: RequestInit = {}
): Promise<ApiResponse<T>> {
	const token = getAuthToken();

	const response = await fetch(`${API_BASE_URL}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` }),
			...options.headers,
		},
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
	}

	return response.json();
}

/**
 * GET 请求
 */
export async function get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
	return request<T>(url, {
		...options,
		method: "GET",
	});
}

/**
 * POST 请求
 */
export async function post<T>(
	url: string,
	data?: unknown,
	options?: RequestInit
): Promise<ApiResponse<T>> {
	return request<T>(url, {
		...options,
		method: "POST",
		body: data ? JSON.stringify(data) : undefined,
	});
}

/**
 * PUT 请求
 */
export async function put<T>(
	url: string,
	data?: unknown,
	options?: RequestInit
): Promise<ApiResponse<T>> {
	return request<T>(url, {
		...options,
		method: "PUT",
		body: data ? JSON.stringify(data) : undefined,
	});
}

/**
 * DELETE 请求
 */
export async function del<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
	return request<T>(url, {
		...options,
		method: "DELETE",
	});
}

