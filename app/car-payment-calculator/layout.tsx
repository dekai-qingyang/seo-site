import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Payment Calculator | LoanFormulas",
  description:
    "Estimate monthly car payments, auto loan interest, total vehicle financing costs, and amortization schedules.",
};

export default function CarPaymentCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}