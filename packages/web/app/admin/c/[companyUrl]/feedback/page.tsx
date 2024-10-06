"use client";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { redirect, useParams } from "next/navigation";

export default function page() {
	const { companyUrl } = useParams<{
		companyUrl: string;
	}>();
	const { posts } = useCompanyStore((state) => state);
	const getPostsAsyncState = useCompanyStore(
		(state) => state.asyncStates.getPostsAsyncState,
	);

	if (
		getPostsAsyncState === AsyncState.Idle ||
		getPostsAsyncState === AsyncState.Pending
	) {
		return (
			<div className="flex items-center justify-center flex-1">
				<LoadingIcon className="size-10 animate-spin" />
			</div>
		);
	}

	if (posts.length > 0) {
		redirect(`/admin/c/${companyUrl}/feedback/p/${posts[0].id}`);
	}

	return <></>;
}
