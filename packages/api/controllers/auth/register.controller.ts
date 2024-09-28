import { db } from "@/database";
import { users } from "@/database/schema/users";
import { AUTH_SECRET } from "@/env";
import type { RegisterRequest } from "@/models/auth/register.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";
import { createHmac } from "node:crypto";

export const registerController: CustomRequestHandler<RegisterRequest> = async (
	req,
	res,
) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const user = await db.query.users.findFirst({
			where: (users) => eq(users.email, email),
		});

		if (user) {
			return res.status(400).json({
				success: false,
				message: "User already exists",
			});
		}

		const password_hash = createHmac("sha256", AUTH_SECRET)
			.update(password)
			.digest("hex");

		await db.insert(users).values({
			id: crypto.randomUUID(),
			firstName,
			lastName,
			email,
			password: password_hash,
		});

		return res.status(201).json({
			success: true,
			message: "User registered successfully!",
		});
	} catch (error) {
		console.log("🔴Uncaught error in registerController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
