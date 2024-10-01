"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userRegistration } from "@/services/auth.service";
import { toast } from "sonner";

const schema = z
	.object({
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		email: z
			.string()
			.email({ message: "Invalid email address" })
			.min(1, { message: "Email address is required" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		confirmPassword: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["confirmPassword"],
				message: "Passwords do not match",
			});
		}
	});

export default function Register() {
	const registerForm = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof schema>) => {
		const loadingToastId = toast.loading("Registering user...");
		const response = await userRegistration({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		});

		switch (response.status) {
			case 201:
				toast.success("User registered successfully", { id: loadingToastId });
				break;
			case 400:
				toast.info("User already exists", { id: loadingToastId });
				break;
			default:
				toast.error("Something went wrong", { id: loadingToastId });
				break;
		}
	};

	return (
		<>
			<h1 className="text-3xl font-bold text-center mb-2">Register</h1>
			<Form {...registerForm}>
				<form
					onSubmit={registerForm.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<div className="flex gap-4 flex-col md:flex-row">
						<FormField
							control={registerForm.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={registerForm.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={registerForm.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={registerForm.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} type="password" />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={registerForm.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input {...field} type="password" />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
			<p className="text-center">
				Already have an account?{" "}
				<a href="/login" className="text-primary underline">
					Login
				</a>
			</p>
		</>
	);
}
