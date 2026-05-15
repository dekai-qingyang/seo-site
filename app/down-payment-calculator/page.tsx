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

export default function DownPaymentCalculator() {

  const [homePrice, setHomePrice] = useState(500000)

  const [downPaymentPercent, setDownPaymentPercent] = useState(20)

  const [interestRate, setInterestRate] = useState(6)

  const [loanTerm, setLoanTerm] = useState(30)

  const downPayment =
    homePrice *
    (downPaymentPercent / 100)

  const loanAmount =
    homePrice - downPayment

  const monthlyRate =
    interestRate / 100 / 12

  const totalPayments =
    loanTerm * 12

  const monthlyPayment =
    (
      loanAmount *
      monthlyRate *
      Math.pow(
        1 + monthlyRate,
        totalPayments
      )
    ) /
    (
      Math.pow(
        1 + monthlyRate,
        totalPayments
      ) - 1
    )

  const totalInterest =
    (monthlyPayment * totalPayments)
    - loanAmount

  const chartData = [
    {
      name: "Down Payment",
      value: downPayment,
    },
    {
      name: "Mortgage Loan",
      value: loanAmount,
    },
  ]

  const growthData = useMemo(() => {

    const rows = []

    let balance = loanAmount

    for (
      let year = 1;
      year <= loanTerm;
      year++
    ) {

      for (
        let month = 1;
        month <= 12;
        month++
      ) {

        const interest =
          balance * monthlyRate

        const principal =
          monthlyPayment - interest

        balance -= principal
      }

      rows.push({
        year,
        balance:
          balance > 0
            ? balance
            : 0,
      })
    }

    return rows

  }, [
    loanAmount,
    monthlyPayment,
    monthlyRate,
    loanTerm,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Down Payment Calculator
            </h1>

            <p className="text-green-100 text-sm lg:text-lg">
              Estimate down payments,
              mortgage affordability,
              loan balances,
              and monthly home payments.
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
                  label="Down Payment"
                  value={downPaymentPercent}
                  setValue={setDownPaymentPercent}
                  suffix="%"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Loan Term (Years)"
                  value={loanTerm}
                  setValue={setLoanTerm}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-green-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-green-100 mb-2">
                  Estimated Down Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${downPayment.toFixed(0)}
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
                    label="Loan Amount"
                    value={loanAmount}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={monthlyPayment}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={totalInterest}
                  />

                  <SummaryRow
                    label="Down Payment"
                    value={downPayment}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Down Payment Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            A home priced at
            <strong> ${homePrice.toLocaleString()}</strong>
            with a
            <strong> {downPaymentPercent}%</strong>
            down payment requires approximately
            <strong> ${downPayment.toFixed(0)}</strong>
            upfront.
            The remaining mortgage balance is
            <strong> ${loanAmount.toFixed(0)}</strong>.

          </p>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Home Purchase Breakdown
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

                    <Cell fill="#16a34a" />
                    <Cell fill="#86efac" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-green-50 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Down Payment
                </div>

                <div className="text-2xl font-black">
                  ${downPayment.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Mortgage Loan
                </div>

                <div className="text-2xl font-black">
                  ${loanAmount.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Balance Chart
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#16a34a"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Down Payment Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Down Payment = Home Price × Down Payment %
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Down Payment Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            A $500,000 home
            with a 20% down payment
            requires approximately
            <strong> ${downPayment.toFixed(0)}</strong>
            upfront,
            leaving a mortgage loan balance of
            <strong> ${loanAmount.toFixed(0)}</strong>.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Down Payment Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                What is a down payment?
              </h3>

              <p className="text-slate-700 leading-8">
                A down payment is the upfront portion
                of a home purchase paid before financing.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Is 20% down required?
              </h3>

              <p className="text-slate-700 leading-8">
                Many lenders allow smaller down payments,
                but 20% can help avoid private mortgage insurance.
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
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
            </a>

            <a
              href="/amortization-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Amortization Calculator
            </a>

            <a
              href="/affordability-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Affordability Calculator
            </a>

            <a
              href="/rent-vs-buy-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Rent vs Buy Calculator
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
}: {
  label: string
  value: number
}) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-500">
          {label}
        </span>

        <span className="font-bold">
          ${value.toFixed(2)}
        </span>

      </div>

    </div>

  )
}