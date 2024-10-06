import { redirect } from "next/navigation";

export default function page({ params }: { params: { companyUrl: string } }) {
	redirect(`/admin/c/${params.companyUrl}/feedback`);
}
