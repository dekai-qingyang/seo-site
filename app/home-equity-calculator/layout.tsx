import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Equity Calculator | LoanFormulas",
  description:
    "Estimate home equity value, remaining mortgage balance, and property ownership percentage.",
};

export default function HomeEquityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}