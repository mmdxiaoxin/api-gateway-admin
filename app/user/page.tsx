"use client";

import { Button, Card, Table, Tag, Space, Popconfirm, Input, App } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useState } from "react";
import type { UserListItem } from "@/types";

const { Title } = Typography;

const UserManagement = () => {
	const { message } = App.useApp();
	const [searchText, setSearchText] = useState("");

	// 模拟数据
	const dataSource: UserListItem[] = [
		{
			key: "1",
			username: "admin",
			email: "admin@example.com",
			role: "admin",
			status: "active",
			createTime: "2024-01-10 09:00:00",
		},
		{
			key: "2",
			username: "zhangsan",
			email: "zhangsan@example.com",
			role: "user",
			status: "active",
			createTime: "2024-01-15 14:30:00",
		},
		{
			key: "3",
			username: "lisi",
			email: "lisi@example.com",
			role: "user",
			status: "inactive",
			createTime: "2024-01-20 10:15:00",
		},
		{
			key: "4",
			username: "wangwu",
			email: "wangwu@example.com",
			role: "guest",
			status: "active",
			createTime: "2024-02-01 16:45:00",
		},
	];

	const columns: ColumnsType<UserListItem> = [
		{
			title: "用户名",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "邮箱",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "角色",
			dataIndex: "role",
			key: "role",
			render: (role: string) => {
				const roleConfig = {
					admin: { color: "red", text: "管理员" },
					user: { color: "blue", text: "普通用户" },
					guest: { color: "default", text: "访客" },
				};
				const config = roleConfig[role as keyof typeof roleConfig];
				return <Tag color={config.color}>{config.text}</Tag>;
			},
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (status: string) => {
				return status === "active" ? (
					<Tag color="green">启用</Tag>
				) : (
					<Tag color="default">禁用</Tag>
				);
			},
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
					<Popconfirm
						title="确定要删除这个用户吗？"
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
				<Title level={2}>用户管理</Title>
				<Button type="primary" icon={<PlusOutlined />}>
					新增用户
				</Button>
			</div>
			<Card>
				<div className="mb-4">
					<Input
						placeholder="搜索用户名或邮箱"
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 300 }}
						allowClear
					/>
				</div>
				<Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
			</Card>
		</div>
	);
};

export default UserManagement;

