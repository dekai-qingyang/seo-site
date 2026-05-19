// app/personal-loan-calculator/page.tsx

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

export default function PersonalLoanCalculator() {

  const [loanAmount, setLoanAmount] = useState(25000);

  const [interestRate, setInterestRate] = useState(8);

  const [loanTerm, setLoanTerm] = useState(5);

  const monthlyRate = interestRate / 100 / 12;

  const totalMonths = loanTerm * 12;

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
        month: "Year 1",
        balance: loanAmount * 0.82,
      },
      {
        month: "Year 2",
        balance: loanAmount * 0.63,
      },
      {
        month: "Year 3",
        balance: loanAmount * 0.44,
      },
      {
        month: "Year 4",
        balance: loanAmount * 0.22,
      },
      {
        month: "Year 5",
        balance: 0,
      },
    ];

  }, [loanAmount]);

  const compareData = [
    {
      name: "Loan Amount",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
    {
      name: "Monthly Payment",
      value: monthlyPayment,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-6 py-8">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Personal Loan Calculator
            </h1>

            <p className="text-white/90 text-lg">
              Estimate monthly payments,
              total interest costs,
              repayment schedules,
              and borrowing expenses instantly.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Loan Amount
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
                      $
                    </span>

                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) =>
                        setLoanAmount(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white text-black font-bold text-lg"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Interest Rate
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) =>
                        setInterestRate(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white text-black font-bold text-lg"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
                      %
                    </span>

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Loan Term
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) =>
                        setLoanTerm(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-16 bg-white text-black font-bold text-lg"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
                      Years
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl text-white p-6 mb-6">

                <p className="text-white/90 mb-2">
                  Estimated Monthly Payment
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${monthlyPayment.toFixed(2)}
                </h2>

              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Loan Summary
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
                    label="Loan Term"
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
            Principal vs Interest
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
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
                title="Loan Amount"
                value={`$${loanAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Cost"
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
            Loan Balance Trend
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

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
            Loan Comparison
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

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

          <h2 className="text-4xl font-black mb-6">
            Personal Loan Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A personal loan calculator helps borrowers estimate monthly payments,
              total repayment costs, and overall loan affordability before applying
              for financing. Personal loans are commonly used for debt consolidation,
              home improvement projects, emergency expenses, medical bills, weddings,
              vacations, and large purchases.
            </p>

            <p>
              By entering the loan amount, annual interest rate, and repayment term,
              borrowers can quickly estimate how much they may pay each month and how
              much interest may accumulate over the life of the loan.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Personal Loans Work
            </h3>

            <p>
              Personal loans are installment loans that provide borrowers with a lump
              sum upfront. Borrowers repay the loan through fixed monthly payments over
              a predetermined term. Monthly payments typically include both principal
              and interest.
            </p>

            <p>
              Interest rates may vary depending on credit score, lender requirements,
              income, debt-to-income ratio, and loan duration.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Personal Loan Formula
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
                P = Loan principal
              </li>

              <li>
                r = Monthly interest rate
              </li>

              <li>
                n = Total number of monthly payments
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Personal Loans
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Fixed monthly payments
              </li>

              <li>
                Predictable repayment schedules
              </li>

              <li>
                Lower interest rates than many credit cards
              </li>

              <li>
                Flexible use cases
              </li>

              <li>
                Fast approval processes
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks and Considerations
            </h3>

            <p>
              Borrowers should carefully review loan fees, APR, repayment terms,
              and total borrowing costs before accepting a loan offer. Longer loan
              terms may reduce monthly payments but often increase total interest costs.
            </p>

            <p>
              Missing payments may negatively affect credit scores and increase
              long-term financial stress.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Personal Loan Scenario
            </h3>

            <p>
              For example, a borrower taking a $25,000 loan at 8% APR for 5 years
              may pay hundreds of dollars each month and thousands in total interest
              over the repayment period.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What credit score is needed for a personal loan?"
                answer="Many lenders prefer credit scores above 620, although requirements vary."
              />

              <FaqItem
                question="Are personal loan rates fixed?"
                answer="Many personal loans offer fixed interest rates and fixed monthly payments."
              />

              <FaqItem
                question="Can I repay a personal loan early?"
                answer="Some lenders allow early repayment without penalties, while others may charge fees."
              />

              <FaqItem
                question="Does applying for a loan affect credit scores?"
                answer="Some lenders perform hard credit inquiries which may temporarily affect credit scores."
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
                title: "Loan Payoff Calculator",
                link: "/loan-payoff-calculator",
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
                title: "Balance Transfer Calculator",
                link: "/balance-transfer-calculator",
              },

              {
                title: "Credit Utilization Calculator",
                link: "/credit-utilization-calculator",
              },

              {
                title: "Debt Consolidation Calculator",
                link: "/debt-consolidation-calculator",
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