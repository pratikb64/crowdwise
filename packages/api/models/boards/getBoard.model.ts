import type { ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getBoardRequestParams = z.object({
	boardId: z.string(),
});

export const getBoardModel: ZodExpressSchema = {
	params: getBoardRequestParams,
};

export type GetBoardRequest = z.infer<typeof getBoardRequestParams>;

export type GetBoardResponse = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};
