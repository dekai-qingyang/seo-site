import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Loan Calculator | LoanFormulas",
  description:
    "Estimate vehicle loan payments, auto financing costs, interest expenses, and total transportation loan repayments.",
};

export default function VehicleLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}