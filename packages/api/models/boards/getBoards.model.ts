import type { Board, ZodExpressSchema } from "@/types";
import { z } from "zod";

export const getBoardsRequestParams = z.object({
	shortName: z.string(),
});

export const getBoardsModel: ZodExpressSchema = {
	params: getBoardsRequestParams,
};

export type GetBoardsRequest = z.infer<typeof getBoardsRequestParams>;

export type GetBoardsResponse = Board[];
