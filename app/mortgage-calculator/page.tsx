"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export default function MortgageCalculator() {

  const [homePrice, setHomePrice] = useState(500000)

  const [downPaymentMode, setDownPaymentMode] = useState("%")

  const [downPayment, setDownPayment] = useState(20)

  const [loanTerm, setLoanTerm] = useState(30)

  const [interestRate, setInterestRate] = useState(6.5)

  const [startMonth, setStartMonth] = useState("January")

  const [startYear, setStartYear] = useState(2026)

  const [scheduleMode, setScheduleMode] = useState("monthly")

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = Array.from(
    { length: 30 },
    (_, i) => 2025 + i
  )

  const actualDownPayment =
    downPaymentMode === "%"
      ? homePrice * (downPayment / 100)
      : downPayment

  const loanAmount =
    homePrice - actualDownPayment

  const monthlyInterest =
    interestRate / 100 / 12

  const totalPayments =
    loanTerm * 12

  const monthlyPayment =
    loanAmount *
    (
      monthlyInterest *
      Math.pow(
        1 + monthlyInterest,
        totalPayments
      )
    ) /
    (
      Math.pow(
        1 + monthlyInterest,
        totalPayments
      ) - 1
    )

  const totalCost =
    monthlyPayment * totalPayments

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

    let balance = loanAmount

    const rows = []

    for (let i = 1; i <= totalPayments; i++) {

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
    totalPayments,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Mortgage Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Calculate mortgage payments,
              amortization schedules,
              and total loan costs instantly.
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

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Down Payment
                  </label>

                  <div className="flex gap-2">

                    <div className="relative flex-1">

                      {downPaymentMode === "$" && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          $
                        </span>
                      )}

                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) =>
                          setDownPayment(
                            Number(e.target.value)
                          )
                        }
                        className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white shadow-sm ${
                          downPaymentMode === "$"
                            ? "pl-9"
                            : ""
                        }`}
                      />

                    </div>

                    <select
                      value={downPaymentMode}
                      onChange={(e) =>
                        setDownPaymentMode(
                          e.target.value
                        )
                      }
                      className="border border-slate-200 rounded-2xl px-3 bg-white"
                    >
                      <option value="%">%</option>
                      <option value="$">$</option>
                    </select>

                  </div>

                </div>

                <InputField
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="Years"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Start Date
                  </label>

                  <div className="grid grid-cols-2 gap-2">

                    <select
                      value={startMonth}
                      onChange={(e) =>
                        setStartMonth(
                          e.target.value
                        )
                      }
                      className="border border-slate-200 rounded-2xl py-3 px-3 bg-white"
                    >
                      {months.map((month) => (
                        <option key={month}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      value={startYear}
                      onChange={(e) =>
                        setStartYear(
                          Number(e.target.value)
                        )
                      }
                      className="border border-slate-200 rounded-2xl py-3 px-3 bg-white"
                    >
                      {years.map((year) => (
                        <option key={year}>
                          {year}
                        </option>
                      ))}
                    </select>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(2)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-6">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Mortgage Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Home Price"
                    value={homePrice}
                  />

                  <SummaryRow
                    label="Down Payment"
                    value={actualDownPayment}
                  />

                  <SummaryRow
                    label="Loan Amount"
                    value={loanAmount}
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

                <div className="p-4 lg:p-6">

                  <div className="flex gap-4 mb-5">

                    <button
                      onClick={() =>
                        setScheduleMode("monthly")
                      }
                      className={`font-bold ${
                        scheduleMode === "monthly"
                          ? "text-black"
                          : "text-blue-600"
                      }`}
                    >
                      Monthly
                    </button>

                    <button
                      onClick={() =>
                        setScheduleMode("annual")
                      }
                      className={`font-bold ${
                        scheduleMode === "annual"
                          ? "text-black"
                          : "text-blue-600"
                      }`}
                    >
                      Annual
                    </button>

                  </div>

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

                      {(scheduleMode === "monthly"
                        ? amortizationSchedule.slice(0, 12)
                        : amortizationSchedule
                            .filter(
                              (_, index) =>
                                index % 12 === 0
                            )
                            .slice(0, loanTerm)
                      ).map((row, index) => (

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
            Mortgage Payment Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Based on a home price of
            <strong> ${homePrice.toLocaleString()}</strong>,
            your estimated monthly mortgage payment is
            <strong> ${monthlyPayment.toFixed(2)}</strong>.

          </p>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Cost Breakdown
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
                  Principal
                </div>

                <div className="text-2xl font-black">
                  ${loanAmount.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
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
            Mortgage Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              M = P × [ r(1+r)^n ] / [ (1+r)^n − 1 ]
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                How is mortgage calculated?
              </h3>

              <p className="text-slate-700 leading-8">
                Mortgage payments depend on
                loan amount, interest rate,
                and repayment term.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Can I reduce my payment?
              </h3>

              <p className="text-slate-700 leading-8">
                Larger down payments and
                lower interest rates reduce
                monthly costs.
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

            <a
              href="/auto-loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Auto Loan Calculator
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

  