import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const postStatusEnum = pgEnum("post_status", [
	"open",
	"under_review",
	"planned",
	"in_progress",
	"completed",
	"closed",
]);

export const posts = pgTable("posts", {
	id: varchar("id", { length: 50 }).primaryKey(),
	title: varchar("title", { length: 512 }).notNull(),
	content: varchar("content", { length: 1024 }).notNull(),
	status: postStatusEnum("status").notNull(),
	userId: varchar("user_id").references(() => users.id, {
		onDelete: "set null",
	}),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export type Post = typeof posts.$inferSelect;

export type PostStatus = (typeof postStatusEnum.enumValues)[number];
