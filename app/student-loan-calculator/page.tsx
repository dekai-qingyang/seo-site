"use client";

import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function StudentLoanCalculator() {

  const [loanAmount, setLoanAmount] = useState(45000);

  const [interestRate, setInterestRate] = useState(5.8);

  const [loanTerm, setLoanTerm] = useState(10);

  const monthlyRate =
    interestRate / 100 / 12;

  const totalMonths =
    loanTerm * 12;

  const monthlyPayment =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalRepayment =
    monthlyPayment * totalMonths;

  const totalInterest =
    totalRepayment - loanAmount;

  const pieData = [
    {
      name: "Principal",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        balance: loanAmount * 0.92,
      },
      {
        year: "Year 3",
        balance: loanAmount * 0.72,
      },
      {
        year: "Year 5",
        balance: loanAmount * 0.52,
      },
      {
        year: "Year 7",
        balance: loanAmount * 0.28,
      },
      {
        year: "Year 10",
        balance: 0,
      },
    ];

  }, [loanAmount]);

  const compareData = [
    {
      name: "Principal",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
    {
      name: "Repayment",
      value: totalRepayment,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Student Loan Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate monthly student loan payments,
              total borrowing costs,
              repayment schedules,
              and long-term education debt expenses instantly.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Student Loan Amount"
                  value={loanAmount}
                  setValue={setLoanAmount}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Repayment Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Monthly Payment
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${monthlyPayment.toFixed(2)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Student Loan Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Repayment"
                    value={`$${totalRepayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Repayment Length"
                    value={`${loanTerm} Years`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Student Loan Cost Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[320px] w-full">

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#1d4ed8" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Loan Principal"
                value={`$${loanAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Paid"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Monthly Payment"
                value={`$${monthlyPayment.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Balance Over Time
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#1d4ed8"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Student Loan Comparison
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <BarChart data={compareData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#1d4ed8"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Student Loan Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A student loan calculator helps borrowers estimate monthly payments,
              repayment costs,
              interest expenses,
              and long-term education debt obligations.
              Student loans are commonly used to finance college tuition,
              housing,
              books,
              living expenses,
              and other education-related costs.
            </p>

            <p>
              By entering the total loan amount,
              annual interest rate,
              and repayment term,
              borrowers can estimate how much they may owe every month and how much interest may accumulate over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Student Loans Work
            </h3>

            <p>
              Student loans are installment loans designed specifically for education expenses.
              Borrowers receive funds upfront and repay the debt through scheduled monthly payments.
              Payments generally include both principal and interest.
            </p>

            <p>
              Federal student loans may offer fixed interest rates,
              income-driven repayment plans,
              deferment,
              and forgiveness programs.
              Private student loans may provide different repayment structures depending on the lender.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Student Loan Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Monthly Payment =
                P × r × (1 + r)^n ÷ ((1 + r)^n − 1)
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                P = Principal loan amount
              </li>

              <li>
                r = Monthly interest rate
              </li>

              <li>
                n = Number of monthly payments
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Student Loan Planning Matters
            </h3>

            <p>
              Student loan debt may affect future financial decisions including home ownership,
              retirement planning,
              investing,
              and credit approval.
              Understanding repayment obligations before borrowing can help students make more informed financial choices.
            </p>

            <p>
              Longer repayment terms may reduce monthly payments,
              but they often increase total interest costs substantially over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Federal vs Private Student Loans
            </h3>

            <p>
              Federal student loans are issued by the government and may provide borrower protections,
              flexible repayment options,
              and forgiveness opportunities.
              Private student loans are offered by banks,
              credit unions,
              and online lenders.
            </p>

            <p>
              Private loans may require credit checks,
              co-signers,
              and variable interest rates.
              Borrowers should compare all available loan options carefully before borrowing.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Student Loan Scenario
            </h3>

            <p>
              For example,
              borrowing $45,000 at a 5.8% interest rate over 10 years may result in hundreds of dollars in monthly payments and thousands of dollars in total interest expenses.
            </p>

            <p>
              Small changes in interest rates or repayment periods can significantly impact the total cost of education financing.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Student Loan Repayment Strategies
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Making extra monthly payments
              </li>

              <li>
                Refinancing high-interest loans
              </li>

              <li>
                Using automatic payment discounts
              </li>

              <li>
                Selecting shorter repayment terms
              </li>

              <li>
                Applying for income-driven repayment plans
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a student loan?"
                answer="A student loan is a type of financing designed to help students pay education-related expenses."
              />

              <FaqItem
                question="Are student loan interest rates fixed?"
                answer="Federal student loans often use fixed interest rates, while some private loans may offer variable rates."
              />

              <FaqItem
                question="Can student loans be paid off early?"
                answer="Yes. Many student loans allow early repayment without prepayment penalties."
              />

              <FaqItem
                question="What happens if payments are missed?"
                answer="Missing payments may damage credit scores and increase long-term financial costs."
              />

            </div>

          </div>

        </section>

        {/* RELATED TOOLS */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Related Calculators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              {
                title: "Student Loan Payoff Calculator",
                link: "/student-loan-payoff-calculator",
              },

              {
                title: "Student Loan Refinance Calculator",
                link: "/student-loan-refinance-calculator",
              },

              {
                title: "Personal Loan Calculator",
                link: "/personal-loan-calculator",
              },

              {
                title: "Debt Payoff Calculator",
                link: "/debt-payoff-calculator",
              },

              {
                title: "APR Calculator",
                link: "/apr-calculator",
              },

              {
                title: "Loan Payoff Calculator",
                link: "/loan-payoff-calculator",
              },

            ].map((item) => (

              <a
                key={item.link}
                href={item.link}
                className="border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition"
              >

                <div className="font-bold text-lg text-slate-900">
                  {item.title}
                </div>

              </a>

            ))}

          </div>

        </div>

      </div>

    </main>

  );
}

function InputField({
  label,
  value,
  setValue,
  prefix,
  suffix,
}: any) {

  return (

    <div>

      <label className="block text-sm font-bold mb-2 text-slate-800">
        {label}
      </label>

      <div className="relative">

        {prefix && (

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
            {prefix}
          </span>

        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className={`w-full border border-slate-200 rounded-2xl py-3 bg-white text-black font-bold text-lg ${
            prefix ? "pl-10" : "pl-4"
          } ${suffix ? "pr-16" : "pr-4"}`}
        />

        {suffix && (

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
            {suffix}
          </span>

        )}

      </div>

    </div>

  );
}

function SummaryRow({
  label,
  value,
}: any) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-600 font-semibold">
          {label}
        </span>

        <span className="font-black text-slate-900">
          {value}
        </span>

      </div>

    </div>

  );
}

function SummaryCard({
  title,
  value,
}: any) {

  return (

    <div className="bg-slate-100 rounded-2xl p-5">

      <div className="text-slate-600 mb-1 font-semibold">
        {title}
      </div>

      <div className="text-3xl font-black tracking-tight text-slate-900">
        {value}
      </div>

    </div>

  );

}

function FaqItem({
  question,
  answer,
}: any) {

  return (

    <div className="border rounded-2xl p-6">

      <h3 className="font-black text-xl mb-3 text-slate-900">
        {question}
      </h3>

      <p className="text-slate-700 leading-8">
        {answer}
      </p>

    </div>

  );

}