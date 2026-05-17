import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EV Savings Calculator | LoanFormulas",
  description:
    "Estimate electric vehicle savings, fuel cost reductions, charging expenses, and long-term EV ownership affordability.",
};

export default function EvSavingsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}