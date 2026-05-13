"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export default function RefinanceCalculator() {

  const [currentBalance, setCurrentBalance] = useState(350000)

  const [currentRate, setCurrentRate] = useState(7.2)

  const [newRate, setNewRate] = useState(5.8)

  const [remainingTerm, setRemainingTerm] = useState(25)

  const [closingCosts, setClosingCosts] = useState(5000)

  const currentMonthlyRate =
    currentRate / 100 / 12

  const newMonthlyRate =
    newRate / 100 / 12

  const totalPayments =
    remainingTerm * 12

  const currentPayment =
    currentBalance *
    (
      currentMonthlyRate *
      Math.pow(
        1 + currentMonthlyRate,
        totalPayments
      )
    ) /
    (
      Math.pow(
        1 + currentMonthlyRate,
        totalPayments
      ) - 1
    )

  const newPayment =
    currentBalance *
    (
      newMonthlyRate *
      Math.pow(
        1 + newMonthlyRate,
        totalPayments
      )
    ) /
    (
      Math.pow(
        1 + newMonthlyRate,
        totalPayments
      ) - 1
    )

  const monthlySavings =
    currentPayment - newPayment

  const lifetimeSavings =
    monthlySavings *
    totalPayments -
    closingCosts

  const breakEvenMonths =
    closingCosts / monthlySavings

  const chartData = [
    {
      name: "Current Payment",
      value: currentPayment,
    },
    {
      name: "New Payment",
      value: newPayment,
    },
  ]

  const refinanceReport = useMemo(() => {

    let balance = currentBalance

    const rows = []

    for (let i = 1; i <= totalPayments; i++) {

      const interest =
        balance * newMonthlyRate

      const principal =
        newPayment - interest

      balance -= principal

      rows.push({
        payment: i,
        interest,
        principal,
        balance:
          balance > 0 ? balance : 0,
      })
    }

    return rows

  }, [
    currentBalance,
    newMonthlyRate,
    newPayment,
    totalPayments,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-2 lg:mb-4">
              Refinance Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg leading-7">
              Estimate mortgage refinancing savings,
              break-even points,
              and long-term payment reductions.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Current Loan Balance"
                  value={currentBalance}
                  setValue={setCurrentBalance}
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
                  suffix="Years"
                />

                <InputField
                  label="Closing Costs"
                  value={closingCosts}
                  setValue={setClosingCosts}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              {/* RESULT */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-5 lg:mb-8">

                <p className="text-blue-100 text-sm lg:text-lg mb-2">
                  Estimated Monthly Savings
                </p>

                <h2 className="text-3xl lg:text-5xl font-black break-all">
                  ${monthlySavings.toFixed(2)}
                </h2>

              </div>

              {/* SUMMARY */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-5 lg:mb-8">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Refinance Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Current Payment"
                    value={currentPayment}
                  />

                  <SummaryRow
                    label="New Payment"
                    value={newPayment}
                  />

                  <SummaryRow
                    label="Monthly Savings"
                    value={monthlySavings}
                  />

                  <SummaryRow
                    label="Lifetime Savings"
                    value={lifetimeSavings}
                  />

                  <SummaryRow
                    label="Break-even Point"
                    value={breakEvenMonths}
                    suffix=" months"
                  />

                </div>

              </div>

              {/* REPORT */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Refinance Report
                  </h3>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full text-left">

                    <thead className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">

                      <tr>

                        <th className="py-4 px-4 text-lg font-bold">
                          Payment
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Interest
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Principal
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Balance
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {refinanceReport
                        .slice(0, 12)
                        .map((row, index) => (

                        <tr
                          key={index}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >

                          <td className="py-4 px-4 font-semibold">
                            {index + 1}
                          </td>

                          <td className="py-4 px-4">
                            ${row.interest.toFixed(2)}
                          </td>

                          <td className="py-4 px-4">
                            ${row.principal.toFixed(2)}
                          </td>

                          <td className="py-4 px-4 font-bold">
                            ${row.balance.toFixed(2)}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Refinance Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Refinancing from
            <strong> {currentRate}%</strong>
            to
            <strong> {newRate}%</strong>
            could reduce monthly payments by
            <strong> ${monthlySavings.toFixed(2)}</strong>
            and potentially save
            <strong> ${lifetimeSavings.toFixed(0)}</strong>
            over the life of the loan.

          </p>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Payment Comparison
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
                  Current Mortgage
                </div>

                <div className="text-2xl font-black">
                  ${currentPayment.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Refinanced Mortgage
                </div>

                <div className="text-2xl font-black">
                  ${newPayment.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Refinance Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Monthly Savings = Current Payment − New Payment
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Refinance Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Refinancing a $350,000 mortgage
            from 7.2% to 5.8%
            could save approximately
            <strong> ${monthlySavings.toFixed(2)}</strong>
            per month.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Refinance FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                Is refinancing worth it?
              </h3>

              <p className="text-slate-700 leading-8">
                Refinancing may be worthwhile if
                long-term savings exceed closing costs.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is a refinance break-even point?
              </h3>

              <p className="text-slate-700 leading-8">
                The break-even point measures how long
                it takes to recover refinancing costs
                through monthly savings.
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
              href="/mortgage-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

            <a
              href="/auto-loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Auto Loan Calculator
            </a>

            <a
              href="/affordability-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Affordability Calculator
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
          className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            prefix ? "pl-9" : ""
          } ${
            suffix ? "pr-20" : ""
          }`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
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
}: {
  label: string
  value: number
  suffix?: string
}) {

  return (

    <div className="px-4 lg:px-6 py-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1">

        <span className="text-slate-500 text-sm lg:text-base">
          {label}
        </span>

        <span className="font-bold text-base lg:text-lg break-all">

          {suffix
            ? `${value.toFixed(0)}${suffix}`
            : `$${value.toFixed(2)}`}

        </span>

      </div>

    </div>

  )
}