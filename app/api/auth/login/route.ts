import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface LoginRequest {
	login: string;
	password: string;
}

/**
 * POST /api/auth/login
 * 用户登录
 */
export async function POST(request: NextRequest) {
	try {
		const body: LoginRequest = await request.json();
		const { login, password } = body;

		// 验证输入
		if (!login || !password) {
			return NextResponse.json(
				{
					code: 400,
					message: "用户名和密码不能为空",
					data: null,
				},
				{ status: 400 }
			);
		}

		// TODO: 这里应该连接真实的数据库进行验证
		// 目前使用模拟数据
		const mockUsers = [
			{ username: "admin", password: "admin123", email: "admin@example.com", role: "admin" },
			{ username: "user", password: "user123", email: "user@example.com", role: "user" },
		];

		// 验证用户
		const user = mockUsers.find(
			(u) => (u.username === login || u.email === login) && u.password === password
		);

		if (!user) {
			return NextResponse.json(
				{
					code: 401,
					message: "用户名或密码错误",
					data: null,
				},
				{ status: 401 }
			);
		}

		// 生成 token（实际项目中应该使用 JWT）
		const token = `token_${user.username}_${Date.now()}`;

		// 设置 cookie（可选，也可以只返回 token 让前端存储）
		const cookieStore = await cookies();
		cookieStore.set("auth-token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7, // 7 天
		});

		// 返回用户信息和 token
		return NextResponse.json({
			code: 200,
			message: "登录成功",
			data: {
				token,
				user: {
					username: user.username,
					email: user.email,
					role: user.role,
				},
			},
		});
	} catch (error) {
		console.error("登录失败:", error);
		return NextResponse.json(
			{
				code: 500,
				message: "登录失败，请稍后重试",
				data: null,
			},
			{ status: 500 }
		);
	}
}

