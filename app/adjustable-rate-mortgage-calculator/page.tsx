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

export default function AdjustableRateMortgageCalculator() {

  const [loanAmount, setLoanAmount] =
    useState(450000)

  const [initialRate, setInitialRate] =
    useState(4.5)

  const [adjustedRate, setAdjustedRate] =
    useState(7)

  const [fixedYears, setFixedYears] =
    useState(5)

  const [loanTerm, setLoanTerm] =
    useState(30)

  const initialPayment =
    (
      loanAmount *
      (initialRate / 100 / 12)
    ) /
    (
      1 -
      Math.pow(
        1 + (initialRate / 100 / 12),
        -(loanTerm * 12)
      )
    )

  const adjustedPayment =
    (
      loanAmount *
      (adjustedRate / 100 / 12)
    ) /
    (
      1 -
      Math.pow(
        1 + (adjustedRate / 100 / 12),
        -(loanTerm * 12)
      )
    )

  const paymentIncrease =
    adjustedPayment - initialPayment

  const pieData = [
    {
      name: "Initial Payment",
      value: initialPayment,
    },
    {
      name: "Increase",
      value: paymentIncrease,
    },
  ]

  const compareData = [
    {
      name: "Initial ARM",
      value: initialPayment,
    },
    {
      name: "Adjusted ARM",
      value: adjustedPayment,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: initialPayment,
      },
      {
        year: "Year 3",
        value: initialPayment,
      },
      {
        year: "Year 5",
        value: initialPayment,
      },
      {
        year: "Year 6",
        value: adjustedPayment,
      },
      {
        year: "Year 10",
        value: adjustedPayment,
      },
    ]

  }, [
    initialPayment,
    adjustedPayment,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Adjustable Rate Mortgage Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate adjustable rate mortgage payments,
              ARM interest rate changes,
              and long-term mortgage costs.
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
                  label="Initial Interest Rate"
                  value={initialRate}
                  setValue={setInitialRate}
                  suffix="%"
                />

                <InputField
                  label="Adjusted Interest Rate"
                  value={adjustedRate}
                  setValue={setAdjustedRate}
                  suffix="%"
                />

                <InputField
                  label="Fixed Rate Years"
                  value={fixedYears}
                  setValue={setFixedYears}
                  suffix=" years"
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
                  Estimated Adjusted Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${adjustedPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    ARM Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Initial Monthly Payment"
                    value={`$${initialPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Adjusted Monthly Payment"
                    value={`$${adjustedPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Payment Increase"
                    value={`$${paymentIncrease.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Fixed Rate Period"
                    value={`${fixedYears} Years`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Adjustable Rate Mortgage Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              An adjustable rate mortgage,
              commonly called an ARM,
              is a mortgage loan
              with an interest rate
              that changes periodically over time.
            </p>

            <p>
              ARM loans typically begin
              with a lower fixed interest rate
              for an introductory period,
              followed by variable rate adjustments
              based on market conditions.
            </p>

            <p>
              Adjustable rate mortgages commonly include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>5/1 ARM loans</li>

              <li>7/1 ARM loans</li>

              <li>10/1 ARM loans</li>

              <li>Hybrid mortgage structures</li>

            </ul>

            <p>
              A 5/1 ARM,
              for example,
              maintains a fixed interest rate
              for five years
              before adjusting annually.
            </p>

            <p>
              Adjustable rate mortgage calculators help borrowers estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Initial mortgage payments</li>

              <li>Future adjusted payments</li>

              <li>Potential payment increases</li>

              <li>Long-term borrowing costs</li>

              <li>Interest rate risk</li>

            </ul>

            <p>
              ARM loans may offer lower initial payments
              compared to fixed-rate mortgages,
              making them attractive
              for short-term homeowners
              or borrowers expecting future income growth.
            </p>

            <p>
              However,
              rising interest rates
              may significantly increase future mortgage payments.
            </p>

            <p>
              Borrowers should carefully evaluate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Adjustment caps</li>

              <li>Market interest trends</li>

              <li>Long-term affordability</li>

              <li>Refinancing options</li>

              <li>Financial stability</li>

            </ul>

            <p>
              Understanding adjustable rate mortgage risks
              helps borrowers make more informed
              home financing decisions.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            ARM Payment Breakdown
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
                title="Initial Payment"
                value={`$${initialPayment.toFixed(0)}`}
              />

              <SummaryCard
                title="Adjusted Payment"
                value={`$${adjustedPayment.toFixed(0)}`}
              />

              <SummaryCard
                title="Monthly Increase"
                value={`$${paymentIncrease.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            ARM Payment Trend
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
            Initial vs Adjusted Mortgage Payment
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
            Adjustable Rate Mortgage Formula
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
            Adjustable Rate Mortgage Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A borrower financing
              $450,000
              with a
              5-year ARM
              may initially receive
              a lower interest rate
              of
              4.5%.
            </p>

            <p>
              During the fixed period,
              estimated monthly payments
              may remain around
              ${initialPayment.toFixed(0)}.
            </p>

            <p>
              After adjustment,
              if interest rates increase to
              7%,
              estimated monthly payments
              may rise to approximately
              ${adjustedPayment.toFixed(0)}.
            </p>

            <p>
              This example demonstrates
              how adjustable rate mortgages
              may create payment uncertainty
              in rising interest rate environments.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Adjustable Rate Mortgage FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is an adjustable rate mortgage?
              </h3>

              <p>
                An adjustable rate mortgage
                is a mortgage loan
                with an interest rate
                that changes periodically over time.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why are ARM loans cheaper initially?
              </h3>

              <p>
                ARM loans commonly offer
                lower introductory interest rates
                compared to fixed-rate mortgages.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What happens after the fixed period?
              </h3>

              <p>
                After the fixed period,
                mortgage rates adjust
                according to market conditions
                and lender terms.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are ARM loans risky?
              </h3>

              <p>
                ARM loans may increase financial risk
                because future payments
                may rise significantly
                if interest rates increase.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Who benefits from adjustable rate mortgages?
              </h3>

              <p>
                ARM loans may benefit:
                short-term homeowners,
                investors,
                and borrowers expecting future income growth.
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
              href="/refinance-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Refinance Calculator
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