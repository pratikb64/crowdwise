import { BACKEND_API_URL } from "@/lib/constants";
import type {
	APIResponse,
	Board,
	CreateBoardRequest,
	GetBoardRequest,
} from "crowdwise-api/types";

export const createBoard = async (args: CreateBoardRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/boards`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(args),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();

	return data as APIResponse<undefined>;
};

export const getBoard = async (args: GetBoardRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/boards/${args.shortName}`, {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();

	return data as APIResponse<Board>;
};

export const getBoardsByCompany = async (args: GetBoardRequest) => {
	const response = await fetch(
		`${BACKEND_API_URL}/boards/c/${args.shortName}`,
		{
			method: "GET",
			credentials: "include",
		},
	);
	const data = await response.json();

	return data as APIResponse<Board[]>;
};
