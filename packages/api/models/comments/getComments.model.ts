import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getCommentsRequestParams = z.object({
	postId: z.string(),
});

export const getCommentsModel: ZodExpressSchema = {
	params: getCommentsRequestParams,
};

export type GetCommentsRequest = z.infer<typeof getCommentsRequestParams>;

export type GetCommentsResponse = {
	id: string;
	postId: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	} | null;
}[];
