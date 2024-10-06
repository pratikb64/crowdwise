"use client";
import { redirect, useParams } from "next/navigation";

export default function AdminPage() {
	const { companyUrl } = useParams<{ companyUrl: string }>();
	redirect(`/admin/c/${companyUrl}/feedback`);
}
