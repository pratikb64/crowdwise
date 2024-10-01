import { db } from "@/database";
import { type Board, boards } from "@/database/schema/boards";
import type { CreateBoardRequest } from "@/models/boards/createBoard.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const createBoardController: CustomRequestHandler<
	CreateBoardRequest
> = async (req, res) => {
	try {
		const { name, companyId, shortName } = req.body;

		const company = await db.query.companies.findFirst({
			where: (companies) => eq(companies.id, companyId),
		});

		if (!company) {
			return res.status(404).json({
				success: false,
				message: "Company not found",
				status: 404,
			});
		}

		const newBoard: Board = {
			id: crypto.randomUUID(),
			name,
			shortName,
			companyId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await db.insert(boards).values(newBoard).returning();

		return res.status(201).json({
			success: true,
			message: "Board created successfully",
			status: 201,
		});
	} catch (error) {
		console.log("🔴Uncaught error in createBoardController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
