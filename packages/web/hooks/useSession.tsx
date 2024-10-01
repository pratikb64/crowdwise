import { loginUser, logoutUser } from "@/services/auth.service";
import { getUser } from "@/services/user.service";
import type { GetUserResponse, LoginRequest } from "crowdwise-api/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const SessionContext = createContext<
	ReturnType<typeof useSessionFunctions> | undefined
>(undefined);

const useSessionFunctions = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [session, setSession] = useState<GetUserResponse | undefined>(
		undefined,
	);
	const router = useRouter();

	const fetchSession = async () => {
		const user = await getUser();
		setSession(user.data);
		setIsLoading(false);
		if (user.data && !user.data.company) {
			router.push("/onboarding");
		}
	};

	const logOut = async () => {
		await logoutUser();
		setSession(undefined);
	};

	const logIn = async (args: LoginRequest) => {
		const res = await loginUser(args);

		if (res.status === 200) {
			setIsLoading(true);
			setSession(res.data);
			await fetchSession();
		}
		return res;
	};

	const refreshSession = () => {
		setIsLoading(true);
		return fetchSession();
	};

	useEffect(() => {
		fetchSession();
	}, []);

	return {
		isLoading,
		session,
		logOut,
		logIn,
		refreshSession,
	};
};

export const SessionProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const value = useSessionFunctions();
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
};

export const useSession = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};