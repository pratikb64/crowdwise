import { LoadingIcon } from "@/components/LoadingIcon";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { CardStackIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { PostItem } from "./PostItem";

export const PostList = () => {
	const getPostsAsync = useCompanyStore((state) => state.getPostsAsync);
	const getPostsAsyncState = useCompanyStore(
		(state) => state.asyncStates.getPostsAsyncState,
	);
	const activeBoard = useCompanyStore((state) => state.activeBoard);
	const posts = useCompanyStore((state) => state.posts);

	useEffect(() => {
		if (!activeBoard) return;
		getPostsAsync(activeBoard?.id);
	}, [activeBoard]);

	return (
		<div className="mb-8 border border-gray-300 rounded-md">
			<div className="w-full p-4 bg-zinc-50 rounded-md">Recent Posts</div>
			{posts.length === 0 && getPostsAsyncState !== AsyncState.Pending && (
				<div className=" p-4 border-t border-gray-300 shadow-sm flex flex-col items-center justify-center">
					<CardStackIcon className="text-black size-9" />
					<span>Create a post to get started.</span>
				</div>
			)}
			{getPostsAsyncState === AsyncState.Pending && (
				<div className="py-6 border-t border-gray-300">
					<LoadingIcon className="mx-auto size-10 animate-spin" />
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
					/>
				))}
			</div>
		</div>
	);
};
