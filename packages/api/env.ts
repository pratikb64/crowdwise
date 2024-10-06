import type { ZodError } from "zod";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.union([
			z.literal("development"),
			z.literal("staging"),
			z.literal("production"),
		])
		.default("development"),
	SERVER_PORT: z.coerce.number().min(1000).optional().default(3001),
	WHITELIST_DOMAINS: z.string().transform((val, a) => {
		const urls = val.split(",").map((url) => url.trim());
		const validUrls = urls.filter((url) => {
			try {
				new URL(url);
				return true;
			} catch (_) {
				return false;
			}
		});
		if (urls.length !== validUrls.length) {
			a.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"Domains should be like 'http://localhost:3000,https://example.com'",
			});
		}
		return urls;
	}),
	DATABASE_URL: z.string().trim().min(10),
	AUTH_SECRET: z.string().trim().min(10),
	JWT_SECRET: z.string().trim().min(10),
});

let env = undefined;

try {
	env = envSchema.parse(process.env);
} catch (err: unknown) {
	const error = err as ZodError;
	console.error(
		`Error parsing environment variables:\n${error.issues
			.map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
			.join("\n")}`,
	);
	process.exit(1);
}

// "env" will always be defined at this point, but TS doesn't know that
if (!env) process.exit(1);

export const {
	NODE_ENV,
	SERVER_PORT,
	DATABASE_URL,
	AUTH_SECRET,
	JWT_SECRET,
	WHITELIST_DOMAINS,
} = env;
