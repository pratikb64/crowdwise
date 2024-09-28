import { pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { boards } from "./boards";
import { posts } from "./posts";

export const boardPosts = pgTable(
	"board_posts",
	{
		boardId: varchar("board_id", { length: 50 })
			.references(() => boards.id, {
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
	(boardPosts) => {
		return {
			boardPostPK: primaryKey({
				columns: [boardPosts.boardId, boardPosts.postId],
				name: "board_post_pk",
			}),
		};
	},
);

export type PostVote = typeof boardPosts.$inferSelect;
