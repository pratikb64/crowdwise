import type { PostStatus } from "crowdwise-api/types";

interface Props {
	state: PostStatus;
}

export const BadgeRenderer = (props: Props) => {
	switch (props.state) {
		case "open":
			return (
				<span className="p-1 px-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md">
					Open
				</span>
			);
		case "under_review":
			return (
				<span className="p-1 px-2 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-md">
					Under Review
				</span>
			);
		case "planned":
			return (
				<span className="p-1 px-2 text-xs font-semibold rounded-md text-cyan-800 bg-cyan-200">
					Planned
				</span>
			);
		case "in_progress":
			return (
				<span className="p-1 px-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-md">
					In Progress
				</span>
			);
		case "completed":
			return (
				<span className="p-1 px-2 text-xs font-semibold text-green-800 bg-green-200 rounded-md">
					Completed
				</span>
			);
		case "closed":
			return (
				<span className="p-1 px-2 text-xs font-semibold text-red-800 bg-red-200 rounded-md">
					Closed
				</span>
			);
	}
};
