import type { RequestHandler } from "express";

export const homeController: RequestHandler = async (_, res) => {
	res.send({
		message: "Crowdwise API",
	});
};
