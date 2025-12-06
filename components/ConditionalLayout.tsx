"use client";

import { usePathname } from "next/navigation";
import LayoutIndex from "@/components/layouts";

export default function ConditionalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isLoginPage = pathname === "/login";

	// 如果是登录页面，直接返回内容，不使用主布局
	if (isLoginPage) {
		return <>{children}</>;
	}

	// 其他页面使用主布局
	return <LayoutIndex>{children}</LayoutIndex>;
}

