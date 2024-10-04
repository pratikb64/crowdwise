"use client";
import { BoardList } from "@/components/BoardList";
import { CreatePost } from "@/components/CreatePost";
import { LoadingIcon } from "@/components/LoadingIcon";
import { PostList } from "@/components/PostList";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";

export default function CompanyPage() {
	const { activeBoard } = useCompanyStore((state) => state);
	const getCompanyAsyncState = useCompanyStore(
		(state) => state.asyncStates.getCompanyAsyncState,
	);
	const getBoardsAsyncState = useCompanyStore(
		(state) => state.asyncStates.getBoardsAsyncState,
	);

	return (
		<div className="flex flex-col md:flex-row gap-8 mt-8">
			<div className="w-full md:w-72">
				<span className="ml-3 text-xs font-bold text-gray-400">BOARDS</span>
				<div className="mt-2">
					<BoardList />
				</div>
			</div>
			<div className="flex-grow">
				{getCompanyAsyncState === AsyncState.Success &&
					getBoardsAsyncState === AsyncState.Success &&
					activeBoard && (
						<>
							<div className="font-semibold">{activeBoard.name}</div>
							<div className="mt-4">
								<CreatePost />
							</div>
							<div className="mt-4">
								<PostList />
							</div>
						</>
					)}
				{(getBoardsAsyncState === AsyncState.Pending ||
					getCompanyAsyncState === AsyncState.Pending) && (
					<LoadingIcon className="mx-auto size-10 animate-spin" />
				)}
			</div>
		</div>
	);
}
