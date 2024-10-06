import { loginUser, logoutUser } from "@/services/auth.service";
import { getUser } from "@/services/user.service";
import type { GetUserResponse, LoginRequest } from "crowdwise-api/types";
import { createContext, useContext, useEffect, useState } from "react";

export const SessionContext = createContext<
	ReturnType<typeof useSessionFunctions> | undefined
>(undefined);

export const useSessionFunctions = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [session, setSession] = useState<GetUserResponse | undefined>(
		undefined,
	);

	const fetchSession = async () => {
		const user = await getUser();
		setSession(user.data);
		setIsLoading(false);
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

export const useSession = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};
