import { cn } from "@/lib/utils";
import { CaretUpIcon } from "@radix-ui/react-icons";

interface Props {
	id: string;
	active: boolean;
	votes: number;
	onClick: (postId: string) => Promise<void>;
}

export const PostVoteButton = (props: Props) => {
	return (
		<button
			type="button"
			className={cn(
				"flex flex-col items-center justify-center font-semibold p-1.5 px-2.5 text-xs h-max border  border-gray-200 rounded-md shadow-sm w-10 overflow-hidden",
				props.active && "border-blue-500 bg-blue-50 border-[1.5px]",
			)}
			onClick={() => props.onClick(props.id)}
		>
			<CaretUpIcon className="size-4" />
			<span>{props.votes}</span>
		</button>
	);
};
