import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const createBoardRequestBody = z.object({
	name: z.string().min(3),
	companyId: z.string(),
});

export const createBoardModel: ZodExpressSchema = {
	body: createBoardRequestBody,
};

export type CreateBoardRequest = z.infer<typeof createBoardRequestBody>;
