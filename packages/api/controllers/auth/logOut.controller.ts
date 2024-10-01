import type { CustomRequestHandler } from "@/types";

export const logOutController: CustomRequestHandler = (_req, res) => {
	res.clearCookie("crowdwise-access-token");
	res.json({
		success: true,
		message: "Logged out successfully!",
		status: 200,
	});
};
