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

export default function CashOutRefinanceCalculator() {

  const [homeValue, setHomeValue] =
    useState(650000)

  const [mortgageBalance, setMortgageBalance] =
    useState(320000)

  const [refinancePercent, setRefinancePercent] =
    useState(80)

  const [interestRate, setInterestRate] =
    useState(6.25)

  const maxLoanAmount =
    homeValue * (refinancePercent / 100)

  const cashOutAmount =
    maxLoanAmount - mortgageBalance

  const monthlyPayment =
    (
      maxLoanAmount *
      (interestRate / 100 / 12)
    ) /
    (
      1 -
      Math.pow(
        1 + (interestRate / 100 / 12),
        -360
      )
    )

  const pieData = [
    {
      name: "Remaining Mortgage",
      value: mortgageBalance,
    },
    {
      name: "Cash Out",
      value: cashOutAmount,
    },
  ]

  const compareData = [
    {
      name: "Current Mortgage",
      value: mortgageBalance,
    },
    {
      name: "New Refinance Loan",
      value: maxLoanAmount,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: maxLoanAmount,
      },
      {
        year: "Year 2",
        value: maxLoanAmount * 0.97,
      },
      {
        year: "Year 3",
        value: maxLoanAmount * 0.94,
      },
      {
        year: "Year 4",
        value: maxLoanAmount * 0.9,
      },
      {
        year: "Year 5",
        value: maxLoanAmount * 0.86,
      },
    ]

  }, [
    maxLoanAmount,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Cash Out Refinance Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate cash out refinance amounts,
              monthly mortgage payments,
              home equity usage,
              and refinancing costs.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Home Value"
                  value={homeValue}
                  setValue={setHomeValue}
                  prefix="$"
                />

                <InputField
                  label="Remaining Mortgage Balance"
                  value={mortgageBalance}
                  setValue={setMortgageBalance}
                  prefix="$"
                />

                <InputField
                  label="Refinance Percentage"
                  value={refinancePercent}
                  setValue={setRefinancePercent}
                  suffix="%"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Cash Out
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${cashOutAmount.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Refinance Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="New Loan Amount"
                    value={`$${maxLoanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={`$${monthlyPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Cash Out Amount"
                    value={`$${cashOutAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Rate"
                    value={`${interestRate.toFixed(2)}%`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Cash Out Refinance Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A cash out refinance allows homeowners
              to replace an existing mortgage
              with a larger new mortgage loan
              while receiving cash
              from accumulated home equity.
            </p>

            <p>
              Homeowners commonly use cash out refinancing
              for:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Home renovations</li>

              <li>Debt consolidation</li>

              <li>Investment opportunities</li>

              <li>Emergency expenses</li>

              <li>Education costs</li>

            </ul>

            <p>
              A cash out refinance calculator estimates:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Available cash out amounts</li>

              <li>New mortgage balances</li>

              <li>Monthly mortgage payments</li>

              <li>Home equity usage</li>

              <li>Refinancing affordability</li>

            </ul>

            <p>
              Mortgage lenders usually limit
              refinance loans
              to approximately
              80%
              of property value,
              although limits vary
              by lender and loan program.
            </p>

            <p>
              Cash out refinancing may provide
              lower interest rates
              compared to personal loans
              or credit cards,
              making it attractive
              for large financial expenses.
            </p>

            <p>
              However,
              refinancing increases mortgage balances
              and may extend repayment periods,
              increasing long-term interest costs.
            </p>

            <p>
              Homeowners should carefully compare:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Current mortgage rates</li>

              <li>Refinance closing costs</li>

              <li>Monthly payment increases</li>

              <li>Total interest expenses</li>

              <li>Long-term financial goals</li>

            </ul>

            <p>
              Cash out refinance decisions
              should align with overall financial planning
              and long-term homeownership goals.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage vs Cash Out Breakdown
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
                title="Remaining Mortgage"
                value={`$${mortgageBalance.toFixed(0)}`}
              />

              <SummaryCard
                title="Cash Out"
                value={`$${cashOutAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="New Mortgage"
                value={`$${maxLoanAmount.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Estimated Mortgage Balance Trends
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
            Current vs Refinance Loan Comparison
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
            Cash Out Refinance Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Cash Out = New Refinance Loan − Remaining Mortgage Balance
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Cash Out Refinance Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A homeowner with a
              $650,000 property
              and a remaining mortgage balance
              of
              $320,000
              may refinance
              up to approximately
              ${maxLoanAmount.toFixed(0)}
              using an
              80%
              refinance limit.
            </p>

            <p>
              After paying off the original mortgage,
              estimated available cash out
              may exceed
              ${cashOutAmount.toFixed(0)}.
            </p>

            <p>
              This cash may be used
              for renovations,
              debt consolidation,
              investments,
              or emergency financial planning.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Cash Out Refinance FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is cash out refinancing?
              </h3>

              <p>
                Cash out refinancing replaces
                an existing mortgage
                with a larger loan
                while returning equity as cash.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How much cash can homeowners access?
              </h3>

              <p>
                Many lenders allow refinancing
                up to approximately
                80%
                of property value.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What are common uses for cash out refinancing?
              </h3>

              <p>
                Common uses include:
                renovations,
                debt consolidation,
                investments,
                and emergency expenses.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does refinancing increase mortgage balances?
              </h3>

              <p>
                Yes.
                Cash out refinancing increases
                total mortgage balances
                because homeowners borrow additional funds.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are refinancing costs important?
              </h3>

              <p>
                Yes.
                Homeowners should compare:
                interest rates,
                closing costs,
                monthly payments,
                and long-term borrowing expenses.
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
              href="/refinance-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Refinance Calculator
            </a>

            <a
              href="/home-equity-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Home Equity Calculator
            </a>

            <a
              href="/heloc-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              HELOC Calculator
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
          className="w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white"
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