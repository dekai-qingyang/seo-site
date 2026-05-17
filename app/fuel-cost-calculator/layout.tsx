import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Cost Calculator | LoanFormulas",
  description:
    "Estimate fuel expenses, transportation costs, gasoline consumption, and long-term driving affordability.",
};

export default function FuelCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}