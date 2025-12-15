import React from "react";
import { expect, describe, it, beforeEach, jest } from '@jest/globals';
import "@testing-library/jest-dom/jest-globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookmarkButton from "@/components/BookmarkButton";

// Mock next-auth/react
const mockSession = {
    data: {
        user: { name: "Test User", email: "test@example.com", id: "123" },
        accessToken: "mock-token",
    },
    status: "authenticated" as const,
};

const mockUnauthSession = {
    data: null,
    status: "unauthenticated" as const,
};

jest.mock("next-auth/react", () => ({
    useSession: jest.fn(() => mockSession),
}));

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

// Mock BookmarkContext
const mockToggleBookmark = jest.fn<(eventId: string) => Promise<void>>();
const mockIsBookmarked = jest.fn<(eventId: string) => boolean>();

jest.mock("@/context/BookmarkContext", () => ({
    useBookmarks: () => ({
        isBookmarked: mockIsBookmarked,
        toggleBookmark: mockToggleBookmark,
    }),
}));

describe("BookmarkButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockIsBookmarked.mockReturnValue(false);
        mockToggleBookmark.mockResolvedValue(undefined);
    });

    it("renders bookmark button", () => {
        render(<BookmarkButton eventId="test-id" />);
        const button = screen.getByTestId("bookmark-button");
        expect(button).toBeInTheDocument();
    });

    it("shows unbookmarked state initially", () => {
        mockIsBookmarked.mockReturnValue(false);
        render(<BookmarkButton eventId="test-id" />);
        const button = screen.getByTestId("bookmark-button");
        expect(button).toHaveAttribute("aria-label", "Add bookmark");
    });

    it("shows bookmarked state when job is bookmarked", () => {
        mockIsBookmarked.mockReturnValue(true);
        render(<BookmarkButton eventId="test-id" />);
        const button = screen.getByTestId("bookmark-button");
        expect(button).toHaveAttribute("aria-label", "Remove bookmark");
    });

    it("calls toggleBookmark when clicked", async () => {
        render(<BookmarkButton eventId="test-id" />);
        const button = screen.getByTestId("bookmark-button");

        fireEvent.click(button);

        await waitFor(() => {
            expect(mockToggleBookmark).toHaveBeenCalledWith("test-id");
        });
    });

    it("prevents event propagation when clicked", () => {
        const parentClick = jest.fn();
        render(
            <div onClick={parentClick}>
                <BookmarkButton eventId="test-id" />
            </div>
        );

        const button = screen.getByTestId("bookmark-button");
        fireEvent.click(button);

        expect(parentClick).not.toHaveBeenCalled();
    });

    it("shows error message when bookmark fails", async () => {
        mockToggleBookmark.mockRejectedValue(new Error("Failed to bookmark"));
        render(<BookmarkButton eventId="test-id" />);

        const button = screen.getByTestId("bookmark-button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText("Failed to bookmark")).toBeInTheDocument();
        });
    });

    it("redirects to signin when not authenticated", async () => {
        const { useSession } = require("next-auth/react");
        useSession.mockReturnValue(mockUnauthSession);

        render(<BookmarkButton eventId="test-id" />);
        const button = screen.getByTestId("bookmark-button");

        fireEvent.click(button);

        expect(mockPush).toHaveBeenCalledWith("/signin");
    });
});
