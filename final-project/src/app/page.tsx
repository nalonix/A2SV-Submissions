"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import JobCard from "@/components/jobCard";
import JobDetail from "@/components/jobDetail";
import { getOpportunities } from "@/lib/opportunities";
import { Opportunity } from "@/types/api";

export default function JobListPage() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Opportunity[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Opportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const opportunities = await getOpportunities();
        setJobs(opportunities.data);
        setFilteredJobs(opportunities.data);
        // Select first job by default on load if available
        if (opportunities.data.length > 0) {
          setSelectedJobId(opportunities.data[0].id);
        }
      } catch (err) {
        setError("Failed to load opportunities. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = jobs.filter((job) =>
        job.title.toLowerCase().includes(query)
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  // Handle click on job card
  const handleJobClick = (e: React.MouseEvent, jobId: string) => {
    // Check if we are on desktop (md breakpoint is usually 768px)
    if (window.innerWidth >= 768) {
      e.preventDefault();
      setSelectedJobId(jobId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // On mobile, let the Link default behavior happen (navigate to details page)
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header with auth */}
        <div className="py-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-4">
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">
               Opportunities
             </h1>
          </div>
          <div className="flex items-center gap-3">
            {status === "loading" ? (
              <div className="h-8 w-20 bg-gray-100 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 font-medium">
                  {session.user?.name || "User"}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-red-600 hover:text-red-700 font-bold uppercase tracking-wide"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="text-sm text-primary hover:text-primary/80 font-bold uppercase tracking-wide"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 font-bold uppercase tracking-wide border border-transparent"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar - Full width */}
        <div className="py-6">
           <div className="relative max-w-2xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition bg-white font-medium"
            />
          </div>
           <p className="text-slate-500 mt-2 text-sm font-medium">
            {isLoading ? "Loading..." : `Showing ${filteredJobs.length} results`}
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:h-[calc(100vh-180px)]">
          
          {/* Left Pane: Job List */}
          <div className="w-full md:w-5/12 lg:w-4/12 md:overflow-y-auto pr-0 md:pr-2 pb-10 custom-scrollbar">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-6 border border-gray-100 animate-pulse"
                  >
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-gray-100" />
                      <div className="flex-grow space-y-3">
                        <div className="h-6 bg-gray-100 w-1/3" />
                        <div className="h-4 bg-gray-100 w-1/4" />
                        <div className="h-16 bg-gray-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-primary hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white border border-gray-100">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  No jobs found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search terms.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isSelected={selectedJobId === job.id}
                    onClick={(e) => handleJobClick(e, job.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Pane: Job Detail */}
          <div className="hidden md:block md:w-7/12 lg:w-8/12 bg-white border border-gray-100 md:overflow-y-auto sticky top-0 h-full custom-scrollbar">
             {selectedJob ? (
               <div className="h-full">
                 <div className="p-0"> 
                   {/* We might need to adjust JobDetail styling slightly to fit perfectly or remove its internal container styles */}
                   <JobDetail job={selectedJob} />
                 </div>
               </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                  <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  <p className="text-lg font-medium">Select a role to view details</p>
                </div>
             )}
          </div>

        </div>
      </div>
    </main>
  );
}
