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

export default function DividendCalculator() {

  const [investment, setInvestment] = useState(100000)

  const [dividendYield, setDividendYield] = useState(4)

  const [dividendGrowth, setDividendGrowth] = useState(5)

  const [years, setYears] = useState(20)

  const annualDividendIncome =
    investment * (dividendYield / 100)

  const monthlyDividendIncome =
    annualDividendIncome / 12

  const futureDividendIncome =
    annualDividendIncome *
    Math.pow(
      1 + dividendGrowth / 100,
      years
    )

  const totalDividends =
    useMemo(() => {

      let total = 0

      for (
        let year = 0;
        year <= years;
        year++
      ) {

        total +=
          annualDividendIncome *
          Math.pow(
            1 + dividendGrowth / 100,
            year
          )
      }

      return total

    }, [
      annualDividendIncome,
      dividendGrowth,
      years,
    ])

  const chartData = [
    {
      name: "Initial Annual Income",
      value: annualDividendIncome,
    },
    {
      name: "Future Annual Income",
      value: futureDividendIncome,
    },
  ]

  const growthData = useMemo(() => {

    const rows = []

    for (
      let year = 0;
      year <= years;
      year++
    ) {

      const income =
        annualDividendIncome *
        Math.pow(
          1 + dividendGrowth / 100,
          year
        )

      rows.push({
        year,
        income,
      })
    }

    return rows

  }, [
    annualDividendIncome,
    dividendGrowth,
    years,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Dividend Calculator
            </h1>

            <p className="text-green-100 text-sm lg:text-lg">
              Estimate dividend income,
              passive income growth,
              dividend yield,
              and long-term dividend investing returns.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Investment Amount"
                  value={investment}
                  setValue={setInvestment}
                  prefix="$"
                />

                <InputField
                  label="Dividend Yield"
                  value={dividendYield}
                  setValue={setDividendYield}
                  suffix="%"
                />

                <InputField
                  label="Dividend Growth Rate"
                  value={dividendGrowth}
                  setValue={setDividendGrowth}
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

              <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-green-100 mb-2">
                  Annual Dividend Income
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${annualDividendIncome.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Dividend Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Monthly Dividend Income"
                    value={monthlyDividendIncome}
                  />

                  <SummaryRow
                    label="Future Annual Income"
                    value={futureDividendIncome}
                  />

                  <SummaryRow
                    label="Total Dividend Income"
                    value={totalDividends}
                  />

                  <SummaryRow
                    label="Dividend Yield"
                    value={dividendYield}
                    suffix="%"
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
            Dividend Income Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Investing
            <strong> ${investment.toLocaleString()}</strong>
            at a
            <strong> {dividendYield}%</strong>
            dividend yield could generate approximately
            <strong> ${annualDividendIncome.toFixed(0)}</strong>
            annually in passive income.
            Assuming dividends grow by
            <strong> {dividendGrowth}%</strong>
            yearly,
            annual dividend income could increase to
            <strong> ${futureDividendIncome.toFixed(0)}</strong>
            after
            <strong> {years} years</strong>.

          </p>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Dividend Income Breakdown
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

                <div className="text-slate-500 mb-1">
                  Initial Annual Income
                </div>

                <div className="text-2xl font-black">
                  ${annualDividendIncome.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Future Annual Income
                </div>

                <div className="text-2xl font-black">
                  ${futureDividendIncome.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Dividend Growth Chart
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
                  dataKey="income"
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
            Dividend Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Annual Dividend Income = Investment × Dividend Yield
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Dividend Investing Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            An investor with
            $100,000 invested in dividend stocks
            with a 4% dividend yield
            could earn approximately
            <strong> ${annualDividendIncome.toFixed(0)}</strong>
            yearly in passive income.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Dividend Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is dividend yield?
              </h3>

              <p className="text-slate-700 leading-8">
                Dividend yield measures annual dividend income
                relative to the stock investment value.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                What are dividend stocks?
              </h3>

              <p className="text-slate-700 leading-8">
                Dividend stocks are companies
                that distribute part of profits
                to shareholders as regular dividend payments.
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
              href="/investment-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Investment Calculator
            </a>

            <a
              href="/retirement-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Retirement Calculator
            </a>

            <a
              href="/compound-interest-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Compound Interest Calculator
            </a>

            <a
              href="/savings-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Savings Calculator
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
  suffix,
  isCurrency = true,
}: {
  label: string
  value: number
  suffix?: string
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
            : `${value}${suffix || ""}`}

        </span>

      </div>

    </div>

  )
}