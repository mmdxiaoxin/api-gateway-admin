"use client";

import { Tabs, TabsProps } from "antd";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMenuTitleByPath, getMenuIconByPath } from "@/constants/menu";
import IconComponent from "@/components/ui/IconComponent";

import type { TabItem } from "@/types";

import "./index.scss";

const LayoutTabs = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [tabsList, setTabsList] = useState<TabItem[]>([{ title: "首页", path: "/" }]);
	const [activeValue, setActiveValue] = useState<string>(pathname);

	useEffect(() => {
		addTabs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const clickTabs = (path: string) => {
		router.push(path);
	};

	const addTabs = () => {
		const newTabsList = [...tabsList];
		const existingTab = newTabsList.find((item) => item.path === pathname);

		if (!existingTab) {
			// 从菜单配置中获取中文标题
			const title = getMenuTitleByPath(pathname);
			newTabsList.push({
				title,
				path: pathname,
			});
			setTabsList(newTabsList);
		}

		setActiveValue(pathname);
	};

	const delTabs = (tabPath?: string) => {
		if (tabPath === "/") return;

		if (pathname === tabPath) {
			const currentIndex = tabsList.findIndex((item) => item.path === pathname);
			const nextTab = tabsList[currentIndex + 1] || tabsList[currentIndex - 1];
			if (nextTab) {
				router.push(nextTab.path);
			}
		}

		setTabsList(tabsList.filter((item) => item.path !== tabPath));
	};

	const tabItems: TabsProps["items"] = tabsList.map((item) => {
		const iconName = getMenuIconByPath(item.path);
		return {
			key: item.path,
			label: iconName ? (
				<span className="flex items-center gap-1">
					<IconComponent name={iconName} />
					{item.title}
				</span>
			) : (
				item.title
			),
			closable: item.path !== "/",
		};
	});

	return (
		<Tabs
			className={clsx(
				"tabs",
				"pl-[13px] relative bg-white",
				"border-b border-solid border-[#f6f6f6]",
				"[&_.ant-tabs-nav]:m-0",
				"[&_.ant-tabs-nav::before]:border-none",
				"[&_.ant-tabs-ink-bar]:visible",
				"[&_.ant-tabs-tab-with-remove.ant-tabs-tab-active_.ant-tabs-tab-remove]:text-blue-500 [&_.ant-tabs-tab-with-remove.ant-tabs-tab-active_.ant-tabs-tab-remove]:opacity-100",
				"[&_.ant-tabs-tab-with-remove.ant-tabs-tab-active_.ant-tabs-tab-btn]:-translate-x-[9px]",
				"[&_.ant-tabs-tab]:p-[8px_22px] [&_.ant-tabs-tab]:text-[#cccccc] [&_.ant-tabs-tab]:bg-transparent [&_.ant-tabs-tab]:border-none",
				"[&_.ant-tabs-tab-remove]:absolute [&_.ant-tabs-tab-remove]:right-0 [&_.ant-tabs-tab-remove]:text-[#cccccc] [&_.ant-tabs-tab-remove]:opacity-0 [&_.ant-tabs-tab-remove]:transition-[0.1s_ease-in-out]",
				"[&_.ant-tabs-tab-remove:hover]:text-blue-500",
				"[&_.ant-tabs-tab.ant-tabs-tab-with-remove:hover_.ant-tabs-tab-remove]:opacity-100 [&_.ant-tabs-tab.ant-tabs-tab-with-remove:hover_.ant-tabs-tab-remove]:transition-[0.1s_ease-in-out]",
				"[&_.ant-tabs-tab.ant-tabs-tab-with-remove:hover_.ant-tabs-tab-btn]:-translate-x-[9px]"
			)}
			animated
			activeKey={activeValue}
			onChange={clickTabs}
			hideAdd
			type="editable-card"
			items={tabItems}
			onEdit={(path) => {
				delTabs(path as string);
			}}
		/>
	);
};

export default LayoutTabs;

