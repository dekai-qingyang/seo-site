import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dividend Calculator | LoanFormulas",
  description:
    "Free dividend calculator with dividend income projections, yield analysis, passive income estimates, and dividend growth charts.",
};

export default function DividendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}