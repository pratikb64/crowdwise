import { db } from "@/database";
import type { Company } from "@/database/schema/companies";
import type { GetUserResponse } from "@/models/users/getUser.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const getUserController: CustomRequestHandler<
	any,
	GetUserResponse
> = async (req, res) => {
	try {
		const user = await db.query.users.findFirst({
			where: (users) => eq(users.id, req.user!.id),
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
				status: 404,
			});
		}

		const userCompanyId = await db.query.companyUsers.findFirst({
			where: (companyUsers) => eq(companyUsers.userId, user.id),
		});

		let company: Company | undefined;
		if (userCompanyId) {
			company = await db.query.companies.findFirst({
				where: (companies) => eq(companies.id, userCompanyId.companyId),
			});
		}

		return res.status(200).json({
			success: true,
			message: "User found",
			status: 200,
			data: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				company,
			},
		});
	} catch (error) {
		console.log("🔴Uncaught error in getUserController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
