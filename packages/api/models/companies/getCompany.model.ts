import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getCompanyRequestParams = z.object({
	companyId: z.string(),
});

export const getCompanyModel: ZodExpressSchema = {
	params: getCompanyRequestParams,
};

export type GetCompanyRequest = z.infer<typeof getCompanyRequestParams>;

export type GetCompanyResponse = {
	id: string;
	name: string;
	shortName: string;
	createdAt: Date;
	updatedAt: Date;
};
