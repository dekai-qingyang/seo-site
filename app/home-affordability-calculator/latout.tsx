import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Affordability Calculator | LoanFormulas",
  description:
    "Estimate how much house you can afford based on income, debt, and mortgage payments.",
};

export default function HomeAffordabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}