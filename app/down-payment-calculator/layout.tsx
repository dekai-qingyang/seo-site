import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Down Payment Calculator | LoanFormulas",
  description:
    "Estimate down payments, mortgage affordability, monthly payments, and home buying costs.",
};

export default function DownPaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}