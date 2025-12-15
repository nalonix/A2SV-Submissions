import axios from "axios";

const API_BASE_URL = "https://akil-backend.onrender.com/opportunities";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgName: string;
  logoUrl: string;
  orgEmail: string;
  orgPrimaryPhone: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  average_rating: number;
  total_reviews: number;
  perksAndBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: any[] | null;
  engagementType: string;
  paymentOption: {
    currency: string;
    paymentType: string;
  };
  createdBy: string;
}
export interface ApiListResponse {
  data: Opportunity[];
  count: number;
  success: boolean;
  message: string;
  error: null | Error;
}

export interface ApiSingleResponse {
  data: Opportunity;
  success: boolean;
  message: string;
  error: null | Error;
}

export const getOpportunities = async (): Promise<ApiListResponse> => {
  const response = await axios.get<ApiListResponse>(`${API_BASE_URL}/search`);
  return response.data;
};

export const getOpportunityById = async (id: number): Promise<ApiSingleResponse> => {
  const response = await axios.get<ApiSingleResponse>(`${API_BASE_URL}/${id}`);
  return response.data;
};
