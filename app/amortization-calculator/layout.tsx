import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amortization Calculator | LoanFormulas",
  description:
    "Calculate loan amortization schedules, monthly payments, principal balances, and total interest costs.",
};

export default function AmortizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}