"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
	isCollapse: boolean;
	setCollapse: (isCollapse: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
	persist(
		(set) => ({
			isCollapse: false,
			setCollapse: (isCollapse: boolean) => set({ isCollapse }),
		}),
		{
			name: "layout-storage",
		}
	)
);

