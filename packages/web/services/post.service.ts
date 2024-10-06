import { BACKEND_API_URL } from "@/lib/constants";
import type {
	APIResponse,
	CreatePostRequest,
	DeletePostRequest,
	GetBoardPostsRequest,
	GetBoardPostsResponse,
	GetPostRequest,
	GetPostResponse,
	UpdatePostStatusRequest,
	VotePostRequest,
} from "crowdwise-api/types";

export const createPost = async (args: CreatePostRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/posts`, {
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

export const getPostsByBoard = async (args: GetBoardPostsRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/posts/b/${args.boardId}`, {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();

	return data as APIResponse<GetBoardPostsResponse>;
};

export const updatePostVote = async (args: VotePostRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/posts/${args.postId}/vote`, {
		method: "PUT",
		credentials: "include",
		body: JSON.stringify({ vote: args.vote }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();

	return data as APIResponse<undefined>;
};

export const getPost = async (args: GetPostRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/posts/${args.postId}`, {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();

	return data as APIResponse<GetPostResponse>;
};

export const deletePost = async (args: DeletePostRequest) => {
	const response = await fetch(`${BACKEND_API_URL}/posts/${args.postId}`, {
		method: "DELETE",
		credentials: "include",
	});
	const data = await response.json();

	return data as APIResponse<undefined>;
};

export const updatePostStatus = async (args: UpdatePostStatusRequest) => {
	const response = await fetch(
		`${BACKEND_API_URL}/posts/${args.postId}/status`,
		{
			method: "PUT",
			credentials: "include",
			body: JSON.stringify({ status: args.status }),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const data = await response.json();

	return data as APIResponse<undefined>;
};
