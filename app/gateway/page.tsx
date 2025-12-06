"use client";

import { Card, Row, Col, Statistic, Typography, Button, Space } from "antd";
import {
	ApiOutlined,
	CheckCircleOutlined,
	SettingOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const GatewayOverview = () => {
	const router = useRouter();

	return (
		<div className="w-full h-full p-6">
			<div className="flex justify-between items-center mb-4">
				<Title level={2}>网关管理</Title>
				<Space>
					<Button icon={<PlusOutlined />} onClick={() => router.push("/gateway/data")}>
						数据管理
					</Button>
					<Button type="primary" icon={<SettingOutlined />} onClick={() => router.push("/gateway/config-manage")}>
						配置管理
					</Button>
				</Space>
			</div>

			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="网关总数"
							value={12}
							prefix={<ApiOutlined />}
							styles={{ content: { color: "#1890ff" } }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="运行中"
							value={10}
							prefix={<CheckCircleOutlined />}
							styles={{ content: { color: "#3f8600" } }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="总请求数"
							value={125680}
							suffix="次"
							styles={{ content: { color: "#722ed1" } }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="平均响应时间"
							value={125}
							suffix="ms"
							styles={{ content: { color: "#fa8c16" } }}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} lg={12}>
					<Card title="快速操作" className="h-full">
						<Space orientation="vertical" size="middle" style={{ width: "100%" }}>
							<Button block onClick={() => router.push("/gateway/data")}>
								数据管理
							</Button>
							<Button block onClick={() => router.push("/gateway/config-manage")}>
								配置管理
							</Button>
							<Button block onClick={() => router.push("/gateway/load-balancing")}>
								负载均衡
							</Button>
							<Button block onClick={() => router.push("/gateway/register")}>
								服务注册
							</Button>
						</Space>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="系统信息" className="h-full">
						<div className="space-y-2">
							<p>
								<strong>网关管理版本：</strong>v1.2.3
							</p>
							<p>
								<strong>API 版本：</strong>v2.0
							</p>
							<p>
								<strong>最后更新：</strong>2024-02-15 10:30:00
							</p>
							<p>
								<strong>系统状态：</strong>
								<span className="text-green-500 ml-2">正常运行</span>
							</p>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default GatewayOverview;

