import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | LoanFormulas",
  description:
    "Free compound interest calculator with investment growth charts, future value projections, contribution analysis, and compound earnings estimates.",
};

export default function CompoundInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}