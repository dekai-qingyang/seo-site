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

export default function RetirementCalculator() {

  const [currentAge, setCurrentAge] = useState(30)

  const [retirementAge, setRetirementAge] = useState(65)

  const [currentSavings, setCurrentSavings] = useState(50000)

  const [monthlyContribution, setMonthlyContribution] = useState(1000)

  const [annualReturn, setAnnualReturn] = useState(8)

  const yearsToRetirement =
    retirementAge - currentAge

  const monthlyRate =
    annualReturn / 100 / 12

  const months =
    yearsToRetirement * 12

  const futureSavings =
    currentSavings *
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

  const totalContributions =
    currentSavings +
    monthlyContribution * months

  const investmentGrowth =
    futureSavings - totalContributions

  const monthlyRetirementIncome =
    futureSavings * 0.04 / 12

  const chartData = [
    {
      name: "Contributions",
      value: totalContributions,
    },
    {
      name: "Growth",
      value: investmentGrowth,
    },
  ]

  const growthData = useMemo(() => {

    const rows = []

    for (
      let age = currentAge;
      age <= retirementAge;
      age++
    ) {

      const totalMonths =
        (age - currentAge) * 12

      const value =
        currentSavings *
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

      rows.push({
        age,
        value,
      })
    }

    return rows

  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualReturn,
    monthlyRate,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Retirement Calculator
            </h1>

            <p className="text-indigo-100 text-sm lg:text-lg">
              Estimate retirement savings growth,
              future income,
              and long-term retirement planning goals.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Current Age"
                  value={currentAge}
                  setValue={setCurrentAge}
                />

                <InputField
                  label="Retirement Age"
                  value={retirementAge}
                  setValue={setRetirementAge}
                />

                <InputField
                  label="Current Savings"
                  value={currentSavings}
                  setValue={setCurrentSavings}
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

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-indigo-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-indigo-100 mb-2">
                  Estimated Retirement Savings
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${futureSavings.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Retirement Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Years Until Retirement"
                    value={yearsToRetirement}
                    isCurrency={false}
                  />

                  <SummaryRow
                    label="Total Contributions"
                    value={totalContributions}
                  />

                  <SummaryRow
                    label="Investment Growth"
                    value={investmentGrowth}
                  />

                  <SummaryRow
                    label="Estimated Monthly Retirement Income"
                    value={monthlyRetirementIncome}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Retirement Planning Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Starting at age
            <strong> {currentAge}</strong>
            with
            <strong> ${currentSavings.toLocaleString()}</strong>
            in savings and contributing
            <strong> ${monthlyContribution}</strong>
            monthly,
            your retirement portfolio could grow to
            <strong> ${futureSavings.toFixed(0)}</strong>
            by age
            <strong> {retirementAge}</strong>
            assuming an annual return of
            <strong> {annualReturn}%</strong>.

          </p>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Retirement Savings Breakdown
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

                    <Cell fill="#4f46e5" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-indigo-50 rounded-2xl p-5">

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
                  ${investmentGrowth.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* GROWTH CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Retirement Growth Chart
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="age" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Retirement Savings Formula
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
            Retirement Planning Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            A 30-year-old investor with
            $50,000 in retirement savings
            who contributes $1,000 monthly
            with an 8% annual return
            could accumulate approximately
            <strong> ${futureSavings.toFixed(0)}</strong>
            by age 65.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Retirement Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                How much should I save for retirement?
              </h3>

              <p className="text-slate-700 leading-8">
                Retirement savings goals depend on
                income, lifestyle expectations,
                retirement age,
                and investment returns.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is the 4% retirement rule?
              </h3>

              <p className="text-slate-700 leading-8">
                The 4% rule suggests retirees may safely
                withdraw approximately 4% annually
                from retirement savings.
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
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
            >
              Compound Interest Calculator
            </a>

            <a
              href="/investment-calculator"
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
            >
              Investment Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

            <a
              href="/mortgage-calculator"
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
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