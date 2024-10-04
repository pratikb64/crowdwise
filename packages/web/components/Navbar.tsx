import Link from "next/link";
import { AuthDropdown } from "./AuthDropdown";

export const Navbar = () => {
	return (
		<nav className="border-b border-gray-300 w-full py-5">
			<div className="flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
				<div className="flex items-center gap-4">
					<Link href="/">
						<span className="text-2xl font-bold text-primary">Crowdwise</span>
					</Link>
				</div>
				<AuthDropdown />
			</div>
		</nav>
	);
};
