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
import { useSession } from "@/hooks/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const schema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email address" })
		.min(1, { message: "Email address is required" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export const LoginPage = () => {
	const { logIn, session } = useSession();
	const params = useSearchParams();
	const router = useRouter();
	const loginForm = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof schema>) => {
		const loadingToastId = toast.loading("Logging in...");
		const { email, password } = data;
		const res = await logIn({ email, password });

		switch (res.status) {
			case 200:
				toast.success("Logged in successfully", { id: loadingToastId });
				router.push(params.get("redirect") ?? "/admin/c");
				break;
			case 400:
				toast.error("Incorrect password", { id: loadingToastId });
				break;
			case 404:
				toast.error(`User ${email} not found`, { id: loadingToastId });
				break;
			default:
				toast.error("Something went wrong", { id: loadingToastId });
				break;
		}
	};

	useEffect(() => {
		if (session) {
			router.push(params.get("redirect") ?? "/admin/c");
		}
	}, [session]);

	return (
		<>
			<h1 className="text-3xl font-bold text-center mb-2">Login</h1>
			<Form {...loginForm}>
				<form
					onSubmit={loginForm.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={loginForm.control}
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
						control={loginForm.control}
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
					<Button type="submit">Submit</Button>
				</form>
			</Form>

			<p className="text-center">
				Don't have an account?{" "}
				<a
					href={`/register?redirect=${params.get("redirect")}`}
					className="text-primary underline"
				>
					Sign up
				</a>
			</p>
		</>
	);
};
