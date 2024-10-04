import { deleteCommentController } from "@/controllers/comments/deleteComment.controller";
import { getCommentsController } from "@/controllers/comments/getComments.controller";
import { postCommentController } from "@/controllers/comments/postComment.controller";
import { auth } from "@/middlewares/auth";
import { deleteCommentModel } from "@/models/comments/deleteComment.model";
import { getCommentsModel } from "@/models/comments/getComments.model";
import { postCommentModel } from "@/models/comments/postComment.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const commentsRoutes = Router();

commentsRoutes.post(
	"/",
	auth(),
	validateRequest(postCommentModel),
	postCommentController,
);

commentsRoutes.get(
	"/p/:postId",
	validateRequest(getCommentsModel),
	getCommentsController,
);

commentsRoutes.delete(
	"/:commentId",
	auth(),
	validateRequest(deleteCommentModel),
	deleteCommentController,
);
