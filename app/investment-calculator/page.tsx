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

export default function InvestmentCalculator() {

  const [initialInvestment, setInitialInvestment] = useState(10000)

  const [monthlyContribution, setMonthlyContribution] = useState(500)

  const [annualReturn, setAnnualReturn] = useState(8)

  const [years, setYears] = useState(20)

  const monthlyRate =
    annualReturn / 100 / 12

  const totalMonths =
    years * 12

  const futureValue =
    initialInvestment *
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
    initialInvestment +
    monthlyContribution * totalMonths

  const totalGrowth =
    futureValue - totalContributions

  const annualPassiveIncome =
    futureValue * 0.04

  const chartData = [
    {
      name: "Contributions",
      value: totalContributions,
    },
    {
      name: "Investment Growth",
      value: totalGrowth,
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
        initialInvestment *
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
    initialInvestment,
    monthlyContribution,
    annualReturn,
    years,
    monthlyRate,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Investment Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate investment growth,
              compound returns,
              monthly contributions,
              and long-term wealth accumulation.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Initial Investment"
                  value={initialInvestment}
                  setValue={setInitialInvestment}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
                  prefix="$"
                />

                <InputField
                  label="Annual Return"
                  value={annualReturn}
                  setValue={setAnnualReturn}
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

            <div className="bg-gradient-to-b from-indigo-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Investment Value
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Investment Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
                    value={totalContributions}
                  />

                  <SummaryRow
                    label="Investment Growth"
                    value={totalGrowth}
                  />

                  <SummaryRow
                    label="Estimated Passive Income"
                    value={annualPassiveIncome}
                  />

                  <SummaryRow
                    label="Investment Period"
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
            Investment Growth Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Starting with
            <strong> ${initialInvestment.toLocaleString()}</strong>
            and contributing
            <strong> ${monthlyContribution}</strong>
            monthly at an annual return of
            <strong> {annualReturn}%</strong>,
            your investments could grow to approximately
            <strong> ${futureValue.toFixed(0)}</strong>
            over
            <strong> {years} years</strong>.

          </p>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Investment Breakdown
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

                    <Cell fill="#2563eb" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-blue-50 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Contributions
                </div>

                <div className="text-2xl font-black">
                  ${totalContributions.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Investment Growth
                </div>

                <div className="text-2xl font-black">
                  ${totalGrowth.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Investment Growth Chart
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
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Investment Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              FV = PV(1 + r)^n + PMT × [((1 + r)^n - 1) / r]
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Investment Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            An investor starting with
            $10,000 and contributing
            $500 monthly at an
            8% annual return
            could accumulate approximately
            <strong> ${futureValue.toFixed(0)}</strong>
            over
            <strong> {years} years</strong>.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Investment Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is compound investing?
              </h3>

              <p className="text-slate-700 leading-8">
                Compound investing allows returns
                to generate additional returns over time,
                accelerating investment growth.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                How much should I invest monthly?
              </h3>

              <p className="text-slate-700 leading-8">
                Monthly investment goals depend on
                income,
                financial objectives,
                retirement plans,
                and investment time horizon.
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
              href="/retirement-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Retirement Calculator
            </a>

            <a
              href="/compound-interest-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Compound Interest Calculator
            </a>

            <a
              href="/savings-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Savings Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
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
          className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white ${
            prefix ? "pl-9" : ""
          } ${
            suffix ? "pr-20" : ""
          }`}
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
  isCurrency = true,
}: {
  label: string
  value: number
  isCurrency?: boolean
}) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-500">
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