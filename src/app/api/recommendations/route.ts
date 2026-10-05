import { NextResponse } from "next/server";
import { getRecommendations } from "@/services/groq";

export async function POST(req: Request) {
  try {
    const { income, expenses } = await req.json();

    if (!income || !Array.isArray(expenses)) {
      return NextResponse.json(
        {
          message: "Income and expenses are required",
        },
        { status: 400 },
      );
    }

    const totalExpenses = expenses.reduce(
      (total: number, expense: { amount: number }) =>
        total + Number(expense.amount),
      0,
    );

    const remaining = Number(income) - totalExpenses;

    if (remaining <= 0) {
      return NextResponse.json(
        {
          message: "No remaining balance to recommend",
        },
        { status: 400 },
      );
    }

    const recommendations = await getRecommendations(
      Number(income),
      expenses,
      remaining,
    );

    return NextResponse.json({
      remaining,
      ...recommendations,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to generate recommendations",
      },
      { status: 500 },
    );
  }
}
