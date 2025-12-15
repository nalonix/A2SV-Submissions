import React from "react";
import { expect, describe, it, jest } from '@jest/globals';
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import JobCard from "@/components/jobCard";
import { Opportunity } from "@/types/api";

// Mock next/image
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />;
    },
}));

// Mock next/link
jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
    useSession: () => ({
        data: { user: { name: "Test", id: "123" }, accessToken: "token" },
        status: "authenticated",
    }),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock BookmarkContext
jest.mock("@/context/BookmarkContext", () => ({
    useBookmarks: () => ({
        isBookmarked: () => false,
        toggleBookmark: jest.fn(),
    }),
}));

const mockJob: Opportunity = {
    id: "test-job-123",
    title: "Software Engineer",
    description: "Join our team to build amazing products.",
    responsibilities: ["Write code", "Review PRs"],
    requirements: ["3+ years experience"],
    idealCandidate: "Someone passionate about coding",
    categories: ["Engineering", "Tech"],
    opType: "Full-time",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    deadline: "2024-02-01",
    location: ["San Francisco, CA"],
    requiredSkills: ["JavaScript", "React"],
    whenAndWhere: "Remote friendly",
    orgID: "org-123",
    datePosted: "2024-01-01",
    status: "active",
    applicantsCount: 50,
    viewsCount: 1000,
    orgName: "Tech Company Inc.",
    logoUrl: "https://example.com/logo.png",
    isBookmarked: false,
    isRolling: false,
    questions: null,
    perksAndBenefits: null,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    orgPrimaryPhone: "",
    orgEmail: "hr@example.com",
    average_rating: 4.5,
    total_reviews: 100,
};

describe("JobCard", () => {
    it("renders job title correctly", () => {
        render(<JobCard job={mockJob} />);
        expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    });

    it("renders company name and location", () => {
        render(<JobCard job={mockJob} />);
        expect(screen.getByText(/Tech Company Inc./)).toBeInTheDocument();
        expect(screen.getByText(/San Francisco, CA/)).toBeInTheDocument();
    });

    it("renders job description", () => {
        render(<JobCard job={mockJob} />);
        expect(
            screen.getByText("Join our team to build amazing products.")
        ).toBeInTheDocument();
    });

    it("renders display tags", () => {
        render(<JobCard job={mockJob} />);
        expect(screen.getByText("Full-time")).toBeInTheDocument();
        expect(screen.getByText("Engineering")).toBeInTheDocument();
    });

    it("renders bookmark button", () => {
        render(<JobCard job={mockJob} />);
        expect(screen.getByTestId("bookmark-button")).toBeInTheDocument();
    });

    it("links to the correct job detail page", () => {
        render(<JobCard job={mockJob} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/jobs/test-job-123");
    });

    it("applies selected styles when isSelected is true", () => {
        const { container } = render(<JobCard job={mockJob} isSelected={true} />);
        const card = container.firstChild;
        expect(card).toHaveClass("ring-1", "ring-blue-300");
    });

    it("renders fallback avatar when no logo URL", () => {
        const jobWithoutLogo = { ...mockJob, logoUrl: "" };
        render(<JobCard job={jobWithoutLogo} />);
        expect(screen.getByText("T")).toBeInTheDocument(); // First letter of company name
    });
});
