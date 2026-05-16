import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Amortization Calculator | LoanFormulas",
  description:
    "Estimate mortgage amortization schedules, monthly payments, interest costs, and long-term loan balances.",
};

export default function MortgageAmortizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}