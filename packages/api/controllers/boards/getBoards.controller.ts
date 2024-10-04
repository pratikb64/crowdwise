import { db } from "@/database";
import type {
	GetBoardsRequest,
	GetBoardsResponse,
} from "@/models/boards/getBoards.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const getBoardsController: CustomRequestHandler<
	GetBoardsRequest,
	GetBoardsResponse
> = async (req, res) => {
	try {
		const { shortName } = req.params;

		const company = await db.query.companies.findFirst({
			where: (companies) => eq(companies.shortName, shortName),
		});

		if (!company) {
			return res.status(404).json({
				success: false,
				message: "Company not found",
				status: 404,
			});
		}

		const boards = await db.query.boards.findMany({
			where: (boards) => eq(boards.companyId, company.id),
		});

		return res.status(200).json({
			success: true,
			message: "Boards found",
			status: 200,
			data: boards,
		});
	} catch (error) {
		console.log("🔴Uncaught error in getBoardsController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
