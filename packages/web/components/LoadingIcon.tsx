import { forwardRef } from "react";

export const LoadingIcon = forwardRef<
	SVGSVGElement,
	React.SVGAttributes<SVGSVGElement>
>((props, ref) => {
	return (
		<svg
			ref={ref}
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
			style={{
				display: "block",
			}}
			{...props}
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
	);
});
