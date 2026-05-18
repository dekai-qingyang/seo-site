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

export default function ClosingCostCalculator() {

  const [homePrice, setHomePrice] =
    useState(500000)

  const [loanFees, setLoanFees] =
    useState(4500)

  const [taxes, setTaxes] =
    useState(3200)

  const [insurance, setInsurance] =
    useState(1800)

  const [otherFees, setOtherFees] =
    useState(2500)

  const totalClosingCosts =
    loanFees +
    taxes +
    insurance +
    otherFees

  const closingPercentage =
    (
      totalClosingCosts /
      homePrice
    ) * 100

  const pieData = [
    {
      name: "Loan Fees",
      value: loanFees,
    },
    {
      name: "Taxes",
      value: taxes,
    },
    {
      name: "Insurance",
      value: insurance,
    },
    {
      name: "Other Fees",
      value: otherFees,
    },
  ]

  const compareData = [
    {
      name: "Home Price",
      value: homePrice,
    },
    {
      name: "Closing Costs",
      value: totalClosingCosts,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: totalClosingCosts,
      },
      {
        year: "Year 2",
        value: totalClosingCosts * 1.03,
      },
      {
        year: "Year 3",
        value: totalClosingCosts * 1.05,
      },
      {
        year: "Year 4",
        value: totalClosingCosts * 1.08,
      },
      {
        year: "Year 5",
        value: totalClosingCosts * 1.12,
      },
    ]

  }, [
    totalClosingCosts,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Closing Cost Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Calculate home closing costs,
              lender fees,
              taxes,
              insurance,
              and total purchase expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Home Price"
                  value={homePrice}
                  setValue={setHomePrice}
                  prefix="$"
                />

                <InputField
                  label="Loan Fees"
                  value={loanFees}
                  setValue={setLoanFees}
                  prefix="$"
                />

                <InputField
                  label="Taxes"
                  value={taxes}
                  setValue={setTaxes}
                  prefix="$"
                />

                <InputField
                  label="Insurance"
                  value={insurance}
                  setValue={setInsurance}
                  prefix="$"
                />

                <InputField
                  label="Other Fees"
                  value={otherFees}
                  setValue={setOtherFees}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Total Closing Costs
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${totalClosingCosts.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Closing Cost Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Closing Cost Percentage"
                    value={`${closingPercentage.toFixed(2)}%`}
                  />

                  <SummaryRow
                    label="Loan Fees"
                    value={`$${loanFees.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Taxes"
                    value={`$${taxes.toFixed(0)}`}
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
            Closing Cost Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              Closing costs are expenses paid during
              residential real estate transactions.
              These fees are separate from down payments
              and are typically required before
              property ownership transfers to buyers.
            </p>

            <p>
              Closing costs may include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Loan origination fees</li>

              <li>Appraisal fees</li>

              <li>Title insurance</li>

              <li>Attorney fees</li>

              <li>Property taxes</li>

              <li>Escrow costs</li>

              <li>Recording fees</li>

              <li>Mortgage insurance</li>

            </ul>

            <p>
              A closing cost calculator helps homebuyers estimate
              total upfront expenses
              associated with purchasing real estate.
            </p>

            <p>
              In most real estate transactions,
              closing costs range from
              2% to 5%
              of the property's purchase price.
            </p>

            <p>
              Closing costs vary depending on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Property location</li>

              <li>Loan type</li>

              <li>Lender requirements</li>

              <li>Home price</li>

              <li>Local tax laws</li>

              <li>Insurance requirements</li>

            </ul>

            <p>
              Understanding closing costs is important
              because many first-time homebuyers
              underestimate total upfront expenses.
            </p>

            <p>
              Some mortgage lenders allow
              closing costs to be rolled into loans,
              while some sellers may agree
              to cover a portion of buyer expenses
              during negotiations.
            </p>

            <p>
              Closing costs may significantly affect
              overall home affordability,
              cash reserves,
              and short-term financial planning.
            </p>

            <p>
              Buyers should carefully review
              loan estimates,
              lender disclosures,
              and settlement statements
              before completing transactions.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Closing Cost Breakdown
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
                title="Loan Fees"
                value={`$${loanFees.toFixed(0)}`}
              />

              <SummaryCard
                title="Taxes"
                value={`$${taxes.toFixed(0)}`}
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
            Estimated Cost Trends
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
            Home Price vs Closing Costs
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
            Closing Cost Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Closing Costs = Loan Fees + Taxes + Insurance + Other Expenses
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Closing Cost Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A homebuyer purchasing a
              $500,000 property
              may pay approximately
              $15,000 in closing costs,
              depending on taxes,
              lender fees,
              title insurance,
              and escrow expenses.
            </p>

            <p>
              Loan origination fees,
              appraisal costs,
              and prepaid property taxes
              are among the largest
              closing cost categories.
            </p>

            <p>
              Understanding these expenses
              helps buyers prepare
              for total cash requirements
              before finalizing real estate transactions.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Closing Cost FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What are closing costs?
              </h3>

              <p>
                Closing costs are fees
                associated with real estate purchases,
                mortgage loans,
                taxes,
                and property transfer expenses.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How much are closing costs?
              </h3>

              <p>
                Closing costs commonly range
                between 2% and 5%
                of a home's purchase price.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can sellers pay closing costs?
              </h3>

              <p>
                Yes.
                Some sellers agree
                to contribute toward buyer closing costs
                during negotiations.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are closing costs included in loans?
              </h3>

              <p>
                Some lenders allow
                certain closing costs
                to be financed into mortgage balances.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why do closing costs vary?
              </h3>

              <p>
                Closing costs vary depending on:
                location,
                loan type,
                lender policies,
                and local tax laws.
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
              href="/home-affordability-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Home Affordability Calculator
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