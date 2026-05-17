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

export default function AutoRefinanceCalculator() {

  const [remainingLoan, setRemainingLoan] =
    useState(24000)

  const [currentRate, setCurrentRate] =
    useState(8.5)

  const [newRate, setNewRate] =
    useState(5.4)

  const [remainingTerm, setRemainingTerm] =
    useState(48)

  const currentMonthlyRate =
    currentRate / 100 / 12

  const newMonthlyRate =
    newRate / 100 / 12

  const currentPayment =
    (
      remainingLoan *
      currentMonthlyRate
    ) /
    (
      1 -
      Math.pow(
        1 + currentMonthlyRate,
        -remainingTerm
      )
    )

  const refinancedPayment =
    (
      remainingLoan *
      newMonthlyRate
    ) /
    (
      1 -
      Math.pow(
        1 + newMonthlyRate,
        -remainingTerm
      )
    )

  const monthlySavings =
    currentPayment - refinancedPayment

  const totalCurrentCost =
    currentPayment * remainingTerm

  const totalRefinancedCost =
    refinancedPayment * remainingTerm

  const totalSavings =
    totalCurrentCost - totalRefinancedCost

  const pieData = [
    {
      name: "Refinanced Loan",
      value: totalRefinancedCost,
    },
    {
      name: "Interest Savings",
      value: totalSavings,
    },
  ]

  const compareData = [
    {
      name: "Current Payment",
      value: currentPayment,
    },
    {
      name: "Refinanced Payment",
      value: refinancedPayment,
    },
    {
      name: "Monthly Savings",
      value: monthlySavings,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: totalSavings * 0.2,
      },
      {
        year: "Year 2",
        value: totalSavings * 0.42,
      },
      {
        year: "Year 3",
        value: totalSavings * 0.65,
      },
      {
        year: "Year 4",
        value: totalSavings,
      },
    ]

  }, [
    totalSavings,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-cyan-700 to-sky-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Auto Refinance Calculator
            </h1>

            <p className="text-cyan-100 text-sm lg:text-lg">
              Estimate auto refinance savings,
              lower interest costs,
              reduced monthly payments,
              and long-term refinancing benefits.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Remaining Loan Balance"
                  value={remainingLoan}
                  setValue={setRemainingLoan}
                  prefix="$"
                />

                <InputField
                  label="Current Interest Rate"
                  value={currentRate}
                  setValue={setCurrentRate}
                  suffix="%"
                />

                <InputField
                  label="New Interest Rate"
                  value={newRate}
                  setValue={setNewRate}
                  suffix="%"
                />

                <InputField
                  label="Remaining Loan Term"
                  value={remainingTerm}
                  setValue={setRemainingTerm}
                  suffix=" months"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-cyan-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-cyan-700 to-sky-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-cyan-100 mb-2">
                  Estimated Monthly Savings
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlySavings.toFixed(0)}
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
                    label="Current Payment"
                    value={`$${currentPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Refinanced Payment"
                    value={`$${refinancedPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Savings"
                    value={`$${monthlySavings.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Savings"
                    value={`$${totalSavings.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Auto Refinance Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              An auto refinance calculator helps drivers estimate
              how refinancing an existing vehicle loan
              may reduce monthly payments,
              lower interest costs,
              and improve overall loan affordability.
            </p>

            <p>
              Auto refinancing replaces
              an existing vehicle loan
              with a new loan,
              often at a lower interest rate
              or different repayment term.
            </p>

            <p>
              Refinance calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Reduced monthly payments</li>

              <li>Total refinancing savings</li>

              <li>Interest cost reductions</li>

              <li>Remaining loan balances</li>

              <li>Long-term financing benefits</li>

            </ul>

            <p>
              Refinancing may become beneficial
              when:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Interest rates decrease</li>

              <li>Credit scores improve</li>

              <li>Monthly budgets change</li>

              <li>Existing loan terms are unfavorable</li>

              <li>Debt restructuring is needed</li>

            </ul>

            <p>
              Lower interest rates
              may significantly reduce
              both monthly payments
              and total borrowing costs.
            </p>

            <p>
              However,
              extending loan terms
              may lower monthly obligations
              while increasing total interest paid
              over time.
            </p>

            <p>
              Drivers should also evaluate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Refinancing fees</li>

              <li>Remaining vehicle value</li>

              <li>Loan payoff penalties</li>

              <li>New lender requirements</li>

            </ul>

            <p>
              Auto refinancing may improve cash flow
              during periods of economic uncertainty
              or rising financial obligations.
            </p>

            <p>
              Refinance calculators help consumers compare
              loan scenarios
              and determine whether refinancing
              supports long-term financial goals.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Refinancing Savings Breakdown
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

                    <Cell fill="#0891b2" />
                    <Cell fill="#67e8f9" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Refinanced Cost"
                value={`$${totalRefinancedCost.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Savings"
                value={`$${totalSavings.toFixed(0)}`}
              />

              <SummaryCard
                title="Monthly Savings"
                value={`$${monthlySavings.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Savings Growth Trend
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
                  stroke="#0891b2"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Loan Payment Comparison
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
                  fill="#0891b2"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Auto Refinance Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Monthly Payment =
              P × r ÷ (1 − (1 + r)^−n)
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Auto Refinance Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A driver with a
              $24,000 remaining vehicle balance
              refinancing from 8.5%
              to 5.4%
              over 48 months
              may reduce monthly payments
              by approximately
              ${monthlySavings.toFixed(0)}.
            </p>

            <p>
              Total refinancing savings
              may exceed
              ${totalSavings.toFixed(0)}
              over the remaining loan term.
            </p>

            <p>
              This example demonstrates
              how lower interest rates
              may improve long-term transportation affordability.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Auto Refinance FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                When should I refinance my auto loan?
              </h3>

              <p>
                Refinancing may help
                when interest rates decline
                or credit scores improve.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does refinancing lower monthly payments?
              </h3>

              <p>
                Lower interest rates
                or longer repayment terms
                may reduce monthly obligations.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can refinancing increase total costs?
              </h3>

              <p>
                Extending repayment terms
                may increase total interest paid
                despite lower monthly payments.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does refinancing affect credit scores?
              </h3>

              <p>
                Refinancing may temporarily impact credit scores
                due to lender credit inquiries.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are there refinancing fees?
              </h3>

              <p>
                Some lenders charge processing fees,
                title transfer fees,
                or loan setup costs.
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
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/trade-in-calculator"
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
            >
              Trade In Calculator
            </a>

            <a
              href="/used-car-calculator"
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
            >
              Used Car Calculator
            </a>

            <a
              href="/car-payment-calculator"
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
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
          className="w-full border border-slate-200 rounded-2xl py-3 pl-8 pr-8 bg-white"
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