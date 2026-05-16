import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Insurance Calculator | LoanFormulas",
  description:
    "Calculate PMI costs, mortgage insurance payments, and total home loan expenses.",
};

export default function MortgageInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}