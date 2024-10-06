import { useSession } from "@/hooks/useSession";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingIcon } from "./LoadingIcon";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const AuthDropdown = () => {
	const { isLoading, session, logOut } = useSession();
	const [loginPageUrl, setLoginPageUrl] = useState("");
	const [registerPageUrl, setRegisterPageUrl] = useState("");

	useEffect(() => {
		const redirectUrl =
			location.pathname === "/" || location.pathname === "/login"
				? undefined
				: location.pathname;
		setLoginPageUrl(redirectUrl ? `/login?redirect=${redirectUrl}` : "/login");

		setRegisterPageUrl(
			redirectUrl ? `/register?redirect=${redirectUrl}` : "/register",
		);
	}, []);

	return (
		<>
			{!session && !isLoading && (
				<div className="flex items-center gap-4">
					<div className="text-gray-500 hover:text-gray-700">
						<Link href={loginPageUrl}>
							<Button variant="ghost">Login</Button>
						</Link>
					</div>
					<div className="text-gray-500 hover:text-gray-700">
						<Link href={registerPageUrl}>
							<Button variant="default" className="bg-primary">
								Sign up
							</Button>
						</Link>
					</div>
				</div>
			)}

			{isLoading && <LoadingIcon className="size-9 animate-spin" />}

			{session && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="link" className="px-0 rounded-full w-max">
							<Avatar className="size-9">
								<AvatarImage
									src={`https://ui-avatars.com/api/?name=${session.firstName}+${session.lastName}&rounded=true&background=b8e986&color=417505`}
								/>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56"
						side="bottom"
						sideOffset={12}
						align="end"
					>
						<DropdownMenuItem onClick={() => logOut()} className="flex gap-2">
							<ExitIcon className="size-4" />
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</>
	);
};
