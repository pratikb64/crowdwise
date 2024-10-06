"use client";
import { AdminNavbar } from "@/components/AdminNavbar";
import { StoresProvider } from "@/providers/StoresProvider";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<StoresProvider>
			<div className="flex flex-col h-screen">
				<AdminNavbar />
				{children}
			</div>
		</StoresProvider>
	);
}
