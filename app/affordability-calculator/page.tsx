"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export default function AffordabilityCalculator() {

  const [annualIncome, setAnnualIncome] = useState(120000)

  const [monthlyDebt, setMonthlyDebt] = useState(1200)

  const [downPayment, setDownPayment] = useState(50000)

  const [interestRate, setInterestRate] = useState(6.5)

  const [loanTerm, setLoanTerm] = useState(30)

  const [propertyTax, setPropertyTax] = useState(300)

  const [insurance, setInsurance] = useState(120)

  const monthlyIncome = annualIncome / 12

  const maxHousingBudget =
    monthlyIncome * 0.28 - monthlyDebt

  const monthlyInterest =
    interestRate / 100 / 12

  const totalPayments = loanTerm * 12

  const estimatedLoan =
    maxHousingBudget *
    ((Math.pow(1 + monthlyInterest, totalPayments) - 1) /
      (monthlyInterest *
        Math.pow(1 + monthlyInterest, totalPayments)))

  const affordableHomePrice =
    estimatedLoan + downPayment

  const estimatedPayment =
    maxHousingBudget -
    propertyTax -
    insurance

  const totalHousingCapacity =
    affordableHomePrice - downPayment

  const chartData = [
    {
      name: "Loan Capacity",
      value: totalHousingCapacity,
    },
    {
      name: "Down Payment",
      value: downPayment,
    },
  ]

  const affordabilityReport = useMemo(() => {

    const rows = []

    let balance = estimatedLoan

    const payment =
      estimatedLoan *
      (monthlyInterest *
        Math.pow(1 + monthlyInterest, totalPayments)) /
      (Math.pow(1 + monthlyInterest, totalPayments) - 1)

    for (let i = 1; i <= totalPayments; i++) {

      const interest = balance * monthlyInterest

      const principal = payment - interest

      balance -= principal

      rows.push({
        payment: i,
        interest,
        principal,
        balance: balance > 0 ? balance : 0,
      })
    }

    return rows

  }, [
    estimatedLoan,
    monthlyInterest,
    totalPayments,
  ])

  return (
    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-2 lg:mb-4">
              Affordability Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg leading-7">
              Estimate how much house you can afford based on
              income, debt, interest rates, and monthly expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Annual Income"
                  value={annualIncome}
                  setValue={setAnnualIncome}
                  prefix="$"
                />

                <InputField
                  label="Monthly Debt"
                  value={monthlyDebt}
                  setValue={setMonthlyDebt}
                  prefix="$"
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  setValue={setDownPayment}
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
                  suffix="Years"
                />

                <InputField
                  label="Property Tax"
                  value={propertyTax}
                  setValue={setPropertyTax}
                  prefix="$"
                />

                <InputField
                  label="Home Insurance"
                  value={insurance}
                  setValue={setInsurance}
                  prefix="$"
                />

              </div>

            </div>

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-5 lg:mb-8">

                <p className="text-blue-100 text-sm lg:text-lg mb-2">
                  Estimated Affordable Home Price
                </p>

                <h2 className="text-3xl lg:text-5xl font-black break-all">
                  ${affordableHomePrice.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-5 lg:mb-8">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Affordability Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Monthly Income"
                    value={monthlyIncome}
                  />

                  <SummaryRow
                    label="Maximum Housing Budget"
                    value={maxHousingBudget}
                  />

                  <SummaryRow
                    label="Estimated Loan Amount"
                    value={estimatedLoan}
                  />

                  <SummaryRow
                    label="Estimated Monthly Payment"
                    value={estimatedPayment}
                  />

                </div>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Affordability Report
                  </h3>

                </div>

                <div className="block lg:hidden divide-y divide-slate-200">

                  {affordabilityReport.slice(0, 12).map((row, index) => (

                    <div
                      key={index}
                      className="p-4"
                    >

                      <div className="flex justify-between items-center mb-3">

                        <div className="font-bold text-lg">
                          Payment {index + 1}
                        </div>

                        <div className="text-sm text-slate-500">
                          Month
                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="bg-slate-50 rounded-2xl p-3">

                          <div className="text-slate-500 mb-1">
                            Interest
                          </div>

                          <div className="font-bold">
                            ${row.interest.toFixed(0)}
                          </div>

                        </div>

                        <div className="bg-slate-50 rounded-2xl p-3">

                          <div className="text-slate-500 mb-1">
                            Principal
                          </div>

                          <div className="font-bold">
                            ${row.principal.toFixed(0)}
                          </div>

                        </div>

                        <div className="bg-blue-50 rounded-2xl p-3 col-span-2">

                          <div className="text-slate-500 mb-1">
                            Remaining Balance
                          </div>

                          <div className="font-black text-lg">
                            ${row.balance.toFixed(0)}
                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="hidden lg:block overflow-x-auto">

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

                      {affordabilityReport.slice(0, 12).map((row, index) => (

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

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6 lg:mt-10">

          <h2 className="text-2xl lg:text-3xl font-black mb-5">
            Affordability Explanation
          </h2>

          <p className="text-slate-700 text-base lg:text-lg leading-8">
            Based on an annual income of
            <strong> ${annualIncome.toLocaleString()}</strong>,
            monthly debt obligations of
            <strong> ${monthlyDebt.toFixed(0)}</strong>,
            and a down payment of
            <strong> ${downPayment.toFixed(0)}</strong>,
            your estimated affordable home price is
            <strong> ${affordableHomePrice.toFixed(0)}</strong>.
          </p>

          <p className="text-slate-700 text-base lg:text-lg leading-8 mt-4">
            Mortgage affordability depends on income,
            debt-to-income ratio, interest rates,
            property taxes, and loan terms.
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6">

          <h2 className="text-2xl lg:text-3xl font-black mb-6">
            Home Affordability Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[300px]">

              <ResponsiveContainer width="100%" height="100%">

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
                  Estimated Loan Capacity
                </div>

                <div className="text-2xl font-black">
                  ${totalHousingCapacity.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Down Payment
                </div>

                <div className="text-2xl font-black">
                  ${downPayment.toFixed(0)}
                </div>

              </div>

              <div className="bg-indigo-50 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Affordable Home Price
                </div>

                <div className="text-2xl font-black">
                  ${affordableHomePrice.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6">

          <h2 className="text-2xl lg:text-3xl font-black mb-5">
            Affordability Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Housing Budget = Monthly Income × 28% − Monthly Debt
            </p>

          </div>

        </div>

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-10 mt-6 lg:mt-10">

          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            Understanding Home Affordability
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-base lg:text-lg">

            <p>
              A home affordability calculator estimates how much
              house buyers can afford based on income, debt,
              down payment, and mortgage interest rates.
            </p>

          </div>

        </section>

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
          onChange={(e) => setValue(Number(e.target.value))}
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
}: {
  label: string
  value: number
}) {
  return (

    <div className="px-4 lg:px-6 py-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1">

        <span className="text-slate-500 text-sm lg:text-base">
          {label}
        </span>

        <span className="font-bold text-base lg:text-lg break-all">
          ${value.toFixed(2)}
        </span>

      </div>

    </div>

  )
}
