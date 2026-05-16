import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Equity Line of Credit Calculator | LoanFormulas",
  description:
    "Estimate HELOC payments, credit line borrowing costs, and home equity usage.",
};

export default function HomeEquityLOCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}