import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refinance Calculator | LoanFormulas",
  description:
    "Free refinance calculator with mortgage refinancing savings, monthly payment comparisons, break-even analysis, amortization schedules, and refinance charts.",
};

export default function RefinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}