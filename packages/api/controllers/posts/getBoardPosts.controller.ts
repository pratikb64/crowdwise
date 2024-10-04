import { db } from "@/database";
import { boardPosts } from "@/database/schema/board_post";
import { comments } from "@/database/schema/comments";
import { postVotes } from "@/database/schema/post_votes";
import { posts } from "@/database/schema/posts";
import type {
	GetBoardPostsRequest,
	GetBoardPostsResponse,
} from "@/models/posts/getBoardPosts.model";
import type { CustomRequestHandler } from "@/types";
import { count, eq, sql } from "drizzle-orm";

export const getBoardPostsController: CustomRequestHandler<
	GetBoardPostsRequest,
	GetBoardPostsResponse
> = async (req, res) => {
	try {
		const { boardId } = req.params;

		const board = await db.query.boards.findFirst({
			where: (boards) => eq(boards.id, boardId),
		});

		if (!board) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
				status: 404,
			});
		}

		const allPosts = (await db
			.select({
				id: posts.id,
				title: posts.title,
				content: posts.content,
				status: posts.status,
				createdAt: posts.createdAt,
				updatedAt: posts.updatedAt,
				votes: count(postVotes.postId),
				isVotedByUser:
					sql<boolean>`SUM(CASE WHEN ${postVotes.userId} = ${req.user?.id || ""} THEN 1 ELSE 0 END) > 0`.as(
						"isVotedByUser",
					),
				commentsCount: count(comments.postId),
			})
			.from(boardPosts)
			.where(eq(boardPosts.boardId, board.id))
			.leftJoin(posts, eq(boardPosts.postId, posts.id))
			.leftJoin(postVotes, eq(postVotes.postId, posts.id))
			.leftJoin(comments, eq(comments.postId, posts.id))
			.groupBy(posts.id)) as unknown as GetBoardPostsResponse;

		return res.status(200).json({
			success: true,
			message: "Post found",
			data: allPosts,
			status: 200,
		});
	} catch (error) {
		console.log("🔴Uncaught error in getBoardPostsController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
