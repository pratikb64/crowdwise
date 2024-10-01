import { db } from "@/database";
import type {
	GetCompanyRequest,
	GetCompanyResponse,
} from "@/models/companies/getCompany.model";
import type { CustomRequestHandler } from "@/types";
import { eq } from "drizzle-orm";

export const getCompanyController: CustomRequestHandler<
	GetCompanyRequest,
	GetCompanyResponse
> = async (req, res) => {
	try {
		const { shortName } = req.params;

		const company = await db.query.companies.findFirst({
			where: (companies) => eq(companies.shortName, shortName),
		});

		if (!company) {
			return res.status(404).json({
				success: false,
				message: "Company not found",
				status: 404,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Company found",
			status: 200,
			data: {
				id: company.id,
				name: company.name,
				shortName: company.shortName,
				createdAt: company.createdAt,
				updatedAt: company.updatedAt,
			},
		});
	} catch (error) {
		console.log("🔴Uncaught error in getCompanyController🔴 : ", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			status: 500,
		});
	}
};
