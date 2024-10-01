"use client";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "@/hooks/useSession";
import type { ReactNode } from "react";

export default function OnboardingLayout({
	children,
}: { children: ReactNode }) {
	return (
		<SessionProvider>
			<div>
				<Navbar />
				<div className="flex flex-col items-center gap-6">
					<div className="flex flex-col gap-4 mt-24 w-full max-w-md p-4">
						{children}
					</div>
				</div>
			</div>
		</SessionProvider>
	);
}
