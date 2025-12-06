import { NextResponse } from "next/server";
import { MENU_ITEMS_CONFIG } from "@/constants/menu";

/**
 * GET /api/menu
 * 获取菜单数据
 */
export async function GET() {
	try {
		// 返回菜单配置数据
		return NextResponse.json({
			code: 200,
			msg: "获取菜单成功",
			data: MENU_ITEMS_CONFIG,
		});
	} catch (error) {
		console.error("获取菜单失败:", error);
		return NextResponse.json(
			{
				code: 500,
				msg: "获取菜单失败",
				data: null,
			},
			{ status: 500 }
		);
	}
}

