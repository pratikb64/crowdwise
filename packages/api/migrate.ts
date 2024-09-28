import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pgClient } from "./database";

await migrate(db, { migrationsFolder: "./drizzle" });

await pgClient.end();
