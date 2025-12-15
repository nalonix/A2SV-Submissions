import React from "react";
import { expect, describe, it, jest } from '@jest/globals';
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import JobDetail from "@/components/jobDetail";

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

describe("JobDetail - Job Not Found State", () => {
    it("renders 'Select a job' message when job is null", () => {
        render(<JobDetail job={null} />);
        expect(screen.getByText("Select a job to view details")).toBeInTheDocument();
    });

    it("has appropriate styling for empty state", () => {
        const { container } = render(<JobDetail job={null} />);
        const emptyMessage = container.firstChild;
        expect(emptyMessage).toHaveClass("text-center", "text-gray-400");
    });
});

describe("JobDetail - With Valid Job", () => {
    const mockJob = {
        id: "job-123",
        title: "Frontend Developer",
        description: "Build beautiful user interfaces",
        responsibilities: ["Write React code", "Build components"],
        requirements: [],
        idealCandidate: "Creative and detail-oriented developer",
        categories: ["Engineering"],
        opType: "Full-time",
        startDate: "2024-01-15",
        endDate: "2024-12-31",
        deadline: "2024-01-30",
        location: ["New York, NY"],
        requiredSkills: ["React", "TypeScript", "CSS"],
        whenAndWhere: "On-site in NYC office",
        orgID: "org-456",
        datePosted: "2024-01-01",
        status: "active",
        applicantsCount: 25,
        viewsCount: 500,
        orgName: "Design Studio",
        logoUrl: "https://example.com/logo.png",
        isBookmarked: false,
        isRolling: false,
        questions: null,
        perksAndBenefits: null,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        orgPrimaryPhone: "",
        orgEmail: "jobs@designstudio.com",
        average_rating: 4.8,
        total_reviews: 50,
    };

    it("renders job description section", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Build beautiful user interfaces")).toBeInTheDocument();
    });

    it("renders responsibilities section when present", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByText("Responsibilities")).toBeInTheDocument();
        expect(screen.getByText("Write React code")).toBeInTheDocument();
        expect(screen.getByText("Build components")).toBeInTheDocument();
    });

    it("renders ideal candidate section when present", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByText("Ideal Candidate")).toBeInTheDocument();
        expect(screen.getByText("Creative and detail-oriented developer")).toBeInTheDocument();
    });

    it("renders required skills", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByText("Required Skills")).toBeInTheDocument();
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("renders categories", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByText("Categories")).toBeInTheDocument();
        expect(screen.getByText("Engineering")).toBeInTheDocument();
    });

    it("renders About section with dates", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Posted On")).toBeInTheDocument();
        expect(screen.getByText("Deadline")).toBeInTheDocument();
        expect(screen.getByText("Location")).toBeInTheDocument();
    });

    it("renders bookmark button", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByTestId("bookmark-button")).toBeInTheDocument();
    });

    it("renders When & Where section when present", () => {
        render(<JobDetail job={mockJob} />);
        expect(screen.getByText("When & Where")).toBeInTheDocument();
        expect(screen.getByText("On-site in NYC office")).toBeInTheDocument();
    });
});
