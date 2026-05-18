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

export default function HousePaymentCalculator() {

  const [mortgage, setMortgage] =
    useState(2200)

  const [propertyTax, setPropertyTax] =
    useState(450)

  const [insurance, setInsurance] =
    useState(180)

  const [hoaFees, setHoaFees] =
    useState(120)

  const [utilities, setUtilities] =
    useState(250)

  const totalPayment =
    mortgage +
    propertyTax +
    insurance +
    hoaFees +
    utilities

  const annualCost =
    totalPayment * 12

  const pieData = [
    {
      name: "Mortgage",
      value: mortgage,
    },
    {
      name: "Taxes",
      value: propertyTax,
    },
    {
      name: "Insurance",
      value: insurance,
    },
    {
      name: "HOA",
      value: hoaFees,
    },
    {
      name: "Utilities",
      value: utilities,
    },
  ]

  const compareData = [
    {
      name: "Monthly",
      value: totalPayment,
    },
    {
      name: "Annual",
      value: annualCost,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: annualCost,
      },
      {
        year: "Year 2",
        value: annualCost * 1.03,
      },
      {
        year: "Year 3",
        value: annualCost * 1.05,
      },
      {
        year: "Year 4",
        value: annualCost * 1.08,
      },
      {
        year: "Year 5",
        value: annualCost * 1.1,
      },
    ]

  }, [
    annualCost,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              House Payment Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate monthly house payments including
              mortgage,
              taxes,
              insurance,
              HOA fees,
              and utilities.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Mortgage Payment"
                  value={mortgage}
                  setValue={setMortgage}
                  prefix="$"
                />

                <InputField
                  label="Property Taxes"
                  value={propertyTax}
                  setValue={setPropertyTax}
                  prefix="$"
                />

                <InputField
                  label="Insurance"
                  value={insurance}
                  setValue={setInsurance}
                  prefix="$"
                />

                <InputField
                  label="HOA Fees"
                  value={hoaFees}
                  setValue={setHoaFees}
                  prefix="$"
                />

                <InputField
                  label="Utilities"
                  value={utilities}
                  setValue={setUtilities}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Total Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${totalPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    House Payment Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Annual Housing Cost"
                    value={`$${annualCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Mortgage Payment"
                    value={`$${mortgage.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Property Taxes"
                    value={`$${propertyTax.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Insurance"
                    value={`$${insurance.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            House Payment Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A house payment calculator estimates
              total monthly housing expenses,
              including mortgage payments,
              property taxes,
              homeowners insurance,
              HOA fees,
              and utility costs.
            </p>

            <p>
              Understanding total housing expenses
              is important because many homeowners
              underestimate the full cost
              of owning real estate.
            </p>

            <p>
              Monthly house payments commonly include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Mortgage principal payments</li>

              <li>Mortgage interest</li>

              <li>Property taxes</li>

              <li>Homeowners insurance</li>

              <li>HOA fees</li>

              <li>Utilities</li>

              <li>Mortgage insurance</li>

            </ul>

            <p>
              A house payment calculator helps homebuyers
              estimate affordability
              and prepare realistic monthly budgets
              before purchasing property.
            </p>

            <p>
              Property taxes and insurance costs
              may vary significantly depending on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Property location</li>

              <li>Home value</li>

              <li>Insurance coverage</li>

              <li>Local tax rates</li>

              <li>Community HOA requirements</li>

            </ul>

            <p>
              Mortgage lenders often evaluate
              debt-to-income ratios
              when approving mortgage applications.
              Higher monthly housing costs
              may reduce borrowing eligibility.
            </p>

            <p>
              Some homeowners also budget
              for maintenance,
              repairs,
              landscaping,
              and emergency housing expenses
              beyond standard monthly payments.
            </p>

            <p>
              Understanding complete housing costs
              helps improve long-term financial planning
              and reduces the risk
              of becoming house poor.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Monthly Payment Breakdown
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
                    <Cell fill="#3b82f6" />
                    <Cell fill="#60a5fa" />
                    <Cell fill="#93c5fd" />
                    <Cell fill="#bfdbfe" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Mortgage"
                value={`$${mortgage.toFixed(0)}`}
              />

              <SummaryCard
                title="Taxes"
                value={`$${propertyTax.toFixed(0)}`}
              />

              <SummaryCard
                title="Insurance"
                value={`$${insurance.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Estimated Housing Cost Trends
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
            Monthly vs Annual Costs
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
            House Payment Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Total Payment = Mortgage + Taxes + Insurance + HOA + Utilities
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            House Payment Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A homeowner paying
              $2,200 per month
              for a mortgage,
              $450 in property taxes,
              $180 in insurance,
              $120 in HOA fees,
              and $250 in utilities
              may spend approximately
              ${totalPayment.toFixed(0)}
              monthly on housing expenses.
            </p>

            <p>
              Over one year,
              total housing costs
              may exceed
              ${annualCost.toFixed(0)},
              excluding maintenance
              and repair expenses.
            </p>

            <p>
              This example demonstrates
              why buyers should evaluate
              full housing expenses
              instead of mortgage payments alone.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            House Payment FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is included in house payments?
              </h3>

              <p>
                House payments commonly include:
                mortgage payments,
                property taxes,
                homeowners insurance,
                HOA fees,
                and utilities.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are property taxes included in mortgages?
              </h3>

              <p>
                Many lenders collect property taxes
                through escrow accounts
                together with monthly mortgage payments.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What are HOA fees?
              </h3>

              <p>
                HOA fees are monthly charges
                collected by homeowners associations
                for community maintenance
                and shared services.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why is insurance important?
              </h3>

              <p>
                Homeowners insurance protects properties
                against damage,
                liability claims,
                and financial risks.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How much income is needed for a house?
              </h3>

              <p>
                Mortgage lenders commonly recommend
                housing expenses remain below
                28% to 36%
                of gross monthly income.
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
              href="/mortgage-insurance-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Insurance Calculator
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
}: any) {

  return (

    <div>

      <label className="block text-sm font-semibold mb-2 text-slate-700">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">
          {prefix}
        </span>

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className="w-full border border-slate-200 rounded-2xl py-3 pl-9 pr-4 bg-white"
        />

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