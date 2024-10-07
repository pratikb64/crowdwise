import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";
import { CaretUpIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

interface Props {
	id: string;
	active: boolean;
	votes: number;
	onClick: (postId: string) => Promise<void>;
}

export const PostVoteButton = (props: Props) => {
	const { session } = useSession();

	const onButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (!session) {
			toast.error("Please login to vote");
			return;
		}
		await props.onClick(props.id);
	};

	return (
		<button
			type="button"
			className={cn(
				"flex flex-col items-center justify-center font-semibold p-1.5 px-2.5 text-xs h-max border border-gray-300 rounded-md shadow-sm w-10 overflow-hidden bg-white",
				props.active && "border-black bg-gray-100 border-[1.5px]",
			)}
			onClick={onButtonClick}
		>
			<CaretUpIcon className="size-4" />
			<span>{props.votes}</span>
		</button>
	);
};
