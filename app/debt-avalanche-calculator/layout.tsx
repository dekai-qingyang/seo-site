import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Avalanche Calculator | LoanFormulas",
  description:
    "Estimate debt avalanche repayment plans, high-interest debt payoff strategies, and total interest savings.",
};

export default function DebtAvalancheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}