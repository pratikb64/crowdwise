import { db } from "@/database";
import { postVotes } from "@/database/schema/post_votes";
import { posts } from "@/database/schema/posts";
import { users } from "@/database/schema/users";
import type {
	GetPostRequest,
	GetPostResponse,
} from "@/models/posts/getPost.model";
import type { CustomRequestHandler } from "@/types";
import { count, eq, sql } from "drizzle-orm";

export const getPostController: CustomRequestHandler<
	GetPostRequest,
	GetPostResponse
> = async (req, res) => {
	try {
		const { postId } = req.params;

		const post = await db
			.select({
				id: posts.id,
				title: posts.title,
				content: posts.content,
				status: posts.status,
				createdAt: posts.createdAt,
				updatedAt: posts.updatedAt,
				votes: count(postVotes.postId),
				author: {
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
				},
				isVotedByUser:
					sql<boolean>`SUM(CASE WHEN ${postVotes.userId} = ${req.user?.id || ""} THEN 1 ELSE 0 END) > 0`.as(
						"isVotedByUser",
					),
			})
			.from(posts)
			.where(eq(posts.id, postId))
			.leftJoin(postVotes, eq(postVotes.postId, posts.id))
			.leftJoin(users, eq(posts.userId, users.id))
			.groupBy(posts.id, users.id);

		if (post.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
				status: 404,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Post found",
			data: post[0],
			status: 200,
		});
	} catch (error) {
		console.log("🔴Uncaught error in getPostController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
