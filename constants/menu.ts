import type { IconName } from "@/components/ui/IconComponent";

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

// 路径到图标名称的映射配置
export const MENU_ICON_MAP: Record<string, IconName> = {
	[MENU_CONFIG.HOME]: "HomeOutlined",
	[MENU_CONFIG.GATEWAY]: "ApiOutlined",
	[MENU_CONFIG.GATEWAY_LIST]: "ApiOutlined",
	[MENU_CONFIG.GATEWAY_CONFIG]: "ApiOutlined",
	[MENU_CONFIG.USER]: "UserOutlined",
	[MENU_CONFIG.SETTINGS]: "SettingOutlined",
};

// 菜单项配置类型
export interface MenuItemConfig {
	key: string;
	icon?: IconName;
	label: string;
	children?: MenuItemConfig[];
}

// 菜单数据配置（集中管理所有菜单项）
export const MENU_ITEMS_CONFIG: MenuItemConfig[] = [
	{
		key: MENU_CONFIG.HOME,
		icon: MENU_ICON_MAP[MENU_CONFIG.HOME],
		label: MENU_TITLE_MAP[MENU_CONFIG.HOME],
	},
	{
		key: MENU_CONFIG.GATEWAY,
		icon: MENU_ICON_MAP[MENU_CONFIG.GATEWAY],
		label: MENU_TITLE_MAP[MENU_CONFIG.GATEWAY],
		children: [
			{
				key: MENU_CONFIG.GATEWAY_LIST,
				icon: MENU_ICON_MAP[MENU_CONFIG.GATEWAY_LIST],
				label: MENU_TITLE_MAP[MENU_CONFIG.GATEWAY_LIST],
			},
			{
				key: MENU_CONFIG.GATEWAY_CONFIG,
				icon: MENU_ICON_MAP[MENU_CONFIG.GATEWAY_CONFIG],
				label: MENU_TITLE_MAP[MENU_CONFIG.GATEWAY_CONFIG],
			},
		],
	},
	{
		key: MENU_CONFIG.USER,
		icon: MENU_ICON_MAP[MENU_CONFIG.USER],
		label: MENU_TITLE_MAP[MENU_CONFIG.USER],
	},
	{
		key: MENU_CONFIG.SETTINGS,
		icon: MENU_ICON_MAP[MENU_CONFIG.SETTINGS],
		label: MENU_TITLE_MAP[MENU_CONFIG.SETTINGS],
	},
];

// 根据路径获取菜单标题的工具函数
export const getMenuTitleByPath = (path: string): string => {
	return MENU_TITLE_MAP[path] || "页面";
};

// 根据路径获取图标名称的工具函数
export const getMenuIconByPath = (path: string): IconName | undefined => {
	// 先精确匹配
	if (MENU_ICON_MAP[path]) {
		return MENU_ICON_MAP[path];
	}
	// 如果精确匹配失败，尝试匹配父路径（用于子菜单项）
	for (const [menuPath, iconName] of Object.entries(MENU_ICON_MAP)) {
		if (path.startsWith(menuPath + "/") || path === menuPath) {
			return iconName;
		}
	}
	return undefined;
};

