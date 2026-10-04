import { Router } from "express";
import { getRecommendations } from "../services/groq.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { income, expenses } = req.body;

    if (!income || !Array.isArray(expenses)) {
      return res.status(400).json({
        message: "Income and expenses are required",
      });
    }

    const totalExpenses = expenses.reduce(
      (total: number, expense: { amount: number }) =>
        total + Number(expense.amount),
      0,
    );

    const remaining = Number(income) - totalExpenses;

    if (remaining <= 0) {
      return res.status(400).json({
        message: "No remaining balance to recommend",
      });
    }

    const recommendations = await getRecommendations(
      Number(income),
      expenses,
      remaining,
    );

    return res.json({
      remaining,
      ...recommendations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate recommendations",
    });
  }
});

export default router;