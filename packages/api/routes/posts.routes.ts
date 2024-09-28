import { createPostController } from "@/controllers/posts/createPost.controller";
import { getBoardPostsController } from "@/controllers/posts/getBoardPosts.controller";
import { getPostController } from "@/controllers/posts/getPost.controller";
import { votePostController } from "@/controllers/posts/votePost.controller";
import { checkAuth } from "@/middlewares/checkAuth";
import { createPostModel } from "@/models/posts/createPost.model";
import { getBoardPostsModel } from "@/models/posts/getBoardPosts.model";
import { getPostModel } from "@/models/posts/getPost.model";
import { votePostModel } from "@/models/posts/votePost.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const postsRoutes = Router();

postsRoutes.post(
	"/",
	checkAuth,
	validateRequest(createPostModel),
	createPostController,
);

postsRoutes.get(
	"/b/:boardId",
	validateRequest(getBoardPostsModel),
	getBoardPostsController,
);

postsRoutes.put(
	"/:postId/vote",
	checkAuth,
	validateRequest(votePostModel),
	votePostController,
);

postsRoutes.get("/:postId", validateRequest(getPostModel), getPostController);
