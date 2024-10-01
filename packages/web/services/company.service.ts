import type {
	APIResponse,
	Company,
	CreateCompanyRequest,
	GetCompanyRequest,
} from "crowdwise-api/types";

export const createCompany = async (args: CreateCompanyRequest) => {
	const response = await fetch(`${process.env.BACKEND_API_URL}/companies`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(args),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();

	return data as APIResponse<Company>;
};

export const getCompany = async (args: GetCompanyRequest) => {
	const response = await fetch(
		`${process.env.BACKEND_API_URL}/companies/${args.shortName}`,
		{
			method: "GET",
			credentials: "include",
		},
	);
	const data = await response.json();

	return data as APIResponse<Company>;
};
