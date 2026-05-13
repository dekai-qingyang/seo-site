"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

export default function CompoundInterestCalculator() {

  const [initialInvestment, setInitialInvestment] = useState(10000)

  const [monthlyContribution, setMonthlyContribution] = useState(500)

  const [interestRate, setInterestRate] = useState(8)

  const [years, setYears] = useState(20)

  const [compoundFrequency, setCompoundFrequency] = useState(12)

  const rate =
    interestRate / 100

  const totalContributions =
    monthlyContribution * 12 * years

  const futureValue =
    initialInvestment *
    Math.pow(
      1 + rate / compoundFrequency,
      compoundFrequency * years
    ) +
    monthlyContribution *
    (
      (
        Math.pow(
          1 + rate / 12,
          12 * years
        ) - 1
      ) /
      (rate / 12)
    )

  const totalInvestment =
    initialInvestment + totalContributions

  const totalInterest =
    futureValue - totalInvestment

  const chartData = [
    {
      name: "Investment",
      value: totalInvestment,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const growthData = useMemo(() => {

    const rows = []

    for (let year = 1; year <= years; year++) {

      const yearlyValue =
        initialInvestment *
        Math.pow(
          1 + rate / compoundFrequency,
          compoundFrequency * year
        ) +
        monthlyContribution *
        (
          (
            Math.pow(
              1 + rate / 12,
              12 * year
            ) - 1
          ) /
          (rate / 12)
        )

      rows.push({
        year,
        value: yearlyValue,
      })
    }

    return rows

  }, [
    initialInvestment,
    monthlyContribution,
    interestRate,
    years,
    compoundFrequency,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Compound Interest Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Calculate compound interest growth,
              investment returns,
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
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Investment Period"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Compound Frequency
                  </label>

                  <select
                    value={compoundFrequency}
                    onChange={(e) =>
                      setCompoundFrequency(
                        Number(e.target.value)
                      )
                    }
                    className="w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white"
                  >

                    <option value={1}>
                      Annually
                    </option>

                    <option value={4}>
                      Quarterly
                    </option>

                    <option value={12}>
                      Monthly
                    </option>

                    <option value={365}>
                      Daily
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Future Investment Value
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
                    value={totalInvestment}
                  />

                  <SummaryRow
                    label="Total Interest Earned"
                    value={totalInterest}
                  />

                  <SummaryRow
                    label="Estimated Future Value"
                    value={futureValue}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Compound Interest Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            With an initial investment of
            <strong> ${initialInvestment.toLocaleString()}</strong>,
            monthly contributions of
            <strong> ${monthlyContribution}</strong>,
            and an annual return of
            <strong> {interestRate}%</strong>,
            your portfolio could grow to
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
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
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
                  ${totalInvestment.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Compound Interest
                </div>

                <div className="text-2xl font-black">
                  ${totalInterest.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* GROWTH CHART */}

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
            Compound Interest Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              A = P(1 + r/n)^(nt)
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Compound Interest Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Investing $10,000 with monthly deposits
            of $500 at an 8% annual return
            could grow to approximately
            <strong> ${futureValue.toFixed(0)}</strong>
            over 20 years.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Compound Interest FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is compound interest?
              </h3>

              <p className="text-slate-700 leading-8">
                Compound interest means earning
                interest on both your original
                investment and accumulated earnings.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Why is compounding powerful?
              </h3>

              <p className="text-slate-700 leading-8">
                Compounding accelerates wealth growth
                over long periods of time.
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
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

            <a
              href="/mortgage-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
            </a>

            <a
              href="/retirement-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Retirement Calculator
            </a>

            <a
              href="/investment-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Investment Calculator
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
}: {
  label: string
  value: number
}) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-500">
          {label}
        </span>

        <span className="font-bold">
          ${value.toFixed(2)}
        </span>

      </div>

    </div>

  )
}