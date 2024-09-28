import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const loginRequestBody = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const loginModel: ZodExpressSchema = {
	body: loginRequestBody,
};

export type LoginRequest = z.infer<typeof loginRequestBody>;
