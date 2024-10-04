import { db } from "@/database";
import { comments } from "@/database/schema/comments";
import { users } from "@/database/schema/users";
import type {
	GetCommentsRequest,
	GetCommentsResponse,
} from "@/models/comments/getComments.model";
import type { CustomRequestHandler } from "@/types";
import { desc, eq } from "drizzle-orm";

export const getCommentsController: CustomRequestHandler<
	GetCommentsRequest,
	GetCommentsResponse
> = async (req, res) => {
	try {
		const { postId } = req.params;

		const allComments = await db
			.select({
				id: comments.id,
				postId: comments.postId,
				content: comments.content,
				createdAt: comments.createdAt,
				updatedAt: comments.updatedAt,
				user: {
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
				},
			})
			.from(comments)
			.where(eq(comments.postId, postId))
			.leftJoin(users, eq(comments.userId, users.id))
			.orderBy(desc(comments.createdAt))
			.groupBy(comments.id, users.id);

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
