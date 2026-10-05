import { Expense } from "@/types/finance";

type RecommendationResponse = {
  success: boolean;
  remaining: number;
  recommendations: Recommendation[];
};

export type Recommendation = {
  name: string;
  summary: string;
  suggestedAmount: number;
  risk: "Low" | "Medium" | "High";
  education: {
    whatIsIt: string;
    howItWorks: string;
    potentialReturns: string;
    whyConsider: string;
    thingsToKnow: string;
  };
};

export async function getRecommendations(income: number, expenses: Expense[]) {
  const response = await fetch("/api/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      income,
      expenses,
    }),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Failed to get recommendations");
  }

  const data: RecommendationResponse = await response.json();

  return data;
}
