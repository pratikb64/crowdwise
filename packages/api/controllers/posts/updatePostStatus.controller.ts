import { db } from "@/database";
import { boardPosts } from "@/database/schema/board_post";
import { boards } from "@/database/schema/boards";
import { companyUsers } from "@/database/schema/company_users";
import { posts } from "@/database/schema/posts";
import type { UpdatePostStatusRequest } from "@/models/posts/updatePostStatus.model";
import type { CustomRequestHandler } from "@/types";
import { and, eq } from "drizzle-orm";

export const updatePostStatusController: CustomRequestHandler<
	UpdatePostStatusRequest
> = async (req, res) => {
	try {
		const { postId } = req.params;
		const { status } = req.body;

		if (!status) {
			return res.status(400).json({
				success: false,
				message: "Status is required",
				status: 400,
			});
		}

		const post = await db
			.select({
				id: posts.id,
				userRole: companyUsers.role,
			})
			.from(posts)
			.where(eq(posts.id, postId))
			.leftJoin(boardPosts, eq(boardPosts.postId, posts.id))
			.leftJoin(boards, eq(boards.id, boardPosts.boardId))
			.leftJoin(
				companyUsers,
				and(
					eq(companyUsers.companyId, boards.companyId),
					eq(companyUsers.userId, req.user!.id),
				),
			)
			.groupBy(
				posts.id,
				boardPosts.boardId,
				boardPosts.postId,
				boards.id,
				companyUsers.companyId,
				companyUsers.userId,
				companyUsers.role,
			);

		if (post.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
				status: 404,
			});
		}

		const postData = post[0];

		if (!postData.userRole || postData.userRole === "contributor") {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to update this post",
				status: 403,
			});
		}

		await db
			.update(posts)
			.set({ status })
			.where(eq(posts.id, postId))
			.catch((error) => error);

		return res.status(201).json({
			success: true,
			message: "Post status updated successfully",
			status: 201,
		});
	} catch (error) {
		console.log("🔴Uncaught error in updatePostStatusController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
