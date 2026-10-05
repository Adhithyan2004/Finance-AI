"use client";

import { Recommendation } from "@/lib/api";

type Props = {
  recommendations: Recommendation[];
};

export default function RecommendationSection({ recommendations }: Props) {
  return (
    <section className="space-y-7">
      {/* Section heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] shadow-[0_0_10px_#39FF88]" />

            <span className="text-xs uppercase tracking-[0.2em] text-[#39FF88]/60">
              AI Intelligence
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What you could do with your money
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
            Educational suggestions based on your remaining balance.
          </p>
        </div>
      </div>

      {/* Recommendation cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {recommendations.map((recommendation, index) => (
          <div
            key={recommendation.name}
            className="
            group relative flex flex-col
            overflow-hidden rounded-2xl
            border border-white/[0.08]
            bg-[#0A0E0C]/90
            backdrop-blur-xl
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#39FF88]/20
          "
          >
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39FF88]/40 to-transparent opacity-60" />

            <div className="flex flex-1 flex-col p-6">
              {/* Card header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-xs font-medium text-[#39FF88]/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-lg font-medium tracking-tight text-white/90">
                    {recommendation.name}
                  </h3>
                </div>

                <span
                  className={`
                  rounded-full w-30 text-center border px-2.5 py-2
                  text-[10px] font-medium uppercase tracking-wider
                  ${
                    recommendation.risk.toLowerCase() === "low"
                      ? "border-[#39FF88]/20 bg-[#39FF88]/5 text-[#39FF88]/70"
                      : recommendation.risk.toLowerCase() === "high"
                        ? "border-red-400/20 bg-red-400/5 text-red-400/70"
                        : "border-yellow-400/20 bg-yellow-400/5 text-yellow-400/70"
                  }
                `}
                >
                  {recommendation.risk} risk
                </span>
              </div>

              {/* Summary */}
              <p className="mt-5 text-sm leading-6 text-white/40">
                {recommendation.summary}
              </p>

              {/* Suggested amount */}
              <div className="mt-7 rounded-xl border border-[#39FF88]/10 bg-[#08100B] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Suggested allocation
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight text-[#39FF88]">
                  ₹{recommendation.suggestedAmount.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Education */}
              <details className="mt-6 border-t border-white/[0.07] pt-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-white/50 transition-colors hover:text-white/80">
                  <span>Understand this option</span>

                  <span className="text-lg text-white/25 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="mt-5 space-y-5">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#39FF88]/60">
                      What is it?
                    </p>

                    <p className="text-sm leading-6 text-white">
                      {recommendation.education.whatIsIt}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#39FF88]/60">
                      How does it work?
                    </p>

                    <p className="text-sm leading-6 text-white">
                      {recommendation.education.howItWorks}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#39FF88]/60">
                      Potential returns
                    </p>

                    <p className="text-sm leading-6 text-white">
                      {recommendation.education.potentialReturns}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#39FF88]/60">
                      Why consider it?
                    </p>

                    <p className="text-sm leading-6 text-white">
                      {recommendation.education.whyConsider}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#39FF88]/60">
                      Things to know
                    </p>

                    <p className="text-sm leading-6 text-white">
                      {recommendation.education.thingsToKnow}
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-4">
        <span className="mt-0.5 text-xs text-[#39FF88]/50">✦</span>

        <p className="text-xs leading-5 text-white">
          These recommendations are educational suggestions generated from your
          provided information and are not financial advice.
        </p>
      </div>
    </section>
  );
}
