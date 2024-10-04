import { createBoardController } from "@/controllers/boards/createBoard.controller";
import { getBoardController } from "@/controllers/boards/getBoard.controller";
import { getBoardsController } from "@/controllers/boards/getBoards.controller";
import { auth } from "@/middlewares/auth";
import { createBoardModel } from "@/models/boards/createBoard.model";
import { getBoardModel } from "@/models/boards/getBoard.model";
import { getBoardsModel } from "@/models/boards/getBoards.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const boardsRoutes = Router();

boardsRoutes.post(
	"/",
	auth(),
	validateRequest(createBoardModel),
	createBoardController,
);

boardsRoutes.get(
	"/:shortName",
	validateRequest(getBoardModel),
	getBoardController,
);

boardsRoutes.get(
	"/c/:shortName",
	validateRequest(getBoardsModel),
	getBoardsController,
);
