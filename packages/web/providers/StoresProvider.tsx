import type { ReactNode } from "react";
import { CompanyStoreProvider } from "./CompanyStoreProvider";
import { PostStoreProvider } from "./PostStoreProvider";
import { SessionProvider } from "./SessionProvider";

export const StoresProvider = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<CompanyStoreProvider>
				<PostStoreProvider>{children}</PostStoreProvider>
			</CompanyStoreProvider>
		</SessionProvider>
	);
};
