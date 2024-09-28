import { getCommentsController } from "@/controllers/comments/getComments.controller";
import { postCommentController } from "@/controllers/comments/postComment.controller";
import { checkAuth } from "@/middlewares/checkAuth";
import { getCommentsModel } from "@/models/comments/getComments.model";
import { postCommentModel } from "@/models/comments/postComment.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const commentsRoutes = Router();

commentsRoutes.post(
	"/",
	checkAuth,
	validateRequest(postCommentModel),
	postCommentController,
);

commentsRoutes.get(
	"/p/:postId",
	validateRequest(getCommentsModel),
	getCommentsController,
);
