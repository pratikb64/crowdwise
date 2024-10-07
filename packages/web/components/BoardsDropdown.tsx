import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export const BoardsDropdown = () => {
	const [value, setValue] = React.useState<string | undefined>(undefined);

	const { company, boards, setActiveBoard, getBoardsAsync } = useCompanyStore(
		(state) => state,
	);
	const getBoardsAsyncState = useCompanyStore(
		(state) => state.asyncStates.getBoardsAsyncState,
	);

	const onBoardChange = async (board: string | undefined) => {
		const boardItem = boards.find((b) => b.id === board);
		setValue(board);
		if (boardItem) {
			setActiveBoard(boardItem);
		}
	};

	useEffect(() => {
		if (company) {
			getBoardsAsync(company.shortName);
		}
	}, [company]);

	useEffect(() => {
		if (boards.length > 0) {
			setValue(boards[0].id);
			setActiveBoard(boards[0]);
		}
	}, [boards]);

	return (
		<div className="flex gap-2">
			<Select value={value} onValueChange={onBoardChange}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select a board" />
				</SelectTrigger>
				<SelectContent>
					{boards.map((board) => (
						<SelectItem key={board.id} value={board.id}>
							{board.name}
						</SelectItem>
					))}
					{(getBoardsAsyncState === AsyncState.Idle ||
						getBoardsAsyncState === AsyncState.Pending) && (
						<SelectItem value="loading">Loading</SelectItem>
					)}
				</SelectContent>
			</Select>
			<Link href={`/c/${company?.shortName}`} target="_blank">
				<Button variant="default" className="bg-primary text-xs p-2">
					<ExternalLinkIcon className="size-4" />
				</Button>
			</Link>
		</div>
	);
};
