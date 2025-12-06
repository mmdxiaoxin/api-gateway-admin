"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, BreadcrumbProps } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BreadcrumbNav = () => {
	const pathname = usePathname();

	// 简单的面包屑生成逻辑
	const pathSegments = pathname.split("/").filter(Boolean);
	const breadcrumbItems: BreadcrumbProps["items"] = [
		{
			title: (
				<Link href="/">
					<HomeOutlined /> 首页
				</Link>
			),
		},
		...pathSegments.map((segment, index) => {
			const path = "/" + pathSegments.slice(0, index + 1).join("/");
			return {
				title: index === pathSegments.length - 1 ? (
					segment
				) : (
					<Link href={path}>{segment}</Link>
				),
			};
		}),
	];

	return <Breadcrumb items={breadcrumbItems} separator=">" />;
};

export default BreadcrumbNav;

