import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const createBoardRequestBody = z.object({
	name: z.string().min(3),
	shortName: z
		.string()
		.min(3)
		.regex(/^[a-zA-Z0-9-]+$/, {
			message: "Alphanumeric characters and hyphens only",
		}),
	companyId: z.string(),
});

export const createBoardModel: ZodExpressSchema = {
	body: createBoardRequestBody,
};

export type CreateBoardRequest = z.infer<typeof createBoardRequestBody>;
