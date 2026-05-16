import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARM Calculator | LoanFormulas",
  description:
    "Estimate ARM mortgage payments, adjustable rate changes, and long-term borrowing costs.",
};

export default function ARMCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}