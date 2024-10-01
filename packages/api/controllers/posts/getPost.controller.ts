import { db } from "@/database";
import { postVotes } from "@/database/schema/post_votes";
import { posts } from "@/database/schema/posts";
import type {
	GetPostRequest,
	GetPostResponse,
} from "@/models/posts/getPost.model";
import type { CustomRequestHandler } from "@/types";
import { count, eq } from "drizzle-orm";

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
			})
			.from(posts)
			.where(eq(posts.id, postId))
			.innerJoin(postVotes, eq(postVotes.postId, posts.id))
			.groupBy(posts.id);

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
