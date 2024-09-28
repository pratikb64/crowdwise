import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const registerRequestBody = z.object({
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8),
});

export const registerModel: ZodExpressSchema = {
	body: registerRequestBody,
};

export type RegisterRequest = z.infer<typeof registerRequestBody>;
