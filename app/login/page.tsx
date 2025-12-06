"use client";

import {
	CloseCircleOutlined,
	LockOutlined,
	SyncOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, FloatButton, Form, Input, message, Row } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/store/authStore";

interface FormData {
	login: string;
	password: string;
}

const Login = () => {
	const router = useRouter();
	const { token, setToken, setUser } = useAuthStore();

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
			// 模拟登录 API 调用
			await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟网络延迟

			// 简单的验证逻辑（实际项目中应该调用后端 API）
			if (login && password) {
				// 模拟成功登录
				const mockToken = "mock_token_" + Date.now();
				setToken(mockToken);
				setUser({
					username: login,
					email: login.includes("@") ? login : undefined,
				});
				message.success("登录成功");
				router.push("/");
			} else {
				message.error("请输入用户名和密码");
			}
		} catch {
			message.error("登录失败，请稍后重试");
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
				"bg-gradient-to-br from-blue-50 via-white to-indigo-50"
			)}
		>
			<Row className="flex flex-1 rounded-lg items-center justify-center">
				{/* 左侧图片部分 - 只在非移动端显示 */}
				<Col xs={0} sm={0} md={12} lg={12} xl={14} className="flex-1 flex items-center justify-center">
					<div className="w-full h-full flex items-center justify-center p-8">
						<div className="text-center space-y-4">
							<div className="flex items-center justify-center mb-8">
								<div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
									网
								</div>
							</div>
							<h1 className="text-4xl font-bold text-gray-800 mb-2">网关管理后台</h1>
							<p className="text-gray-600 text-lg">统一管理您的 API 网关服务</p>
						</div>
					</div>
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
							<div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
								网
							</div>
							<span className="font-bold text-2xl mt-2">网关管理后台</span>
						</div>

						{/* 非移动端logo */}
						<div className="hidden md:flex items-center justify-center mb-10">
							<div
								className={clsx(
									"w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold",
									"lg:w-14 lg:h-14 lg:text-xl",
									"xl:w-16 xl:h-16 xl:text-2xl",
									"2xl:w-16 2xl:h-16 2xl:text-2xl"
								)}
							>
								网
							</div>
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

