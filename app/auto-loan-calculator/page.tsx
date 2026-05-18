"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export default function AutoLoanCalculator() {

  const [carPrice, setCarPrice] = useState(45000)

  const [downPayment, setDownPayment] = useState(5000)

  const [tradeInValue, setTradeInValue] = useState(3000)

  const [interestRate, setInterestRate] = useState(6.5)

  const [loanTerm, setLoanTerm] = useState(72)

  const [salesTax, setSalesTax] = useState(7)

  const salesTaxAmount =
    carPrice * (salesTax / 100)

  const loanAmount =
    carPrice +
    salesTaxAmount -
    downPayment -
    tradeInValue

  const monthlyInterest =
    interestRate / 100 / 12

  const monthlyPayment =
    loanAmount *
    (
      monthlyInterest *
      Math.pow(
        1 + monthlyInterest,
        loanTerm
      )
    ) /
    (
      Math.pow(
        1 + monthlyInterest,
        loanTerm
      ) - 1
    )

  const totalCost =
    monthlyPayment * loanTerm

  const totalInterest =
    totalCost - loanAmount

  const chartData = [
    {
      name: "Principal",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const amortizationSchedule = useMemo(() => {

    const rows = []

    let balance = loanAmount

    for (let i = 1; i <= loanTerm; i++) {

      const interest =
        balance * monthlyInterest

      const principal =
        monthlyPayment - interest

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
    loanAmount,
    monthlyInterest,
    monthlyPayment,
    loanTerm,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Auto Loan Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Calculate car payments, auto financing,
              total interest, and amortization schedules.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Car Price"
                  value={carPrice}
                  setValue={setCarPrice}
                  prefix="$"
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  setValue={setDownPayment}
                  prefix="$"
                />

                <InputField
                  label="Trade-in Value"
                  value={tradeInValue}
                  setValue={setTradeInValue}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="Months"
                />

                <InputField
                  label="Sales Tax"
                  value={salesTax}
                  setValue={setSalesTax}
                  suffix="%"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(2)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-6">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Loan Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={loanAmount}
                  />

                  <SummaryRow
                    label="Sales Tax"
                    value={salesTaxAmount}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={totalInterest}
                  />

                  <SummaryRow
                    label="Total Loan Cost"
                    value={totalCost}
                  />

                </div>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Amortization Schedule
                  </h3>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full text-left">

                    <thead className="bg-blue-600 text-white">

                      <tr>

                        <th className="py-4 px-4">
                          Payment
                        </th>

                        <th className="py-4 px-4">
                          Interest
                        </th>

                        <th className="py-4 px-4">
                          Principal
                        </th>

                        <th className="py-4 px-4">
                          Balance
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {amortizationSchedule
                        .slice(0, 12)
                        .map((row, index) => (

                        <tr
                          key={index}
                          className="border-b border-slate-100"
                        >

                          <td className="py-4 px-4">
                            {index + 1}
                          </td>

                          <td className="py-4 px-4">
                            ${row.interest.toFixed(2)}
                          </td>

                          <td className="py-4 px-4">
                            ${row.principal.toFixed(2)}
                          </td>

                          <td className="py-4 px-4 font-bold">
                            ${row.balance.toFixed(0)}
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

        {/* RESULT */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Auto Loan Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Based on a vehicle price of
            <strong> ${carPrice.toLocaleString()}</strong>,
            your estimated monthly car payment is
            <strong> ${monthlyPayment.toFixed(2)}</strong>.

          </p>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Auto Loan Breakdown
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

                <div className="text-slate-700 mb-1">
                  Principal
                </div>

                <div className="text-2xl font-black">
                  ${loanAmount.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-700 mb-1">
                  Interest
                </div>

                <div className="text-2xl font-black">
                  ${totalInterest.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Auto Loan Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              M = P × [ r(1+r)^n ] / [ (1+r)^n − 1 ]
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Auto Loan Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            A $45,000 car loan with a 6.5% APR,
            $5,000 down payment,
            and 72-month term would result in
            an estimated monthly payment of
            <strong> ${monthlyPayment.toFixed(2)}</strong>.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Auto Loan FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                How are car payments calculated?
              </h3>

              <p className="text-slate-700 leading-8">
                Car payments depend on loan amount,
                interest rate, taxes,
                and loan duration.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Does a larger down payment help?
              </h3>

              <p className="text-slate-700 leading-8">
                Yes. A larger down payment reduces
                monthly costs and total interest.
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
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

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
}: {
  label: string
  value: number
}) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-700">
          {label}
        </span>

        <span className="font-bold">
          ${value.toFixed(2)}
        </span>

      </div>

    </div>

  )
}