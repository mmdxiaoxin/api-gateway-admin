// 路径到标题的映射配置
export const menuTitleMap: Record<string, string> = {
	"/": "首页",
	"/gateway": "网关管理",
	"/gateway/list": "网关列表",
	"/gateway/config": "网关配置",
	"/user": "用户管理",
	"/settings": "系统设置",
};

// 根据路径获取菜单标题的工具函数
export const getMenuTitleByPath = (path: string): string => {
	return menuTitleMap[path] || "页面";
};
