import { BACKEND_API_URL } from "@/lib/constants";
import type {
	APIResponse,
	LoginRequest,
	RegisterRequest,
} from "crowdwise-api/types";

export const loginUser = async (args: LoginRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: args.email,
			password: args.password,
		}),
	});
	const data = await response.json();

	return data as APIResponse<undefined>;
};

export const userRegistration = async (args: RegisterRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/register`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: args.email,
			password: args.password,
			firstName: args.firstName,
			lastName: args.lastName,
		}),
	});

	const data = await response.json();

	return data as APIResponse<undefined>;
};

export const logoutUser = async () => {
	const response = await fetch(`${BACKEND_API_URL}/logout`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	return data as APIResponse<undefined>;
};
