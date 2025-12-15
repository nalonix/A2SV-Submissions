"use client";

import React from "react";
import { Opportunity } from "@/types/api";
import {
  CheckCircleIcon,
  MapPinIcon,
  CalendarIcon,
  FireIcon,
  PlusCircleIcon,
} from "./Icons";
import BookmarkButton from "./BookmarkButton";

interface JobDetailProps {
  job: Opportunity | null;
}

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon className="!w-4 !h-4 !text-blue-500 !mr-0" />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  if (!job)
    return (
      <div className="text-center text-gray-400 py-20">
        Select a job to view details
      </div>
    );

  const locationDisplay =
    job.location && job.location.length > 0 ? job.location.join(", ") : "Remote";

  const responsibilities = job.responsibilities || [];
  const idealCandidateDescription = job.idealCandidate || "";

  return (
    <div className="bg-white p-2">
      {/* Bookmark button in header */}
      <div className="flex justify-end mb-4">
        <BookmarkButton eventId={job.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Description
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {job.description}
            </p>
          </section>

          {responsibilities.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3 text-black">
                {responsibilities}
              </ul>
            </section>
          )}

          {idealCandidateDescription && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Ideal Candidate
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {idealCandidateDescription}
              </p>
            </section>
          )}

          {job.whenAndWhere && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When & Where
              </h2>
              <div className="flex items-center gap-2">
                <MapPinIcon className="!text-blue-500 !w-5 !h-5 !mr-0" />
                <span className="text-slate-600 text-base">
                  {job.whenAndWhere}
                </span>
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8 lg:col-span-1">
          <div className="pb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">About</h3>
            <div className="space-y-5">
              <InfoRow
                icon={PlusCircleIcon}
                label="Posted On"
                value={new Date(job.datePosted).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              />
              <InfoRow
                icon={FireIcon}
                label="Deadline"
                value={new Date(job.deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              />
              <InfoRow icon={MapPinIcon} label="Location" value={locationDisplay} />
              {job.startDate && (
                <InfoRow
                  icon={CalendarIcon}
                  label="Start Date"
                  value={new Date(job.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                />
              )}
              {job.endDate && (
                <InfoRow
                  icon={CalendarIcon}
                  label="End Date"
                  value={new Date(job.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                />
              )}
            </div>
          </div>

          {job.categories && job.categories.length > 0 && (
            <div className="pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-amber-50 text-amber-600 text-sm font-bold uppercase tracking-wide border border-amber-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white border border-gray-300 text-slate-600 text-sm font-bold uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
