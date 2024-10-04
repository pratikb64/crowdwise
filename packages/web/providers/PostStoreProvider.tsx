import type { PostStore } from "@/stores/postStore";
import { createPostStore, initPostStore } from "@/stores/postStore";
import type { ReactNode } from "react";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type PostStoreApi = ReturnType<typeof createPostStore>;

export const PostStoreContext = createContext<PostStoreApi | undefined>(
	undefined,
);

export interface PostStoreProviderProps {
	children: ReactNode;
}

export const PostStoreProvider = ({ children }: PostStoreProviderProps) => {
	const storeRef = useRef<PostStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createPostStore(initPostStore());
	}

	return (
		<PostStoreContext.Provider value={storeRef.current}>
			{children}
		</PostStoreContext.Provider>
	);
};

export const usePostStore = <T,>(selector: (store: PostStore) => T): T => {
	const postStoreContext = useContext(PostStoreContext);

	if (!postStoreContext) {
		throw new Error("usePostStore must be used within PostStoreProvider");
	}

	return useStore(postStoreContext, selector);
};
