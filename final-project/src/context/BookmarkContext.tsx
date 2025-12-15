"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { getBookmarks, addBookmark, removeBookmark } from "@/lib/bookmarks";

interface BookmarkContextType {
    bookmarkedIds: Set<string>;
    isLoading: boolean;
    toggleBookmark: (eventId: string) => Promise<void>;
    isBookmarked: (eventId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
    undefined
);

export function BookmarkProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (session?.accessToken) {
                setIsLoading(true);
                try {
                    const bookmarks = await getBookmarks(session.accessToken);
                    setBookmarkedIds(new Set(bookmarks.map((b) => b.eventID)));
                } catch (error) {
                    console.error("Failed to fetch bookmarks:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setBookmarkedIds(new Set());
            }
        };

        fetchBookmarks();
    }, [session?.accessToken]);

    const toggleBookmark = useCallback(
        async (eventId: string) => {
            if (!session?.accessToken) {
                throw new Error("Not authenticated");
            }

            const isCurrentlyBookmarked = bookmarkedIds.has(eventId);

            // Optimistic update
            setBookmarkedIds((prev) => {
                const next = new Set(prev);
                if (isCurrentlyBookmarked) {
                    next.delete(eventId);
                } else {
                    next.add(eventId);
                }
                return next;
            });

            try {
                if (isCurrentlyBookmarked) {
                    await removeBookmark(session.accessToken, eventId);
                } else {
                    await addBookmark(session.accessToken, eventId);
                }
            } catch (error) {
                // Revert on error
                setBookmarkedIds((prev) => {
                    const next = new Set(prev);
                    if (isCurrentlyBookmarked) {
                        next.add(eventId);
                    } else {
                        next.delete(eventId);
                    }
                    return next;
                });
                throw error;
            }
        },
        [session?.accessToken, bookmarkedIds]
    );

    const isBookmarked = useCallback(
        (eventId: string) => bookmarkedIds.has(eventId),
        [bookmarkedIds]
    );

    return (
        <BookmarkContext.Provider
            value={{ bookmarkedIds, isLoading, toggleBookmark, isBookmarked }}
        >
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmarks() {
    const context = useContext(BookmarkContext);
    if (context === undefined) {
        throw new Error("useBookmarks must be used within a BookmarkProvider");
    }
    return context;
}
