"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "@/types";

interface AuthStoreState extends AuthState {
	setToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			setToken: (token: string | null) => set({ token }),
			setUser: (user: { username: string; email?: string } | null) => set({ user }),
			logout: () => set({ token: null, user: null }),
		}),
		{
			name: "auth-storage",
		}
	)
);

