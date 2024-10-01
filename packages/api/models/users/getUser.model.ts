import type { Company } from "@/database/schema/companies";

export type GetUserResponse = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
	company?: Company;
};
