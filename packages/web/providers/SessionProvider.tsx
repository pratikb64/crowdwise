import { SessionContext, useSessionFunctions } from "@/hooks/useSession";

export const SessionProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const value = useSessionFunctions();
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
};
