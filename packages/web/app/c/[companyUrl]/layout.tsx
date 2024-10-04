"use client";

import { CompanyNavbar } from "@/components/CompanyNavbar";
import { StoresProvider } from "@/providers/StoresProvider";
import type { ReactNode } from "react";

export default function CompanyPageLayout({
	children,
}: { children: ReactNode }) {
	return (
		<StoresProvider>
			<div className="flex flex-col items-center w-full px-4 lg:px-2">
				<CompanyNavbar />
				<div className="flex flex-col w-full max-w-5xl">{children}</div>
			</div>
		</StoresProvider>
	);
}
