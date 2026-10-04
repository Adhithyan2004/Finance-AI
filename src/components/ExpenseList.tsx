"use client";

import { Expense } from "@/types/finance";

type ExpenseListProps = {
  expenses: Expense[];
  onRemoveExpense: (id: string) => void;
};

export default function ExpenseList({
  expenses,
  onRemoveExpense,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">
        No expenses added yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] bg-[#050706]/50 px-6 text-center">
          <span className="mb-3 text-2xl text-white/15">＋</span>

          <p className="text-sm text-white/40">No expenses added yet</p>

          <p className="mt-1 text-xs text-white/20">
            Add your monthly spending to see where your money goes.
          </p>
        </div>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense.id}
            className="
            group flex items-center justify-between
            rounded-xl
            border border-white/[0.06]
            bg-[#050706]/70
            px-4 py-3.5
            transition-all duration-200
            hover:border-white/[0.1]
            hover:bg-[#08100B]
          "
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Expense indicator */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88]/70" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white/85">
                  {expense.name}
                </p>

                <p className="mt-0.5 text-xs text-white/30">Monthly expense</p>
              </div>
            </div>

            <div className="ml-4 flex items-center gap-4">
              <p className="whitespace-nowrap text-sm font-medium text-white/70">
                ₹{expense.amount.toLocaleString("en-IN")}
              </p>

              <button
                type="button"
                onClick={() => onRemoveExpense(expense.id)}
                aria-label={`Remove ${expense.name}`}
                className="
                flex h-7 w-7 items-center justify-center
                rounded-lg
                text-white/20
                opacity-0
                transition-all duration-200
                hover:bg-red-500/10
                hover:text-red-400
                group-hover:opacity-100
              "
              >
                ×
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
