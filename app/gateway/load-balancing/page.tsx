"use client";

import { useState } from "react";
import {
	Card,
	Button,
	Space,
	App,
	Form,
	Input,
	Table,
	Tag,
	Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	ReloadOutlined,
	PlusOutlined,
	DeleteOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import {
	updateNginxConfig,
	copyNginxConfig,
} from "@/lib/api/gateway";
import type { UpstreamVO, LocationVO } from "@/types/gateway";

const { Title } = Typography;
const { TextArea } = Input;

const LoadBalancingManage = () => {
	const { message } = App.useApp();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	// Nginx 配置数据
	const [upstreams, setUpstreams] = useState<UpstreamVO[]>([
		{
			name: "api01",
			loadBalance: "least_conn;",
			servers: ["192.168.1.102:9001;", "192.168.1.102:9002;"],
		},
		{
			name: "api02",
			loadBalance: "least_conn;",
			servers: ["192.168.1.102:9003;"],
		},
	]);

	const [locations, setLocations] = useState<LocationVO[]>([
		{ path: "/api01/", proxyPass: "http://api01;" },
		{ path: "/api02/", proxyPass: "http://api02;" },
	]);

	// 复制 Nginx 配置
	const handleCopyConfig = async () => {
		setLoading(true);
		try {
			await copyNginxConfig();
			message.success("复制配置成功");
		} catch (error) {
			message.error(error instanceof Error ? error.message : "复制配置失败");
		} finally {
			setLoading(false);
		}
	};

	// 更新 Nginx 配置
	const handleUpdateConfig = async () => {
		setLoading(true);
		try {
			await updateNginxConfig({
				upstreams,
				locations,
			});
			message.success("更新配置成功");
		} catch (error) {
			message.error(error instanceof Error ? error.message : "更新配置失败");
		} finally {
			setLoading(false);
		}
	};

	// 添加 Upstream
	const handleAddUpstream = () => {
		setUpstreams([
			...upstreams,
			{
				name: `api${upstreams.length + 1}`,
				loadBalance: "least_conn;",
				servers: [],
			},
		]);
	};

	// 删除 Upstream
	const handleDeleteUpstream = (index: number) => {
		setUpstreams(upstreams.filter((_, i) => i !== index));
	};

	// 添加 Location
	const handleAddLocation = () => {
		setLocations([
			...locations,
			{
				path: `/api${locations.length + 1}/`,
				proxyPass: `http://api${locations.length + 1};`,
			},
		]);
	};

	// 删除 Location
	const handleDeleteLocation = (index: number) => {
		setLocations(locations.filter((_, i) => i !== index));
	};

	// Upstream 列定义
	const upstreamColumns: ColumnsType<UpstreamVO & { index: number }> = [
		{
			title: "名称",
			dataIndex: "name",
			key: "name",
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						const newUpstreams = [...upstreams];
						newUpstreams[record.index].name = e.target.value;
						setUpstreams(newUpstreams);
					}}
				/>
			),
		},
		{
			title: "负载均衡策略",
			dataIndex: "loadBalance",
			key: "loadBalance",
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						const newUpstreams = [...upstreams];
						newUpstreams[record.index].loadBalance = e.target.value;
						setUpstreams(newUpstreams);
					}}
				/>
			),
		},
		{
			title: "服务器列表",
			dataIndex: "servers",
			key: "servers",
			render: (servers: string[], record) => (
				<TextArea
					value={servers.join("\n")}
					onChange={(e) => {
						const newUpstreams = [...upstreams];
						newUpstreams[record.index].servers = e.target.value
							.split("\n")
							.filter((s) => s.trim());
						setUpstreams(newUpstreams);
					}}
					rows={3}
					placeholder="每行一个服务器地址"
				/>
			),
		},
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Popconfirm
					title="确定要删除这个 Upstream 吗？"
					onConfirm={() => handleDeleteUpstream(record.index)}
				>
					<Button type="link" danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];

	// Location 列定义
	const locationColumns: ColumnsType<LocationVO & { index: number }> = [
		{
			title: "路径",
			dataIndex: "path",
			key: "path",
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						const newLocations = [...locations];
						newLocations[record.index].path = e.target.value;
						setLocations(newLocations);
					}}
				/>
			),
		},
		{
			title: "代理地址",
			dataIndex: "proxyPass",
			key: "proxyPass",
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						const newLocations = [...locations];
						newLocations[record.index].proxyPass = e.target.value;
						setLocations(newLocations);
					}}
				/>
			),
		},
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Popconfirm
					title="确定要删除这个 Location 吗？"
					onConfirm={() => handleDeleteLocation(record.index)}
				>
					<Button type="link" danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<div className="w-full h-full p-6">
			<Title level={2}>负载均衡管理</Title>
			<Card className="mt-4">
				<Space direction="vertical" className="w-full" size="large">
					<Space>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							onClick={handleUpdateConfig}
							loading={loading}
						>
							更新 Nginx 配置
						</Button>
						<Button
							icon={<ReloadOutlined />}
							onClick={handleCopyConfig}
							loading={loading}
						>
							复制 Nginx 配置
						</Button>
					</Space>

					<Card title="Upstream 配置" size="small">
						<Space direction="vertical" className="w-full" size="middle">
							<Button
								type="dashed"
								icon={<PlusOutlined />}
								onClick={handleAddUpstream}
								block
							>
								添加 Upstream
							</Button>
							<Table
								columns={upstreamColumns}
								dataSource={upstreams.map((item, index) => ({
									...item,
									index,
									key: index,
								}))}
								pagination={false}
							/>
						</Space>
					</Card>

					<Card title="Location 配置" size="small">
						<Space direction="vertical" className="w-full" size="middle">
							<Button
								type="dashed"
								icon={<PlusOutlined />}
								onClick={handleAddLocation}
								block
							>
								添加 Location
							</Button>
							<Table
								columns={locationColumns}
								dataSource={locations.map((item, index) => ({
									...item,
									index,
									key: index,
								}))}
								pagination={false}
							/>
						</Space>
					</Card>

					<Card title="配置预览" size="small">
						<pre className="bg-gray-50 p-4 rounded">
							{`# Upstream 配置
${upstreams
	.map(
		(upstream) => `upstream ${upstream.name} {
    ${upstream.loadBalance}
${upstream.servers.map((server) => `    server ${server}`).join("\n")}
}`,
	)
	.join("\n\n")}

# Location 配置
${locations
	.map(
		(location) => `location ${location.path} {
    rewrite ^${location.path}(.*)$ /$1 break;
    proxy_pass ${location.proxyPass}
}`,
	)
	.join("\n\n")}`}
						</pre>
					</Card>
				</Space>
			</Card>
		</div>
	);
};

export default LoadBalancingManage;

