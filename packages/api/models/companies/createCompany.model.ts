import type { Company } from "@/database/schema/companies";
import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const createCompanyRequestBody = z.object({
	name: z.string().min(3),
	shortName: z
		.string()
		.min(3)
		.regex(/^[a-zA-Z0-9-]+$/, {
			message: "Alphanumeric characters and hyphens only",
		}),
});

export const createCompanyModel: ZodExpressSchema = {
	body: createCompanyRequestBody,
};

export type CreateCompanyRequest = z.infer<typeof createCompanyRequestBody>;

export type CreateCompanyResponse = Company;
