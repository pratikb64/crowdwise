import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./env";

export default defineConfig({
	dialect: "postgresql",
	schema: "./database/schema",
	out: "./drizzle",
	dbCredentials: {
		url: DATABASE_URL,
	},
});
