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

export default function EscrowCalculator() {

  const [propertyTaxes, setPropertyTaxes] =
    useState(7200)

  const [homeInsurance, setHomeInsurance] =
    useState(1800)

  const [mortgageInsurance, setMortgageInsurance] =
    useState(1200)

  const [hoaFees, setHoaFees] =
    useState(1200)

  const totalAnnualEscrow =
    propertyTaxes +
    homeInsurance +
    mortgageInsurance +
    hoaFees

  const monthlyEscrow =
    totalAnnualEscrow / 12

  const pieData = [
    {
      name: "Property Taxes",
      value: propertyTaxes,
    },
    {
      name: "Insurance",
      value: homeInsurance,
    },
    {
      name: "Mortgage Insurance",
      value: mortgageInsurance,
    },
    {
      name: "HOA Fees",
      value: hoaFees,
    },
  ]

  const compareData = [
    {
      name: "Annual Escrow",
      value: totalAnnualEscrow,
    },
    {
      name: "Monthly Escrow",
      value: monthlyEscrow,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: totalAnnualEscrow,
      },
      {
        year: "Year 2",
        value: totalAnnualEscrow * 1.03,
      },
      {
        year: "Year 3",
        value: totalAnnualEscrow * 1.06,
      },
      {
        year: "Year 4",
        value: totalAnnualEscrow * 1.1,
      },
      {
        year: "Year 5",
        value: totalAnnualEscrow * 1.14,
      },
    ]

  }, [
    totalAnnualEscrow,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Escrow Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate monthly escrow payments for
              property taxes,
              insurance,
              HOA fees,
              and mortgage-related housing expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Annual Property Taxes"
                  value={propertyTaxes}
                  setValue={setPropertyTaxes}
                  prefix="$"
                />

                <InputField
                  label="Annual Home Insurance"
                  value={homeInsurance}
                  setValue={setHomeInsurance}
                  prefix="$"
                />

                <InputField
                  label="Annual Mortgage Insurance"
                  value={mortgageInsurance}
                  setValue={setMortgageInsurance}
                  prefix="$"
                />

                <InputField
                  label="Annual HOA Fees"
                  value={hoaFees}
                  setValue={setHoaFees}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Escrow Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyEscrow.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Escrow Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Annual Escrow Costs"
                    value={`$${totalAnnualEscrow.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Escrow"
                    value={`$${monthlyEscrow.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Property Taxes"
                    value={`$${propertyTaxes.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Insurance Costs"
                    value={`$${homeInsurance.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Escrow Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              Mortgage escrow accounts
              are financial accounts
              managed by mortgage lenders
              to collect and pay housing-related expenses
              on behalf of homeowners.
            </p>

            <p>
              Escrow payments are usually included
              within monthly mortgage payments.
              Lenders collect a portion each month
              and later pay taxes and insurance bills
              when they become due.
            </p>

            <p>
              Escrow accounts commonly include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Property taxes</li>

              <li>Homeowners insurance</li>

              <li>Mortgage insurance</li>

              <li>Flood insurance</li>

              <li>HOA fees</li>

            </ul>

            <p>
              Escrow calculators help homeowners estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly escrow payments</li>

              <li>Total annual housing costs</li>

              <li>Tax and insurance budgeting</li>

              <li>Mortgage affordability</li>

              <li>Future payment increases</li>

            </ul>

            <p>
              Mortgage lenders often require escrow accounts
              for borrowers making smaller down payments
              because escrow reduces lender risk
              associated with unpaid taxes or insurance.
            </p>

            <p>
              Property taxes and insurance costs
              may increase over time,
              causing escrow shortages
              and higher monthly mortgage payments.
            </p>

            <p>
              Homeowners should regularly review:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Annual escrow statements</li>

              <li>Insurance renewals</li>

              <li>Property tax reassessments</li>

              <li>Mortgage payment adjustments</li>

            </ul>

            <p>
              Understanding escrow calculations
              helps homeowners better prepare
              for long-term housing expenses
              and avoid payment surprises.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Escrow Cost Breakdown
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

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Annual Taxes"
                value={`$${propertyTaxes.toFixed(0)}`}
              />

              <SummaryCard
                title="Insurance Costs"
                value={`$${homeInsurance.toFixed(0)}`}
              />

              <SummaryCard
                title="Monthly Escrow"
                value={`$${monthlyEscrow.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Escrow Cost Trends
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
            Monthly vs Annual Escrow Costs
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
            Escrow Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Monthly Escrow =
              Total Annual Escrow Costs ÷ 12
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Escrow Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A homeowner paying:
              $7,200 annually in property taxes,
              $1,800 in insurance,
              and additional escrow expenses
              may have total annual escrow costs
              exceeding
              ${totalAnnualEscrow.toFixed(0)}.
            </p>

            <p>
              Monthly escrow payments
              may equal approximately
              ${monthlyEscrow.toFixed(0)}
              in addition to mortgage principal
              and interest payments.
            </p>

            <p>
              This example demonstrates
              how taxes and insurance
              significantly affect total housing expenses.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Escrow FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a mortgage escrow account?
              </h3>

              <p>
                A mortgage escrow account
                collects funds for taxes,
                insurance,
                and housing-related expenses
                together with mortgage payments.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why do lenders require escrow?
              </h3>

              <p>
                Escrow helps lenders ensure
                taxes and insurance
                are paid on time,
                reducing financial risk.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can escrow payments increase?
              </h3>

              <p>
                Yes.
                Property taxes and insurance premiums
                may rise over time,
                increasing escrow payments.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does escrow include mortgage principal?
              </h3>

              <p>
                No.
                Escrow accounts typically cover:
                taxes,
                insurance,
                and housing-related expenses,
                not mortgage principal repayment.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can homeowners remove escrow accounts?
              </h3>

              <p>
                Some lenders allow escrow removal
                after borrowers build sufficient equity
                and maintain strong payment histories.
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
              href="/mortgage-insurance-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Insurance Calculator
            </a>

            <a
              href="/house-payment-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              House Payment Calculator
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