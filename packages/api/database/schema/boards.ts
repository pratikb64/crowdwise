import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const boards = pgTable("boards", {
	id: varchar("id", { length: 50 }).primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
	companyId: varchar("company_id")
		.references(() => companies.id, {
			onDelete: "cascade",
		})
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export type Board = typeof boards.$inferSelect;
