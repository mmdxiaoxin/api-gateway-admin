import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "登录 - 网关管理后台",
	description: "API Gateway Management Center Login",
};

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}

