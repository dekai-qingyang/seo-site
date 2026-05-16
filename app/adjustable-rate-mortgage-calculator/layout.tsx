import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adjustable Rate Mortgage Calculator | LoanFormulas",
  description:
    "Estimate adjustable rate mortgage payments, ARM interest changes, and long-term mortgage costs.",
};

export default function AdjustableRateMortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}