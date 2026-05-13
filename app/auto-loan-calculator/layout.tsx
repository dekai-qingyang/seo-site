import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator | LoanFormulas",
  description:
    "Free auto loan calculator with car payment estimates, amortization schedule, loan breakdown charts, total interest calculations, and vehicle financing tools.",
};

export default function AutoLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}