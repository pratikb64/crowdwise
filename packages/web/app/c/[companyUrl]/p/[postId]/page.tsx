"use client";
import { BadgeRenderer } from "@/components/BadgeRenderer";
import { CommentsList } from "@/components/CommentsList";
import { LoadingIcon } from "@/components/LoadingIcon";
import { LeaveAComment } from "@/components/PostComment";
import { PostInfo } from "@/components/PostInfo";
import { PostVoteButton } from "@/components/PostVoteButton";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { usePostStore } from "@/providers/PostStoreProvider";
import { AsyncState } from "@/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PostPage() {
	const { postId, companyUrl } = useParams<{
		postId: string;
		companyUrl: string;
	}>();
	const router = useRouter();
	const { session } = useSession();
	const { post, getPostAsync, toggleUpVoteAsync, deletePostAsync } =
		usePostStore((state) => state);
	const getPostAsyncState = usePostStore(
		(state) => state.asyncStates.getPostAsyncState,
	);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		if (postId) {
			getPostAsync(postId);
		}
	}, [postId]);

	if (
		!post &&
		getPostAsyncState !== AsyncState.Pending &&
		getPostAsyncState !== AsyncState.Idle
	) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="mt-32 text-center">
					<h1 className="text-6xl font-bold">404</h1>
					<p className="mb-6 text-2xl font-bold">Post not found</p>
					<Link href="/">
						<Button variant="default">Go back</Button>
					</Link>
				</div>
			</div>
		);
	}

	const onDeletePost = async () => {
		if (isDeleting) {
			const loadingToastId = toast.loading("Deleting post...");
			try {
				await deletePostAsync(postId);
				toast.success("Post deleted successfully", {
					id: loadingToastId,
				});
				router.push(`/c/${companyUrl}`);
			} catch (error) {
				toast.error("Failed to delete post", {
					id: loadingToastId,
				});
			}
			return;
		}
		setIsDeleting(true);
		setTimeout(() => {
			setIsDeleting(false);
		}, 3000);
	};

	const isPostBeingFetched =
		getPostAsyncState === AsyncState.Pending ||
		getPostAsyncState === AsyncState.Idle;

	return (
		<div className="flex flex-col md:flex-row gap-8 mt-8">
			<div className="p-4 px-4 border border-gray-300 rounded-md shadow-sm min-w-72 h-max min-h-40">
				{getPostAsyncState === AsyncState.Success && post && (
					<PostInfo
						firstName={post.author?.firstName || ""}
						lastName={post.author?.lastName || ""}
						postedOn={new Date(post.createdAt).toDateString()}
					/>
				)}
				{isPostBeingFetched && (
					<div className="flex items-center justify-center my-2.5 h-28">
						<LoadingIcon className="size-10 animate-spin" />
					</div>
				)}
			</div>
			{getPostAsyncState === AsyncState.Success && post && (
				<div className="w-full">
					<div className="flex gap-4">
						<div className="w-10 mt-1">
							<PostVoteButton
								id={post.id}
								active={post.isVotedByUser}
								votes={post.votes}
								onClick={toggleUpVoteAsync}
							/>
						</div>
						<div className="w-full">
							<div className="text-xl font-semibold">{post.title}</div>
							<div className="flex items-center justify-between">
								<BadgeRenderer state={post.status} />
								{post.author?.id === session?.id && (
									<button
										type="button"
										className="text-red-500 hover:text-red-700"
										onClick={onDeletePost}
									>
										{isDeleting ? (
											<span className="text-xs">Are you sure?</span>
										) : (
											<span className="text-xs">Delete Post</span>
										)}
									</button>
								)}
							</div>
						</div>
					</div>
					<div className="mt-4 md:ml-14">
						<pre className="text-sm text-gray-700 font-sans text-wrap">
							{post.content}
						</pre>
						<div className="mt-12">
							<LeaveAComment />
						</div>
						<div className="mt-10 font-semibold text-gray-700">Comments</div>
					</div>
					<CommentsList />
				</div>
			)}
			{isPostBeingFetched && (
				<div className="flex items-center justify-center w-full">
					<LoadingIcon className="size-10 animate-spin" />
				</div>
			)}
		</div>
	);
}
