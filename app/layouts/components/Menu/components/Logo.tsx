"use client";

import clsx from "clsx";
import { useLayoutStore } from "@/app/store/layoutStore";

const Logo = () => {
	const isCollapse = useLayoutStore((state) => state.isCollapse);

	return (
		<div
			className={clsx(
				"flex flex-col items-center justify-center h-[93px]",
				"[&_.logo-img]:w-[50px] [&_.logo-img]:m-0",
				"[&_.logo-text]:m-0 [&_.logo-text]:text-[24px] [&_.logo-text]:font-bold [&_.logo-text]:whitespace-nowrap"
			)}
		>
			<div className="logo-img flex items-center justify-center w-[50px] h-[50px] bg-blue-500 rounded-lg text-white text-xl font-bold">
				网
			</div>
			{!isCollapse ? <h2 className="logo-text">网关管理后台</h2> : null}
		</div>
	);
};

export default Logo;

