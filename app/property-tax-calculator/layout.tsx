import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Tax Calculator | LoanFormulas",
  description:
    "Estimate annual property taxes, monthly tax payments, and homeownership costs.",
};

export default function PropertyTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}