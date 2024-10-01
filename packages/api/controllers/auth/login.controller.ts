import { db } from "@/database";
import { AUTH_SECRET, JWT_SECRET, NODE_ENV } from "@/env";
import type { LoginRequest } from "@/models/auth/login.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { createHmac } from "node:crypto";

export const loginController: CustomRequestHandler<LoginRequest> = async (
	req,
	res,
) => {
	try {
		const { email, password } = req.body;

		const user = await db.query.users.findFirst({
			where: (users) => eq(users.email, email),
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
				status: 404,
			});
		}

		const password_hash = createHmac("sha256", AUTH_SECRET)
			.update(password)
			.digest("hex");

		if (user.password !== password_hash) {
			return res.status(400).json({
				success: false,
				message: "Incorrect password",
				status: 400,
			});
		}

		const thirtyDaysInSeconds = 24 * 60 * 60 * 30 * 1000;

		const token = jwt.sign(
			{
				id: user.id,
				email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			JWT_SECRET,
			{
				expiresIn: "7d",
			},
		);

		return res
			.cookie("crowdwise-access-token", token, {
				maxAge: thirtyDaysInSeconds,
				httpOnly: true,
				sameSite: "lax",
				secure: NODE_ENV === "production",
			})
			.json({
				success: true,
				message: "Logged in successfully!",
				status: 200,
			});
	} catch (error) {
		console.log("🔴Uncaught error in loginController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
