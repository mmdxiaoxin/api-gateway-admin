import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * POST /api/auth/logout
 * 用户退出登录
 */
export async function POST() {
	try {
		// 清除 cookie
		const cookieStore = await cookies();
		cookieStore.delete("auth-token");

		return NextResponse.json({
			code: 200,
			msg: "退出登录成功",
			data: null,
		});
	} catch (error) {
		console.error("退出登录失败:", error);
		return NextResponse.json(
			{
				code: 500,
				msg: "退出登录失败",
				data: null,
			},
			{ status: 500 }
		);
	}
}

