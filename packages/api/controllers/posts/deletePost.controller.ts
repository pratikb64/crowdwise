import { db } from "@/database";
import { posts } from "@/database/schema/posts";
import type { DeletePostRequest } from "@/models/posts/deletePost.model";
import type { CustomRequestHandler } from "@/types";
import { and, eq } from "drizzle-orm";

export const deletePostController: CustomRequestHandler<
	DeletePostRequest
> = async (req, res) => {
	try {
		const { postId } = req.params;

		await db
			.delete(posts)
			.where(and(eq(posts.id, postId), eq(posts.userId, req.user!.id)));

		return res.status(200).json({
			success: true,
			message: "Post deleted successfully",
			status: 200,
		});
	} catch (error) {
		console.log("🔴Uncaught error in deletePostController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
