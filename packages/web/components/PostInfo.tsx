import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
	firstName: string;
	lastName: string;
	postedOn: string;
}

export const PostInfo = (props: Props) => {
	return (
		<div>
			<span className="font-semibold text-gray-600">Author</span>
			<div className="flex items-center gap-2 mt-2">
				<Avatar className="size-8">
					<AvatarImage
						src={`https://ui-avatars.com/api/?name=${props.firstName}+${props.lastName}&rounded=true&background=b8e986&color=417505`}
					/>
					<AvatarFallback>CW</AvatarFallback>
				</Avatar>
				<span className="text-sm font-semibold">
					{props.firstName} {props.lastName}
				</span>
			</div>
			<div className="flex flex-col mt-4">
				<span className="font-semibold text-gray-600">Posted on</span>
				<span className="mt-2 text-sm">{props.postedOn}</span>
			</div>
		</div>
	);
};
