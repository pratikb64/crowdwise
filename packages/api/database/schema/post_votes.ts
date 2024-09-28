import { pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";

export const postVotes = pgTable(
	"post_votes",
	{
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
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(postVotes) => {
		return {
			postUserPK: primaryKey({
				columns: [postVotes.userId, postVotes.postId],
				name: "post_user_pk",
			}),
		};
	},
);

export type PostVote = typeof postVotes.$inferSelect;
