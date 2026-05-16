import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Principal and Interest Calculator | LoanFormulas",
  description:
    "Estimate mortgage principal and interest payments, amortization costs, and long-term loan repayment.",
};

export default function PrincipalAndInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}