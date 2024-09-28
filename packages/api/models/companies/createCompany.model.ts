import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const createCompanyRequestBody = z.object({
	name: z.string().min(3),
	shortName: z.string().min(3),
});

export const createCompanyModel: ZodExpressSchema = {
	body: createCompanyRequestBody,
};

export type CreateCompanyRequest = z.infer<typeof createCompanyRequestBody>;
