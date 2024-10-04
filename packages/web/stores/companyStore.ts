import { getBoardsByCompany } from "@/services/board.service";
import { getCompany } from "@/services/company.service";
import {
	getPost,
	getPostsByBoard,
	updatePostVote,
} from "@/services/post.service";
import { AsyncState } from "@/types";
import type {
	Board,
	Company,
	GetBoardPostsResponse,
	GetPostResponse,
} from "crowdwise-api/types";
import { createStore } from "zustand/vanilla";

export type CompanyState = {
	company?: Company;
	boards: Board[];
	activeBoard?: Board;
	posts: GetBoardPostsResponse;
	activePost?: GetPostResponse;
	asyncStates: {
		getCompanyAsyncState: AsyncState;
		getBoardsAsyncState: AsyncState;
		getPostsAsyncState: AsyncState;
		toggleUpVoteAsyncState: AsyncState;
		getPostAsyncState: AsyncState;
	};
};

export type CompanyActions = {
	getCompanyAsync: (shortName: string) => Promise<void>;
	getBoardsAsync: (shortName: string) => Promise<void>;
	setActiveBoard: (board: Board) => void;
	getPostsAsync: (boardId: string) => Promise<void>;
	toggleUpVoteAsync: (postId: string) => Promise<void>;
	getPostAsync: (postId: string) => Promise<void>;
	resetPosts: () => void;
};

export type CompanyStore = CompanyState & CompanyActions;

export const defaultInitState: CompanyState = {
	boards: [],
	posts: [],
	asyncStates: {
		getCompanyAsyncState: AsyncState.Idle,
		getBoardsAsyncState: AsyncState.Idle,
		getPostsAsyncState: AsyncState.Idle,
		toggleUpVoteAsyncState: AsyncState.Idle,
		getPostAsyncState: AsyncState.Idle,
	},
};

export const initCompanyStore = (): CompanyState => {
	return defaultInitState;
};

export const createCompanyStore = (
	initState: CompanyState = defaultInitState,
) => {
	return createStore<CompanyStore>()((set, get) => ({
		...initState,
		setActiveBoard: (board: Board) => {
			set(() => ({
				activeBoard: board,
			}));
		},
		resetPosts: () => {
			set(() => ({
				posts: [],
			}));
		},
		getCompanyAsync: async (shortName) => {
			set((state) => ({
				asyncStates: {
					...state.asyncStates,
					getCompanyAsyncState: AsyncState.Pending,
				},
			}));
			try {
				const company = await getCompany({ shortName });
				if (company.status === 404) {
					throw new Error("Company not found");
				}
				set((state) => ({
					company: company.data,
					asyncStates: {
						...state.asyncStates,
						getCompanyAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						getCompanyAsyncState: AsyncState.Error,
					},
				}));
			}
		},
		getBoardsAsync: async (shortName) => {
			set((state) => ({
				asyncStates: {
					...state.asyncStates,
					getBoardsAsyncState: AsyncState.Pending,
				},
			}));
			try {
				const boards = await getBoardsByCompany({ shortName });
				set((state) => ({
					boards: boards.data || [],
					activeBoard: boards.data?.[0] || undefined,
					asyncStates: {
						...state.asyncStates,
						getBoardsAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						getBoardsAsyncState: AsyncState.Error,
					},
				}));
			}
		},
		getPostsAsync: async (boardId) => {
			set((state) => ({
				asyncStates: {
					...state.asyncStates,
					getPostsAsyncState: AsyncState.Pending,
				},
			}));
			try {
				const posts = await getPostsByBoard({ boardId });

				set((state) => ({
					posts: posts.data || [],
					asyncStates: {
						...state.asyncStates,
						getPostsAsyncState: AsyncState.Success,
					},
				}));
			} catch (error) {
				set((state) => ({
					asyncStates: {
						...state.asyncStates,
						getPostsAsyncState: AsyncState.Error,
					},
				}));
			}
		},
		toggleUpVoteAsync: async (postId) => {
			const previousPost = get().posts.find((post) => post.id === postId);
			if (!previousPost) throw new Error("Post not found");
			set((state) => ({
				posts: state.posts.map((post) =>
					post.id === postId
						? {
								...post,
								isVotedByUser: !post.isVotedByUser,
								votes: post.isVotedByUser ? post.votes - 1 : post.votes + 1,
							}
						: post,
				),
				asyncStates: {
					...state.asyncStates,
					toggleUpVoteAsyncState: AsyncState.Pending,
				},
			}));
			try {
				const response = await updatePostVote({
					postId: postId,
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
					posts: state.posts.map((post) =>
						post.id === postId ? previousPost : post,
					),
					asyncStates: {
						...state.asyncStates,
						toggleUpVoteAsyncState: AsyncState.Error,
					},
				}));
			}
		},
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
					activePost: post.data,
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
	}));
};
