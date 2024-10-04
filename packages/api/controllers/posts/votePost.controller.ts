import { db } from "@/database";
import { postVotes } from "@/database/schema/post_votes";
import type { VotePostRequest } from "@/models/posts/votePost.model";
import type { CustomRequestHandler } from "@/types";
import { and, eq } from "drizzle-orm";

export const votePostController: CustomRequestHandler<VotePostRequest> = async (
	req,
	res,
) => {
	try {
		const { postId } = req.params;
		const { vote } = req.body;

		let voteResult: any;

		if (vote) {
			voteResult = await db
				.insert(postVotes)
				.values({
					postId: postId,
					userId: req.user!.id,
					createdAt: new Date(),
				})
				.catch((error) => error);
		} else {
			voteResult = await db
				.delete(postVotes)
				.where(
					and(eq(postVotes.postId, postId), eq(postVotes.userId, req.user!.id)),
				)
				.catch((error) => error);
		}

		// "23505" is an error code for duplicate key violation which means that the vote has already been registered
		if (voteResult?.code === "23505") {
			return res.status(400).json({
				success: false,
				message: "Vote already registered",
				status: 400,
			});
		}

		return res.status(201).json({
			success: true,
			message: "Vote updated successfully",
			status: 201,
		});
	} catch (error) {
		console.log("🔴Uncaught error in votePostController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
