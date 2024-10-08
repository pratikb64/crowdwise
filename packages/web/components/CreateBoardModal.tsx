import { useCompanyStore } from "@/providers/CompanyStoreProvider";
import { createBoard, getBoard } from "@/services/board.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const schema = z.object({
	boardName: z.string().min(1, { message: "Board name is required" }),
	boardShortName: z
		.string()
		.min(1, { message: "Board short name is required" })
		.regex(/^[a-z0-9-]+$/, {
			message: "Alphanumeric lowercase characters and hyphen only",
		}),
});

export const CreateBoardModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const newBoardForm = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			boardName: "",
			boardShortName: "",
		},
	});
	const { company, getBoardsAsync } = useCompanyStore((state) => state);

	const onBoardNameChange = (event: any) => {
		newBoardForm.setValue(
			"boardShortName",
			event.target.value
				.toLowerCase()
				.replace(/ /g, "-")
				.replace(/[^a-z0-9-]/g, ""),
		);
	};

	const onSubmit = async (data: z.infer<typeof schema>) => {
		const loadingToast = toast.loading("Creating new board...");
		const boardShortName = data.boardShortName;

		const boardExists = await getBoard({ shortName: boardShortName });

		if (boardExists.status === 200) {
			newBoardForm.setError("boardShortName", {
				message: "Board with this url already exists",
			});
			toast.error("Board with this url already exists", {
				id: loadingToast,
			});
			return;
		}

		if (!company) {
			toast.error("Please setup your company first!", {
				id: loadingToast,
			});
			return;
		}

		await createBoard({
			name: data.boardName,
			shortName: data.boardShortName,
			companyId: company.id,
		});

		await getBoardsAsync(company.shortName);

		toast.success("Board created successfully!", {
			id: loadingToast,
		});
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="default"
					className="flex gap-3 w-full"
					onClick={() => setIsOpen(true)}
				>
					<PlusIcon className="size-4" />
					<span>Create Board</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Board</DialogTitle>
				</DialogHeader>
				<Form {...newBoardForm}>
					<form
						onSubmit={newBoardForm.handleSubmit(onSubmit)}
						className="flex flex-col gap-4 mt-2"
					>
						<FormField
							control={newBoardForm.control}
							name="boardName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Board Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							rules={{
								onChange: onBoardNameChange,
							}}
						/>
						<FormField
							control={newBoardForm.control}
							name="boardShortName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Board Url</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									{newBoardForm.getValues("boardShortName") && (
										<FormDescription>
											<span className="text-xs">
												<span>{location.origin}/</span>
												<span>{company?.shortName}/</span>
												<b>{newBoardForm.watch("boardShortName")}</b>
											</span>
										</FormDescription>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
