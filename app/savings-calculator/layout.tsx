import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Calculator | LoanFormulas",
  description:
    "Free savings calculator with compound interest projections, savings growth charts, monthly contribution analysis, and financial planning tools.",
};

export default function SavingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}