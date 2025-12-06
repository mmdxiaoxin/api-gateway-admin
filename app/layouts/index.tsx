"use client";

import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/locale/zh_CN";
import clsx from "clsx";
import { useEffect, useState } from "react";
import LayoutFooter from "./components/Footer";
import LayoutHeader from "./components/Header";
import LayoutMenu from "./components/Menu";
import LayoutTabs from "./components/Tabs";
import { useLayoutStore } from "@/app/store/layoutStore";

const LayoutIndex = ({ children }: { children: React.ReactNode }) => {
	const { Sider, Content } = Layout;
	const isCollapse = useLayoutStore((state) => state.isCollapse);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setIsMobile(width < 768);
			const setCollapse = useLayoutStore.getState().setCollapse;
			if (width < 768) {
				setCollapse(true);
			} else if (width < 1200) {
				setCollapse(true);
			} else {
				setCollapse(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<section
			className={clsx(
				"min-w-[320px] w-screen h-screen flex flex-col md:flex-row",
				"[&_.ant-layout-sider]:box-border [&_.ant-layout-sider]:border-r [&_.ant-layout-sider]:border-solid [&_.ant-layout-sider]:border-[#e4e7ed]",
				"[&_.ant-layout]:overflow-x-hidden",
				"[&_.ant-layout-content]:box-border [&_.ant-layout-content]:flex-1 [&_.ant-layout-content]:p-[10px_12px] [&_.ant-layout-content]:overflow-x-hidden",
				"[&_.ant-layout-content::-webkit-scrollbar]:bg-[#f0f2f5]",
				"[&_.ant-layout-content::-webkit-scrollbar-thumb]:bg-[#dddee0]"
			)}
		>
			<ConfigProvider
				locale={zhCN}
				theme={{
					components: {
						Layout: {
							bodyBg: "#f0f2f5",
							headerBg: "#ffffff",
							footerBg: "#ffffff",
							siderBg: "#ffffff",
							headerPadding: "0 40px 0 20px",
						},
					},
				}}
			>
				{!isMobile && (
					<Sider
						trigger={null}
						collapsed={isCollapse}
						width={220}
						theme="light"
						collapsedWidth={isMobile ? 0 : 80}
						breakpoint="md"
					>
						<LayoutMenu />
					</Sider>
				)}
				<Layout className="flex-1 flex flex-col">
					<LayoutHeader />
					<LayoutTabs />
					<Content>{children}</Content>
					<LayoutFooter />
				</Layout>
			</ConfigProvider>
		</section>
	);
};

export default LayoutIndex;

