"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, BreadcrumbProps, Space } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { generateBreadcrumbPaths, getBreadcrumbTitle } from "@/lib/breadcrumb";

const BreadcrumbNav = () => {
	const pathname = usePathname();

	// 生成面包屑路径数组
	const breadcrumbPaths = generateBreadcrumbPaths(pathname);

	// 生成面包屑项
	const breadcrumbItems: BreadcrumbProps["items"] = breadcrumbPaths.map((path, index) => {
		const isLast = index === breadcrumbPaths.length - 1;
		const title = getBreadcrumbTitle(path);

		// 首页特殊处理
		if (path === "/") {
			return {
				title: (
					<Link href="/">
						<Space>
							<HomeOutlined />
							<span>首页</span>
						</Space>
					</Link>
				),
			};
		}

		// 其他路径
		return {
			title: isLast ? (
				title
			) : (
				<Link href={path}>{title}</Link>
			),
		};
	});

	return <Breadcrumb items={breadcrumbItems} separator=">" />;
};

export default BreadcrumbNav;

