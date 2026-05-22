import React from "react";

export const metadata = {
  title: "Monthly Budget Calculator",
  description:
    "Free Monthly Budget Calculator to track income, expenses, savings, and financial goals with interactive charts and detailed budgeting insights.",
};

export default function MonthlyBudgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}