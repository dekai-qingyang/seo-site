import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator | LoanFormulas",
  description:
    "Compare renting versus buying a home with cost analysis, mortgage estimates, and long-term housing expenses.",
};

export default function RentVsBuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}