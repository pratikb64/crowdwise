import { useSession } from "@/hooks/useSession";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
	const { isLoading, session, logOut } = useSession();

	return (
		<nav className="border-b border-gray-300 w-full py-5">
			<div className="flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
				<div className="flex items-center gap-4">
					<Link href="/">
						<span className="text-2xl font-bold text-primary">Crowdwise</span>
					</Link>
				</div>
				{isLoading && (
					<div className="text-gray-700 text-sm">
						<svg
							viewBox="0 0 100 100"
							preserveAspectRatio="xMidYMid"
							style={{
								shapeRendering: "auto",
								display: "block",
								background: "rgb(255, 255, 255)",
							}}
							className="size-10 animate-spin"
						>
							<title>Loading</title>
							<g data-idx="1">
								<circle
									data-idx="2"
									cy="50"
									cx="50"
									r="30"
									strokeWidth="6"
									stroke="#010101"
									fill="none"
									strokeDasharray="141.37166941154067 49.12388980384689"
								/>
								<g data-idx="4" />
							</g>
						</svg>
					</div>
				)}
				{!session && !isLoading && (
					<div className="flex items-center gap-4">
						<div className="text-gray-500 hover:text-gray-700">
							<Link href="/login">
								<Button variant="ghost">Login</Button>
							</Link>
						</div>
						<div className="text-gray-500 hover:text-gray-700">
							<Link href="/register">
								<Button variant="default" className="bg-primary">
									Sign up
								</Button>
							</Link>
						</div>
					</div>
				)}
				{session && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="link" className="w-max px-0 rounded-full">
								<Avatar>
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
			</div>
		</nav>
	);
};
