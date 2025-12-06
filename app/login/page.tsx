"use client";

import {
	CloseCircleOutlined,
	LockOutlined,
	SyncOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, FloatButton, Form, Input, Row, App } from "antd";
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
				"relative flex h-screen bg-cover bg-center bg-no-repeat",
				"bg-[url('/login_bg.svg')]"
			)}
		>
			<Row className="flex flex-1 rounded-lg items-center justify-center">
				{/* 左侧图片部分 - 只在非移动端显示 */}
				<Col xs={0} sm={0} md={12} lg={12} xl={14} className="flex-1">
				{/* eslint-disable-next-line @next/next/no-img-element */}
					<img 
						src="/login_left_sunny.svg" 
						alt="login" 
						className="object-cover object-center w-full h-full" 
					/>
				</Col>

				{/* 右侧登录表单 */}
				<Col xs={24} sm={24} md={12} lg={12} xl={10}>
					<div
						className={clsx(
							"flex flex-col items-center",
							"p-6 mx-6 rounded-lg bg-white shadow-lg",
							"md:py-10 md:px-10 md:mr-6",
							"lg:py-10 lg:px-10 lg:mr-10",
							"xl:py-12 xl:px-12 xl:mr-12",
							"2xl:py-12 2xl:px-12 2xl:mr-12"
						)}
					>
						{/* 移动端logo - 只在移动端显示 */}
						<div className="flex flex-col items-center mb-6 md:hidden">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img 
								className="w-auto h-12 object-contain" 
								src="/logo_sunny.svg" 
								alt="logo" 
							/>
							<span className="font-bold text-2xl mt-2">网关管理后台</span>
						</div>

						{/* 非移动端logo */}
						<div className="hidden md:flex items-center justify-center mb-10">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className={clsx(
									"w-auto h-12 object-contain",
									"lg:h-14",
									"xl:h-16",
									"2xl:h-16"
								)}
								src="/logo_sunny.svg"
								alt="logo"
							/>
							<span
								className={clsx(
									"font-bold whitespace-nowrap pl-6 text-3xl",
									"lg:text-4xl",
									"xl:text-5xl",
									"2xl:text-5xl"
								)}
							>
								网关管理后台
							</span>
						</div>

						<Form
							form={form}
							name="basic"
							labelCol={{ span: 5 }}
							initialValues={{ remember: true }}
							onFinish={onFinish}
							size="large"
							autoComplete="off"
							className="w-full"
						>
							<Form.Item
								name="login"
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
							>
								<Input placeholder="用户名或邮箱" prefix={<UserOutlined />} />
							</Form.Item>
							<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
								<Input.Password
									autoComplete="new-password"
									placeholder="请输入密码"
									prefix={<LockOutlined />}
								/>
							</Form.Item>

							<Form.Item className="w-full mt-2.5 whitespace-nowrap">
								<Flex justify={"space-between"} align={"center"}>
									<Button
										onClick={() => {
											form.resetFields();
										}}
										icon={<CloseCircleOutlined />}
										className="text-sm w-[120px] md:w-[140px] lg:w-[180px]"
									>
										重置
									</Button>
									<Button
										type="primary"
										htmlType="submit"
										loading={loading}
										icon={<UserOutlined />}
										className="text-sm w-[120px] md:w-[140px] lg:w-[180px]"
									>
										登录
									</Button>
								</Flex>
							</Form.Item>
							<FloatButton.Group trigger="click" type="primary" style={{ insetInlineEnd: 70 }}>
								<FloatButton
									icon={<UserAddOutlined />}
									tooltip={"账号注册"}
									onClick={handleRegister}
								/>
								<FloatButton
									icon={<SyncOutlined />}
									tooltip={"忘记密码"}
									onClick={handleForgotPassword}
								/>
							</FloatButton.Group>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Login;

