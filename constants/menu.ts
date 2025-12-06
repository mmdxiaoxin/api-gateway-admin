// 菜单配置常量
export const MENU_CONFIG = {
	HOME: "/",
	GATEWAY: "/gateway",
	GATEWAY_LIST: "/gateway/list",
	GATEWAY_CONFIG: "/gateway/config",
	USER: "/user",
	SETTINGS: "/settings",
	LOGIN: "/login",
} as const;

// 路径到标题的映射配置
export const MENU_TITLE_MAP: Record<string, string> = {
	[MENU_CONFIG.HOME]: "首页",
	[MENU_CONFIG.GATEWAY]: "网关管理",
	[MENU_CONFIG.GATEWAY_LIST]: "网关列表",
	[MENU_CONFIG.GATEWAY_CONFIG]: "网关配置",
	[MENU_CONFIG.USER]: "用户管理",
	[MENU_CONFIG.SETTINGS]: "系统设置",
};

// 根据路径获取菜单标题的工具函数
export const getMenuTitleByPath = (path: string): string => {
	return MENU_TITLE_MAP[path] || "页面";
};

