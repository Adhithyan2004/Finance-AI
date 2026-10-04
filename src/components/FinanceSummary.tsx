type FinanceSummaryProps = {
  income: number;
  totalExpenses: number;
  remainingBalance: number;
};

export default function FinanceSummary({
  income,
  totalExpenses,
  remainingBalance,
}: FinanceSummaryProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {/* Income */}
      <div className="rounded-xl border border-white/[0.07] bg-[#050706]/60 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-[#39FF88]/60">
            Income
          </p>

          <span className="text-xs text-[#39FF88]/40">IN</span>
        </div>

        <p className="mt-4 text-2xl font-semibold tracking-tight text-[#39FF88]">
          ₹{income.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Expenses */}
      <div className="rounded-xl border border-white/[0.07] bg-[#050706]/60 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-red-400/60">
            Expenses
          </p>

          <span className="text-xs text-red-400/40">OUT</span>
        </div>

        <p className="mt-4 text-2xl font-semibold tracking-tight text-red-400">
          ₹{totalExpenses.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Remaining */}
      <div className="relative overflow-hidden rounded-xl border border-[#39FF88]/20 bg-[#09120D] p-5">
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#39FF88]/10 blur-2xl" />

        <div className="relative flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-[#39FF88]/60">
            Remaining
          </p>

          <span className="text-xs text-[#39FF88]/40">AVAILABLE</span>
        </div>

        <p
          className={`relative mt-4 text-2xl font-semibold tracking-tight ${
            remainingBalance < 0 ? "text-red-400" : "text-[#39FF88]"
          }`}
        >
          ₹{remainingBalance.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
