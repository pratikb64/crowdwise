import { LoadingIcon } from "@/components/LoadingIcon";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { CardStackIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { PostItem } from "./PostItem";

export const PostList = () => {
	const { getPostsAsync, activeBoard, posts, company } = useCompanyStore(
		(state) => state,
	);
	const getPostsAsyncState = useCompanyStore(
		(state) => state.asyncStates.getPostsAsyncState,
	);

	useEffect(() => {
		if (!activeBoard) return;
		getPostsAsync(activeBoard?.id);
	}, [activeBoard]);

	return (
		<div>
			{posts.length === 0 && getPostsAsyncState !== AsyncState.Pending && (
				<div className="p-4 flex flex-col items-center justify-center">
					<CardStackIcon className="text-black size-9" />
					<span>Posts not found.</span>
				</div>
			)}
			<div>
				{posts.map((post) => (
					<PostItem
						id={post.id}
						active={post.isVotedByUser}
						status={post.status}
						title={post.title}
						key={post.id}
						votes={post.votes}
						commentsCount={post.commentsCount}
						url={`/c/${company?.shortName}/p/${post.id}`}
					/>
				))}
				{getPostsAsyncState === AsyncState.Pending && (
					<div className="py-6">
						<LoadingIcon className="mx-auto size-10 animate-spin" />
					</div>
				)}
			</div>
		</div>
	);
};
