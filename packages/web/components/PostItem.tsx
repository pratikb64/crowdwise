import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import type { PostStatus } from "crowdwise-api/types";
import Link from "next/link";
import { BadgeRenderer } from "./BadgeRenderer";
import { PostVoteButton } from "./PostVoteButton";

interface Props {
	id: string;
	title: string;
	active: boolean;
	status: PostStatus;
	votes: number;
	commentsCount: number;
}

export const PostItem = (props: Props) => {
	const { company, toggleUpVoteAsync } = useCompanyStore((state) => state);

	return (
		<div className="flex items-center justify-between pr-4 border-t border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50">
			<Link
				href={`/c/${company?.shortName}/p/${props.id}`}
				className="w-full py-4 pl-4"
			>
				<span className="overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap">
					{props.title}
				</span>
				<div className="flex items-center gap-2 mt-4 text-xs">
					<div className="flex items-center gap-2">
						<ChatBubbleIcon className="text-black size-3" />
						<span>{props.commentsCount}</span>
					</div>
					<span>|</span>
					<div>
						<BadgeRenderer state={props.status} />
					</div>
				</div>
			</Link>
			<PostVoteButton
				id={props.id}
				active={props.active}
				votes={props.votes}
				onClick={toggleUpVoteAsync}
			/>
		</div>
	);
};
