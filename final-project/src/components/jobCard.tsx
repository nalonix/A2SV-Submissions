"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Opportunity } from "@/types/api";
import BookmarkButton from "./BookmarkButton";

interface JobCardProps {
  job: Opportunity;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSelected = false, onClick }) => {
  const getTagStyle = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes("person") || tagLower.includes("onsite")) {
      return "bg-green-50 text-green-700 border border-green-200";
    }
    if (
      tagLower.includes("education") ||
      tagLower.includes("hybrid") ||
      tagLower.includes("internship")
    ) {
      return "bg-amber-50 text-amber-600 border border-amber-300";
    }
    if (tagLower.includes("it") || tagLower.includes("remote")) {
      return "bg-indigo-50 text-indigo-700 border border-indigo-200";
    }
    return "bg-gray-100 text-gray-700 border border-gray-300";
  };

  const displayTags = [
    job.opType,
    ...job.categories.slice(0, 2),
  ].filter(Boolean);

  const locationDisplay =
    job.location && job.location.length > 0 ? job.location[0] : "Remote";

  return (
    <div
      onClick={onClick}
      className={`relative p-6 border transition-all w-full cursor-pointer
        ${isSelected
          ? "bg-white border-primary ring-1 ring-primary"
          : "bg-white border-gray-200 hover:border-gray-900"
        }`}
    >
      <Link 
        href={`/jobs/${job.id}`} 
        className="flex gap-4"
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex-shrink-0 pt-1">
          <div className="w-14 h-14 overflow-hidden bg-gray-50 border border-gray-100 p-1 flex items-center justify-center relative">
            {job.logoUrl ? (
              <Image
                src={job.logoUrl}
                alt={job.orgName}
                fill
                sizes="56px"
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {job.orgName?.charAt(0) || "J"}
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>

          <div className="text-sm text-gray-500 mb-3 font-medium">
            {job.orgName} • {locationDisplay}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wide border ${getTagStyle(
                  tag
                )}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="absolute top-4 right-4">
        <BookmarkButton eventId={job.id} />
      </div>
    </div>
  );
};

export default JobCard;
