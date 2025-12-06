import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "登录 - 网关管理后台",
	description: "登录网关管理后台，统一管理您的 API 网关服务。提供安全的用户认证和权限管理。",
	keywords: ["登录", "网关管理", "API网关", "用户认证"],
};

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}

