import type { Board, ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getBoardRequestParams = z.object({
	shortName: z.string(),
});

export const getBoardModel: ZodExpressSchema = {
	params: getBoardRequestParams,
};

export type GetBoardRequest = z.infer<typeof getBoardRequestParams>;

export type GetBoardResponse = Board;
