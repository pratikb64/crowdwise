import { createCompanyController } from "@/controllers/companies/createCompany.controller";
import { getCompanyController } from "@/controllers/companies/getCompany.controller";
import { checkAuth } from "@/middlewares/checkAuth";
import { createCompanyModel } from "@/models/companies/createCompany.model";
import { getCompanyModel } from "@/models/companies/getCompany.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const companiesRoutes = Router();

companiesRoutes.post(
	"/",
	checkAuth,
	validateRequest(createCompanyModel),
	createCompanyController,
);

companiesRoutes.get(
	"/:companyId",
	validateRequest(getCompanyModel),
	getCompanyController,
);
