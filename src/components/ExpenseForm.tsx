"use client";

import { SubmitEvent, useState } from "react";

type ExpenseFormProps = {
  onAddExpense: (name: string, amount: number) => void;
};

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedAmount = Number(amount);

    if (!name.trim() || !parsedAmount || parsedAmount <= 0) {
      return;
    }

    onAddExpense(name.trim(), parsedAmount);

    setName("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Expense name */}
      <div>
        <label
          htmlFor="expense-name"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/40"
        >
          Expense
        </label>

        <input
          id="expense-name"
          type="text"
          placeholder="e.g. Food"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
          w-full rounded-xl
          border border-white/[0.08]
          bg-[#050706]
          px-4 py-3.5
          text-sm text-white
          outline-none
          placeholder:text-white/20
          transition-all duration-200
          focus:border-[#39FF88]/40
          focus:bg-[#08100B]
          focus:ring-1 focus:ring-[#39FF88]/20
        "
        />
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="expense-amount"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/40"
        >
          Amount
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#39FF88]/70">
            ₹
          </span>

          <input
            id="expense-amount"
            type="number"
            min="1"
            placeholder="5,000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="
            w-full rounded-xl
            border border-white/[0.08]
            bg-[#050706]
            py-3.5 pl-10 pr-4
            text-lg font-medium text-white
            outline-none
            placeholder:text-white/15
            transition-all duration-200
            focus:border-[#39FF88]/40
            focus:bg-[#08100B]
            focus:ring-1 focus:ring-[#39FF88]/20
          "
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="
        group relative flex w-full items-center justify-between
        overflow-hidden rounded-xl
        border border-[#39FF88]/20
        bg-[#102418]
        px-4 py-3.5
        text-sm font-medium text-[#39FF88]
        transition-all duration-200
        hover:border-[#39FF88]/40
        hover:bg-[#14351F]
        active:scale-[0.99]
      "
      >
        <span>Add expense</span>

        <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
