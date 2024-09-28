import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: varchar("id", { length: 50 }).primaryKey(),
	firstName: varchar("first_name", { length: 30 }).notNull(),
	lastName: varchar("last_name", { length: 30 }).notNull(),
	email: varchar("email", { length: 50 }).notNull(),
	password: varchar("password", { length: 100 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export type User = typeof users.$inferSelect;
