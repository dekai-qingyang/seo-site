import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Snowball Calculator | LoanFormulas",
  description:
    "Calculate debt snowball repayment plans, monthly debt payoff schedules, and interest reduction strategies.",
};

export default function DebtSnowballLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}