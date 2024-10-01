import { db } from "@/database";
import type {
	GetCommentsRequest,
	GetCommentsResponse,
} from "@/models/comments/getComments.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const getCommentsController: CustomRequestHandler<
	GetCommentsRequest,
	GetCommentsResponse
> = async (req, res) => {
	try {
		const { postId } = req.params;

		const allComments = await db.query.comments.findMany({
			where: (comments) => eq(comments.postId, postId),
		});

		return res.status(200).json({
			success: true,
			message: "Comments found",
			data: allComments,
			status: 200,
		});
	} catch (error) {
		console.log("🔴Uncaught error in getCommentsController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
