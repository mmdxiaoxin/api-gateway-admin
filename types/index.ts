// 用户相关类型
export interface User {
	username: string;
	email?: string;
	role?: string;
}

// 认证相关类型
export interface AuthState {
	token: string | null;
	user: User | null;
}

// 菜单项类型
export interface MenuItem {
	key: string;
	label: string;
	icon?: React.ReactNode;
	children?: MenuItem[];
}

// 标签页项类型
export interface TabItem {
	title: string;
	path: string;
}

// 网关相关类型
export interface GatewayItem {
	key: string;
	name: string;
	address: string;
	status: "running" | "stopped" | "pending";
	version: string;
	createTime: string;
}

// 用户列表项类型
export interface UserListItem {
	key: string;
	username: string;
	email: string;
	role: "admin" | "user" | "guest";
	status: "active" | "inactive";
	createTime: string;
}

