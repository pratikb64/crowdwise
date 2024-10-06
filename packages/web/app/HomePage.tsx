import { redirect } from "next/navigation";

export const HomePage = () => {
	redirect("/login");
};
