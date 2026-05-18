"use client"

import { useMemo, useState } from "react"

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts"

export default function PrincipalAndInterestCalculator() {

  const [loanAmount, setLoanAmount] =
    useState(420000)

  const [interestRate, setInterestRate] =
    useState(6.25)

  const [loanTerm, setLoanTerm] =
    useState(30)

  const monthlyRate =
    interestRate / 100 / 12

  const totalMonths =
    loanTerm * 12

  const monthlyPayment =
    (
      loanAmount *
      monthlyRate
    ) /
    (
      1 -
      Math.pow(
        1 + monthlyRate,
        -totalMonths
      )
    )

  const totalPayment =
    monthlyPayment * totalMonths

  const totalInterest =
    totalPayment - loanAmount

  const pieData = [
    {
      name: "Principal",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const compareData = [
    {
      name: "Principal",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: loanAmount,
      },
      {
        year: "Year 5",
        value: loanAmount * 0.92,
      },
      {
        year: "Year 10",
        value: loanAmount * 0.8,
      },
      {
        year: "Year 20",
        value: loanAmount * 0.48,
      },
      {
        year: "Year 30",
        value: 0,
      },
    ]

  }, [
    loanAmount,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Principal and Interest Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate mortgage principal payments,
              interest costs,
              monthly payments,
              and total loan repayment.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Loan Amount"
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
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix=" years"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Principal & Interest Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Loan Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Principal"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Loan Cost"
                    value={`$${totalPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={`$${monthlyPayment.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Principal and Interest Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              Principal and interest payments
              are the core components
              of most mortgage loans.
              Mortgage borrowers repay both:
              the original loan balance
              and interest charges
              over the life of the loan.
            </p>

            <p>
              The principal portion
              reduces the remaining loan balance,
              while the interest portion
              represents borrowing costs
              paid to the lender.
            </p>

            <p>
              Mortgage payments usually include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Principal payments</li>

              <li>Interest payments</li>

              <li>Property taxes</li>

              <li>Insurance costs</li>

              <li>Mortgage insurance</li>

            </ul>

            <p>
              However,
              principal and interest calculations
              specifically focus on
              loan repayment costs
              excluding taxes and insurance.
            </p>

            <p>
              In the early years of a mortgage,
              larger portions of monthly payments
              go toward interest costs.
            </p>

            <p>
              Over time,
              the balance gradually decreases,
              allowing larger portions
              of monthly payments
              to reduce principal balances.
            </p>

            <p>
              Principal and interest calculators help borrowers estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly mortgage payments</li>

              <li>Total interest costs</li>

              <li>Total loan repayment</li>

              <li>Long-term affordability</li>

              <li>Mortgage amortization trends</li>

            </ul>

            <p>
              Mortgage interest rates
              significantly affect borrowing costs.
              Higher rates increase:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly payments</li>

              <li>Total interest expenses</li>

              <li>Long-term loan costs</li>

            </ul>

            <p>
              Many homeowners reduce interest costs
              by making extra mortgage payments
              or refinancing into lower rates.
            </p>

            <p>
              Understanding principal and interest calculations
              helps borrowers make better
              mortgage planning decisions
              and evaluate long-term housing affordability.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Principal vs Interest Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#2563eb" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Principal Balance"
                value={`$${loanAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Interest"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Repayment"
                value={`$${totalPayment.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Balance Trend
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Principal vs Interest Comparison
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={compareData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Principal and Interest Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Monthly Payment =
              P × r ÷ (1 − (1 + r)^−n)
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Principal and Interest Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A homeowner borrowing
              $420,000
              with a
              30-year mortgage
              at
              6.25%
              interest
              may pay approximately
              ${monthlyPayment.toFixed(0)}
              monthly
              toward principal and interest.
            </p>

            <p>
              Over the life of the mortgage,
              total interest expenses
              may exceed
              ${totalInterest.toFixed(0)}.
            </p>

            <p>
              This example demonstrates
              how mortgage interest
              significantly increases
              long-term housing costs
              over multi-decade repayment periods.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Principal and Interest FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is mortgage principal?
              </h3>

              <p>
                Mortgage principal
                is the original loan amount borrowed
                from the lender.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is mortgage interest?
              </h3>

              <p>
                Mortgage interest
                represents borrowing costs
                charged by the lender
                over the repayment period.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why are early mortgage payments mostly interest?
              </h3>

              <p>
                Early mortgage balances are larger,
                causing higher interest charges
                during the beginning years
                of repayment.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can extra payments reduce interest costs?
              </h3>

              <p>
                Yes.
                Additional principal payments
                reduce loan balances faster
                and lower long-term interest expenses.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are taxes and insurance included?
              </h3>

              <p>
                Principal and interest calculations
                typically exclude:
                property taxes,
                insurance,
                and HOA fees.
              </p>

            </div>

          </div>

        </div>

        {/* RELATED TOOLS */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Related Calculators
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <a
              href="/mortgage-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
            </a>

            <a
              href="/mortgage-interest-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Interest Calculator
            </a>

            <a
              href="/mortgage-payoff-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Payoff Calculator
            </a>

            <a
              href="/amortization-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Amortization Calculator
            </a>

          </div>

        </div>

      </div>

    </main>
  )
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

      <label className="block text-sm font-semibold mb-2 text-slate-700">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className="w-full border border-slate-200 rounded-2xl py-3 pl-8 pr-8 bg-white"
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700">
            {suffix}
          </span>
        )}

      </div>

    </div>

  )
}

function SummaryRow({
  label,
  value,
}: any) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-700">
          {label}
        </span>

        <span className="font-bold">
          {value}
        </span>

      </div>

    </div>

  )
}

function SummaryCard({
  title,
  value,
}: any) {

  return (

    <div className="bg-slate-100 rounded-2xl p-5">

      <div className="text-slate-700 mb-1">
        {title}
      </div>

      <div className="text-2xl font-black">
        {value}
      </div>

    </div>

  )
}