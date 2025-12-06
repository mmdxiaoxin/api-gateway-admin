"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LayoutIndex from "@/components/layout";
import { useAuthStore } from "@/store/authStore";
import { Spin } from "antd";

export default function ConditionalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const token = useAuthStore((state) => state.token);
	const isLoginPage = pathname === "/login";

	// 检查认证状态（hooks 必须在条件判断之前调用）
	useEffect(() => {
		// 如果不是登录页面且未登录，重定向到登录页
		if (!token && !isLoginPage) {
			router.push("/login");
		}
	}, [token, router, isLoginPage]);

	// 如果是登录页面，直接返回内容，不使用主布局
	if (isLoginPage) {
		return <>{children}</>;
	}

	// 如果未登录，显示加载中（实际上会立即重定向）
	if (!token) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<Spin size="large" />
				<p className="mt-4 text-gray-500">检查登录状态...</p>
			</div>
		);
	}

	// 已登录，使用主布局
	return <LayoutIndex>{children}</LayoutIndex>;
}

