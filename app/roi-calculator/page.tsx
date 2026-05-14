"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

export default function ROICalculator() {

  const [investmentCost, setInvestmentCost] = useState(10000)

  const [investmentReturn, setInvestmentReturn] = useState(15000)

  const [years, setYears] = useState(5)

  const profit =
    investmentReturn - investmentCost

  const roi =
    (profit / investmentCost) * 100

  const annualizedROI =
    (
      (
        Math.pow(
          investmentReturn / investmentCost,
          1 / years
        ) - 1
      ) * 100
    )

  const monthlyProfit =
    profit / (years * 12)

  const chartData = [
    {
      name: "Investment Cost",
      value: investmentCost,
    },
    {
      name: "Profit",
      value: profit,
    },
  ]

  const growthData = useMemo(() => {

    const rows = []

    for (
      let year = 1;
      year <= years;
      year++
    ) {

      const value =
        investmentCost +
        (
          (profit / years) * year
        )

      rows.push({
        year,
        value,
      })
    }

    return rows

  }, [
    investmentCost,
    profit,
    years,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              ROI Calculator
            </h1>

            <p className="text-orange-100 text-sm lg:text-lg">
              Calculate return on investment,
              profit percentage,
              annualized returns,
              and investment performance.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Investment Cost"
                  value={investmentCost}
                  setValue={setInvestmentCost}
                  prefix="$"
                />

                <InputField
                  label="Investment Return"
                  value={investmentReturn}
                  setValue={setInvestmentReturn}
                  prefix="$"
                />

                <InputField
                  label="Investment Period (Years)"
                  value={years}
                  setValue={setYears}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-orange-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-orange-100 mb-2">
                  Estimated ROI
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  {roi.toFixed(2)}%
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    ROI Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Profit"
                    value={profit}
                  />

                  <SummaryRow
                    label="Annualized ROI"
                    value={annualizedROI}
                    suffix="%"
                    isCurrency={false}
                  />

                  <SummaryRow
                    label="Monthly Profit"
                    value={monthlyProfit}
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
            ROI Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            An investment of
            <strong> ${investmentCost.toLocaleString()}</strong>
            growing to
            <strong> ${investmentReturn.toLocaleString()}</strong>
            over
            <strong> {years} years</strong>
            generates an estimated
            <strong> {roi.toFixed(2)}%</strong>
            return on investment.

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

                    <Cell fill="#ea580c" />
                    <Cell fill="#fdba74" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-orange-50 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Investment Cost
                </div>

                <div className="text-2xl font-black">
                  ${investmentCost.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Profit
                </div>

                <div className="text-2xl font-black">
                  ${profit.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            ROI Growth Chart
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
                  stroke="#ea580c"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            ROI Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              ROI = ((Return - Cost) / Cost) × 100
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            ROI Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            If an investor spends
            $10,000 and receives
            $15,000 after 5 years,
            the investment profit is
            <strong> ${profit.toFixed(0)}</strong>
            and the ROI is
            <strong> {roi.toFixed(2)}%</strong>.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            ROI Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is ROI?
              </h3>

              <p className="text-slate-700 leading-8">
                ROI stands for Return on Investment.
                It measures investment profitability
                relative to investment cost.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is a good ROI?
              </h3>

              <p className="text-slate-700 leading-8">
                A good ROI depends on risk,
                investment type,
                and market conditions.
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
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Investment Calculator
            </a>

            <a
              href="/compound-interest-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Compound Interest Calculator
            </a>

            <a
              href="/dividend-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Dividend Calculator
            </a>

            <a
              href="/retirement-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Retirement Calculator
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
            : `${value.toFixed(2)}${suffix || ""}`}

        </span>

      </div>

    </div>

  )
}