"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import LayoutMenu from "../Menu";
import AvatarIcon from "./components/AvatarIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import CollapseIcon from "./components/CollapseIcon";

const LayoutHeader = () => {
	const { Header } = Layout;
	const [isMobile, setIsMobile] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<Header
				className={clsx(
					"flex items-center justify-between h-[55px] px-[20px_40px_0_20px]",
					"border-b border-solid border-[#f6f6f6]"
				)}
			>
				<div className="flex items-center">
					{isMobile && (
						<Button
							type="text"
							icon={<MenuOutlined />}
							onClick={() => setDrawerVisible(true)}
							className="text-lg"
						/>
					)}
					{!isMobile && <CollapseIcon />}
					<BreadcrumbNav />
				</div>
				<div className="flex items-center">
					<AvatarIcon />
				</div>
			</Header>

			{isMobile && (
				<Drawer
					title="菜单"
					placement="left"
					onClose={() => setDrawerVisible(false)}
					open={drawerVisible}
					width={220}
					styles={{
						body: {
							padding: 0,
						},
					}}
				>
					<LayoutMenu />
				</Drawer>
			)}
		</>
	);
};

export default LayoutHeader;

