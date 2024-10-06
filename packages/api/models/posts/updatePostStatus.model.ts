import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const updatePostStatusRequestParams = z.object({
	postId: z.string(),
});

export const updatePostStatusRequestBody = z.object({
	status: z.union([
		z.literal("open"),
		z.literal("under_review"),
		z.literal("planned"),
		z.literal("in_progress"),
		z.literal("completed"),
		z.literal("closed"),
	]),
});

export const updatePostStatusModel: ZodExpressSchema = {
	params: updatePostStatusRequestParams,
	body: updatePostStatusRequestBody,
};

export type UpdatePostStatusRequest = z.infer<
	typeof updatePostStatusRequestParams & typeof updatePostStatusRequestBody
>;
