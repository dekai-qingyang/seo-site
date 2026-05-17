import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Depreciation Calculator | LoanFormulas",
  description:
    "Estimate vehicle depreciation, resale value, yearly value loss, and long-term car ownership costs.",
};

export default function VehicleDepreciationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}