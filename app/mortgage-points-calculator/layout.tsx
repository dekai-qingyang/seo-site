import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Points Calculator | LoanFormulas",
  description:
    "Estimate mortgage points costs, interest rate reductions, and long-term savings.",
};

export default function MortgagePointsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}