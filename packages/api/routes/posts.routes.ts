import { createPostController } from "@/controllers/posts/createPost.controller";
import { deletePostController } from "@/controllers/posts/deletePost.controller";
import { getBoardPostsController } from "@/controllers/posts/getBoardPosts.controller";
import { getPostController } from "@/controllers/posts/getPost.controller";
import { updatePostStatusController } from "@/controllers/posts/updatePostStatus.controller";
import { votePostController } from "@/controllers/posts/votePost.controller";
import { auth } from "@/middlewares/auth";
import { createPostModel } from "@/models/posts/createPost.model";
import { deletePostModel } from "@/models/posts/deletePost.model";
import { getBoardPostsModel } from "@/models/posts/getBoardPosts.model";
import { getPostModel } from "@/models/posts/getPost.model";
import { updatePostStatusModel } from "@/models/posts/updatePostStatus.model";
import { votePostModel } from "@/models/posts/votePost.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const postsRoutes = Router();

postsRoutes.post(
	"/",
	auth(),
	validateRequest(createPostModel),
	createPostController,
);

postsRoutes.get(
	"/b/:boardId",
	auth({
		allowPublic: true,
	}),
	validateRequest(getBoardPostsModel),
	getBoardPostsController,
);

postsRoutes.put(
	"/:postId/vote",
	auth(),
	validateRequest(votePostModel),
	votePostController,
);

postsRoutes.get(
	"/:postId",
	auth({
		allowPublic: true,
	}),
	validateRequest(getPostModel),
	getPostController,
);

postsRoutes.delete(
	"/:postId",
	auth(),
	validateRequest(deletePostModel),
	deletePostController,
);

postsRoutes.put(
	"/:postId/status",
	auth(),
	validateRequest(updatePostStatusModel),
	updatePostStatusController,
);
