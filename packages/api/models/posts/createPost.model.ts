import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const createPostRequestBody = z.object({
	title: z.string().min(3),
	content: z.string().min(3),
	boardId: z.string(),
});

export const createPostModel: ZodExpressSchema = {
	body: createPostRequestBody,
};

export type CreatePostRequest = z.infer<typeof createPostRequestBody>;
