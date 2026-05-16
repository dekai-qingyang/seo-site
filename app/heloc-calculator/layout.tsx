import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HELOC Calculator | LoanFormulas",
  description:
    "Estimate HELOC payments, interest costs, and flexible home equity borrowing schedules.",
};

export default function HELOCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}