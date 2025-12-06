import { get } from "../api";
import type { MenuItemConfig } from "@/constants/menu";
import { PORT_GATEWAY_ADMIN } from "./config";

/**
 * 获取菜单数据
 */
export async function getMenuData(): Promise<MenuItemConfig[]> {
	const response = await get<MenuItemConfig[]>(PORT_GATEWAY_ADMIN + "/api/menu");
	if (response.code === 0) {
		return response.data;
	}
	throw new Error(response.msg || "获取菜单失败");
}

