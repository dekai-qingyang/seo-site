import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator | LoanFormulas",
  description:
    "Estimate credit card payoff schedules, interest savings, debt repayment timelines, and monthly payment strategies.",
};

export default function CreditCardPayoffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}