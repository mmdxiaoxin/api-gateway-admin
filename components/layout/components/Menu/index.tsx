"use client";

import { Menu, MenuProps } from "antd";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { MENU_TITLE_MAP, MENU_ICON_MAP, MENU_CONFIG } from "@/constants/menu";
import IconComponent from "@/components/ui/IconComponent";
import Logo from "./components/Logo";

type MenuItem = Required<MenuProps>["items"][number];

// 菜单数据配置（使用文本配置图标）
const menuConfig = [
	{
		key: MENU_CONFIG.HOME,
		icon: MENU_ICON_MAP[MENU_CONFIG.HOME],
		label: MENU_TITLE_MAP[MENU_CONFIG.HOME],
	},
	{
		key: MENU_CONFIG.GATEWAY,
		icon: MENU_ICON_MAP[MENU_CONFIG.GATEWAY],
		label: MENU_TITLE_MAP[MENU_CONFIG.GATEWAY],
		children: [
			{
				key: MENU_CONFIG.GATEWAY_LIST,
				label: MENU_TITLE_MAP[MENU_CONFIG.GATEWAY_LIST],
			},
			{
				key: MENU_CONFIG.GATEWAY_CONFIG,
				label: MENU_TITLE_MAP[MENU_CONFIG.GATEWAY_CONFIG],
			},
		],
	},
	{
		key: MENU_CONFIG.USER,
		icon: MENU_ICON_MAP[MENU_CONFIG.USER],
		label: MENU_TITLE_MAP[MENU_CONFIG.USER],
	},
	{
		key: MENU_CONFIG.SETTINGS,
		icon: MENU_ICON_MAP[MENU_CONFIG.SETTINGS],
		label: MENU_TITLE_MAP[MENU_CONFIG.SETTINGS],
	},
];

// 将配置转换为 Menu 组件需要的格式
const menuItems: MenuItem[] = menuConfig.map((item) => ({
	key: item.key,
	icon: item.icon ? <IconComponent name={item.icon} /> : undefined,
	label: item.label,
	children: item.children?.map((child) => ({
		key: child.key,
		label: child.label,
	})),
}));

const LayoutMenu = () => {
	const pathname = usePathname();
	const router = useRouter();
	
	// 使用 useMemo 计算 selectedKeys，避免在 useEffect 中设置状态
	const selectedKeys = useMemo(() => [pathname], [pathname]);
	
	// 计算应该打开的父菜单 keys（根据当前路径）
	const getOpenKeysByPath = (currentPath: string): string[] => {
		// 特殊处理首页
		if (currentPath === "/") {
			return [];
		}
		
		// 查找匹配的父菜单
		for (const item of menuItems) {
			if (!item?.key) continue;
			
			const itemKey = item.key as string;
			
			// 精确匹配或子路径匹配（排除首页）
			if (itemKey !== "/" && currentPath.startsWith(itemKey + "/")) {
				return [itemKey];
			}
			
			// 检查是否是子菜单项（使用类型守卫）
			if ("children" in item && item.children) {
				const matchedChild = item.children.find(
					(child) => child && "key" in child && child.key === currentPath
				);
				if (matchedChild) {
					return [itemKey];
				}
			}
		}
		
		return [];
	};
	
	// 使用 useMemo 计算期望的 openKeys，避免在 useEffect 中设置状态
	const expectedOpenKeys = useMemo(() => getOpenKeysByPath(pathname), [pathname]);
	
	const [openKeys, setOpenKeys] = useState<string[]>(expectedOpenKeys);
	
	// 当 pathname 变化时，同步更新 openKeys（仅在期望值变化时更新）
	useEffect(() => {
		setOpenKeys(expectedOpenKeys);
	}, [expectedOpenKeys]);

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

