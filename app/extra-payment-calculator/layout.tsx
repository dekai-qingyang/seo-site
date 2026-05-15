import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extra Payment Calculator | LoanFormulas",
  description:
    "Calculate mortgage savings, interest reduction, and loan payoff timelines with extra monthly payments.",
};

export default function ExtraPaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}