// API Response Types for Akil Backend

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    count?: number;
}

export interface Opportunity {
    id: string;
    title: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    idealCandidate: string;
    categories: string[];
    opType: string;
    startDate: string;
    endDate: string;
    deadline: string;
    location: string[];
    requiredSkills: string[];
    whenAndWhere: string;
    orgID: string;
    datePosted: string;
    status: string;
    applicantsCount: number;
    viewsCount: number;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    questions: null | any[];
    perksAndBenefits: null | string;
    createdAt: string;
    updatedAt: string;
    orgPrimaryPhone: string;
    orgEmail: string;
    average_rating: number;
    total_reviews: number;
}


export interface BookmarkData {
    eventID: string;
    title: string;
    orgName: string;
    opType: string;
    location: string;
    logoUrl: string;
    dateBookmarked: string;
    datePosted: string;
}
