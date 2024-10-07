"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/useSession";
import { createBoard } from "@/services/board.service";
import { createCompany, getCompany } from "@/services/company.service";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

const schema = z.object({
	companyName: z.string().min(1, { message: "Company name is required" }),
	companyShortName: z
		.string()
		.min(1, { message: "Company short name is required" })
		.regex(/^[a-z0-9-]+$/, {
			message: "Alphanumeric lowercase characters and hyphen only",
		}),
	boardName: z.string().min(1, { message: "Board name is required" }),
	boardShortName: z
		.string()
		.min(1, { message: "Board short name is required" })
		.regex(/^[a-z0-9-]+$/, {
			message: "Alphanumeric lowercase characters and hyphen only",
		}),
});

export default function Onboarding() {
	const router = useRouter();
	const { session, refreshSession } = useSession();
	const onboardingForm = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			companyName: "",
			companyShortName: "",
			boardName: "",
			boardShortName: "",
		},
	});

	const onCompanyUrlChangeFn = async () => {
		const companyShortName = onboardingForm.getValues("companyShortName");
		const company = await getCompany({
			shortName: companyShortName,
		});
		if (company.status === 200) {
			onboardingForm.setError("companyShortName", {
				message: "This company url already exists",
			});
		}
	};

	const onCompanyUrlChange = useCallback(
		debounce(onCompanyUrlChangeFn, 1000),
		[],
	);

	const onCompanyNameChange = (event: any) => {
		onboardingForm.setValue(
			"companyShortName",
			event.target.value
				.toLowerCase()
				.replace(/ /g, "-")
				.replace(/[^a-z0-9-]/g, ""),
		);
		onCompanyUrlChange();
	};

	const onBoardNameChange = (event: any) => {
		onboardingForm.setValue(
			"boardShortName",
			event.target.value
				.toLowerCase()
				.replace(/ /g, "-")
				.replace(/[^a-z0-9-]/g, ""),
		);
	};

	const onSubmit = async (data: z.infer<typeof schema>) => {
		const companyShortName = data.companyShortName;

		const companyExists = await getCompany({ shortName: companyShortName });

		if (companyExists.status === 200) {
			onboardingForm.setError("companyShortName", {
				message: "This company url already exists",
			});
			return;
		}

		const loadingToast = toast.loading("Setting up company...");
		const company = await createCompany({
			name: data.companyName,
			shortName: data.companyShortName,
		});
		toast.loading("Creating new board...", {
			id: loadingToast,
		});

		await createBoard({
			name: data.boardName,
			shortName: data.boardShortName,
			companyId: company.data!.id,
		});
		refreshSession();
		toast.success("Setup completed successfully!", {
			id: loadingToast,
		});
	};

	useEffect(() => {
		if (session?.company) {
			router.push(`/c/${session.company.shortName}`);
		}
	}, [session]);

	return (
		<Form {...onboardingForm}>
			<h1 className="text-3xl font-bold text-center mb-2 -mt-10">
				One last step!
			</h1>
			<form
				onSubmit={onboardingForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 border border-gray-200 p-6 py-8 shadow-md rounded-lg"
			>
				<FormField
					control={onboardingForm.control}
					name="companyName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					rules={{
						onChange: onCompanyNameChange,
					}}
				/>
				<FormField
					control={onboardingForm.control}
					name="companyShortName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Url</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							{onboardingForm.watch("companyShortName") && (
								<FormDescription>
									<span className="text-xs">
										<span>{location.origin}/</span>
										<b>{onboardingForm.watch("companyShortName")}</b>
									</span>
								</FormDescription>
							)}
							<FormMessage />
						</FormItem>
					)}
					rules={{
						onChange: onCompanyUrlChange,
					}}
				/>
				<FormField
					control={onboardingForm.control}
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
					control={onboardingForm.control}
					name="boardShortName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Board Url</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							{onboardingForm.getValues("companyShortName") && (
								<FormDescription>
									<span className="text-xs">
										<span>{location.origin}/</span>
										<span>{onboardingForm.watch("companyShortName")}/</span>
										<b>{onboardingForm.watch("boardShortName")}</b>
									</span>
								</FormDescription>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Get started!</Button>
			</form>
		</Form>
	);
}
