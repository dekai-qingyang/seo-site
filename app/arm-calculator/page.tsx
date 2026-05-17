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

export default function ARMCalculator() {

  const [loanAmount, setLoanAmount] =
    useState(400000)

  const [initialRate, setInitialRate] =
    useState(4.25)

  const [futureRate, setFutureRate] =
    useState(6.75)

  const [fixedPeriod, setFixedPeriod] =
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

  const futurePayment =
    (
      loanAmount *
      (futureRate / 100 / 12)
    ) /
    (
      1 -
      Math.pow(
        1 + (futureRate / 100 / 12),
        -(loanTerm * 12)
      )
    )

  const paymentDifference =
    futurePayment - initialPayment

  const pieData = [
    {
      name: "Initial Payment",
      value: initialPayment,
    },
    {
      name: "Future Increase",
      value: paymentDifference,
    },
  ]

  const compareData = [
    {
      name: "Initial ARM",
      value: initialPayment,
    },
    {
      name: "Adjusted ARM",
      value: futurePayment,
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
        value: futurePayment,
      },
      {
        year: "Year 10",
        value: futurePayment,
      },
    ]

  }, [
    initialPayment,
    futurePayment,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              ARM Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate adjustable rate mortgage payments,
              ARM interest changes,
              and long-term mortgage affordability.
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
                  label="Future Interest Rate"
                  value={futureRate}
                  setValue={setFutureRate}
                  suffix="%"
                />

                <InputField
                  label="Fixed ARM Period"
                  value={fixedPeriod}
                  setValue={setFixedPeriod}
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
                  Future ARM Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${futurePayment.toFixed(0)}
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
                    label="Initial Payment"
                    value={`$${initialPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Adjusted Payment"
                    value={`$${futurePayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Increase"
                    value={`$${paymentDifference.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Fixed Rate Period"
                    value={`${fixedPeriod} Years`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            ARM Mortgage Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              An ARM,
              or adjustable rate mortgage,
              is a mortgage loan
              with an interest rate
              that changes periodically
              after an initial fixed-rate period.
            </p>

            <p>
              ARM loans commonly begin
              with lower introductory rates
              compared to fixed-rate mortgages.
              After the fixed period ends,
              interest rates adjust
              according to market indexes
              and lender terms.
            </p>

            <p>
              Common ARM loan structures include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>5/1 ARM</li>

              <li>7/1 ARM</li>

              <li>10/1 ARM</li>

              <li>Hybrid adjustable mortgages</li>

            </ul>

            <p>
              ARM calculators help borrowers estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Initial mortgage payments</li>

              <li>Future adjustable payments</li>

              <li>Interest rate increases</li>

              <li>Long-term mortgage affordability</li>

              <li>Payment risk exposure</li>

            </ul>

            <p>
              Adjustable rate mortgages may benefit borrowers
              who plan to move,
              refinance,
              or sell properties
              before adjustable rates begin.
            </p>

            <p>
              However,
              ARM loans may become more expensive
              if interest rates rise significantly.
            </p>

            <p>
              Borrowers should understand:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Rate adjustment schedules</li>

              <li>Interest rate caps</li>

              <li>Lifetime loan limits</li>

              <li>Market rate volatility</li>

              <li>Long-term affordability</li>

            </ul>

            <p>
              ARM loans may offer substantial short-term savings,
              but long-term payment uncertainty
              increases financial risk
              compared to fixed-rate mortgages.
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
                title="Initial ARM Payment"
                value={`$${initialPayment.toFixed(0)}`}
              />

              <SummaryCard
                title="Adjusted ARM Payment"
                value={`$${futurePayment.toFixed(0)}`}
              />

              <SummaryCard
                title="Monthly Increase"
                value={`$${paymentDifference.toFixed(0)}`}
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
            Initial vs Future ARM Payments
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
            ARM Mortgage Formula
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
            ARM Mortgage Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A borrower financing
              $400,000
              with a
              5/1 ARM
              may initially receive
              a lower mortgage rate
              of
              4.25%.
            </p>

            <p>
              During the first five years,
              estimated monthly mortgage payments
              may remain around
              ${initialPayment.toFixed(0)}.
            </p>

            <p>
              If interest rates later increase
              to
              6.75%,
              future monthly payments
              may rise to approximately
              ${futurePayment.toFixed(0)}.
            </p>

            <p>
              This example demonstrates
              how ARM loans
              may offer lower short-term costs
              but greater long-term uncertainty.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            ARM Mortgage FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is an ARM mortgage?
              </h3>

              <p>
                An ARM mortgage
                uses adjustable interest rates
                that change periodically
                after an introductory fixed-rate period.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why are ARM rates initially lower?
              </h3>

              <p>
                ARM loans commonly offer
                lower introductory rates
                compared to fixed-rate mortgages
                because future rates may increase.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What happens after the ARM fixed period?
              </h3>

              <p>
                Mortgage interest rates adjust
                according to lender terms
                and broader market conditions.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are ARM mortgages risky?
              </h3>

              <p>
                ARM loans may become more expensive
                if future interest rates increase significantly.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Who should consider ARM loans?
              </h3>

              <p>
                ARM loans may benefit:
                short-term homeowners,
                investors,
                and borrowers expecting income growth.
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
              href="/adjustable-rate-mortgage-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Adjustable Rate Mortgage Calculator
            </a>

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
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
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
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
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

        <span className="text-slate-500">
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

      <div className="text-slate-500 mb-1">
        {title}
      </div>

      <div className="text-2xl font-black">
        {value}
      </div>

    </div>

  )
}