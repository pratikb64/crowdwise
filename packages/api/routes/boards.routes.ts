import { createBoardController } from "@/controllers/boards/createBoard.controller";
import { getBoardController } from "@/controllers/boards/getBoard.controller";
import { checkAuth } from "@/middlewares/checkAuth";
import { createBoardModel } from "@/models/boards/createBoard.model";
import { getBoardModel } from "@/models/boards/getBoard.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const boardsRoutes = Router();

boardsRoutes.post(
	"/",
	checkAuth,
	validateRequest(createBoardModel),
	createBoardController,
);

boardsRoutes.get(
	"/:boardId",
	validateRequest(getBoardModel),
	getBoardController,
);
