import type { Company } from "@/database/schema/companies";
import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getCompanyRequestParams = z.object({
	shortName: z.string(),
});

export const getCompanyModel: ZodExpressSchema = {
	params: getCompanyRequestParams,
};

export type GetCompanyRequest = z.infer<typeof getCompanyRequestParams>;

export type GetCompanyResponse = Company;
