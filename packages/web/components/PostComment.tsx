import { useSession } from "@/hooks/useSession";
import { usePostStore } from "@/providers/PostStoreProvider";
import { postComment } from "@/services/comment.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

const schema = z.object({
	comment: z.string().min(1, { message: "Comment is required" }).max(2048, {
		message: "Comment must be less than 2048 characters",
	}),
});

export const LeaveAComment = () => {
	const { postId } = useParams<{ postId: string }>();
	const { getCommentsAsync } = usePostStore((state) => state);
	const commentForm = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			comment: "",
		},
	});
	const { session } = useSession();

	const onSubmit = async (data: z.infer<typeof schema>) => {
		if (!session) {
			toast.error("Please login to post a comment");
			return;
		}
		const loadingToastId = toast.loading("Posting comment...");
		const response = await postComment({
			content: data.comment,
			postId: postId,
		});
		switch (response.status) {
			case 201:
				toast.success("Comment posted successfully", {
					id: loadingToastId,
				});
				commentForm.reset();
				getCommentsAsync(postId);
				break;

			case 404:
				toast.error("Post not found", {
					id: loadingToastId,
				});
				break;

			default:
				toast.error("Something went wrong", {
					id: loadingToastId,
				});
				break;
		}
	};

	return (
		<Form {...commentForm}>
			<form onSubmit={commentForm.handleSubmit(onSubmit)}>
				<FormField
					control={commentForm.control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<input
									{...field}
									placeholder="Leave a comment"
									className="w-full p-2 border rounded-b-none shadow-sm"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex justify-between w-full p-3 border border-t-0 border-gray-300 shadow-sm bg-zinc-50 rounded-b-md">
					<div className="text-xs text-red-500">
						{commentForm.formState.errors.comment?.message}
					</div>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
};
