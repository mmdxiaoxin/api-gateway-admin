"use client";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import clsx from "clsx";
import { useLayoutStore } from "@/app/store/layoutStore";

const CollapseIcon = () => {
	const isCollapse = useLayoutStore((state) => state.isCollapse);
	const setCollapse = useLayoutStore((state) => state.setCollapse);

	return (
		<Button
			type="text"
			icon={isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
			className={clsx("mr-[20px] text-[18px] cursor-pointer transition-colors")}
			onClick={() => {
				setCollapse(!isCollapse);
			}}
		/>
	);
};

export default CollapseIcon;

