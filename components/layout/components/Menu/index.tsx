"use client";

import { Menu, MenuProps, Spin } from "antd";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect, useCallback } from "react";
import type { MenuItemConfig } from "@/constants/menu";
import { getMenuData } from "@/lib/api/menu";
import IconComponent from "@/components/ui/IconComponent";
import Logo from "./components/Logo";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);
	
	// 将菜单配置转换为 Ant Design Menu 组件需要的格式
	const convertMenuItems = useCallback((menuConfig: MenuItemConfig[]): MenuItem[] => {
		return menuConfig.map((item) => {
			// 如果有子菜单，使用自定义 label 使标题可点击跳转
			const label = item.children ? (
				<span
					onClick={(e) => {
						e.stopPropagation();
						router.push(item.key);
					}}
					style={{ cursor: "pointer", flex: 1 }}
				>
					{item.label}
				</span>
			) : (
				item.label
			);

			return {
				key: item.key,
				icon: item.icon ? <IconComponent name={item.icon} /> : undefined,
				label,
				children: item.children?.map((child) => ({
					key: child.key,
					icon: child.icon ? <IconComponent name={child.icon} /> : undefined,
					label: child.label,
				})),
			};
		});
	}, [router]);
	
	// 从后端获取菜单数据
	useEffect(() => {
		const fetchMenuData = async () => {
			try {
				setLoading(true);
				const menuConfig = await getMenuData();
				const items = convertMenuItems(menuConfig);
				setMenuItems(items);
			} catch (error) {
				console.error("获取菜单数据失败:", error);
				// 如果获取失败，可以设置空数组或显示错误提示
				setMenuItems([]);
			} finally {
				setLoading(false);
			}
		};
		
		fetchMenuData();
	}, [convertMenuItems]);
	
	// 使用 useMemo 计算 selectedKeys，避免在 useEffect 中设置状态
	const selectedKeys = useMemo(() => [pathname], [pathname]);
	
	// 使用 useMemo 计算期望的 openKeys，避免在 useEffect 中设置状态
	const expectedOpenKeys = useMemo(() => {
		// 计算应该打开的父菜单 keys（根据当前路径）
		const currentPath = pathname;
		
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
	}, [pathname, menuItems]);
	
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

	if (loading) {
		return (
			<div
				className={clsx(
					"menu",
					"flex flex-col justify-between h-full",
					"items-center justify-center"
				)}
			>
				<Logo />
				<Spin size="large" />
			</div>
		);
	}

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

