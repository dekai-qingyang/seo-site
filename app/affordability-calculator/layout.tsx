import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordability Calculator | LoanFormulas",
  description:
    "Free affordability calculator to estimate how much house you can afford based on income, debt, down payment, and mortgage rates.",
};

export default function AffordabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}