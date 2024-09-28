import type { PostStatus } from "@/database/schema/posts";
import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getBoardPostsRequestParams = z.object({
	boardId: z.string(),
});

export const getBoardPostsModel: ZodExpressSchema = {
	params: getBoardPostsRequestParams,
};

export type GetBoardPostsRequest = z.infer<typeof getBoardPostsRequestParams>;

export type GetBoardPostsResponse = {
	id: string;
	title: string;
	content: string;
	status: PostStatus;
	upVotes: number;
	createdAt: Date;
	updatedAt: Date;
}[];
