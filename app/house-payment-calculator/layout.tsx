import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House Payment Calculator | LoanFormulas",
  description:
    "Estimate monthly house payments including mortgage, taxes, insurance, and HOA fees.",
};

export default function HousePaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}