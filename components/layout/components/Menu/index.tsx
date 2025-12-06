"use client";

import { Menu, MenuProps } from "antd";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { MENU_ITEMS_CONFIG } from "@/constants/menu";
import IconComponent from "@/components/ui/IconComponent";
import Logo from "./components/Logo";

type MenuItem = Required<MenuProps>["items"][number];

// 将菜单配置转换为 Ant Design Menu 组件需要的格式
const getMenuItems = (): MenuItem[] => {
	return MENU_ITEMS_CONFIG.map((item) => ({
		key: item.key,
		icon: item.icon ? <IconComponent name={item.icon} /> : undefined,
		label: item.label,
		children: item.children?.map((child) => ({
			key: child.key,
			icon: child.icon ? <IconComponent name={child.icon} /> : undefined,
			label: child.label,
		})),
	}));
};

// 获取菜单项
const menuItems = getMenuItems();

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

