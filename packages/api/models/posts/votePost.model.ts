import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const votePostRequestParams = z.object({
	postId: z.string(),
});

export const votePostRequestBody = z.object({
	vote: z.boolean(),
});

export const votePostModel: ZodExpressSchema = {
	params: votePostRequestParams,
	body: votePostRequestBody,
};

export type VotePostRequest = z.infer<
	typeof votePostRequestParams & typeof votePostRequestBody
>;
