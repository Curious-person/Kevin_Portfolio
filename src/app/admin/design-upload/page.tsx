import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { uploadDesignImage } from "@/app/actions/portfolio";

async function submitDesign(formData: FormData) {
	"use server";

	const expectedAdminKey = process.env.DESIGN_UPLOAD_ADMIN_KEY;

	if (!expectedAdminKey) {
		notFound();
	}

	const submittedAdminKey = String(formData.get("adminKey") ?? "").trim();
	const title = String(formData.get("title") ?? "").trim();
	const imageUrl = String(formData.get("imageUrl") ?? "").trim();

	if (submittedAdminKey !== expectedAdminKey) {
		redirect("/admin/design-upload?status=unauthorized");
	}

	if (!title || !imageUrl) {
		redirect("/admin/design-upload?status=missing-fields");
	}

	const created = await uploadDesignImage({ title, imageUrl });

	if (!created) {
		redirect("/admin/design-upload?status=failed");
	}

	revalidatePath("/");
	redirect("/admin/design-upload?status=success");
}

type DesignUploadPageProps = {
	searchParams: Promise<{
		status?: string;
	}>;
};

export default async function DesignUploadPage({ searchParams }: DesignUploadPageProps) {
	const adminKey = process.env.DESIGN_UPLOAD_ADMIN_KEY;

	if (!adminKey) {
		notFound();
	}

	const resolvedParams = await searchParams;
	const status = resolvedParams?.status;

	return (
		<main className="mx-auto min-h-screen w-full max-w-xl px-6 py-12">
			<h1 className="mb-2 font-serif text-4xl text-slate-900">Design Upload</h1>
			<p className="mb-8 text-sm text-slate-600">
				Submit a Cloudinary image URL. Width and height are auto-detected with
				Sharp before inserting the row.
			</p>

			{status === "success" && (
				<p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
					Design saved successfully.
				</p>
			)}

			{status === "unauthorized" && (
				<p className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
					Invalid admin key.
				</p>
			)}

			{status === "missing-fields" && (
				<p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
					Title and image URL are required.
				</p>
			)}

			{status === "failed" && (
				<p className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
					Upload failed. Confirm the URL is public and that DB write permissions are configured.
				</p>
			)}

			<form
				action={submitDesign}
				className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6"
			>
				<div>
					<label htmlFor="adminKey" className="mb-1 block text-sm font-medium text-slate-700">
						Admin Key
					</label>
					<input
						id="adminKey"
						name="adminKey"
						type="password"
						required
						className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
					/>
				</div>

				<div>
					<label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
						Title
					</label>
					<input
						id="title"
						name="title"
						type="text"
						required
						className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
					/>
				</div>

				<div>
					<label htmlFor="imageUrl" className="mb-1 block text-sm font-medium text-slate-700">
						Cloudinary Image URL
					</label>
					<input
						id="imageUrl"
						name="imageUrl"
						type="url"
						required
						placeholder="https://res.cloudinary.com/..."
						className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
					/>
				</div>

				<button
					type="submit"
					className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
				>
					Save Design
				</button>
			</form>
		</main>
	);
}
