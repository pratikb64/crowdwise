import type { CustomRequestHandler } from "../types";

export const homeController: CustomRequestHandler = async (_, res) => {
	return res.send({
		success: true,
		message: "Crowdwise API server",
	});
};
