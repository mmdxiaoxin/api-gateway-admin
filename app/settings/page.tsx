"use client";

import { Card, Form, Switch, Input, Button, Select, message, Space } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

interface FormValues {
	systemName?: string;
	language?: string;
	timezone?: string;
	enableNotification?: boolean;
	enableEmail?: boolean;
	sessionTimeout?: number;
	passwordMinLength?: number;
	enableTwoFactor?: boolean;
	enableIpWhitelist?: boolean;
	logLevel?: string;
	logRetentionDays?: number;
	enableAccessLog?: boolean;
	enableErrorLog?: boolean;
}

const SystemSettings = () => {
	const [form] = Form.useForm();

	const onFinish = (values: FormValues) => {
		console.log("设置保存:", values);
		message.success("设置保存成功");
	};

	const onReset = () => {
		form.resetFields();
		message.info("已重置设置");
	};

	return (
		<div className="w-full h-full p-6">
			<Title level={2}>系统设置</Title>
			<div className="mt-4 space-y-4">
				<Card title="基础设置">
					<Form
						form={form}
						layout="vertical"
						onFinish={onFinish}
						initialValues={{
							systemName: "网关管理后台",
							language: "zh-CN",
							timezone: "Asia/Shanghai",
							enableNotification: true,
							enableEmail: false,
						}}
					>
						<Form.Item label="系统名称" name="systemName">
							<Input placeholder="请输入系统名称" />
						</Form.Item>

						<Form.Item label="默认语言" name="language">
							<Select>
								<Select.Option value="zh-CN">简体中文</Select.Option>
								<Select.Option value="en-US">English</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="时区" name="timezone">
							<Select>
								<Select.Option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</Select.Option>
								<Select.Option value="UTC">UTC (UTC+0)</Select.Option>
								<Select.Option value="America/New_York">America/New_York (UTC-5)</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="启用通知" name="enableNotification" valuePropName="checked">
							<Switch />
						</Form.Item>

						<Form.Item label="启用邮件通知" name="enableEmail" valuePropName="checked">
							<Switch />
						</Form.Item>
					</Form>
				</Card>

				<Card title="安全设置">
					<Form
						form={form}
						layout="vertical"
						initialValues={{
							sessionTimeout: 3600,
							passwordMinLength: 8,
							enableTwoFactor: false,
							enableIpWhitelist: false,
						}}
					>
						<Form.Item label="会话超时时间(秒)" name="sessionTimeout">
							<Input type="number" min={300} max={86400} placeholder="3600" />
						</Form.Item>

						<Form.Item label="密码最小长度" name="passwordMinLength">
							<Input type="number" min={6} max={32} placeholder="8" />
						</Form.Item>

						<Form.Item label="启用双因素认证" name="enableTwoFactor" valuePropName="checked">
							<Switch />
						</Form.Item>

						<Form.Item label="启用 IP 白名单" name="enableIpWhitelist" valuePropName="checked">
							<Switch />
						</Form.Item>
					</Form>
				</Card>

				<Card title="日志设置">
					<Form
						form={form}
						layout="vertical"
						initialValues={{
							logLevel: "info",
							logRetentionDays: 30,
							enableAccessLog: true,
							enableErrorLog: true,
						}}
					>
						<Form.Item label="日志级别" name="logLevel">
							<Select>
								<Select.Option value="debug">Debug</Select.Option>
								<Select.Option value="info">Info</Select.Option>
								<Select.Option value="warn">Warning</Select.Option>
								<Select.Option value="error">Error</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="日志保留天数" name="logRetentionDays">
							<Input type="number" min={1} max={365} placeholder="30" />
						</Form.Item>

						<Form.Item label="启用访问日志" name="enableAccessLog" valuePropName="checked">
							<Switch />
						</Form.Item>

						<Form.Item label="启用错误日志" name="enableErrorLog" valuePropName="checked">
							<Switch />
						</Form.Item>
					</Form>
				</Card>

				<Card>
					<Space>
						<Button type="primary" htmlType="submit" icon={<SaveOutlined />} onClick={() => form.submit()}>
							保存设置
						</Button>
						<Button icon={<ReloadOutlined />} onClick={onReset}>
							重置
						</Button>
					</Space>
				</Card>
			</div>
		</div>
	);
};

export default SystemSettings;

