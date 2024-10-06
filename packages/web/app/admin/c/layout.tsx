"use client";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useSession } from "@/hooks/useSession";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { toast } from "sonner";

export default function layout({ children }: { children: ReactNode }) {
	const { companyUrl } = useParams<{ companyUrl: string }>();
	const { getCompanyAsync } = useCompanyStore((state) => state);
	const getCompanyAsyncState = useCompanyStore(
		(state) => state.asyncStates.getCompanyAsyncState,
	);
	const { session, isLoading } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (companyUrl) {
			getCompanyAsync(companyUrl);
		}
	}, [companyUrl]);

	if (getCompanyAsyncState === AsyncState.Pending || isLoading) {
		return (
			<div className="flex flex-col items-center justify-center mt-28">
				<LoadingIcon className="size-10 animate-spin" />
			</div>
		);
	}

	if (!isLoading && !session) {
		toast.error("Please login to access this page");
		router.push(`/login?redirect=${location.pathname}`);
		return <></>;
	}

	if (!session?.company) {
		toast.info("Please complete onboarding process to access this page");
		router.push("/onboarding");
		return <></>;
	}

	if (!companyUrl) {
		router.push(`/admin/c/${session.company.shortName}`);
		return <></>;
	}

	if (session.company.shortName !== companyUrl) {
		toast.info("You are not authorized to access this page");
		router.push(`/c/${session.company.shortName}`);
		return <></>;
	}

	return children;
}
