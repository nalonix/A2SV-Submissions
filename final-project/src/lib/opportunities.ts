import { Opportunity, ApiResponse } from "@/types/api";

const BASE_URL = "https://akil-backend.onrender.com";

export async function getOpportunities(): Promise<ApiResponse<Opportunity[]>> {
    const response = await fetch(`${BASE_URL}/opportunities/search`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch opportunities");
    }

    const data: ApiResponse<Opportunity[]> = await response.json();
    console.log("Server pportunity: ", data)
    return data;
}

export async function getOpportunityById(
    id: string
): Promise<Opportunity | null> {
    const response = await fetch(`${BASE_URL}/opportunities/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        return null;
    }

    const data: ApiResponse<Opportunity> = await response.json();
    return data.data || null;
}
