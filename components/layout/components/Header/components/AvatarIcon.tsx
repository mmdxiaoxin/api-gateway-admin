"use client";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useAuth } from "@/hooks/useAuth";

const AvatarIcon = () => {
	const { user, logout } = useAuth();

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<span className="text-[14px] no-underline tracking-[0.5px] whitespace-nowrap hover:text-blue-500 hover:transition-colors">
					个人信息
				</span>
			),
			icon: <UserOutlined />,
		},
		{
			type: "divider",
		},
		{
			key: "2",
			label: (
				<span className="text-[14px] no-underline tracking-[0.5px] whitespace-nowrap hover:text-blue-500 hover:transition-colors">
					退出登录
				</span>
			),
			icon: <LogoutOutlined />,
			onClick: logout,
		},
	];

	return (
		<>
			<span className="m-[0_20px_0_0] text-[15px] text-[rgba(0,0,0,0.85)]">
				{user?.username || "管理员"}
			</span>
			<Dropdown menu={{ items }} placement="bottom" arrow trigger={["click"]}>
				<Avatar className="cursor-pointer" size="large" icon={<UserOutlined />} />
			</Dropdown>
		</>
	);
};

export default AvatarIcon;

