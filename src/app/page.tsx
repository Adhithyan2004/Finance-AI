"use client";

import { useState } from "react";

import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import FinanceSummary from "@/components/FinanceSummary";
import RecommendationSection from "@/components/RecommendationSection";
import { getRecommendations, Recommendation } from "@/lib/api";
import { Expense } from "@/types/finance";

export default function Home() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");

  const incomeAmount = Number(income) || 0;

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const remainingBalance = incomeAmount - totalExpenses;

  const addExpense = (name: string, amount: number) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name,
      amount,
    };

    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);

    // Clear old recommendations because the financial
    // situation has changed.
    setRecommendations([]);
    setRecommendationError("");
  };

  const removeExpense = (id: string) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );

    // Clear old recommendations because the financial
    // situation has changed.
    setRecommendations([]);
    setRecommendationError("");
  };

  const handleGetRecommendations = async () => {
    if (remainingBalance <= 0) {
      return;
    }

    try {
      setLoadingRecommendations(true);
      setRecommendationError("");

      const data = await getRecommendations(incomeAmount, expenses);

      setRecommendations(data.recommendations);
    } catch (error) {
      setRecommendationError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoadingRecommendations(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050706] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(57,255,136,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,255,136,0.5) 1px, transparent 1px)
          `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#39FF88]/[0.07] blur-[140px]" />

        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-[#39FF88]/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-xl font-medium uppercase tracking-[0.25em] text-[#39FF88]">
              Finance AI
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Make your money
            <span className="text-[#39FF88]"> work smarter.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
            Understand your monthly finances, see where your money goes, and
            discover what you could do with what's left.
          </p>
        </header>

        {/* Income + Summary */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          {/* Income */}
          <section className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0E0C]/80 p-6 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39FF88]/40 to-transparent" />

            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/75">
                  Monthly income
                </p>

                <p className="mt-1 text-sm text-white/90">
                  How much comes in each month?
                </p>
              </div>

              <span className="text-xs text-[#39FF88]/70">INR / MONTH</span>
            </div>

            <div className="flex items-center border-b border-white/[0.08] pb-3">
              <span className="mr-3 text-2xl text-[#39FF88]">₹</span>

              <input
                id="income"
                type="number"
                min="0"
                placeholder="13,000"
                value={income}
                onChange={(e) => {
                  setIncome(e.target.value);
                  setRecommendations([]);
                  setRecommendationError("");
                }}
                className="w-full bg-transparent text-4xl font-semibold tracking-tight text-white outline-none placeholder:text-white/10"
              />
            </div>
          </section>

          {/* Summary */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0E0C]/80 p-6 backdrop-blur-xl">
            <FinanceSummary
              income={incomeAmount}
              totalExpenses={totalExpenses}
              remainingBalance={remainingBalance}
            />
          </div>
        </div>

        {/* Expenses */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* Add Expense */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0E0C]/80 p-6 backdrop-blur-xl">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.18em] text-[#39FF88]/70">
                01 / Add
              </p>

              <h2 className="mt-2 text-xl font-medium tracking-tight">
                Add an expense
              </h2>

              <p className="mt-1 text-sm text-white/35">
                Track where your monthly income is going.
              </p>
            </div>

            <ExpenseForm onAddExpense={addExpense} />
          </section>

          {/* Expense list */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0E0C]/80 p-6 backdrop-blur-xl">
            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#39FF88]/70">
                  02 / Overview
                </p>

                <h2 className="mt-2 text-xl font-medium tracking-tight">
                  Your expenses
                </h2>
              </div>

              <span className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-white/35">
                {expenses.length} items
              </span>
            </div>

            <ExpenseList expenses={expenses} onRemoveExpense={removeExpense} />
          </section>
        </div>

        {/* Remaining balance */}
        <section className="relative mt-5 overflow-hidden rounded-2xl border border-[#39FF88]/20 bg-[#09120D] p-7 sm:p-9">
          {/* Glow */}
          <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[#39FF88]/10 blur-[100px]" />

          <div className="relative">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] shadow-[0_0_10px_#39FF88]" />

                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Available after expenses
                  </p>
                </div>

                <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-[#39FF88] sm:text-6xl">
                  ₹{remainingBalance.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="max-w-xs">
                {remainingBalance > 0 && (
                  <p className="text-sm leading-6 text-white/40">
                    This is your available balance. Let AI figure out potential
                    ways to put it to work.
                  </p>
                )}

                {remainingBalance === 0 && incomeAmount > 0 && (
                  <p className="text-sm leading-6 text-white/40">
                    Your income is fully allocated this month.
                  </p>
                )}

                {remainingBalance < 0 && (
                  <p className="text-sm leading-6 text-red-400">
                    Your expenses currently exceed your income.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* AI Action */}
        {remainingBalance > 0 && (
          <div className="mt-5">
            <button
              onClick={handleGetRecommendations}
              disabled={loadingRecommendations}
              className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-[#39FF88]/30 bg-[#3df185] px-6 py-5 text-left text-black transition-all duration-300 hover:bg-[#52ff99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
                  AI Analysis
                </p>

                <p className="mt-1 text-lg font-semibold tracking-tight">
                  {loadingRecommendations
                    ? "Analyzing your finances..."
                    : "Find smarter ways to use your money"}
                </p>
              </div>

              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        )}

        {/* Error */}
        {recommendationError && (
          <p className="mt-4 text-center text-sm text-red-400">
            {recommendationError}
          </p>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#39FF88]/70">
                03 / Intelligence
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Your AI recommendations
              </h2>

              <p className="mt-2 text-sm text-white/35">
                Based on your available balance and spending pattern.
              </p>
            </div>

            <RecommendationSection recommendations={recommendations} />
          </section>
        )}
      </div>
    </main>
  );
}
