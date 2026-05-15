import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Interest Calculator | LoanFormulas",
  description:
    "Calculate mortgage interest costs, total loan payments, and long-term borrowing expenses.",
};

export default function MortgageInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}