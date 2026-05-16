import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Calculator | LoanFormulas",
  description:
    "Estimate real estate investment returns, rental cash flow, appreciation, and property performance.",
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}