"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	token: string | null;
	user: {
		username: string;
		email?: string;
	} | null;
	setToken: (token: string | null) => void;
	setUser: (user: { username: string; email?: string } | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
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

