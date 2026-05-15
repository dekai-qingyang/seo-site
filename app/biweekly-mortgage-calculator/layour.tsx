import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biweekly Mortgage Calculator | LoanFormulas",
  description:
    "Estimate biweekly mortgage payments, interest savings, and early mortgage payoff schedules.",
};

export default function BiweeklyMortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}