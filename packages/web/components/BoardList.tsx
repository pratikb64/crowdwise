import { LoadingIcon } from "@/components/LoadingIcon";
import { cn } from "@/lib/utils";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import type { Board } from "crowdwise-api/types";
import { useEffect } from "react";

export const BoardList = () => {
	const {
		company,
		boards,
		activeBoard,
		setActiveBoard,
		getBoardsAsync,
		resetPosts,
	} = useCompanyStore((state) => state);
	const getBoardsAsyncState = useCompanyStore(
		(state) => state.asyncStates.getBoardsAsyncState,
	);

	const onBoardChange = (board: Board) => {
		setActiveBoard(board);
		resetPosts();
	};

	useEffect(() => {
		if (company) {
			getBoardsAsync(company.shortName);
		}
	}, [company]);

	return (
		<div className="flex flex-col gap-1">
			{boards.map((board) => (
				<button
					type="button"
					className={cn(
						"p-2 px-3 text-sm rounded-md cursor-pointer text-start",
						board.id === activeBoard?.id && "bg-zinc-200",
						board.id !== activeBoard?.id && "hover:bg-zinc-100",
					)}
					key={board.id}
					onClick={() => onBoardChange(board)}
				>
					{board.name}
				</button>
			))}
			{(getBoardsAsyncState === AsyncState.Idle ||
				getBoardsAsyncState === AsyncState.Pending) && (
				<div className="w-full">
					<LoadingIcon className="mx-auto size-10 animate-spin" />
				</div>
			)}
		</div>
	);
};
