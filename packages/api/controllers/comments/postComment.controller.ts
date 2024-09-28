import { db } from "@/database";
import { comments } from "@/database/schema/comments";
import type { PostCommentRequest } from "@/models/comments/postComment.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const postCommentController: CustomRequestHandler<
	PostCommentRequest
> = async (req, res) => {
	try {
		const { content, postId } = req.body;

		const post = await db.query.posts.findFirst({
			where: (posts) => eq(posts.id, postId),
		});

		if (!post) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
			});
		}

		await db.insert(comments).values({
			id: crypto.randomUUID(),
			userId: req.user!.id,
			postId: post.id,
			content,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return res.status(201).json({
			success: true,
			message: "Comment posted successfully",
		});
	} catch (error) {
		console.log("🔴Uncaught error in postCommentController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
