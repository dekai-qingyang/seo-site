import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator | LoanFormulas",
  description:
    "Free mortgage calculator with amortization schedule, monthly payment estimates, interest breakdown, and home affordability insights.",
};

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}