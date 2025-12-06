import { get } from "../api";
import type { MenuItemConfig } from "@/constants/menu";

/**
 * 获取菜单数据
 */
export async function getMenuData(): Promise<MenuItemConfig[]> {
	const response = await get<MenuItemConfig[]>("/api/menu");
	if (response.code === 200) {
		return response.data;
	}
	throw new Error(response.message || "获取菜单失败");
}

