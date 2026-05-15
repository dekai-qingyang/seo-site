"use client"

import { useMemo, useState } from "react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function RentVsBuyCalculator() {

  const [homePrice, setHomePrice] = useState(500000)

  const [monthlyRent, setMonthlyRent] = useState(2500)

  const [downPaymentPercent, setDownPaymentPercent] = useState(20)

  const [interestRate, setInterestRate] = useState(6)

  const [years, setYears] = useState(10)

  const downPayment =
    homePrice * (downPaymentPercent / 100)

  const loanAmount =
    homePrice - downPayment

  const monthlyRate =
    interestRate / 100 / 12

  const totalPayments =
    30 * 12

  const monthlyMortgage =
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

  const totalRentCost =
    monthlyRent * 12 * years

  const totalBuyCost =
    (monthlyMortgage * 12 * years)
    + downPayment

  const difference =
    totalRentCost - totalBuyCost

  const chartData = [
    {
      name: "Rent",
      value: totalRentCost,
    },
    {
      name: "Buy",
      value: totalBuyCost,
    },
  ]

  const compareData = useMemo(() => {

    return [
      {
        name: "Renting",
        cost: totalRentCost,
      },
      {
        name: "Buying",
        cost: totalBuyCost,
      },
    ]

  }, [
    totalRentCost,
    totalBuyCost,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Rent vs Buy Calculator
            </h1>

            <p className="text-purple-100 text-sm lg:text-lg">
              Compare renting versus buying,
              mortgage costs,
              long-term housing expenses,
              and financial savings.
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
                  label="Monthly Rent"
                  value={monthlyRent}
                  setValue={setMonthlyRent}
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
                  label="Comparison Period (Years)"
                  value={years}
                  setValue={setYears}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-purple-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-purple-100 mb-2">
                  Estimated Savings Difference
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${Math.abs(difference).toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Cost Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Rent Cost"
                    value={totalRentCost}
                  />

                  <SummaryRow
                    label="Total Buy Cost"
                    value={totalBuyCost}
                  />

                  <SummaryRow
                    label="Monthly Mortgage"
                    value={monthlyMortgage}
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
            Rent vs Buy Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Renting a property at
            <strong> ${monthlyRent}</strong>
            monthly for
            <strong> {years} years</strong>
            results in approximately
            <strong> ${totalRentCost.toFixed(0)}</strong>
            in total rent expenses.
            Buying a home priced at
            <strong> ${homePrice.toLocaleString()}</strong>
            with a
            <strong> {downPaymentPercent}%</strong>
            down payment results in estimated housing costs of
            <strong> ${totalBuyCost.toFixed(0)}</strong>.

          </p>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Housing Cost Breakdown
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

              <div className="bg-purple-50 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Renting Cost
                </div>

                <div className="text-2xl font-black">
                  ${totalRentCost.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Buying Cost
                </div>

                <div className="text-2xl font-black">
                  ${totalBuyCost.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Rent vs Buy Comparison Chart
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
                  dataKey="cost"
                  fill="#7c3aed"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Rent vs Buy Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Total Rent Cost = Monthly Rent × 12 × Years
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Rent vs Buy Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Renting a property for
            $2,500 monthly over
            10 years costs approximately
            <strong> ${totalRentCost.toFixed(0)}</strong>.
            Buying a $500,000 home may result in lower long-term housing costs depending on mortgage terms and home appreciation.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Rent vs Buy Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                Is renting cheaper than buying?
              </h3>

              <p className="text-slate-700 leading-8">
                Renting may be cheaper short term,
                while buying can build long-term home equity.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                What factors affect buying costs?
              </h3>

              <p className="text-slate-700 leading-8">
                Mortgage interest,
                down payments,
                taxes,
                maintenance,
                and home prices affect total ownership costs.
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
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
            </a>

            <a
              href="/down-payment-calculator"
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Down Payment Calculator
            </a>

            <a
              href="/affordability-calculator"
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Affordability Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
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