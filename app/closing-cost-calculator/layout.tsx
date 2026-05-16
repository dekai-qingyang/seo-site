import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Cost Calculator | LoanFormulas",
  description:
    "Calculate home closing costs, lender fees, taxes, and total purchase expenses.",
};

export default function ClosingCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}