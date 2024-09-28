import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";

export const comments = pgTable("comments", {
	id: varchar("id", { length: 50 }).primaryKey(),
	userId: varchar("user_id", { length: 50 })
		.references(() => users.id, {
			onDelete: "cascade",
		})
		.notNull(),
	postId: varchar("post_id", { length: 50 })
		.references(() => posts.id, {
			onDelete: "cascade",
		})
		.notNull(),
	content: varchar("content", { length: 2048 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export type Comments = typeof comments.$inferSelect;
