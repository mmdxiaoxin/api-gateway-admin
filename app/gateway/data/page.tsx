"use client";

import { useState } from "react";
import {
	Card,
	Table,
	Tabs,
	Input,
	Button,
	Space,
	App,
	Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	SearchOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import {
	queryGatewayServer,
	queryGatewayServerDetail,
	queryGatewayDistribution,
	queryApplicationSystem,
	queryApplicationInterface,
	queryApplicationInterfaceMethod,
} from "@/lib/api/gateway";
import type {
	GatewayServerDataVO,
	GatewayServerDetailDatalVO,
	GatewayDistributionDataVO,
	ApplicationSystemDataVO,
	ApplicationInterfaceDataVO,
	ApplicationInterfaceMethodDataVO,
} from "@/types/gateway";

const { Title } = Typography;

const GatewayDataManage = () => {
	const { message } = App.useApp();
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("servers");

	// 网关服务数据
	const [serverData, setServerData] = useState<GatewayServerDataVO[]>([]);
	const [serverTotal, setServerTotal] = useState(0);
	const [serverPage, setServerPage] = useState(1);
	const [serverPageSize, setServerPageSize] = useState(10);
	const [serverGroupId, setServerGroupId] = useState("");

	// 网关服务详情数据
	const [detailData, setDetailData] = useState<GatewayServerDetailDatalVO[]>([]);
	const [detailTotal, setDetailTotal] = useState(0);
	const [detailPage, setDetailPage] = useState(1);
	const [detailPageSize, setDetailPageSize] = useState(10);
	const [detailGroupId, setDetailGroupId] = useState("");
	const [detailGatewayId, setDetailGatewayId] = useState("");

	// 网关分配数据
	const [distributionData, setDistributionData] = useState<GatewayDistributionDataVO[]>([]);
	const [distributionTotal, setDistributionTotal] = useState(0);
	const [distributionPage, setDistributionPage] = useState(1);
	const [distributionPageSize, setDistributionPageSize] = useState(10);
	const [distributionGroupId, setDistributionGroupId] = useState("");
	const [distributionGatewayId, setDistributionGatewayId] = useState("");

	// 应用系统数据
	const [systemData, setSystemData] = useState<ApplicationSystemDataVO[]>([]);
	const [systemTotal, setSystemTotal] = useState(0);
	const [systemPage, setSystemPage] = useState(1);
	const [systemPageSize, setSystemPageSize] = useState(10);
	const [systemId, setSystemId] = useState("");
	const [systemName, setSystemName] = useState("");

	// 应用接口数据
	const [interfaceData, setInterfaceData] = useState<ApplicationInterfaceDataVO[]>([]);
	const [interfaceTotal, setInterfaceTotal] = useState(0);
	const [interfacePage, setInterfacePage] = useState(1);
	const [interfacePageSize, setInterfacePageSize] = useState(10);
	const [interfaceSystemId, setInterfaceSystemId] = useState("");
	const [interfaceId, setInterfaceId] = useState("");

	// 应用接口方法数据
	const [methodData, setMethodData] = useState<ApplicationInterfaceMethodDataVO[]>([]);
	const [methodTotal, setMethodTotal] = useState(0);
	const [methodPage, setMethodPage] = useState(1);
	const [methodPageSize, setMethodPageSize] = useState(10);
	const [methodSystemId, setMethodSystemId] = useState("");
	const [methodInterfaceId, setMethodInterfaceId] = useState("");

	// 加载网关服务数据
	const loadServerData = async () => {
		if (!serverGroupId) {
			message.warning("请输入分组ID");
			return;
		}
		setLoading(true);
		try {
			const result = await queryGatewayServer(
				serverGroupId,
				String(serverPage),
				String(serverPageSize)
			);
			if (result.code === 0) {
				const pageData = result.data;
				const data = Array.isArray(pageData?.list) ? pageData.list : [];
				setServerData(data);
				setServerTotal(pageData?.total || 0);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载网关服务详情数据
	const loadDetailData = async () => {
		if (!detailGroupId) {
			message.warning("请输入分组ID");
			return;
		}
		setLoading(true);
		try {
			const result = await queryGatewayServerDetail(
				detailGroupId,
				String(detailPage),
				String(detailPageSize),
				detailGatewayId || undefined
			);
			if (result.code === 0) {
				const pageData = result.data;
				const data = Array.isArray(pageData?.list) ? pageData.list : [];
				setDetailData(data);
				setDetailTotal(pageData?.total || 0);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载网关分配数据
	const loadDistributionData = async () => {
		setLoading(true);
		try {
			const result = await queryGatewayDistribution(
				String(distributionPage),
				String(distributionPageSize),
				distributionGroupId || undefined,
				distributionGatewayId || undefined
			);
			if (result.code === 0) {
				const pageData = result.data;
				const data = Array.isArray(pageData?.list) ? pageData.list : [];
				setDistributionData(data);
				setDistributionTotal(pageData?.total || 0);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载应用系统数据
	const loadSystemData = async () => {
		setLoading(true);
		try {
			const result = await queryApplicationSystem(
				String(systemPage),
				String(systemPageSize),
				systemId || undefined,
				systemName || undefined
			);
			if (result.code === 0) {
				const pageData = result.data;
				const data = Array.isArray(pageData?.list) ? pageData.list : [];
				setSystemData(data);
				setSystemTotal(pageData?.total || 0);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载应用接口数据
	const loadInterfaceData = async () => {
		setLoading(true);
		try {
			const result = await queryApplicationInterface(
				String(interfacePage),
				String(interfacePageSize),
				interfaceSystemId || undefined,
				interfaceId || undefined
			);
			if (result.code === 0) {
				const pageData = result.data;
				const data = Array.isArray(pageData?.list) ? pageData.list : [];
				setInterfaceData(data);
				setInterfaceTotal(pageData?.total || 0);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 加载应用接口方法数据
	const loadMethodData = async () => {
		setLoading(true);
		try {
			const result = await queryApplicationInterfaceMethod(
				String(methodPage),
				String(methodPageSize),
				methodSystemId || undefined,
				methodInterfaceId || undefined
			);
			if (result.code === 0) {
				const pageData = result.data;
				const data = Array.isArray(pageData?.list) ? pageData.list : [];
				setMethodData(data);
				setMethodTotal(pageData?.total || 0);
			} else {
				message.error(result.msg || "查询失败");
			}
		} catch (error) {
			message.error(error instanceof Error ? error.message : "查询失败");
		} finally {
			setLoading(false);
		}
	};

	// 网关服务列定义
	const serverColumns: ColumnsType<GatewayServerDataVO> = [
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
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (status: string) => (
				<Tag color={status === "active" ? "green" : "default"}>
					{status || "未知"}
				</Tag>
			),
		},
	];

	// 网关服务详情列定义
	const detailColumns: ColumnsType<GatewayServerDetailDatalVO> = [
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
			title: "详情ID",
			dataIndex: "detailId",
			key: "detailId",
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
	const distributionColumns: ColumnsType<GatewayDistributionDataVO> = [
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
			title: "分配ID",
			dataIndex: "distributionId",
			key: "distributionId",
		},
	];

	// 应用系统列定义
	const systemColumns: ColumnsType<ApplicationSystemDataVO> = [
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
	const interfaceColumns: ColumnsType<ApplicationInterfaceDataVO> = [
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
	const methodColumns: ColumnsType<ApplicationInterfaceMethodDataVO> = [
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
			<Title level={2}>网关数据管理</Title>
			<Card className="mt-4">
				<Tabs activeKey={activeTab} onChange={setActiveTab} items={[
					{
						key: "servers",
						label: "网关服务",
						children: (
						<Space orientation="vertical" className="w-full" size="middle">
							<Space>
								<Input
									placeholder="请输入分组ID"
									value={serverGroupId}
									onChange={(e) => setServerGroupId(e.target.value)}
									style={{ width: 200 }}
								/>
								<Button
									type="primary"
									icon={<SearchOutlined />}
									onClick={loadServerData}
									loading={loading}
								>
									查询
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={loadServerData}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Table
								columns={serverColumns}
								dataSource={serverData}
								loading={loading}
								rowKey="gatewayId"
								pagination={{
									current: serverPage,
									pageSize: serverPageSize,
									total: serverTotal,
									onChange: (page, pageSize) => {
										setServerPage(page);
										setServerPageSize(pageSize);
									},
								}}
							/>
						</Space>
						),
					},
					{
						key: "details",
						label: "网关服务详情",
						children: (
						<Space orientation="vertical" className="w-full" size="middle">
							<Space>
								<Input
									placeholder="分组ID"
									value={detailGroupId}
									onChange={(e) => setDetailGroupId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Input
									placeholder="网关ID（可选）"
									value={detailGatewayId}
									onChange={(e) => setDetailGatewayId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Button
									type="primary"
									icon={<SearchOutlined />}
									onClick={loadDetailData}
									loading={loading}
								>
									查询
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={loadDetailData}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Table
								columns={detailColumns}
								dataSource={detailData}
								loading={loading}
								rowKey="detailId"
								pagination={{
									current: detailPage,
									pageSize: detailPageSize,
									total: detailTotal,
									onChange: (page, pageSize) => {
										setDetailPage(page);
										setDetailPageSize(pageSize);
									},
								}}
							/>
						</Space>
						),
					},
					{
						key: "distributions",
						label: "网关分配",
						children: (
						<Space orientation="vertical" className="w-full" size="middle">
							<Space>
								<Input
									placeholder="分组ID（可选）"
									value={distributionGroupId}
									onChange={(e) => setDistributionGroupId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Input
									placeholder="网关ID（可选）"
									value={distributionGatewayId}
									onChange={(e) => setDistributionGatewayId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Button
									type="primary"
									icon={<SearchOutlined />}
									onClick={loadDistributionData}
									loading={loading}
								>
									查询
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={loadDistributionData}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Table
								columns={distributionColumns}
								dataSource={distributionData}
								loading={loading}
								rowKey="distributionId"
								pagination={{
									current: distributionPage,
									pageSize: distributionPageSize,
									total: distributionTotal,
									onChange: (page, pageSize) => {
										setDistributionPage(page);
										setDistributionPageSize(pageSize);
									},
								}}
							/>
						</Space>
						),
					},
					{
						key: "systems",
						label: "应用系统",
						children: (
						<Space orientation="vertical" className="w-full" size="middle">
							<Space>
								<Input
									placeholder="系统ID（可选）"
									value={systemId}
									onChange={(e) => setSystemId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Input
									placeholder="系统名称（可选）"
									value={systemName}
									onChange={(e) => setSystemName(e.target.value)}
									style={{ width: 150 }}
								/>
								<Button
									type="primary"
									icon={<SearchOutlined />}
									onClick={loadSystemData}
									loading={loading}
								>
									查询
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={loadSystemData}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Table
								columns={systemColumns}
								dataSource={systemData}
								loading={loading}
								rowKey="systemId"
								pagination={{
									current: systemPage,
									pageSize: systemPageSize,
									total: systemTotal,
									onChange: (page, pageSize) => {
										setSystemPage(page);
										setSystemPageSize(pageSize);
									},
								}}
							/>
						</Space>
						),
					},
					{
						key: "interfaces",
						label: "应用接口",
						children: (
						<Space orientation="vertical" className="w-full" size="middle">
							<Space>
								<Input
									placeholder="系统ID（可选）"
									value={interfaceSystemId}
									onChange={(e) => setInterfaceSystemId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Input
									placeholder="接口ID（可选）"
									value={interfaceId}
									onChange={(e) => setInterfaceId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Button
									type="primary"
									icon={<SearchOutlined />}
									onClick={loadInterfaceData}
									loading={loading}
								>
									查询
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={loadInterfaceData}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Table
								columns={interfaceColumns}
								dataSource={interfaceData}
								loading={loading}
								rowKey="interfaceId"
								pagination={{
									current: interfacePage,
									pageSize: interfacePageSize,
									total: interfaceTotal,
									onChange: (page, pageSize) => {
										setInterfacePage(page);
										setInterfacePageSize(pageSize);
									},
								}}
							/>
						</Space>
						),
					},
					{
						key: "methods",
						label: "接口方法",
						children: (
						<Space orientation="vertical" className="w-full" size="middle">
							<Space>
								<Input
									placeholder="系统ID（可选）"
									value={methodSystemId}
									onChange={(e) => setMethodSystemId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Input
									placeholder="接口ID（可选）"
									value={methodInterfaceId}
									onChange={(e) => setMethodInterfaceId(e.target.value)}
									style={{ width: 150 }}
								/>
								<Button
									type="primary"
									icon={<SearchOutlined />}
									onClick={loadMethodData}
									loading={loading}
								>
									查询
								</Button>
								<Button
									icon={<ReloadOutlined />}
									onClick={loadMethodData}
									loading={loading}
								>
									刷新
								</Button>
							</Space>
							<Table
								columns={methodColumns}
								dataSource={methodData}
								loading={loading}
								rowKey="methodId"
								pagination={{
									current: methodPage,
									pageSize: methodPageSize,
									total: methodTotal,
									onChange: (page, pageSize) => {
										setMethodPage(page);
										setMethodPageSize(pageSize);
									},
								}}
							/>
						</Space>
						),
					},
				]} />
			</Card>
		</div>
	);
};

export default GatewayDataManage;

