import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { CardStackIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { LoadingIcon } from "./LoadingIcon";
import { PostItem } from "./PostItem";

export const AdminPostList = () => {
	const { getPostsAsync, activeBoard, posts, activePost, company } =
		useCompanyStore((state) => state);
	const getPostsAsyncState = useCompanyStore(
		(state) => state.asyncStates.getPostsAsyncState,
	);
	const [highlightedPost, setHighlightedPost] = useState(activePost?.id);

	useEffect(() => {
		if (activePost) {
			setHighlightedPost(activePost.id);
		}
	}, [activePost]);

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
						url={`/admin/c/${company?.shortName}/feedback/p/${post.id}`}
						isHighlighted={post.id === highlightedPost}
						onClick={() => setHighlightedPost(post.id)}
					/>
				))}
			</div>
			{getPostsAsyncState === AsyncState.Pending && (
				<div className="py-6">
					<LoadingIcon className="mx-auto size-10 animate-spin" />
				</div>
			)}
		</div>
	);
};
