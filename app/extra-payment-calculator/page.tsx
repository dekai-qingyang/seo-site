"use client"

import { useMemo, useState } from "react"

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function ExtraPaymentCalculator() {

  const [loanAmount, setLoanAmount] = useState(300000)

  const [interestRate, setInterestRate] = useState(6)

  const [loanTerm, setLoanTerm] = useState(30)

  const [extraPayment, setExtraPayment] = useState(300)

  const monthlyRate =
    interestRate / 100 / 12

  const totalPayments =
    loanTerm * 12

  const regularPayment =
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

  const newMonthlyPayment =
    regularPayment + extraPayment

  let balance =
    loanAmount

  let months =
    0

  let totalInterestPaid =
    0

  while (
    balance > 0 &&
    months < 1000
  ) {

    const interest =
      balance * monthlyRate

    const principal =
      newMonthlyPayment - interest

    balance -= principal

    totalInterestPaid += interest

    months++
  }

  const yearsSaved =
    (
      totalPayments - months
    ) / 12

  const originalInterest =
    (regularPayment * totalPayments)
    - loanAmount

  const interestSavings =
    originalInterest -
    totalInterestPaid

  const chartData = [
    {
      name: "Original Interest",
      value: originalInterest,
    },
    {
      name: "Interest Saved",
      value: interestSavings,
    },
  ]

  const payoffData = useMemo(() => {

    const rows = []

    let balance =
      loanAmount

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
          newMonthlyPayment - interest

        balance -= principal

        if (balance <= 0) {
          balance = 0
          break
        }
      }

      rows.push({
        year,
        balance,
      })

      if (balance <= 0) {
        break
      }
    }

    return rows

  }, [
    loanAmount,
    loanTerm,
    monthlyRate,
    newMonthlyPayment,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Extra Payment Calculator
            </h1>

            <p className="text-red-100 text-sm lg:text-lg">
              Calculate mortgage savings,
              faster loan payoff,
              and interest reduction with extra monthly payments.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Loan Amount"
                  value={loanAmount}
                  setValue={setLoanAmount}
                  prefix="$"
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

                <InputField
                  label="Extra Monthly Payment"
                  value={extraPayment}
                  setValue={setExtraPayment}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-red-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-red-100 mb-2">
                  Interest Savings
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${interestSavings.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Savings Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Regular Payment"
                    value={regularPayment}
                  />

                  <SummaryRow
                    label="New Monthly Payment"
                    value={newMonthlyPayment}
                  />

                  <SummaryRow
                    label="Years Saved"
                    value={yearsSaved}
                    suffix=" years"
                    isCurrency={false}
                  />

                  <SummaryRow
                    label="Interest Saved"
                    value={interestSavings}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Extra Payment Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Adding an extra monthly payment of
            <strong> ${extraPayment}</strong>
            toward a
            <strong> ${loanAmount.toLocaleString()}</strong>
            loan at
            <strong> {interestRate}%</strong>
            interest could save approximately
            <strong> ${interestSavings.toFixed(0)}</strong>
            in total interest and reduce the loan payoff timeline by
            <strong> {yearsSaved.toFixed(1)} years</strong>.

          </p>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Interest Savings Breakdown
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

                    <Cell fill="#dc2626" />
                    <Cell fill="#fdba74" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <div className="bg-red-50 rounded-2xl p-5">

                <div className="text-slate-700 mb-1">
                  Original Interest
                </div>

                <div className="text-2xl font-black">
                  ${originalInterest.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-700 mb-1">
                  Interest Saved
                </div>

                <div className="text-2xl font-black">
                  ${interestSavings.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Loan Payoff Chart
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={payoffData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#dc2626"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Extra Payment Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              New Payment = Regular Payment + Extra Payment
            </p>

          </div>

        </div>

        {/* EXAMPLE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Extra Payment Example
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Adding an extra
            $300 monthly payment
            toward a 30-year mortgage
            can significantly reduce interest costs
            and shorten the loan payoff timeline.

          </p>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Extra Payment Calculator FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                Do extra payments reduce interest?
              </h3>

              <p className="text-slate-700 leading-8">
                Yes. Extra payments reduce loan principal faster,
                lowering future interest charges.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Can I pay off my mortgage early?
              </h3>

              <p className="text-slate-700 leading-8">
                Extra payments can significantly shorten
                mortgage payoff timelines and reduce total costs.
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
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
            </a>

            <a
              href="/amortization-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Amortization Calculator
            </a>

            <a
              href="/refinance-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Refinance Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
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