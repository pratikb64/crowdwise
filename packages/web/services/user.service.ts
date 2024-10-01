import type { APIResponse, GetUserResponse } from "crowdwise-api/types";

export const getUser = async () => {
	const response = await fetch(`${process.env.BACKEND_API_URL}/users`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	return data as APIResponse<GetUserResponse>;
};
