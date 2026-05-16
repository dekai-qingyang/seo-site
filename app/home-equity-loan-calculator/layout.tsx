import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Equity Loan Calculator | LoanFormulas",
  description:
    "Calculate home equity loan payments, interest costs, and borrowing estimates.",
};

export default function HomeEquityLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}