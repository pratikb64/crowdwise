import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import type { PostStatus } from "crowdwise-api/types";
import Link from "next/link";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export const AdminPostDetails = () => {
	const { activePost, company, updatePostStatusAsync } = useCompanyStore(
		(state) => state,
	);
	const [value, setValue] = useState<string | undefined>(activePost?.status);

	const postStatuses: { value: PostStatus; label: string }[] = [
		{
			value: "open",
			label: "Open",
		},
		{
			value: "under_review",
			label: "Under Review",
		},
		{
			value: "planned",
			label: "Planned",
		},
		{
			value: "in_progress",
			label: "In Progress",
		},
		{
			value: "completed",
			label: "Completed",
		},
		{
			value: "closed",
			label: "Closed",
		},
	];

	const onStatusChange = (status: PostStatus) => {
		if (!activePost) return;
		setValue(status);
		updatePostStatusAsync(activePost?.id, status);
	};

	return (
		<div className="border-l border-gray-300 w-[300px] h-full p-4">
			<div className="font-semibold text-sm">Details</div>
			<div className="flex flex-col gap-4 mt-3">
				<div>
					<div className="text-sm text-gray-700">Link</div>
					<Link
						href={`${location.origin}/c/${company?.shortName}/p/${activePost?.id}`}
						target="_blank"
					>
						<div className="text-sm overflow-hidden text-nowrap font-semibold text-ellipsis underline">
							{location.origin}/c/{company?.shortName}/p/{activePost?.id}
						</div>
					</Link>
				</div>
				<div>
					<div className="text-sm text-gray-700">Status</div>
					<Select value={value} onValueChange={onStatusChange}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a status" />
						</SelectTrigger>
						<SelectContent>
							{postStatuses.map((status) => (
								<SelectItem
									key={status.value}
									value={status.value}
									onClick={() => setValue(status.value)}
								>
									{status.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};
