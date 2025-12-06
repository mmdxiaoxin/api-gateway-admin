"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Spin } from "antd";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const router = useRouter();
	const token = useAuthStore((state) => state.token);

	useEffect(() => {
		// 如果未登录，重定向到登录页面
		if (!token) {
			router.push("/login");
		}
	}, [token, router]);

	// 如果未登录，显示加载中（实际上会立即重定向）
	if (!token) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<Spin size="large" />
				<p className="mt-4 text-gray-500">检查登录状态...</p>
			</div>
		);
	}

	// 已登录，渲染子组件
	return <>{children}</>;
}

