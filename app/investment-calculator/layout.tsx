import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Calculator | LoanFormulas",
  description:
    "Free investment calculator with investment growth projections, compound returns, monthly contributions, charts, and long-term investment planning.",
};

export default function InvestmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}