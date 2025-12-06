import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

/**
 * API 响应类型
 */
export interface ApiResponse<T = unknown> {
	code: number;
	msg: string;
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
 * 创建 axios 实例
 */
const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000, // 10秒超时
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * 请求拦截器 - 添加 token
 */
axiosInstance.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * 响应拦截器 - 统一处理错误
 */
axiosInstance.interceptors.response.use(
	(response) => {
		// 直接返回响应数据（axios 会自动解析 JSON）
		return response;
	},
	(error: AxiosError<ApiResponse>) => {
		// 处理 HTTP 错误
		if (error.response) {
			// 服务器返回了错误状态码
			const errorData = error.response.data;
			const errorMessage = errorData?.msg || error.message || `HTTP error! status: ${error.response.status}`;
			return Promise.reject(new Error(errorMessage));
		} else if (error.request) {
			// 请求已发出但没有收到响应
			return Promise.reject(new Error("网络错误，请检查网络连接"));
		} else {
			// 其他错误
			return Promise.reject(new Error(error.message || "请求失败"));
		}
	}
);

/**
 * GET 请求
 */
export async function get<T>(
	url: string,
	config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
	const response = await axiosInstance.get<ApiResponse<T>>(url, config);
	return response.data;
}

/**
 * POST 请求
 */
export async function post<T>(
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
	const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
	return response.data;
}

/**
 * PUT 请求
 */
export async function put<T>(
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
	const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
	return response.data;
}

/**
 * DELETE 请求
 */
export async function del<T>(
	url: string,
	config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
	const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
	return response.data;
}

/**
 * 导出 axios 实例（用于特殊需求）
 */
export { axiosInstance };

