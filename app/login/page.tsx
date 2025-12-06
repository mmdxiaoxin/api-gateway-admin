"use client";

import {
	LockOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Form, Input, Row, App } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/store/authStore";
import { login as loginApi } from "@/lib/api/auth";

interface FormData {
	login: string;
	password: string;
}

const Login = () => {
	const router = useRouter();
	const { token, setToken, setUser } = useAuthStore();
	const { message } = App.useApp();

	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 如果已登录，重定向到首页
	useEffect(() => {
		if (token) {
			router.push("/");
		}
	}, [token, router]);

	// 登录
	const onFinish = async ({ login, password }: FormData) => {
		try {
			setLoading(true);
			// 调用后端登录 API
			const result = await loginApi({ login, password });
			
			// 保存 token 和用户信息
			setToken(result.token);
			setUser(result.user);
			
			// 同时保存到 localStorage（用于 API 请求）
			if (typeof window !== "undefined") {
				localStorage.setItem("auth-token", result.token);
			}
			
			message.success("登录成功");
			router.push("/");
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : "登录失败，请稍后重试";
			message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = () => {
		message.info("注册功能暂未开放");
	};

	const handleForgotPassword = () => {
		message.info("请联系管理员重置密码");
	};

	if (token) {
		return null; // 等待重定向
	}

	return (
		<div
			className={clsx(
				"relative flex h-screen bg-cover bg-center bg-no-repeat overflow-hidden",
				"bg-[url('/login_bg.svg')]"
			)}
		>
			{/* 背景遮罩层，增强可读性 */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-indigo-50/80 backdrop-blur-sm" />
			
			<Row className="relative z-10 flex flex-1 items-center justify-center px-4">
				{/* 左侧图片部分 - 只在非移动端显示 */}
				<Col xs={0} sm={0} md={12} lg={12} xl={14} className="flex-1 h-full">
					<div className="flex flex-col items-center justify-center h-full p-8">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img 
							src="/login_left_sunny.svg" 
							alt="login" 
							className="object-contain object-center w-full h-full max-h-[80vh]" 
						/>
						{/* 左侧欢迎文字 */}
						<div className="mt-8 text-center space-y-3 hidden xl:block">
							<h2 className="text-3xl font-bold text-gray-800">欢迎回来</h2>
							<p className="text-gray-600 text-lg">统一管理您的 API 网关服务</p>
						</div>
					</div>
				</Col>

				{/* 右侧登录表单 */}
				<Col xs={24} sm={24} md={12} lg={12} xl={10}>
					<div
						className={clsx(
							"flex flex-col items-center w-full max-w-md mx-auto",
							"p-8 rounded-2xl",
							"bg-white/95 backdrop-blur-md",
							"shadow-2xl border border-white/20",
							"transition-all duration-300 hover:shadow-3xl",
							"md:p-10",
							"lg:p-12"
						)}
					>
						{/* 移动端logo - 只在移动端显示 */}
						<div className="flex flex-col items-center mb-8 md:hidden">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img 
								className="w-auto h-14 object-contain mb-3" 
								src="/logo_sunny.svg" 
								alt="logo" 
							/>
							<h1 className="font-bold text-2xl text-gray-800">网关管理后台</h1>
							<p className="text-gray-500 text-sm mt-2">统一管理您的 API 网关服务</p>
						</div>

						{/* 非移动端logo和欢迎信息 */}
						<div className="hidden md:flex flex-col items-center mb-8 w-full">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className={clsx(
									"w-auto h-14 object-contain mb-4",
									"lg:h-16",
									"xl:h-18"
								)}
								src="/logo_sunny.svg"
								alt="logo"
							/>
							<h1
								className={clsx(
									"font-bold text-gray-800 mb-2 text-center",
									"text-2xl",
									"lg:text-3xl",
									"xl:text-4xl"
								)}
							>
								网关管理后台
							</h1>
							<p className="text-gray-500 text-center text-sm lg:text-base">
								统一管理您的 API 网关服务
							</p>
						</div>

						<Form
							form={form}
							name="basic"
							layout="vertical"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							size="large"
							autoComplete="off"
							className="w-full"
						>
							<Form.Item
								name="login"
								label={<span className="text-gray-700 font-medium">用户名或邮箱</span>}
								rules={[
									{ required: true, message: "请输入用户名或邮箱" },
									{
										validator(_, value) {
											if (
												!value ||
												/^[\w-]{4,16}$/.test(value) ||
												/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
													value
												)
											) {
												return Promise.resolve();
											}
											return Promise.reject(new Error("请输入有效的用户名或邮箱"));
										},
									},
								]}
								className="mb-5"
							>
								<Input 
									placeholder="请输入用户名或邮箱" 
									prefix={<UserOutlined className="text-gray-400" />}
									className="h-12 rounded-lg"
								/>
							</Form.Item>
							
							<Form.Item 
								name="password" 
								label={<span className="text-gray-700 font-medium">密码</span>}
								rules={[{ required: true, message: "请输入密码" }]}
								className="mb-6"
							>
								<Input.Password
									autoComplete="new-password"
									placeholder="请输入密码"
									prefix={<LockOutlined className="text-gray-400" />}
									className="h-12 rounded-lg"
								/>
							</Form.Item>

							<Form.Item className="mb-4">
								<Button
									type="primary"
									htmlType="submit"
									loading={loading}
									block
									className={clsx(
										"h-12 rounded-lg text-base font-medium",
										"bg-gradient-to-r from-blue-500 to-indigo-600",
										"hover:from-blue-600 hover:to-indigo-700",
										"shadow-lg hover:shadow-xl",
										"transition-all duration-300"
									)}
								>
									登录
								</Button>
							</Form.Item>

							<Form.Item className="mb-0">
								<Flex justify="center" align="center" gap="middle">
									<Button
										type="link"
										onClick={() => {
											form.resetFields();
										}}
										className="text-gray-500 hover:text-gray-700"
									>
										重置
									</Button>
									<span className="text-gray-300">|</span>
									<Button
										type="link"
										onClick={handleForgotPassword}
										className="text-gray-500 hover:text-gray-700"
									>
										忘记密码？
									</Button>
								</Flex>
							</Form.Item>
						</Form>

						{/* 底部提示信息 */}
						<div className="mt-6 pt-6 border-t border-gray-200 w-full">
							<div className="flex justify-center items-center gap-4 text-sm text-gray-500">
								<Button
									type="link"
									icon={<UserAddOutlined />}
									onClick={handleRegister}
									className="text-gray-500 hover:text-gray-700 p-0 h-auto"
								>
									账号注册
								</Button>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Login;

