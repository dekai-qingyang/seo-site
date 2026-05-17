import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Affordability Calculator | LoanFormulas",
  description:
    "Estimate how much car you can afford based on income, debt, monthly budget, and auto loan payments.",
};

export default function CarAffordabilityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}