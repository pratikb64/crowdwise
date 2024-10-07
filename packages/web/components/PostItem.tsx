import { cn } from "@/lib/utils";
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
	url: string;
	isHighlighted?: boolean;
	onClick?: () => void;
}

export const PostItem = (props: Props) => {
	const { toggleUpVoteAsync } = useCompanyStore((state) => state);

	return (
		<div
			className={cn(
				"flex items-center justify-between pr-4 shadow-sm cursor-pointer hover:bg-gray-50",
				props.isHighlighted &&
					"border-l-4 border-black bg-gray-100 hover:bg-gray-100",
			)}
			onClick={() => props.onClick?.()}
		>
			<Link href={props.url} className="w-full py-4 pl-4">
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
