import { db } from "@/database";
import { postVotes } from "@/database/schema/post_votes";
import type { VotePostRequest } from "@/models/posts/votePost.model";
import type { CustomRequestHandler } from "@/types";

export const votePostController: CustomRequestHandler<VotePostRequest> = async (
	req,
	res,
) => {
	try {
		const { postId } = req.params;

		const vote = await db
			.insert(postVotes)
			.values({
				postId: postId,
				userId: req.user!.id,
				createdAt: new Date(),
			})
			.returning()
			.catch((error) => error);

		if (vote?.code === "23505") {
			return res.status(400).json({
				success: false,
				message: "Vote already registered",
			});
		}

		return res.status(201).json({
			success: true,
			message: "Voted successfully",
		});
	} catch (error) {
		console.log("🔴Uncaught error in votePostController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
