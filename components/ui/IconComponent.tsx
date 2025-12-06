"use client";

import React from "react";

// 使用到的 antd-icon 组件
export const Icons = {
	HomeOutlined: React.lazy(() => import("@ant-design/icons/HomeOutlined")),
	HomeFilled: React.lazy(() => import("@ant-design/icons/HomeFilled")),
	ApiOutlined: React.lazy(() => import("@ant-design/icons/ApiOutlined")),
	SettingOutlined: React.lazy(() => import("@ant-design/icons/SettingOutlined")),
	UserOutlined: React.lazy(() => import("@ant-design/icons/UserOutlined")),
} as const;

export type IconName = keyof typeof Icons;

export interface IconComponentProps {
	name: IconName;
	color?: string;
	size?: number;
	className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ name, color, size, className }) => {
	// 动态加载 Icon
	const DynamicIcon = Icons[name] ?? null;
	return (
		<React.Suspense fallback={null}>
			{DynamicIcon && <DynamicIcon style={{ color, fontSize: size }} className={className} />}
		</React.Suspense>
	);
};

export default IconComponent;

