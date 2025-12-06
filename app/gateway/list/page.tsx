"use client";

import { Button, Card, Table, Tag, Space, Popconfirm, App } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import type { GatewayItem } from "@/types";

const { Title } = Typography;

const GatewayList = () => {
	const { message } = App.useApp();
	// 模拟数据
	const dataSource: GatewayItem[] = [
		{
			key: "1",
			name: "生产网关-01",
			address: "gateway-01.example.com:8080",
			status: "running",
			version: "v1.2.3",
			createTime: "2024-01-15 10:30:00",
		},
		{
			key: "2",
			name: "测试网关-01",
			address: "gateway-test.example.com:8080",
			status: "running",
			version: "v1.2.0",
			createTime: "2024-01-20 14:20:00",
		},
		{
			key: "3",
			name: "开发网关-01",
			address: "gateway-dev.example.com:8080",
			status: "stopped",
			version: "v1.1.5",
			createTime: "2024-02-01 09:15:00",
		},
		{
			key: "4",
			name: "生产网关-02",
			address: "gateway-02.example.com:8080",
			status: "pending",
			version: "v1.2.3",
			createTime: "2024-02-10 16:45:00",
		},
	];

	const columns: ColumnsType<GatewayItem> = [
		{
			title: "网关名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "地址",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (status: string) => {
				const statusConfig = {
					running: { color: "green", text: "运行中" },
					stopped: { color: "red", text: "已停止" },
					pending: { color: "orange", text: "待启动" },
				};
				const config = statusConfig[status as keyof typeof statusConfig];
				return <Tag color={config.color}>{config.text}</Tag>;
			},
		},
		{
			title: "版本",
			dataIndex: "version",
			key: "version",
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			key: "createTime",
		},
		{
			title: "操作",
			key: "action",
			render: (_) => (
				<Space size="middle">
					<Button type="link" icon={<EditOutlined />} size="small">
						编辑
					</Button>
					<Button type="link" icon={<ReloadOutlined />} size="small">
						重启
					</Button>
					<Popconfirm
						title="确定要删除这个网关吗？"
						onConfirm={() => {
							message.success("删除成功");
						}}
						okText="确定"
						cancelText="取消"
					>
						<Button type="link" danger icon={<DeleteOutlined />} size="small">
							删除
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div className="w-full h-full p-6">
			<div className="flex justify-between items-center mb-4">
				<Title level={2}>网关列表</Title>
				<Button type="primary" icon={<PlusOutlined />}>
					新增网关
				</Button>
			</div>
			<Card>
				<Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
			</Card>
		</div>
	);
};

export default GatewayList;

