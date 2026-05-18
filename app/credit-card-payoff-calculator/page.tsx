"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

export default function CreditCardPayoffCalculator() {

  const [balance, setBalance] = useState(15000)

  const [interestRate, setInterestRate] = useState(22)

  const [monthlyPayment, setMonthlyPayment] = useState(500)

  const monthlyRate =
    interestRate / 100 / 12

  let remainingBalance =
    balance

  let totalInterest =
    0

  let months =
    0

  while (
    remainingBalance > 0 &&
    months < 1000
  ) {

    const interest =
      remainingBalance *
      monthlyRate

    remainingBalance += interest

    remainingBalance -= monthlyPayment

    totalInterest += interest

    months++
  }

  const years =
    months / 12

  const totalPaid =
    balance + totalInterest

  const chartData = [
    {
      name: "Balance",
      value: balance,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const payoffData = useMemo(() => {

    const rows = []

    let remaining =
      balance

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
    balance,
    monthlyRate,
    monthlyPayment,
    months,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-sky-700 to-blue-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Credit Card Payoff Calculator
            </h1>

            <p className="text-sky-100 text-sm lg:text-lg">
              Calculate credit card payoff timelines,
              debt reduction,
              monthly payment strategies,
              and interest savings.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Credit Card Balance"
                  value={balance}
                  setValue={setBalance}
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

            <div className="bg-gradient-to-b from-sky-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-sky-700 to-blue-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-sky-100 mb-2">
                  Estimated Payoff Time
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  {months} Months
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Payoff Summary
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
            Credit Card Payoff Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Paying
            <strong> ${monthlyPayment}</strong>
            monthly toward a
            <strong> ${balance.toLocaleString()}</strong>
            credit card balance with an interest rate of
            <strong> {interestRate}%</strong>
            could take approximately
            <strong> {months} months</strong>
            to fully pay off the debt while paying approximately
            <strong> ${totalInterest.toFixed(0)}</strong>
            in total interest.

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

                    <Cell fill="#0369a1" />
                    <Cell fill="#7dd3fc" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-sky-50 rounded-2xl p-5">

                <div className="text-slate-700 mb-1">
                  Credit Card Balance
                </div>

                <div className="text-2xl font-black">
                  ${balance.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-700 mb-1">
                  Interest Cost
                </div>

                <div className="text-2xl font-black">
                  ${totalInterest.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Payoff Progress Chart
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
                  stroke="#0369a1"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Credit Card Payoff Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              New Balance = Current Balance + Interest - Payment
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Credit Card Payoff Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            A $15,000 credit card balance
            with a 22% APR
            and monthly payments of $500
            may take approximately
            <strong> {months} months</strong>
            to pay off.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Credit Card Payoff Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                How can I pay off credit card debt faster?
              </h3>

              <p className="text-slate-700 leading-8">
                Increasing monthly payments
                and reducing interest rates
                can speed up debt payoff.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Why is credit card interest expensive?
              </h3>

              <p className="text-slate-700 leading-8">
                Credit card APRs are often higher than loans,
                causing balances to grow quickly over time.
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
              href="/debt-snowball-calculator"
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
            >
              Debt Snowball Calculator
            </a>

            <a
              href="/debt-avalanche-calculator"
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
            >
              Debt Avalanche Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

            <a
              href="/extra-payment-calculator"
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
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
          className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white ${
            prefix ? "pl-9" : ""
          } ${
            suffix ? "pr-20" : ""
          }`}
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

        <span className="text-slate-700">
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