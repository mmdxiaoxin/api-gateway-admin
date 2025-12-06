"use client";

import { HomeOutlined, ApiOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./components/Logo";

type MenuItem = Required<MenuProps>["items"][number];

// 菜单数据
const menuItems: MenuItem[] = [
	{
		key: "/",
		icon: <HomeOutlined />,
		label: "首页",
	},
	{
		key: "/gateway",
		icon: <ApiOutlined />,
		label: "网关管理",
		children: [
			{
				key: "/gateway/list",
				label: "网关列表",
			},
			{
				key: "/gateway/config",
				label: "网关配置",
			},
		],
	},
	{
		key: "/user",
		icon: <UserOutlined />,
		label: "用户管理",
	},
	{
		key: "/settings",
		icon: <SettingOutlined />,
		label: "系统设置",
	},
];

const LayoutMenu = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	useEffect(() => {
		setSelectedKeys([pathname]);
		// 根据当前路径设置展开的菜单
		const parentPath = menuItems.find((item) =>
			pathname.startsWith(item?.key as string)
		)?.key as string;
		if (parentPath && parentPath !== pathname) {
			setOpenKeys([parentPath]);
		}
	}, [pathname]);

	const clickMenu: MenuProps["onClick"] = ({ key }) => {
		router.push(key);
	};

	const onOpenChange = (openKeys: string[]) => {
		setOpenKeys(openKeys);
	};

	return (
		<div
			className={clsx(
				"menu",
				"flex flex-col justify-between h-full",
				"[&_.ant-menu]:flex-1",
				"[&_.ant-menu-item]:flex [&_.ant-menu-item]:items-center",
				"[&_.ant-menu-submenu-title]:flex [&_.ant-menu-submenu-title]:items-center"
			)}
		>
			<Logo />
			<Menu
				mode="inline"
				triggerSubMenuAction="click"
				openKeys={openKeys}
				selectedKeys={selectedKeys}
				items={menuItems}
				onClick={clickMenu}
				onOpenChange={onOpenChange}
				className="flex-1 overflow-y-auto"
			/>
		</div>
	);
};

export default LayoutMenu;

