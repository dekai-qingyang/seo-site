import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimum Payment Calculator | LoanFormulas",
  description:
    "Estimate minimum credit card payments, payoff time, total interest costs, and debt repayment strategies.",
};

export default function MinimumPaymentCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}