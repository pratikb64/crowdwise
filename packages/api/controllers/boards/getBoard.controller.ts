import { db } from "@/database";
import type {
	GetBoardRequest,
	GetBoardResponse,
} from "@/models/boards/getBoard.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const getBoardController: CustomRequestHandler<
	GetBoardRequest,
	GetBoardResponse
> = async (req, res) => {
	try {
		const { boardId } = req.params;

		const board = await db.query.boards.findFirst({
			where: (boards) => eq(boards.id, boardId),
		});

		if (!board) {
			return res.status(404).json({
				success: false,
				message: "Board not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Board found",
			data: {
				id: board.id,
				name: board.name,
				createdAt: board.createdAt,
				updatedAt: board.updatedAt,
			},
		});
	} catch (error) {
		console.log("🔴Uncaught error in getBoardController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
