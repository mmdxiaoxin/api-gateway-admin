"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
	const handleLogout = () => {
		logout();
		router.push("/login");
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

