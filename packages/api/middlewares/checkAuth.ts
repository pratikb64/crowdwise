import { JWT_SECRET } from "@/env";
import type { CookiePayload, CustomRequestHandler } from "@/types";
import jwt from "jsonwebtoken";

export const checkAuth: CustomRequestHandler = async (req, res, next) => {
	const token =
		req.cookies["crowdwise-access-token"] ||
		req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized",
			status: 401,
		});
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		req.user = decoded as CookiePayload;

		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
			status: 500,
		});
	}
};
