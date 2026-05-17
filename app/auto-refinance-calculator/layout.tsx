import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Refinance Calculator | LoanFormulas",
  description:
    "Estimate auto refinance savings, reduced monthly payments, lower interest costs, and refinancing benefits.",
};

export default function AutoRefinanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}