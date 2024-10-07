import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { useSession } from "@/hooks/useSession";
import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { createPost } from "@/services/post.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	title: z.string().min(1, { message: "Title is required" }).max(512, {
		message: "Title must be less than 512 characters",
	}),
	description: z.string().max(1024, {
		message: "Description must be less than 1024 characters",
	}),
});

export const CreatePost = () => {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const getBoardsAsync = useCompanyStore((state) => state.getBoardsAsync);
	const activeBoard = useCompanyStore((state) => state.activeBoard);
	const company = useCompanyStore((state) => state.company);
	const createPostForm = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			title: "",
			description: "",
		},
	});
	const { session } = useSession();

	const onSubmit = async (data: z.infer<typeof schema>) => {
		if (!activeBoard || !company) return;

		if (!session) {
			toast.error("Please login to create a post");
			return;
		}

		const loadingToastId = toast.loading("Creating post...");
		const response = await createPost({
			title: data.title,
			content: data.description,
			boardId: activeBoard.id,
		});

		switch (response.status) {
			case 201:
				toast.success("Post created successfully", {
					id: loadingToastId,
				});
				getBoardsAsync(company.shortName);
				break;

			case 404:
				toast.error("Board not found", {
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
		<Form {...createPostForm}>
			<form onSubmit={createPostForm.handleSubmit(onSubmit)}>
				<div className="w-full p-2 px-4 border border-gray-300 shadow-sm rounded-t-md">
					<FormField
						control={createPostForm.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<input
										{...field}
										placeholder="Enter title here"
										className="w-full text-lg border-0 shadow-none outline-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-4 text-sm">Description</div>
					<FormField
						control={createPostForm.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<textarea
										{...field}
										ref={textAreaRef}
										placeholder="Add more details here"
										className="w-full h-auto mt-2 overflow-hidden border-0 shadow-none outline-none resize-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						rules={{
							onChange() {
								if (!textAreaRef.current) return;
								textAreaRef.current.style.height = "0px";
								const scrollHeight = textAreaRef.current.scrollHeight;
								textAreaRef.current.style.height = `${scrollHeight}px`;
							},
						}}
					/>
				</div>
				<div className="flex justify-end w-full p-3 border border-t-0 border-gray-300 bg-zinc-50 rounded-b-md">
					<Button>Create post</Button>
				</div>
			</form>
		</Form>
	);
};
