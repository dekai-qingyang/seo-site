import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Lease Calculator | LoanFormulas",
  description:
    "Estimate car lease payments, residual values, depreciation costs, and total vehicle leasing expenses.",
};

export default function CarLeaseCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}