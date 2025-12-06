import { MENU_TITLE_MAP } from "@/constants";

/**
 * 根据路径生成面包屑路径数组
 * 例如: "/gateway/list" -> ["/", "/gateway", "/gateway/list"]
 */
export function generateBreadcrumbPaths(pathname: string): string[] {
	if (pathname === "/") {
		return ["/"];
	}

	const segments = pathname.split("/").filter(Boolean);
	const paths: string[] = ["/"];

	for (let i = 0; i < segments.length; i++) {
		const path = "/" + segments.slice(0, i + 1).join("/");
		paths.push(path);
	}

	return paths;
}

/**
 * 获取路径对应的中文标题
 * 优先使用菜单配置，如果没有则使用路径的最后一段
 */
export function getBreadcrumbTitle(path: string): string {
	// 首页特殊处理
	if (path === "/") {
		return "首页";
	}

	// 优先从菜单配置获取
	if (MENU_TITLE_MAP[path]) {
		return MENU_TITLE_MAP[path];
	}

	// 如果没有配置，使用路径的最后一段作为标题
	const segments = path.split("/").filter(Boolean);
	const lastSegment = segments[segments.length - 1];

	// 简单的英文转中文映射（可选）
	const segmentMap: Record<string, string> = {
		list: "列表",
		config: "配置",
		detail: "详情",
		edit: "编辑",
		add: "新增",
	};

	return segmentMap[lastSegment] || lastSegment;
}

