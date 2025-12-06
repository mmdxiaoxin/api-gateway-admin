"use client";

import { useState, useEffect } from "react";
import {
	Card,
	Table,
	Tabs,
	Button,
	Space,
	App,
	Tag,
	Modal,
	Form,
	Input,
	Select,
	message as antdMessage,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	PlusOutlined,
	ReloadOutlined,
	LinkOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import {
	queryServerConfig,
	queryServerDetailConfig,
	queryGatewayDistributionList,
	registerGatewayServerNode,
	distributionGatewayServerNode,
	queryApplicationSystemList,
	queryApplicationInterfaceList,
	queryApplicationInterfaceMethodList,
	queryApplicationSystemRichInfo,
	queryRedisConfig,
} from "@/lib/api/gateway";
import type {
	GatewayServerVO,
	GatewayServerDetailVO,
	GatewayDistributionVO,
	ApplicationSystemVO,
	ApplicationInterfaceVO,
	ApplicationInterfaceMethodVO,
	ApplicationSystemRichInfo,
} from "@/types/gateway";

const { Title } = Typography;

const GatewayConfigManage = () => {
	const { message } = App.useApp();
	const [form] = Form.useForm();
	const [distributionForm] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("servers");

	// 网关服务配置
	const [serverList, setServerList] = useState<GatewayServerVO[]>([]);
	const [serverModalVisible, setServerModalVisible] = useState(false);

	// 网关算力节点配置
	const [detailList, setDetailList] = useState<GatewayServerDetailVO[]>([]);

	// 网关分配配置
	const [distributionList, setDistributionList] = useState<GatewayDistributionVO[]>([]);
	const [distributionModalVisible, setDistributionModalVisible] = useState(false);

	// 应用系统配置
	const [systemList, setSystemList] = useState<ApplicationSystemVO[]>([]);

	// 应用接口配置
	const [interfaceList, setInterfaceList] = useState<ApplicationInterfaceVO[]>([]);

	// 应用接口方法配置
	const [methodList, setMethodList] = useState<ApplicationInterfaceMethodVO[]>([]);

	// 系统富信息
	const [richInfo, setRichInfo] = useState<ApplicationSystemRichInfo | null>(null);
	const [richInfoModalVisible, setRichInfoModalVisible] = useState(false);

	// Redis 配置
	const [redisConfig, setRedisConfig] = useState<Record<string, string>>({});

	// 加载网关服务配置
	const loadServerConfig = async () => {
		setLoading(true);
		try {
			const result = await queryServerConfig();
			if (result.code === 200) {
				setServerList(result.data || []);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载网关算力节点配置
	const loadDetailConfig = async () => {
		setLoading(true);
		try {
			const result = await queryServerDetailConfig();
			if (result.code === 200) {
				setDetailList(result.data || []);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载网关分配配置
	const loadDistributionConfig = async () => {
		setLoading(true);
		try {
			const result = await queryGatewayDistributionList();
			if (result.code === 200) {
				setDistributionList(result.data || []);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载应用系统配置
	const loadSystemConfig = async () => {
		setLoading(true);
		try {
			const result = await queryApplicationSystemList();
			if (result.code === 200) {
				setSystemList(result.data || []);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载应用接口配置
	const loadInterfaceConfig = async () => {
		setLoading(true);
		try {
			const result = await queryApplicationInterfaceList();
			if (result.code === 200) {
				setInterfaceList(result.data || []);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载应用接口方法配置
	const loadMethodConfig = async () => {
		setLoading(true);
		try {
			const result = await queryApplicationInterfaceMethodList();
			if (result.code === 200) {
				setMethodList(result.data || []);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载系统富信息
	const loadRichInfo = async (gatewayId: string, systemId: string) => {
		setLoading(true);
		try {
			const result = await queryApplicationSystemRichInfo(gatewayId, systemId);
			if (result.code === 200) {
				setRichInfo(result.data);
				setRichInfoModalVisible(true);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载 Redis 配置
	const loadRedisConfig = async () => {
		setLoading(true);
		try {
			const result = await queryRedisConfig();
			if (result.code === 200) {
				setRedisConfig(result.data || {});
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 注册网关服务节点
	const handleRegisterServer = async (values: {
		groupId: string;
		gatewayId: string;
		gatewayName: string;
		gatewayAddress: string;
	}) => {
		setLoading(true);
		try {
			const result = await registerGatewayServerNode(
				values.groupId,
				values.gatewayId,
				values.gatewayName,
				values.gatewayAddress
			);
			if (result.code === 200) {
				message.success("注册成功");
				setServerModalVisible(false);
				form.resetFields();
				loadServerConfig();
				loadDetailConfig();
			} else {
				message.error(result.msg || "注册失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "注册失败");
		} finally {
			setLoading(false);
		}
	};

	// 网关算力与系统挂载
	const handleDistribution = async (values: {
		groupId: string;
		gatewayId: string;
		systemId: string;
	}) => {
		setLoading(true);
		try {
			const result = await distributionGatewayServerNode(
				values.groupId,
				values.gatewayId,
				values.systemId
			);
			if (result.code === 200 || result.code === 1001) {
				message.success(result.msg || "配置成功");
				setDistributionModalVisible(false);
				distributionForm.resetFields();
				loadDistributionConfig();
			} else {
				message.error(result.msg || "配置失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "配置失败");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (activeTab === "servers") {
			loadServerConfig();
			loadDetailConfig();
		} else if (activeTab === "distributions") {
			loadDistributionConfig();
			loadSystemConfig();
		} else if (activeTab === "systems") {
			loadSystemConfig();
		} else if (activeTab === "interfaces") {
			loadInterfaceConfig();
		} else if (activeTab === "methods") {
			loadMethodConfig();
		} else if (activeTab === "redis") {
			loadRedisConfig();
		}
	}, [activeTab]);

	// 网关服务列定义
	const serverColumns: ColumnsType<GatewayServerVO> = [
		{
			title: "分组ID",
			dataIndex: "groupId",
			key: "groupId",
		},
		{
			title: "网关ID",
			dataIndex: "gatewayId",
			key: "gatewayId",
		},
		{
			title: "网关名称",
			dataIndex: "gatewayName",
			key: "gatewayName",
		},
		{
			title: "网关地址",
			dataIndex: "gatewayAddress",
			key: "gatewayAddress",
		},
	];

	// 网关算力节点列定义
	const detailColumns: ColumnsType<GatewayServerDetailVO> = [
		{
			title: "分组ID",
			dataIndex: "groupId",
			key: "groupId",
		},
		{
			title: "网关ID",
			dataIndex: "gatewayId",
			key: "gatewayId",
		},
		{
			title: "网关名称",
			dataIndex: "gatewayName",
			key: "gatewayName",
		},
		{
			title: "网关地址",
			dataIndex: "gatewayAddress",
			key: "gatewayAddress",
		},
	];

	// 网关分配列定义
	const distributionColumns: ColumnsType<GatewayDistributionVO> = [
		{
			title: "分组ID",
			dataIndex: "groupId",
			key: "groupId",
		},
		{
			title: "网关ID",
			dataIndex: "gatewayId",
			key: "gatewayId",
		},
		{
			title: "系统ID",
			dataIndex: "systemId",
			key: "systemId",
		},
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Button
					type="link"
					icon={<LinkOutlined />}
					onClick={() => loadRichInfo(record.gatewayId, record.systemId)}
				>
					查看详情
				</Button>
			),
		},
	];

	// 应用系统列定义
	const systemColumns: ColumnsType<ApplicationSystemVO> = [
		{
			title: "系统ID",
			dataIndex: "systemId",
			key: "systemId",
		},
		{
			title: "系统名称",
			dataIndex: "systemName",
			key: "systemName",
		},
		{
			title: "系统类型",
			dataIndex: "systemType",
			key: "systemType",
		},
		{
			title: "注册中心",
			dataIndex: "systemRegistry",
			key: "systemRegistry",
		},
	];

	// 应用接口列定义
	const interfaceColumns: ColumnsType<ApplicationInterfaceVO> = [
		{
			title: "系统ID",
			dataIndex: "systemId",
			key: "systemId",
		},
		{
			title: "接口ID",
			dataIndex: "interfaceId",
			key: "interfaceId",
		},
		{
			title: "接口名称",
			dataIndex: "interfaceName",
			key: "interfaceName",
		},
		{
			title: "接口版本",
			dataIndex: "interfaceVersion",
			key: "interfaceVersion",
		},
	];

	// 应用接口方法列定义
	const methodColumns: ColumnsType<ApplicationInterfaceMethodVO> = [
		{
			title: "系统ID",
			dataIndex: "systemId",
			key: "systemId",
		},
		{
			title: "接口ID",
			dataIndex: "interfaceId",
			key: "interfaceId",
		},
		{
			title: "方法ID",
			dataIndex: "methodId",
			key: "methodId",
		},
		{
			title: "方法名称",
			dataIndex: "methodName",
			key: "methodName",
		},
		{
			title: "URI",
			dataIndex: "uri",
			key: "uri",
		},
		{
			title: "HTTP方法",
			dataIndex: "httpCommandType",
			key: "httpCommandType",
			render: (type: string) => <Tag color="blue">{type}</Tag>,
		},
		{
			title: "需要认证",
			dataIndex: "auth",
			key: "auth",
			render: (auth: number) => (
				<Tag color={auth === 1 ? "red" : "green"}>
					{auth === 1 ? "是" : "否"}
				</Tag>
			),
		},
	];

	return (
		<div className="w-full h-full p-6">
			<Title level={2}>网关配置管理</Title>
			<Card className="mt-4">
				<Tabs activeKey={activeTab} onChange={setActiveTab} items={[
					{
						key: "servers",
						label: "网关服务配置",
						children: (
						<Space direction="vertical" className="w-full" size="middle">
							<Space>
								<Button
									type="primary"
									icon={<PlusOutlined />}
									onClick={() => setServerModalVisible(true)}
								>
									注册网关服务节点
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={() => {
										loadServerConfig();
										loadDetailConfig();
									}}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Title level={4}>网关服务列表</Title>
							<Table
								columns={serverColumns}
								dataSource={serverList}
								loading={loading}
								rowKey="gatewayId"
							/>
							<Title level={4}>网关算力节点列表</Title>
							<Table
								columns={detailColumns}
								dataSource={detailList}
								loading={loading}
								rowKey={(record) => `${record.gatewayId}-${record.detailId || ""}`}
							/>
						</Space>
						),
					},
					{
						key: "distributions",
						label: "网关分配配置",
						children: (
						<Space direction="vertical" className="w-full" size="middle">
							<Space>
								<Button
									type="primary"
									icon={<PlusOutlined />}
									onClick={() => setDistributionModalVisible(true)}
								>
									网关算力与系统挂载
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={loadDistributionConfig}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Table
								columns={distributionColumns}
								dataSource={distributionList}
								loading={loading}
								rowKey="distributionId"
							/>
						</Space>
						),
					},
					{
						key: "systems",
						label: "应用系统配置",
						children: (
						<Space direction="vertical" className="w-full" size="middle">
							<Button
								icon={<ReloadOutlined />}
								onClick={loadSystemConfig}
								loading={loading}
							>
								刷新
							</Button>
							<Table
								columns={systemColumns}
								dataSource={systemList}
								loading={loading}
								rowKey="systemId"
							/>
						</Space>
						),
					},
					{
						key: "interfaces",
						label: "应用接口配置",
						children: (
						<Space direction="vertical" className="w-full" size="middle">
							<Button
								icon={<ReloadOutlined />}
								onClick={loadInterfaceConfig}
								loading={loading}
							>
								刷新
							</Button>
							<Table
								columns={interfaceColumns}
								dataSource={interfaceList}
								loading={loading}
								rowKey="interfaceId"
							/>
						</Space>
						),
					},
					{
						key: "methods",
						label: "接口方法配置",
						children: (
						<Space direction="vertical" className="w-full" size="middle">
							<Button
								icon={<ReloadOutlined />}
								onClick={loadMethodConfig}
								loading={loading}
							>
								刷新
							</Button>
							<Table
								columns={methodColumns}
								dataSource={methodList}
								loading={loading}
								rowKey="methodId"
							/>
						</Space>
						),
					},
					{
						key: "redis",
						label: "Redis配置",
						children: (
						<Space direction="vertical" className="w-full" size="middle">
							<Button
								icon={<ReloadOutlined />}
								onClick={loadRedisConfig}
								loading={loading}
							>
								刷新
							</Button>
							<Card>
								<pre>{JSON.stringify(redisConfig, null, 2)}</pre>
							</Card>
						</Space>
						),
					},
				]} />
			</Card>

			{/* 注册网关服务节点弹窗 */}
			<Modal
				title="注册网关服务节点"
				open={serverModalVisible}
				onCancel={() => {
					setServerModalVisible(false);
					form.resetFields();
				}}
				footer={null}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleRegisterServer}
				>
					<Form.Item
						name="groupId"
						label="分组ID"
						rules={[{ required: true, message: "请输入分组ID" }]}
					>
						<Input placeholder="请输入分组ID" />
					</Form.Item>
					<Form.Item
						name="gatewayId"
						label="网关ID"
						rules={[{ required: true, message: "请输入网关ID" }]}
					>
						<Input placeholder="请输入网关ID" />
					</Form.Item>
					<Form.Item
						name="gatewayName"
						label="网关名称"
						rules={[{ required: true, message: "请输入网关名称" }]}
					>
						<Input placeholder="请输入网关名称" />
					</Form.Item>
					<Form.Item
						name="gatewayAddress"
						label="网关地址"
						rules={[{ required: true, message: "请输入网关地址" }]}
					>
						<Input placeholder="例如: 192.168.1.100:8080" />
					</Form.Item>
					<Form.Item>
						<Space>
							<Button type="primary" htmlType="submit" loading={loading}>
								提交
							</Button>
							<Button onClick={() => form.resetFields()}>重置</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>

			{/* 网关算力与系统挂载弹窗 */}
			<Modal
				title="网关算力与系统挂载"
				open={distributionModalVisible}
				onCancel={() => {
					setDistributionModalVisible(false);
					distributionForm.resetFields();
				}}
				footer={null}
			>
				<Form
					form={distributionForm}
					layout="vertical"
					onFinish={handleDistribution}
				>
					<Form.Item
						name="groupId"
						label="分组ID"
						rules={[{ required: true, message: "请输入分组ID" }]}
					>
						<Input placeholder="请输入分组ID" />
					</Form.Item>
					<Form.Item
						name="gatewayId"
						label="网关ID"
						rules={[{ required: true, message: "请输入网关ID" }]}
					>
						<Input placeholder="请输入网关ID" />
					</Form.Item>
					<Form.Item
						name="systemId"
						label="系统ID"
						rules={[{ required: true, message: "请输入系统ID" }]}
					>
						<Input placeholder="请输入系统ID" />
					</Form.Item>
					<Form.Item>
						<Space>
							<Button type="primary" htmlType="submit" loading={loading}>
								提交
							</Button>
							<Button onClick={() => distributionForm.resetFields()}>重置</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>

			{/* 系统富信息弹窗 */}
			<Modal
				title="系统详细信息"
				open={richInfoModalVisible}
				onCancel={() => {
					setRichInfoModalVisible(false);
					setRichInfo(null);
				}}
				footer={null}
				width={800}
			>
				{richInfo && (
					<Space direction="vertical" className="w-full" size="large">
						<Card title="系统信息" size="small">
							<p><strong>系统ID:</strong> {richInfo.system.systemId}</p>
							<p><strong>系统名称:</strong> {richInfo.system.systemName}</p>
							<p><strong>系统类型:</strong> {richInfo.system.systemType}</p>
							<p><strong>注册中心:</strong> {richInfo.system.systemRegistry}</p>
						</Card>
						<Card title="接口列表" size="small">
							<Table
								columns={interfaceColumns}
								dataSource={richInfo.interfaces}
								rowKey="interfaceId"
								pagination={false}
								size="small"
							/>
						</Card>
						<Card title="方法列表" size="small">
							<Table
								columns={methodColumns}
								dataSource={richInfo.methods}
								rowKey="methodId"
								pagination={false}
								size="small"
							/>
						</Card>
					</Space>
				)}
			</Modal>
		</div>
	);
};

export default GatewayConfigManage;

