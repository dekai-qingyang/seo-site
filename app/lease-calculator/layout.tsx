import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lease Calculator | LoanFormulas",
  description:
    "Estimate lease payments, residual values, financing costs, and monthly leasing expenses.",
};

export default function LeaseCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}