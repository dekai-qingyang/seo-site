import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator | LoanFormulas",
  description:
    "Free ROI calculator with return on investment analysis, profit projections, percentage return charts, and investment performance estimates.",
};

export default function ROILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}