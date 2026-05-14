import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator | LoanFormulas",
  description:
    "Free retirement calculator with savings projections, retirement income estimates, investment growth charts, and retirement planning analysis.",
};

export default function RetirementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}