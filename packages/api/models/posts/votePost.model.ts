import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const votePostRequestParams = z.object({
	postId: z.string(),
});

export const votePostModel: ZodExpressSchema = {
	params: votePostRequestParams,
};

export type VotePostRequest = z.infer<typeof votePostRequestParams>;
