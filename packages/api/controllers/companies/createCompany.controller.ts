import { db } from "@/database";
import { type Company, companies } from "@/database/schema/companies";
import { companyUsers } from "@/database/schema/company_users";
import type {
	CreateCompanyRequest,
	CreateCompanyResponse,
} from "@/models/companies/createCompany.model";
import type { CustomRequestHandler } from "@/types";

export const createCompanyController: CustomRequestHandler<
	CreateCompanyRequest,
	CreateCompanyResponse
> = async (req, res) => {
	try {
		const { name, shortName } = req.body;

		const newCompany: Company = {
			id: crypto.randomUUID(),
			name,
			shortName,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await db.insert(companies).values(newCompany);

		await db.insert(companyUsers).values({
			companyId: newCompany.id,
			userId: req.user!.id,
			role: "admin",
		});

		return res.status(201).json({
			success: true,
			message: "Company created successfully",
			status: 201,
			data: newCompany,
		});
	} catch (error) {
		console.log("🔴Uncaught error in createCompanyController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
