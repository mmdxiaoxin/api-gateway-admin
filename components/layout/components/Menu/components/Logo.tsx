"use client";

import clsx from "clsx";
import { useLayoutStore } from "@/store/layoutStore";
import Image from "next/image";

const Logo = () => {
	const isCollapse = useLayoutStore((state) => state.isCollapse);

	return (
		<div
			className={clsx(
				"flex flex-col items-center justify-center h-[93px]",
				"px-4"
			)}
		>
		<Image
			src="/logo_sunny.svg"
			alt="logo"
			width={isCollapse ? 32 : 36}
			height={isCollapse ? 32 : 36}
			className={clsx(
				"object-contain",
				isCollapse ? "" : "mb-2"
			)}
			priority
		/>
		{!isCollapse && (
			<h2 className="text-base font-bold text-gray-800 whitespace-nowrap text-center">
				网关管理后台
			</h2>
		)}
		</div>
	);
};

export default Logo;

