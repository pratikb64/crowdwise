import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import type { User } from "../database/schema/users";
export type { Board } from "../database/schema/boards";
export type { Company } from "../database/schema/companies";
export type { LoginRequest } from "../models/auth/login.model";
export type { RegisterRequest } from "../models/auth/register.model";
export type { CreateBoardRequest } from "../models/boards/createBoard.model";
export type { GetBoardRequest } from "../models/boards/getBoard.model";
export type { CreateCompanyRequest } from "../models/companies/createCompany.model";
export type { GetCompanyRequest } from "../models/companies/getCompany.model";
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
