"use client";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "@/providers/SessionProvider";

export const HomePage = () => {
	return (
		<SessionProvider>
			<div>
				<Navbar />
			</div>
		</SessionProvider>
	);
};
