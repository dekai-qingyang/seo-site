import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Out Refinance Calculator | LoanFormulas",
  description:
    "Estimate cash out refinance amounts, mortgage balances, monthly payments, and home equity usage.",
};

export default function CashOutRefinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}