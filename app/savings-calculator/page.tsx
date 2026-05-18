"use client"

import { useMemo, useState } from "react"

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function SavingsCalculator() {

  const [initialSavings, setInitialSavings] = useState(10000)

  const [monthlyContribution, setMonthlyContribution] = useState(500)

  const [interestRate, setInterestRate] = useState(5)

  const [years, setYears] = useState(20)

  const monthlyRate =
    interestRate / 100 / 12

  const totalMonths =
    years * 12

  const futureValue =
    initialSavings *
    Math.pow(
      1 + monthlyRate,
      totalMonths
    ) +
    monthlyContribution *
    (
      (
        Math.pow(
          1 + monthlyRate,
          totalMonths
        ) - 1
      ) / monthlyRate
    )

  const totalContributions =
    initialSavings +
    monthlyContribution * totalMonths

  const totalInterest =
    futureValue - totalContributions

  const monthlyInterest =
    futureValue * monthlyRate

  const chartData = [
    {
      name: "Contributions",
      value: totalContributions,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const growthData = useMemo(() => {

    const rows = []

    for (
      let year = 0;
      year <= years;
      year++
    ) {

      const months = year * 12

      const value =
        initialSavings *
        Math.pow(
          1 + monthlyRate,
          months
        ) +
        monthlyContribution *
        (
          (
            Math.pow(
              1 + monthlyRate,
              months
            ) - 1
          ) / monthlyRate
        )

      rows.push({
        year,
        value,
      })
    }

    return rows

  }, [
    initialSavings,
    monthlyContribution,
    interestRate,
    years,
    monthlyRate,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Savings Calculator
            </h1>

            <p className="text-green-100 text-sm lg:text-lg">
              Calculate savings growth,
              compound interest,
              monthly contributions,
              and long-term financial goals.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Initial Savings"
                  value={initialSavings}
                  setValue={setInitialSavings}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Years"
                  value={years}
                  setValue={setYears}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-green-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-green-100 mb-2">
                  Estimated Savings Balance
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Savings Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
                    value={totalContributions}
                  />

                  <SummaryRow
                    label="Total Interest Earned"
                    value={totalInterest}
                  />

                  <SummaryRow
                    label="Monthly Interest Estimate"
                    value={monthlyInterest}
                  />

                  <SummaryRow
                    label="Years"
                    value={years}
                    isCurrency={false}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Savings Growth Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Starting with
            <strong> ${initialSavings.toLocaleString()}</strong>
            and contributing
            <strong> ${monthlyContribution}</strong>
            monthly at an annual interest rate of
            <strong> {interestRate}%</strong>,
            your savings could grow to approximately
            <strong> ${futureValue.toFixed(0)}</strong>
            over
            <strong> {years} years</strong>.

          </p>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Savings Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    <Cell fill="#16a34a" />
                    <Cell fill="#86efac" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-green-50 rounded-2xl p-5">

                <div className="text-slate-700 mb-1">
                  Contributions
                </div>

                <div className="text-2xl font-black">
                  ${totalContributions.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-700 mb-1">
                  Interest Earned
                </div>

                <div className="text-2xl font-black">
                  ${totalInterest.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Savings Growth Chart
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#16a34a"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Savings Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              FV = PV(1 + r)^n + PMT × [((1 + r)^n - 1) / r]
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Savings Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            A saver with
            $10,000 in initial savings
            who contributes $500 monthly
            at a 5% annual interest rate
            could accumulate approximately
            <strong> ${futureValue.toFixed(0)}</strong>
            over
            <strong> {years} years</strong>.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Savings Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is compound interest?
              </h3>

              <p className="text-slate-700 leading-8">
                Compound interest allows savings
                to grow faster because interest
                is earned on both principal and
                accumulated interest.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                How much should I save monthly?
              </h3>

              <p className="text-slate-700 leading-8">
                Monthly savings goals depend on
                financial objectives,
                investment returns,
                and time horizon.
              </p>

            </div>

          </div>

        </div>

        {/* RELATED */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Related Calculators
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <a
              href="/compound-interest-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Compound Interest Calculator
            </a>

            <a
              href="/retirement-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Retirement Calculator
            </a>

            <a
              href="/investment-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Investment Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
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
}: {
  label: string
  value: number
  setValue: (value: number) => void
  prefix?: string
  suffix?: string
}) {

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
          className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white ${
            prefix ? "pl-9" : ""
          } ${
            suffix ? "pr-20" : ""
          }`}
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
  isCurrency = true,
}: {
  label: string
  value: number
  isCurrency?: boolean
}) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-700">
          {label}
        </span>

        <span className="font-bold">

          {isCurrency
            ? `$${value.toFixed(2)}`
            : value}

        </span>

      </div>

    </div>

  )
}