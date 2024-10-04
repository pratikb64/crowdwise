import { usePostStore } from "@/providers/PostStoreProvider";
import { AsyncState } from "@/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { CommentItem } from "./CommentItem";
import { LoadingIcon } from "./LoadingIcon";

export const CommentsList = () => {
	const { postId } = useParams<{ postId: string }>();
	const { comments, getCommentsAsync } = usePostStore((state) => state);
	const getCommentsAsyncState = usePostStore(
		(state) => state.asyncStates.getCommentsAsyncState,
	);

	useEffect(() => {
		if (postId) {
			getCommentsAsync(postId);
		}
	}, [postId]);

	if (getCommentsAsyncState === AsyncState.Pending) {
		return (
			<div>
				<LoadingIcon className="mx-auto size-10 animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{comments.length === 0 && (
				<div className="p-4 flex flex-col items-center justify-center text-sm">
					<span>No comments yet</span>
				</div>
			)}
			{comments.map((comment) => (
				<CommentItem
					key={comment.id}
					id={comment.id}
					content={comment.content}
					date={`${new Date(comment.createdAt).toLocaleDateString()} - ${new Date(
						comment.createdAt,
					).toLocaleTimeString()}`}
					user={comment.user}
				/>
			))}
		</div>
	);
};
