import { BACKEND_API_URL } from "@/lib/constants";
import type {
	APIResponse,
	DeleteCommentRequest,
	GetCommentsRequest,
	GetCommentsResponse,
	PostCommentRequest,
} from "crowdwise-api/types";

export const getCommentsByPost = async (args: GetCommentsRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/comments/p/${args.postId}`, {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();

	return data as APIResponse<GetCommentsResponse>;
};

export const postComment = async (args: PostCommentRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/comments`, {
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

export const deleteComment = async (args: DeleteCommentRequest) => {
	const response = await fetch(
		`${BACKEND_API_URL}/comments/${args.commentId}`,
		{
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const data = await response.json();

	return data as APIResponse<undefined>;
};
