import { JWT_SECRET } from "@/env";
import type { CookiePayload, CustomRequestHandler } from "@/types";
import jwt from "jsonwebtoken";

interface AuthArgs {
	allowPublic: boolean;
}

export const auth = (args?: AuthArgs) => {
	const checkAuth: CustomRequestHandler = async (req, res, next) => {
		const token =
			req.cookies["crowdwise-access-token"] ||
			req.headers.authorization?.split(" ")[1];

		if (!token && !args?.allowPublic) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
				status: 401,
			});
		}

		try {
			if (token) {
				const decoded = jwt.verify(token, JWT_SECRET);

				req.user = decoded as CookiePayload;
			}

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

	return checkAuth;
};
