import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
	id: varchar("id", { length: 50 }).primaryKey(),
	name: varchar("name", { length: 25 }).notNull(),
	shortName: varchar("short_name", { length: 25 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export type Company = typeof companies.$inferSelect;
