import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { AsyncState } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AuthDropdown } from "./AuthDropdown";
import { LoadingIcon } from "./LoadingIcon";

export const AdminNavbar = () => {
	const { companyUrl } = useParams();
	const { company } = useCompanyStore((state) => state);
	const getCompanyAsyncState = useCompanyStore(
		(state) => state.asyncStates.getCompanyAsyncState,
	);

	return (
		<div className="p-4 bg-black w-full flex justify-between items-center">
			<div className="flex items-center">
				{getCompanyAsyncState === AsyncState.Pending ||
				getCompanyAsyncState === AsyncState.Idle ? (
					<LoadingIcon className="size-8 animate-spin" />
				) : (
					<Link href={`/admin/c/${companyUrl}`}>
						<div className="text-white text-2xl font-bold">{company?.name}</div>
					</Link>
				)}
			</div>
			<AuthDropdown />
		</div>
	);
};
