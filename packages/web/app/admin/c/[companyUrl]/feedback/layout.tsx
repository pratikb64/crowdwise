"use client";

import { AdminPostList } from "@/components/AdminPostList";
import { BoardsDropdown } from "@/components/BoardsDropdown";
import type { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-1 overflow-hidden">
			<div className="border-r border-gray-300 w-[500px]">
				<div className="p-3 border-b border-gray-300">
					<BoardsDropdown />
				</div>
				<AdminPostList />
			</div>
			{children}
		</div>
	);
}
