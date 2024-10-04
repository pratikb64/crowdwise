import { deleteComment, getCommentsByPost } from "@/services/comment.service";
import { deletePost, getPost, updatePostVote } from "@/services/post.service";
import { AsyncState } from "@/types";
import type { GetCommentsResponse, GetPostResponse } from "crowdwise-api/types";
import { createStore } from "zustand/vanilla";

export type PostState = {
	post?: GetPostResponse;
	comments: GetCommentsResponse;
	asyncStates: {
		toggleUpVoteAsyncState: AsyncState;
		getPostAsyncState: AsyncState;
		getCommentsAsyncState: AsyncState;
		deleteCommentAsyncState: AsyncState;
		deletePostAsyncState: AsyncState;
	};
};

export type PostActions = {
	toggleUpVoteAsync: (postId: string) => Promise<void>;
	getPostAsync: (postId: string) => Promise<void>;
	getCommentsAsync: (postId: string) => Promise<void>;
	deleteCommentAsync: (commentId: string) => Promise<void>;
	deletePostAsync: (postId: string) => Promise<void>;
};

export type PostStore = PostState & PostActions;

export const defaultInitState: PostState = {
	comments: [],
	asyncStates: {
		toggleUpVoteAsyncState: AsyncState.Idle,
		getPostAsyncState: AsyncState.Idle,
		getCommentsAsyncState: AsyncState.Idle,
		deleteCommentAsyncState: AsyncState.Idle,
		deletePostAsyncState: AsyncState.Idle,
	},
};

export const initPostStore = (): PostState => {
	return defaultInitState;
};

export const createPostStore = (initState: PostState = defaultInitState) => {
	return createStore<PostStore>()((set, get) => ({
		...initState,
		getPostAsync: async (postId) => {
			set((state) => ({
				asyncStates: {
					...state.asyncStates,
					getPostAsyncState: AsyncState.Pending,
				},
			}));
			try {
				const post = await getPost({ postId });
				if (post.status === 404) {
					throw new Error("Post not found");
				}
				set((state) => ({
					post: post.data,
					asyncStates: {
						...state.asyncStates,
						getPostAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						getPostAsyncState: AsyncState.Error,
					},
				}));
			}
		},
		toggleUpVoteAsync: async (postId) => {
			const previousPost = get().post;
			if (!previousPost) throw new Error("Post not found");
			set((state) => ({
				post: {
					...previousPost,
					isVotedByUser: !previousPost.isVotedByUser,
					votes: previousPost.isVotedByUser
						? previousPost.votes - 1
						: previousPost.votes + 1,
				},
				asyncStates: {
					...state.asyncStates,
					toggleUpVoteAsyncState: AsyncState.Pending,
				},
			}));
			try {
				const response = await updatePostVote({
					postId,
					vote: !previousPost.isVotedByUser,
				});
				if (response.status === 404) {
					throw new Error("Post not found");
				}
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						toggleUpVoteAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					post: previousPost,
					asyncStates: {
						...state.asyncStates,
						toggleUpVoteAsyncState: AsyncState.Error,
					},
				}));
			}
		},
		getCommentsAsync: async (postId) => {
			set((state) => ({
				asyncStates: {
					...state.asyncStates,
					getCommentsAsyncState: AsyncState.Pending,
				},
			}));
			try {
				const comments = await getCommentsByPost({ postId });
				if (comments.status === 404) {
					throw new Error("Comments not found");
				}
				set((state) => ({
					comments: comments.data || [],
					asyncStates: {
						...state.asyncStates,
						getCommentsAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						getCommentsAsyncState: AsyncState.Error,
					},
				}));
			}
		},
		deleteCommentAsync: async (commentId) => {
			const previousComments = get().comments;
			set((state) => ({
				asyncStates: {
					...state.asyncStates,
					deleteCommentAsyncState: AsyncState.Pending,
				},
			}));
			try {
				await deleteComment({ commentId });
				set((state) => ({
					comments: state.comments.filter(
						(comment) => comment.id !== commentId,
					),
					asyncStates: {
						...state.asyncStates,
						deleteCommentAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					comments: previousComments,
					asyncStates: {
						...state.asyncStates,
						deleteCommentAsyncState: AsyncState.Error,
					},
				}));
			}
		},
		deletePostAsync: async (postId) => {
			set((state) => ({
				asyncStates: {
					...state.asyncStates,
					deletePostAsyncState: AsyncState.Pending,
				},
			}));
			try {
				await deletePost({ postId });
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						deletePostAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						deletePostAsyncState: AsyncState.Error,
					},
				}));
			}
		},
	}));
};
