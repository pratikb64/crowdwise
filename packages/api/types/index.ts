import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import type { User } from "../database/schema/users";
export type { Board } from "../database/schema/boards";
export type { Company } from "../database/schema/companies";
export type { PostStatus } from "../database/schema/posts";
export type { LoginRequest } from "../models/auth/login.model";
export type { RegisterRequest } from "../models/auth/register.model";
export type { CreateBoardRequest } from "../models/boards/createBoard.model";
export type { GetBoardRequest } from "../models/boards/getBoard.model";
export type { DeleteCommentRequest } from "../models/comments/deleteComment.model";
export type {
	GetCommentsRequest,
	GetCommentsResponse,
} from "../models/comments/getComments.model";
export type { PostCommentRequest } from "../models/comments/postComment.model";
export type { CreateCompanyRequest } from "../models/companies/createCompany.model";
export type { GetCompanyRequest } from "../models/companies/getCompany.model";
export type { CreatePostRequest } from "../models/posts/createPost.model";
export type { DeletePostRequest } from "../models/posts/deletePost.model";
export type {
	GetBoardPostsRequest,
	GetBoardPostsResponse,
} from "../models/posts/getBoardPosts.model";
export type {
	GetPostRequest,
	GetPostResponse,
} from "../models/posts/getPost.model";
export type { UpdatePostStatusRequest } from "../models/posts/updatePostStatus.model";
export type { VotePostRequest } from "../models/posts/votePost.model";
export type { GetUserResponse } from "../models/users/getUser.model";

export interface ZodExpressSchema {
	params?: ZodSchema;
	query?: ZodSchema;
	body?: ZodSchema;
}

export type CookiePayload = Omit<User, "password" | "createdAt" | "updatedAt">;

export type APIResponse<T> = {
	success: boolean;
	status: number;
	message?: string;
	data?: T;
	error?: any;
};

export type TypedRequest<T> = Request<T, any, T, T> & {
	user?: CookiePayload;
};

export type TypedResponse<T> = Response<APIResponse<T>>;

export type CustomRequest = Request & {
	user?: CookiePayload;
};

export type CustomRequestHandler<Req = any, Res = any> = (
	req: TypedRequest<Req>,
	res: TypedResponse<Res>,
	next: NextFunction,
) => void;
