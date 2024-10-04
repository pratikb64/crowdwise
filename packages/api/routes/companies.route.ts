import { createCompanyController } from "@/controllers/companies/createCompany.controller";
import { getCompanyController } from "@/controllers/companies/getCompany.controller";
import { auth } from "@/middlewares/auth";
import { createCompanyModel } from "@/models/companies/createCompany.model";
import { getCompanyModel } from "@/models/companies/getCompany.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const companiesRoutes = Router();

companiesRoutes.post(
	"/",
	auth(),
	validateRequest(createCompanyModel),
	createCompanyController,
);

companiesRoutes.get(
	"/:shortName",
	validateRequest(getCompanyModel),
	getCompanyController,
);
