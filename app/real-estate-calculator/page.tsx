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

export default function RealEstateCalculator() {

  const [propertyValue, setPropertyValue] =
    useState(650000)

  const [monthlyRent, setMonthlyRent] =
    useState(3500)

  const [monthlyExpenses, setMonthlyExpenses] =
    useState(1200)

  const [annualAppreciation, setAnnualAppreciation] =
    useState(4)

  const [downPayment, setDownPayment] =
    useState(130000)

  const annualRentalIncome =
    monthlyRent * 12

  const annualExpenses =
    monthlyExpenses * 12

  const annualCashFlow =
    annualRentalIncome - annualExpenses

  const roi =
    (
      annualCashFlow /
      downPayment
    ) * 100

  const projectedValue =
    propertyValue *
    Math.pow(
      1 + annualAppreciation / 100,
      5
    )

  const pieData = [
    {
      name: "Rental Income",
      value: annualRentalIncome,
    },
    {
      name: "Expenses",
      value: annualExpenses,
    },
  ]

  const compareData = [
    {
      name: "Property Value",
      value: propertyValue,
    },
    {
      name: "Projected Value",
      value: projectedValue,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: propertyValue,
      },
      {
        year: "Year 2",
        value:
          propertyValue * 1.04,
      },
      {
        year: "Year 3",
        value:
          propertyValue * 1.08,
      },
      {
        year: "Year 4",
        value:
          propertyValue * 1.12,
      },
      {
        year: "Year 5",
        value:
          projectedValue,
      },
    ]

  }, [
    propertyValue,
    projectedValue,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Real Estate Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate real estate investment returns,
              rental cash flow,
              appreciation,
              and property performance.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Property Value"
                  value={propertyValue}
                  setValue={setPropertyValue}
                  prefix="$"
                />

                <InputField
                  label="Monthly Rent"
                  value={monthlyRent}
                  setValue={setMonthlyRent}
                  prefix="$"
                />

                <InputField
                  label="Monthly Expenses"
                  value={monthlyExpenses}
                  setValue={setMonthlyExpenses}
                  prefix="$"
                />

                <InputField
                  label="Annual Appreciation"
                  value={annualAppreciation}
                  setValue={setAnnualAppreciation}
                  suffix="%"
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  setValue={setDownPayment}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Annual Cash Flow
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${annualCashFlow.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Real Estate Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Annual ROI"
                    value={`${roi.toFixed(2)}%`}
                  />

                  <SummaryRow
                    label="Rental Income"
                    value={`$${annualRentalIncome.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Annual Expenses"
                    value={`$${annualExpenses.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Projected 5-Year Value"
                    value={`$${projectedValue.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Real Estate Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A real estate calculator helps investors
              estimate property performance,
              rental income,
              cash flow,
              return on investment,
              and long-term appreciation potential.
            </p>

            <p>
              Real estate investing remains one of the most popular
              long-term wealth building strategies
              because properties may generate
              recurring rental income
              while increasing in value over time.
            </p>

            <p>
              Real estate investments commonly include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Rental properties</li>

              <li>Single-family homes</li>

              <li>Commercial real estate</li>

              <li>Vacation properties</li>

              <li>Multi-family apartments</li>

            </ul>

            <p>
              A real estate calculator estimates:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Annual rental income</li>

              <li>Operating expenses</li>

              <li>Cash flow</li>

              <li>Investment ROI</li>

              <li>Property appreciation</li>

              <li>Long-term investment growth</li>

            </ul>

            <p>
              Positive cash flow occurs
              when rental income exceeds expenses.
              Strong cash flow may improve
              long-term investment sustainability
              and increase financial flexibility.
            </p>

            <p>
              Real estate appreciation
              significantly affects long-term profitability.
              Properties located in growing markets
              may increase substantially in value
              over many years.
            </p>

            <p>
              Investors should also consider:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vacancy rates</li>

              <li>Property taxes</li>

              <li>Insurance costs</li>

              <li>Maintenance expenses</li>

              <li>Interest rates</li>

              <li>Economic conditions</li>

            </ul>

            <p>
              Real estate investments involve risks,
              including market downturns,
              rising expenses,
              and fluctuating rental demand.
              Careful financial analysis
              helps investors make better decisions.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Rental Income vs Expenses
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
                title="Annual Rental Income"
                value={`$${annualRentalIncome.toFixed(0)}`}
              />

              <SummaryCard
                title="Annual Expenses"
                value={`$${annualExpenses.toFixed(0)}`}
              />

              <SummaryCard
                title="Annual Cash Flow"
                value={`$${annualCashFlow.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Property Appreciation Trends
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
            Current vs Future Property Value
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
            Real Estate Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Annual Cash Flow = Rental Income − Expenses
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Real Estate Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              An investor purchasing a
              $650,000 rental property
              generating
              $3,500 monthly rent
              may earn approximately
              ${annualRentalIncome.toFixed(0)}
              annually in rental income.
            </p>

            <p>
              After deducting annual expenses
              of approximately
              ${annualExpenses.toFixed(0)},
              estimated cash flow may exceed
              ${annualCashFlow.toFixed(0)}.
            </p>

            <p>
              If the property appreciates
              4% annually,
              projected value after five years
              may exceed
              ${projectedValue.toFixed(0)}.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Real Estate FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is cash flow in real estate?
              </h3>

              <p>
                Cash flow is the remaining income
                after deducting property expenses
                from rental income.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a good real estate ROI?
              </h3>

              <p>
                Many investors target
                annual ROI between
                8% and 15%,
                depending on market conditions.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why is appreciation important?
              </h3>

              <p>
                Appreciation increases property value
                over time
                and may significantly improve
                long-term investment returns.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What expenses affect profitability?
              </h3>

              <p>
                Taxes,
                insurance,
                repairs,
                vacancies,
                mortgage payments,
                and maintenance
                all affect real estate profitability.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Is real estate a long-term investment?
              </h3>

              <p>
                Many investors use real estate
                as a long-term wealth building strategy
                because of rental income
                and property appreciation potential.
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
              href="/property-tax-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Property Tax Calculator
            </a>

            <a
              href="/home-affordability-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Home Affordability Calculator
            </a>

            <a
              href="/roi-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              ROI Calculator
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
          className="w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white"
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