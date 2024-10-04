import { db } from "@/database";
import { comments } from "@/database/schema/comments";
import type { CustomRequestHandler, DeleteCommentRequest } from "@/types";
import { and, eq } from "drizzle-orm";

export const deleteCommentController: CustomRequestHandler<
	DeleteCommentRequest
> = async (req, res) => {
	try {
		const { commentId } = req.params;

		await db
			.delete(comments)
			.where(
				and(eq(comments.id, commentId), eq(comments.userId, req.user!.id)),
			);

		return res.status(200).json({
			success: true,
			message: "Comment deleted successfully",
			status: 200,
		});
	} catch (error) {
		console.log("🔴Uncaught error in deleteCommentController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
