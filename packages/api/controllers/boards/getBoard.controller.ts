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
		const { shortName } = req.params;

		const board = await db.query.boards.findFirst({
			where: (boards) => eq(boards.shortName, shortName),
		});

		if (!board) {
			return res.status(404).json({
				success: false,
				message: "Board not found",
				status: 404,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Board found",
			status: 200,
			data: {
				id: board.id,
				name: board.name,
				shortName: board.shortName,
				companyId: board.companyId,
				createdAt: board.createdAt,
				updatedAt: board.updatedAt,
			},
		});
	} catch (error) {
		console.log("🔴Uncaught error in getBoardController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
