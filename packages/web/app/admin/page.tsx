"use client";
import { useSession } from "@/hooks/useSession";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function page() {
	const { session, isLoading } = useSession();

	useEffect(() => {
		if (!isLoading) {
			if (session?.company) {
				redirect(`/admin/c/${session.company.shortName}`);
			} else {
				redirect("/onboarding");
			}
		}
	}, [isLoading]);

	return <></>;
}
