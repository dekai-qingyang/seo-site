import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator | LoanFormulas",
  description:
    "Free loan calculator with monthly payment estimates, amortization schedule, loan charts, interest calculations, and repayment breakdown.",
};

export default function LoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}