"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts"

export default function DebtSnowballCalculator() {

  const [totalDebt, setTotalDebt] = useState(25000)

  const [interestRate, setInterestRate] = useState(18)

  const [monthlyPayment, setMonthlyPayment] = useState(900)

  const monthlyRate =
    interestRate / 100 / 12

  let balance =
    totalDebt

  let totalInterest =
    0

  let months =
    0

  while (
    balance > 0 &&
    months < 1000
  ) {

    const interest =
      balance * monthlyRate

    balance += interest

    balance -= monthlyPayment

    totalInterest += interest

    months++
  }

  const totalPaid =
    totalDebt + totalInterest

  const years =
    months / 12

  const chartData = [
    {
      name: "Debt",
      value: totalDebt,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const payoffData = useMemo(() => {

    const rows = []

    let remaining =
      totalDebt

    for (
      let month = 1;
      month <= months;
      month++
    ) {

      const interest =
        remaining * monthlyRate

      remaining += interest

      remaining -= monthlyPayment

      if (remaining < 0) {
        remaining = 0
      }

      rows.push({
        month,
        balance: remaining,
      })
    }

    return rows

  }, [
    totalDebt,
    monthlyPayment,
    monthlyRate,
    months,
  ])

  const compareData = [
    {
      name: "Debt",
      value: totalDebt,
    },
    {
      name: "Total Paid",
      value: totalPaid,
    },
  ]

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-violet-700 to-purple-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Debt Snowball Calculator
            </h1>

            <p className="text-violet-100 text-sm lg:text-lg">
              Calculate debt snowball repayment plans,
              debt payoff timelines,
              and monthly payment strategies.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Total Debt"
                  value={totalDebt}
                  setValue={setTotalDebt}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Monthly Payment"
                  value={monthlyPayment}
                  setValue={setMonthlyPayment}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-violet-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-violet-700 to-purple-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-violet-100 mb-2">
                  Estimated Payoff Time
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  {months} Months
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Debt Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Interest"
                    value={totalInterest}
                  />

                  <SummaryRow
                    label="Total Paid"
                    value={totalPaid}
                  />

                  <SummaryRow
                    label="Years to Payoff"
                    value={years}
                    suffix=" years"
                    isCurrency={false}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={monthlyPayment}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Debt Snowball Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            The debt snowball method focuses on paying off
            smaller debts first while making minimum payments on larger balances.
            With a total debt balance of
            <strong> ${totalDebt.toLocaleString()}</strong>
            and monthly payments of
            <strong> ${monthlyPayment}</strong>,
            debt payoff could take approximately
            <strong> {months} months</strong>.

          </p>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Debt Breakdown
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

                    <Cell fill="#7c3aed" />
                    <Cell fill="#c4b5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-violet-50 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Debt Balance
                </div>

                <div className="text-2xl font-black">
                  ${totalDebt.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Interest Paid
                </div>

                <div className="text-2xl font-black">
                  ${totalInterest.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Debt Payoff Chart
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={payoffData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#7c3aed"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Total Debt vs Total Paid
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={compareData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#7c3aed"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Debt Snowball Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              New Balance = Current Balance + Interest - Monthly Payment
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Debt Snowball Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            A borrower with
            $25,000 in debt
            paying
            $900 monthly
            could potentially pay off debt in approximately
            <strong> {months} months</strong>
            depending on interest rates and repayment consistency.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Debt Snowball Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is the debt snowball method?
              </h3>

              <p className="text-slate-700 leading-8">
                The debt snowball strategy focuses on paying off
                smaller debts first to build momentum and motivation.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Does the debt snowball method save money?
              </h3>

              <p className="text-slate-700 leading-8">
                The method improves motivation,
                but may not always minimize total interest costs.
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
              href="/debt-avalanche-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
            >
              Debt Avalanche Calculator
            </a>

            <a
              href="/credit-card-payoff-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
            >
              Credit Card Payoff Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

            <a
              href="/extra-payment-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
            >
              Extra Payment Calculator
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
            : `${value.toFixed(1)}${suffix || ""}`}

        </span>

      </div>

    </div>

  )
}