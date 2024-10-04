import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const deleteCommentRequestParams = z.object({
	commentId: z.string(),
});

export const deleteCommentModel: ZodExpressSchema = {
	params: deleteCommentRequestParams,
};

export type DeleteCommentRequest = z.infer<typeof deleteCommentRequestParams>;
