"use client";

import { Card, Row, Col, Statistic, Typography } from "antd";
import {
	ApiOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function Home() {
	return (
		<div className="w-full h-full p-6">
			<Title level={2}>欢迎使用网关管理后台</Title>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="总网关数"
							value={12}
							prefix={<ApiOutlined />}
							valueStyle={{ color: "#3f8600" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="运行中"
							value={10}
							prefix={<CheckCircleOutlined />}
							valueStyle={{ color: "#3f8600" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="待启动"
							value={2}
							prefix={<ClockCircleOutlined />}
							valueStyle={{ color: "#faad14" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="已停止"
							value={0}
							prefix={<CloseCircleOutlined />}
							valueStyle={{ color: "#cf1322" }}
						/>
					</Card>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} lg={12}>
					<Card title="系统概览" className="h-full">
						<p>网关管理后台为您提供统一的 API 网关管理解决方案。</p>
						<ul className="mt-4 space-y-2">
							<li>• 统一的网关配置管理</li>
							<li>• 实时监控和统计</li>
							<li>• 路由规则配置</li>
							<li>• 用户权限管理</li>
						</ul>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="快速开始" className="h-full">
						<p>开始使用网关管理后台：</p>
						<ol className="mt-4 space-y-2">
							<li>1. 配置您的网关实例</li>
							<li>2. 设置路由规则</li>
							<li>3. 配置认证和授权</li>
							<li>4. 监控网关运行状态</li>
						</ol>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
