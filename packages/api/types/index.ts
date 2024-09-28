import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import type { User } from "../database/schema/users";

export interface ZodExpressSchema {
	params?: ZodSchema;
	query?: ZodSchema;
	body?: ZodSchema;
}

export type CookiePayload = Omit<User, "password" | "createdAt" | "updatedAt">;

export type APIResponse<T> = {
	success: boolean;
	message?: string;
	data?: T;
	error?: any;
};

export type TypedRequest<T> = Request<T, any, T, T> & {
	user?: CookiePayload;
};

export type TypedResponse<T = any> = Response<APIResponse<T>>;

export type CustomRequest = Request & {
	user?: CookiePayload;
};

export type CustomRequestHandler<Req = any, Res = any> = (
	req: TypedRequest<Req>,
	res: TypedResponse<Res>,
	next: NextFunction,
) => void;
