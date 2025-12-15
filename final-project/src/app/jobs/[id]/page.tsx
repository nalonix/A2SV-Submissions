import { notFound } from "next/navigation";
import { getOpportunityById } from "@/lib/opportunities";
import JobDetail from "@/components/jobDetail";
import Link from "next/link";

interface JobDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
    const { id } = await params;
    const job = await getOpportunityById(id);

    if (!job) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6"
                >
                    <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to listings
                </Link>
                <h1 className="text-3xl font-bold text-slate-900 mb-6">{job.title}</h1>
                <JobDetail job={job} />
            </div>
        </main>
    );
}
