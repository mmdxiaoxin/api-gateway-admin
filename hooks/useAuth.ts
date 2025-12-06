"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout as logoutApi } from "@/lib/api/auth";
import { message } from "antd";

/**
 * 认证相关的自定义 Hook
 */
export function useAuth() {
	const { token, user, setToken, setUser, logout } = useAuthStore();
	const router = useRouter();

	/**
	 * 检查是否已登录
	 */
	const isAuthenticated = !!token;

	/**
	 * 退出登录
	 */
	const handleLogout = async () => {
		try {
			// 调用后端退出登录 API
			await logoutApi();
			
			// 清除本地存储的 token
			if (typeof window !== "undefined") {
				localStorage.removeItem("auth-token");
			}
			
			// 清除状态
			logout();
			
			message.success("退出登录成功");
			router.push("/login");
		} catch (error: any) {
			// 即使 API 调用失败，也清除本地状态
			if (typeof window !== "undefined") {
				localStorage.removeItem("auth-token");
			}
			logout();
			message.error(error.message || "退出登录失败");
			router.push("/login");
		}
	};

	return {
		token,
		user,
		isAuthenticated,
		setToken,
		setUser,
		logout: handleLogout,
	};
}

/**
 * 要求登录的 Hook
 * 如果未登录，自动重定向到登录页
 */
export function useRequireAuth() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, router]);

	return { isAuthenticated };
}

