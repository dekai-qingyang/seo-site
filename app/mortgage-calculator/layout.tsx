import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator | LoanFormulas",
  description:
    "Free mortgage calculator with amortization schedule, mortgage charts, monthly payment estimates, and loan breakdown.",
};

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}