import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const deletePostRequestParams = z.object({
	postId: z.string(),
});

export const deletePostModel: ZodExpressSchema = {
	params: deletePostRequestParams,
};

export type DeletePostRequest = z.infer<typeof deletePostRequestParams>;
