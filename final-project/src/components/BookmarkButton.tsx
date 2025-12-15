"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useBookmarks } from "@/context/BookmarkContext";

interface BookmarkButtonProps {
    eventId: string;
    className?: string;
}

export default function BookmarkButton({
    eventId,
    className = "",
}: BookmarkButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const bookmarked = isBookmarked(eventId);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!session) {
            router.push("/signin");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await toggleBookmark(eventId);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update bookmark");
            setTimeout(() => setError(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                disabled={isLoading}
                aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                data-testid="bookmark-button"
                className={`p-2 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${bookmarked
                        ? "text-primary bg-secondary hover:bg-gray-200"
                        : "text-gray-400 hover:text-primary hover:bg-secondary"
                    } ${className}`}
            >
                {isLoading ? (
                    <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5"
                        fill={bookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                )}
            </button>
            {error && (
                <div className="absolute top-full right-0 mt-1 text-xs text-red-500 bg-white border border-red-200 px-2 py-1 shadow-sm whitespace-nowrap z-10">
                    {error}
                </div>
            )}
        </div>
    );
}
