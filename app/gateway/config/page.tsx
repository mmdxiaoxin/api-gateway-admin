"use client";

import { Card, Form, Input, Button, Switch, Select, InputNumber, Space, App } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const GatewayConfig = () => {
	const { message } = App.useApp();
	const [form] = Form.useForm();

	const onFinish = (values: unknown) => {
		console.log("配置保存:", values);
		message.success("配置保存成功");
	};

	const onReset = () => {
		form.resetFields();
		message.info("已重置配置");
	};

	return (
		<div className="w-full h-full p-6">
			<Title level={2}>网关配置</Title>
			<Card className="mt-4">
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					initialValues={{
						name: "生产网关-01",
						address: "gateway-01.example.com",
						port: 8080,
						timeout: 30000,
						maxConnections: 1000,
						enableLogging: true,
						enableMetrics: true,
						loadBalance: "round-robin",
						description: "生产环境主网关",
					}}
				>
					<Form.Item label="网关名称" name="name" rules={[{ required: true, message: "请输入网关名称" }]}>
						<Input placeholder="请输入网关名称" />
					</Form.Item>

					<Form.Item label="网关地址" name="address" rules={[{ required: true, message: "请输入网关地址" }]}>
						<Input placeholder="gateway.example.com" />
					</Form.Item>

					<Form.Item label="端口号" name="port" rules={[{ required: true, message: "请输入端口号" }]}>
						<InputNumber min={1} max={65535} style={{ width: "100%" }} placeholder="8080" />
					</Form.Item>

					<Form.Item label="请求超时时间(ms)" name="timeout">
						<InputNumber min={1000} max={300000} style={{ width: "100%" }} placeholder="30000" />
					</Form.Item>

					<Form.Item label="最大连接数" name="maxConnections">
						<InputNumber min={1} max={10000} style={{ width: "100%" }} placeholder="1000" />
					</Form.Item>

					<Form.Item label="负载均衡策略" name="loadBalance">
						<Select>
							<Select.Option value="round-robin">轮询 (Round Robin)</Select.Option>
							<Select.Option value="least-connections">最少连接 (Least Connections)</Select.Option>
							<Select.Option value="ip-hash">IP 哈希 (IP Hash)</Select.Option>
							<Select.Option value="weighted">加权轮询 (Weighted Round Robin)</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item label="启用日志" name="enableLogging" valuePropName="checked">
						<Switch />
					</Form.Item>

					<Form.Item label="启用监控指标" name="enableMetrics" valuePropName="checked">
						<Switch />
					</Form.Item>

					<Form.Item label="描述" name="description">
						<TextArea rows={4} placeholder="请输入网关描述信息" />
					</Form.Item>

					<Form.Item>
						<Space>
							<Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
								保存配置
							</Button>
							<Button icon={<ReloadOutlined />} onClick={onReset}>
								重置
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default GatewayConfig;

