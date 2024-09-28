import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const postCommentRequestBody = z.object({
	content: z.string().min(1),
	postId: z.string(),
});

export const postCommentModel: ZodExpressSchema = {
	body: postCommentRequestBody,
};

export type PostCommentRequest = z.infer<typeof postCommentRequestBody>;
