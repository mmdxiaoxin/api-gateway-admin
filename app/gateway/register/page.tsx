"use client";

import { useState } from "react";
import {
	Card,
	Tabs,
	Form,
	Input,
	Button,
	Space,
	App,
	Select,
	InputNumber,
	Radio,
} from "antd";
import {
	SaveOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import {
	registerApplication,
	registerApplicationInterface,
	registerApplicationInterfaceMethod,
	registerEvent,
} from "@/lib/api/gateway";

const { Title } = Typography;
const { TextArea } = Input;

const RpcRegisterManage = () => {
	const { message } = App.useApp();
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("application");

	const [applicationForm] = Form.useForm();
	const [interfaceForm] = Form.useForm();
	const [methodForm] = Form.useForm();
	const [eventForm] = Form.useForm();

	// 注册应用服务
	const handleRegisterApplication = async (values: {
		systemId: string;
		systemName: string;
		systemType: string;
		systemRegistry: string;
	}) => {
		setLoading(true);
		try {
			const result = await registerApplication(
				values.systemId,
				values.systemName,
				values.systemType,
				values.systemRegistry
			);
			if (result.code === 200 || result.code === 1001) {
				message.success(result.msg || "注册成功");
				applicationForm.resetFields();
			} else {
				message.error(result.msg || "注册失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "注册失败");
		} finally {
			setLoading(false);
		}
	};

	// 注册应用接口
	const handleRegisterInterface = async (values: {
		systemId: string;
		interfaceId: string;
		interfaceName: string;
		interfaceVersion: string;
	}) => {
		setLoading(true);
		try {
			const result = await registerApplicationInterface(
				values.systemId,
				values.interfaceId,
				values.interfaceName,
				values.interfaceVersion
			);
			if (result.code === 200 || result.code === 1001) {
				message.success(result.msg || "注册成功");
				interfaceForm.resetFields();
			} else {
				message.error(result.msg || "注册失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "注册失败");
		} finally {
			setLoading(false);
		}
	};

	// 注册应用接口方法
	const handleRegisterMethod = async (values: {
		systemId: string;
		interfaceId: string;
		methodId: string;
		methodName: string;
		parameterType: string;
		uri: string;
		httpCommandType: string;
		auth: number;
	}) => {
		setLoading(true);
		try {
			const result = await registerApplicationInterfaceMethod(
				values.systemId,
				values.interfaceId,
				values.methodId,
				values.methodName,
				values.parameterType,
				values.uri,
				values.httpCommandType,
				values.auth
			);
			if (result.code === 200 || result.code === 1001) {
				message.success(result.msg || "注册成功");
				methodForm.resetFields();
			} else {
				message.error(result.msg || "注册失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "注册失败");
		} finally {
			setLoading(false);
		}
	};

	// 注册事件通知
	const handleRegisterEvent = async (values: { systemId: string }) => {
		setLoading(true);
		try {
			const result = await registerEvent(values.systemId);
			if (result.code === 200) {
				message.success("通知成功");
				eventForm.resetFields();
			} else {
				message.error(result.msg || "通知失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "通知失败");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full h-full p-6">
			<Title level={2}>RPC 服务注册管理</Title>
			<Card className="mt-4">
				<Tabs activeKey={activeTab} onChange={setActiveTab} items={[
					{
						key: "application",
						label: "注册应用服务",
						children: (
						<Form
							form={applicationForm}
							layout="vertical"
							onFinish={handleRegisterApplication}
							className="max-w-2xl"
						>
							<Form.Item
								name="systemId"
								label="系统ID"
								rules={[{ required: true, message: "请输入系统ID" }]}
							>
								<Input placeholder="请输入系统ID" />
							</Form.Item>
							<Form.Item
								name="systemName"
								label="系统名称"
								rules={[{ required: true, message: "请输入系统名称" }]}
							>
								<Input placeholder="请输入系统名称" />
							</Form.Item>
							<Form.Item
								name="systemType"
								label="系统类型"
								rules={[{ required: true, message: "请选择系统类型" }]}
							>
								<Select placeholder="请选择系统类型">
									<Select.Option value="RPC">RPC</Select.Option>
									<Select.Option value="HTTP">HTTP</Select.Option>
									<Select.Option value="MQ">MQ</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="systemRegistry"
								label="注册中心"
								rules={[{ required: true, message: "请输入注册中心" }]}
							>
								<Input placeholder="例如: zookeeper://127.0.0.1:2181" />
							</Form.Item>
							<Form.Item>
								<Space>
									<Button
										type="primary"
										htmlType="submit"
										icon={<SaveOutlined />}
										loading={loading}
									>
										注册
									</Button>
									<Button
										icon={<ReloadOutlined />}
										onClick={() => applicationForm.resetFields()}
									>
										重置
									</Button>
								</Space>
							</Form.Item>
						</Form>
						),
					},
					{
						key: "interface",
						label: "注册应用接口",
						children: (
						<Form
							form={interfaceForm}
							layout="vertical"
							onFinish={handleRegisterInterface}
							className="max-w-2xl"
						>
							<Form.Item
								name="systemId"
								label="系统ID"
								rules={[{ required: true, message: "请输入系统ID" }]}
							>
								<Input placeholder="请输入系统ID" />
							</Form.Item>
							<Form.Item
								name="interfaceId"
								label="接口ID"
								rules={[{ required: true, message: "请输入接口ID" }]}
							>
								<Input placeholder="请输入接口ID" />
							</Form.Item>
							<Form.Item
								name="interfaceName"
								label="接口名称"
								rules={[{ required: true, message: "请输入接口名称" }]}
							>
								<Input placeholder="请输入接口名称" />
							</Form.Item>
							<Form.Item
								name="interfaceVersion"
								label="接口版本"
								rules={[{ required: true, message: "请输入接口版本" }]}
							>
								<Input placeholder="例如: 1.0.0" />
							</Form.Item>
							<Form.Item>
								<Space>
									<Button
										type="primary"
										htmlType="submit"
										icon={<SaveOutlined />}
										loading={loading}
									>
										注册
									</Button>
									<Button
										icon={<ReloadOutlined />}
										onClick={() => interfaceForm.resetFields()}
									>
										重置
									</Button>
								</Space>
							</Form.Item>
						</Form>
						),
					},
					{
						key: "method",
						label: "注册接口方法",
						children: (
						<Form
							form={methodForm}
							layout="vertical"
							onFinish={handleRegisterMethod}
							className="max-w-2xl"
						>
							<Form.Item
								name="systemId"
								label="系统ID"
								rules={[{ required: true, message: "请输入系统ID" }]}
							>
								<Input placeholder="请输入系统ID" />
							</Form.Item>
							<Form.Item
								name="interfaceId"
								label="接口ID"
								rules={[{ required: true, message: "请输入接口ID" }]}
							>
								<Input placeholder="请输入接口ID" />
							</Form.Item>
							<Form.Item
								name="methodId"
								label="方法ID"
								rules={[{ required: true, message: "请输入方法ID" }]}
							>
								<Input placeholder="请输入方法ID" />
							</Form.Item>
							<Form.Item
								name="methodName"
								label="方法名称"
								rules={[{ required: true, message: "请输入方法名称" }]}
							>
								<Input placeholder="请输入方法名称" />
							</Form.Item>
							<Form.Item
								name="parameterType"
								label="参数类型"
								rules={[{ required: true, message: "请输入参数类型" }]}
							>
								<Input placeholder="例如: java.lang.String" />
							</Form.Item>
							<Form.Item
								name="uri"
								label="URI"
								rules={[{ required: true, message: "请输入URI" }]}
							>
								<Input placeholder="例如: /api/user/query" />
							</Form.Item>
							<Form.Item
								name="httpCommandType"
								label="HTTP方法"
								rules={[{ required: true, message: "请选择HTTP方法" }]}
							>
								<Select placeholder="请选择HTTP方法">
									<Select.Option value="GET">GET</Select.Option>
									<Select.Option value="POST">POST</Select.Option>
									<Select.Option value="PUT">PUT</Select.Option>
									<Select.Option value="DELETE">DELETE</Select.Option>
									<Select.Option value="PATCH">PATCH</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="auth"
								label="需要认证"
								rules={[{ required: true, message: "请选择是否需要认证" }]}
							>
								<Radio.Group>
									<Radio value={1}>是</Radio>
									<Radio value={0}>否</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item>
								<Space>
									<Button
										type="primary"
										htmlType="submit"
										icon={<SaveOutlined />}
										loading={loading}
									>
										注册
									</Button>
									<Button
										icon={<ReloadOutlined />}
										onClick={() => methodForm.resetFields()}
									>
										重置
									</Button>
								</Space>
							</Form.Item>
						</Form>
						),
					},
					{
						key: "event",
						label: "注册完成通知",
						children: (
						<Form
							form={eventForm}
							layout="vertical"
							onFinish={handleRegisterEvent}
							className="max-w-2xl"
						>
							<Form.Item
								name="systemId"
								label="系统ID"
								rules={[{ required: true, message: "请输入系统ID" }]}
							>
								<Input placeholder="请输入系统ID" />
							</Form.Item>
							<Form.Item>
								<Space>
									<Button
										type="primary"
										htmlType="submit"
										icon={<SaveOutlined />}
										loading={loading}
									>
										发送通知
									</Button>
									<Button
										icon={<ReloadOutlined />}
										onClick={() => eventForm.resetFields()}
									>
										重置
									</Button>
								</Space>
							</Form.Item>
						</Form>
						),
					},
				]} />
			</Card>
		</div>
	);
};

export default RpcRegisterManage;

