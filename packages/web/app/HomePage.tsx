"use client";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "@/hooks/useSession";

export const HomePage = () => {
	return (
		<SessionProvider>
			<div>
				<Navbar />
			</div>
		</SessionProvider>
	);
};
