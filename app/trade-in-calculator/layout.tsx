import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade In Calculator | LoanFormulas",
  description:
    "Estimate vehicle trade-in value, loan savings, down payment benefits, and total auto financing costs.",
};

export default function TradeInCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}