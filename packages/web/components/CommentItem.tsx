import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";
import { usePostStore } from "@/providers/PostStoreProvider";
import { AsyncState } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
	id: string;
	date: string;
	content?: string;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	} | null;
}

export const CommentItem = (props: Props) => {
	const { session } = useSession();
	const [isDeleting, setIsDeleting] = useState(false);
	const deleteCommentAsync = usePostStore((state) => state.deleteCommentAsync);
	const deleteCommentAsyncState = usePostStore(
		(state) => state.asyncStates.deleteCommentAsyncState,
	);

	const onDeleteComment = async () => {
		if (isDeleting) {
			const loadingToastId = toast.loading("Deleting comment...");
			try {
				await deleteCommentAsync(props.id);
				toast.success("Comment deleted successfully", {
					id: loadingToastId,
				});
			} catch (error) {
				toast.error("Failed to delete comment", {
					id: loadingToastId,
				});
			}
			return;
		}
		setIsDeleting(true);
		setTimeout(() => {
			setIsDeleting(false);
		}, 3000);
	};

	return (
		<div>
			<div className="flex gap-3 mt-4">
				<div className="w-10">
					<Avatar className="mx-auto size-8">
						<AvatarImage
							src={`https://ui-avatars.com/api/?name=${props.user?.firstName}+${props.user?.lastName}&rounded=true&background=b8e986&color=417505`}
						/>
						<AvatarFallback>CW</AvatarFallback>
					</Avatar>
				</div>
				<div className="mt-1.5 text-sm font-semibold">
					{props.user?.firstName} {props.user?.lastName}
				</div>
			</div>
			<div className="ml-14">
				<div className="w-fit">
					<div className="mt-1 text-sm text-gray-600 w-fit">
						{props.content}
					</div>
					<div className="flex items-center gap-1.5 mt-3 text-xs">
						<span className="text-gray-500">{props.date}</span>
						{session?.id === props.user?.id && (
							<>
								<span className="text-gray-300">|</span>
								<button
									type="button"
									disabled={deleteCommentAsyncState === AsyncState.Pending}
									className={cn(
										"text-red-500 hover:text-red-600",
										deleteCommentAsyncState === AsyncState.Pending &&
											"disabled:",
									)}
									onClick={onDeleteComment}
								>
									{isDeleting ? (
										<span>Are you sure?</span>
									) : (
										<span>Delete Comment</span>
									)}
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
