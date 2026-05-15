import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Payoff Calculator | LoanFormulas",
  description:
    "Estimate mortgage payoff schedules, interest savings, and early repayment timelines.",
};

export default function MortgagePayoffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}