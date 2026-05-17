import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Used Car Calculator | LoanFormulas",
  description:
    "Estimate used car loan payments, financing costs, depreciation, and total vehicle ownership expenses.",
};

export default function UsedCarCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}