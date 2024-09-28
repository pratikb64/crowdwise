import { db } from "@/database";
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
			});
		}

		return res.status(200).json({
			success: true,
			message: "User found",
			data: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error) {
		console.log("🔴Uncaught error in getUserController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
