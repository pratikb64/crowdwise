import { AuthDropdown } from "@/components/AuthDropdown";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useSession } from "@/hooks/useSession";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import { EnvelopeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./ui/button";

export const CompanyNavbar = () => {
	const { session } = useSession();
	const { company, getCompanyAsync } = useCompanyStore((state) => state);
	const { companyUrl } = useParams<{ companyUrl: string }>();
	const getCompanyAsyncState = useCompanyStore(
		(state) => state.asyncStates.getCompanyAsyncState,
	);
	const router = useRouter();

	useEffect(() => {
		if (companyUrl) {
			getCompanyAsync(companyUrl);
		}
	}, [companyUrl]);

	return (
		<div className="w-full border-b border-gray-300">
			<div className="flex justify-between w-full max-w-5xl py-4 mx-auto">
				<div>
					{getCompanyAsyncState === AsyncState.Error && (
						<Link href="/">
							<div className="text-xl font-bold">Crowdwise</div>
						</Link>
					)}
					{getCompanyAsyncState === AsyncState.Pending ||
					getCompanyAsyncState === AsyncState.Idle ? (
						<LoadingIcon className="size-6 animate-spin" />
					) : (
						<Link href={`/c/${companyUrl}`}>
							<div className="text-xl font-bold">{company?.name}</div>
						</Link>
					)}
				</div>
				<div className="flex gap-3">
					{session?.company?.shortName === companyUrl && (
						<Button
							variant="default"
							className="flex gap-2 px-3 py-1 rounded-full"
							onClick={() => router.push(`/admin/c/${companyUrl}/feedback`)}
						>
							<EyeOpenIcon className="size-4" />
							Admin View
						</Button>
					)}
					<AuthDropdown />
				</div>
			</div>
			<div className="flex w-full max-w-5xl gap-4 mx-auto">
				<div className="flex items-center gap-2 px-3 pb-2 text-sm font-semibold text-black border-b-2 border-b-black">
					<EnvelopeClosedIcon className="size-4" />
					Feedback
				</div>
			</div>
		</div>
	);
};
