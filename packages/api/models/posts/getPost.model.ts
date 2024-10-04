import type { PostStatus } from "@/database/schema/posts";
import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getPostRequestParams = z.object({
	postId: z.string(),
});

export const getPostModel: ZodExpressSchema = {
	params: getPostRequestParams,
};

export type GetPostRequest = z.infer<typeof getPostRequestParams>;

export type GetPostResponse = {
	id: string;
	title: string;
	content: string;
	status: PostStatus;
	votes: number;
	author: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	} | null;
	isVotedByUser: boolean;
	createdAt: Date;
	updatedAt: Date;
};
