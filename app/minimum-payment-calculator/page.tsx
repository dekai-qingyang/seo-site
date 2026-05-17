"use client"

import { useMemo, useState } from "react"

import Image from "next/image"

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

export default function MinimumPaymentCalculator() {

  const [balance, setBalance] =
    useState(8500)

  const [interestRate, setInterestRate] =
    useState(22)

  const [minimumPercent, setMinimumPercent] =
    useState(3)

  const [extraPayment, setExtraPayment] =
    useState(120)

  const minimumPayment =
    balance *
    (minimumPercent / 100)

  const monthlyRate =
    interestRate / 100 / 12

  const estimatedInterest =
    balance * monthlyRate * 12

  const payoffMonths =
    balance /
    (minimumPayment + extraPayment)

  const totalInterest =
    estimatedInterest *
    (payoffMonths / 12)

  const totalRepayment =
    balance + totalInterest

  const pieData = [
    {
      name: "Balance",
      value: balance,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const compareData = [
    {
      name: "Minimum Payment",
      value: minimumPayment,
    },
    {
      name: "Extra Payment",
      value: extraPayment,
    },
    {
      name: "Interest Cost",
      value: totalInterest,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        month: "Month 1",
        value: balance * 0.92,
      },
      {
        month: "Month 6",
        value: balance * 0.68,
      },
      {
        month: "Month 12",
        value: balance * 0.46,
      },
      {
        month: "Month 18",
        value: balance * 0.24,
      },
      {
        month: "Month 24",
        value: balance * 0.08,
      },
    ]

  }, [
    balance,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Minimum Payment Calculator
            </h1>

            <p className="text-rose-100 text-sm lg:text-lg">
              Estimate minimum credit card payments,
              payoff timelines,
              interest costs,
              and debt repayment strategies.
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
                  label="Minimum Payment Percentage"
                  value={minimumPercent}
                  setValue={setMinimumPercent}
                  suffix="%"
                />

                <InputField
                  label="Extra Monthly Payment"
                  value={extraPayment}
                  setValue={setExtraPayment}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-rose-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-rose-100 mb-2">
                  Estimated Minimum Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${minimumPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Payment Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Minimum Payment"
                    value={`$${minimumPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Payoff Time"
                    value={`${payoffMonths.toFixed(0)} months`}
                  />

                  <SummaryRow
                    label="Total Repayment"
                    value={`$${totalRepayment.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* IMAGE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-4 lg:p-8 mt-6">

          <div className="relative w-full h-[300px] lg:h-[420px] rounded-3xl overflow-hidden">

          <Image
               src="/images/minimum-payment.jpg"
               alt="Minimum payment calculator"
               fill
            className="object-cover"
          />

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Minimum Payment Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A minimum payment calculator helps borrowers estimate
              required monthly credit card payments,
              total repayment costs,
              and payoff timelines.
            </p>

            <p>
              Credit card issuers generally require borrowers
              to make a minimum monthly payment
              based on a percentage of the outstanding balance.
            </p>

            <p>
              Minimum payments may appear affordable initially,
              but paying only the minimum amount
              may significantly increase total interest expenses
              over time.
            </p>

            <p>
              Minimum payment calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly minimum payments</li>

              <li>Total interest expenses</li>

              <li>Estimated payoff timelines</li>

              <li>Total repayment costs</li>

              <li>Debt reduction strategies</li>

            </ul>

            <p>
              Credit card debt often carries
              higher interest rates
              compared to mortgages,
              vehicle loans,
              and personal loans.
            </p>

            <p>
              High interest rates
              may cause balances to grow rapidly
              when borrowers make only minimum payments.
            </p>

            <p>
              Minimum payment amounts
              typically depend on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Outstanding balance</li>

              <li>Credit card APR</li>

              <li>Issuer payment policies</li>

              <li>Late fees and penalties</li>

            </ul>

            <p>
              Borrowers who pay more than the minimum amount
              often reduce:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Total interest costs</li>

              <li>Debt repayment timelines</li>

              <li>Financial stress</li>

              <li>Credit utilization ratios</li>

            </ul>

            <p>
              Extra monthly payments
              may dramatically accelerate debt repayment
              and improve long-term financial stability.
            </p>

            <p>
              Minimum payment calculators help consumers compare
              debt repayment strategies
              and understand the long-term cost
              of revolving credit balances.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Debt Breakdown
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

                    <Cell fill="#be123c" />
                    <Cell fill="#fda4af" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Balance"
                value={`$${balance.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Cost"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Repayment"
                value={`$${totalRepayment.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Balance Reduction Trend
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#be123c"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Payment Comparison
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
                  fill="#be123c"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Minimum Payment Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Minimum Payment =
              Credit Card Balance × Minimum Percentage
            </p>

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