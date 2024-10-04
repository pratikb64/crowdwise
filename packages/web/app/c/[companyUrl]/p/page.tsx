import { RedirectType, redirect } from "next/navigation";

export default function PlaceholderPage({
	params,
}: { params: { companyUrl: string } }) {
	redirect(`/c/${params.companyUrl}`, RedirectType.replace);
}
