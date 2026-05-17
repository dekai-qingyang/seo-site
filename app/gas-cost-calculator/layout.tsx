import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gas Cost Calculator | LoanFormulas",
  description:
    "Estimate fuel expenses, gas costs, trip fuel usage, and long-term driving transportation costs.",
};

export default function GasCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}