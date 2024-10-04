import { db } from "@/database";
import { boardPosts } from "@/database/schema/board_post";
import { companyUsers } from "@/database/schema/company_users";
import { postVotes } from "@/database/schema/post_votes";
import { type Post, posts } from "@/database/schema/posts";
import type { CreatePostRequest } from "@/models/posts/createPost.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const createPostController: CustomRequestHandler<
	CreatePostRequest
> = async (req, res) => {
	try {
		const { title, content, boardId } = req.body;

		const board = await db.query.boards.findFirst({
			where: (boards) => eq(boards.id, boardId),
		});

		if (!board) {
			return res.status(404).json({
				success: false,
				message: "Board not found",
				status: 404,
			});
		}

		const userLinkedToCompany = await db.query.companyUsers.findFirst({
			where: (companyUsers) => eq(companyUsers.companyId, req.user!.id),
		});

		if (userLinkedToCompany) {
			await db.insert(companyUsers).values({
				userId: req.user!.id,
				companyId: board.companyId,
				createdAt: new Date(),
				role: "contributor",
			});
		}

		const newPost: Post = {
			id: crypto.randomUUID(),
			content: content,
			title: title,
			status: "open",
			userId: req.user!.id,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Add new post to db
		await db.insert(posts).values(newPost);

		// Link post to board
		await db.insert(boardPosts).values({
			boardId: board.id,
			postId: newPost.id,
			createdAt: new Date(),
		});

		// Add vote to users post by default
		await db.insert(postVotes).values({
			postId: newPost.id,
			userId: req.user!.id,
			createdAt: new Date(),
		});

		return res.status(201).json({
			success: true,
			message: "Posts created successfully",
			status: 201,
		});
	} catch (error) {
		console.log("🔴Uncaught error in createPostController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
