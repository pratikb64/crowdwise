import {
	pgEnum,
	pgTable,
	primaryKey,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { users } from "./users";

export const userRoleEnum = pgEnum("user_role", [
	"admin",
	"member",
	"contributor",
]);

export const companyUsers = pgTable(
	"company_users",
	{
		companyId: varchar("company_id", { length: 50 })
			.references(() => companies.id, {
				onDelete: "cascade",
			})
			.notNull(),
		userId: varchar("user_id", { length: 50 })
			.references(() => users.id, {
				onDelete: "cascade",
			})
			.notNull(),
		role: userRoleEnum("role").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(companyUsers) => {
		return {
			companyUserPK: primaryKey({
				columns: [
					companyUsers.companyId,
					companyUsers.userId,
					companyUsers.role,
				],
				name: "company_user_role_pk",
			}),
		};
	},
);

export type CompanyUser = typeof companyUsers.$inferSelect;

export type UserRole = (typeof userRoleEnum.enumValues)[number];
