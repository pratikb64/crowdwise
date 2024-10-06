"use client";
import { AdminPostDetails } from "@/components/AdminPostDetails";
import { CommentsList } from "@/components/CommentsList";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function AdminSingleBoardPost() {
	const { postId } = useParams<{
		postId: string;
	}>();
	const { getPostAsync, activePost } = useCompanyStore((state) => state);
	const getPostAsyncState = useCompanyStore(
		(state) => state.asyncStates.getPostAsyncState,
	);

	useEffect(() => {
		getPostAsync(postId);
	}, []);

	const isPostBeingFetched =
		getPostAsyncState === AsyncState.Pending ||
		getPostAsyncState === AsyncState.Idle;

	if (isPostBeingFetched) {
		return (
			<div className="flex items-center justify-center my-2.5 h-28 flex-1">
				<LoadingIcon className="size-10 animate-spin" />
			</div>
		);
	}

	return (
		<div className="p-4 pl-6 flex-1 flex flex-col">
			{getPostAsyncState === AsyncState.Success && activePost && (
				<>
					<div className="w-full text-xl font-semibold py-1">
						<div>{activePost.title}</div>
					</div>
					<hr className="mt-2 -mx-4 -ml-6" />
					<div className="flex w-full h-full">
						<div className="w-full flex-1 flex flex-col">
							{activePost?.content?.trim() && (
								<div>
									<div className="font-semibold text-sm pt-4">Description</div>
									<pre className="text-sm font-sans text-wrap pt-2 pb-4 pr-4">
										{activePost?.content}
									</pre>
								</div>
							)}
							<div className="font-semibold text-sm py-2">Comments</div>
							<div className="overflow-auto flex flex-col flex-1 scrollbar">
								<CommentsList />
							</div>
						</div>
						<AdminPostDetails />
					</div>
				</>
			)}
		</div>
	);
}
