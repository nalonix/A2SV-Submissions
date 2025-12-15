import { BookmarkData, ApiResponse } from "@/types/api";

const BASE_URL = "https://akil-backend.onrender.com";

export async function getBookmarks(
    accessToken: string
): Promise<BookmarkData[]> {
    const response = await fetch(`${BASE_URL}/bookmarks`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
    }

    const data: ApiResponse<BookmarkData[]> = await response.json();
    return data.data || [];
}

export async function addBookmark(
    accessToken: string,
    eventId: string
): Promise<void> {
    const response = await fetch(`${BASE_URL}/bookmarks/${eventId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add bookmark");
    }
}

export async function removeBookmark(
    accessToken: string,
    eventId: string
): Promise<void> {
    const response = await fetch(`${BASE_URL}/bookmarks/${eventId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove bookmark");
    }
}
