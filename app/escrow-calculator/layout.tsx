import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Escrow Calculator | LoanFormulas",
  description:
    "Estimate escrow payments for property taxes, homeowners insurance, and monthly mortgage escrow costs.",
};

export default function EscrowCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}