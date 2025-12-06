import { post } from "../api";
import type { User } from "@/types";
import { PORT_GATEWAY_ADMIN } from "./config";

export interface LoginRequest {
	login: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: User;
}

/**
 * 用户登录
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
	const response = await post<LoginResponse>(PORT_GATEWAY_ADMIN + "/api/auth/login", data);
	if (response.code === 0) {
		return response.data;
	}
	throw new Error(response.msg || "登录失败");
}

/**
 * 用户退出登录
 */
export async function logout(): Promise<void> {
	const response = await post(PORT_GATEWAY_ADMIN + "/api/auth/logout");
	if (response.code !== 0) {
		throw new Error(response.msg || "退出登录失败");
	}
}

