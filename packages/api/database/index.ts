import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { DATABASE_URL } from "../env";
import * as boards from "./schema/boards";
import * as comments from "./schema/comments";
import * as companies from "./schema/companies";
import * as companyUsers from "./schema/company_users";
import * as postVotes from "./schema/post_votes";
import * as posts from "./schema/posts";
import * as users from "./schema/users";

export const pgClient = new Client({
	connectionString: DATABASE_URL,
});

console.log("🟡 Connecting to database...");

await pgClient.connect().catch((e) => {
	console.log("🔴 Error connecting to database: ", e);
	process.exit(1);
});

console.log("🎉 Database connected successfully!");

export const db = drizzle(pgClient, {
	schema: {
		...boards,
		...comments,
		...companies,
		...companyUsers,
		...postVotes,
		...posts,
		...users,
	},
});
