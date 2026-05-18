"use client"

import { useMemo, useState } from "react"

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

export default function MortgageInterestCalculator() {

  const [loanAmount, setLoanAmount] =
    useState(400000)

  const [interestRate, setInterestRate] =
    useState(6.5)

  const [loanTerm, setLoanTerm] =
    useState(30)

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

  const totalPaid =
    monthlyPayment * totalPayments

  const totalInterest =
    totalPaid - loanAmount

  const payoffData = useMemo(() => {

    const rows = []

    let balance =
      loanAmount

    for (
      let month = 1;
      month <= totalPayments;
      month++
    ) {

      const interest =
        balance * monthlyRate

      const principal =
        monthlyPayment - interest

      balance -= principal

      if (balance < 0) {
        balance = 0
      }

      rows.push({
        month,
        balance,
      })

    }

    return rows

  }, [
    loanAmount,
    monthlyRate,
    totalPayments,
    monthlyPayment,
  ])

  const pieData = [
    {
      name: "Principal",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const compareData = [
    {
      name: "Loan",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Mortgage Interest Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Calculate mortgage interest payments,
              total borrowing costs,
              and long-term home loan expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

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
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix=" years"
                />

              </div>

            </div>

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Mortgage Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Paid"
                    value={`$${totalPaid.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={`$${monthlyPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Loan Amount"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Mortgage Interest Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              Mortgage interest is the cost borrowers pay lenders
              for financing a home purchase.
              Mortgage loans typically include both principal and interest payments,
              which are combined into a fixed monthly payment schedule.
              Interest expenses may vary significantly depending on loan amount,
              interest rate,
              repayment term,
              and loan structure.
            </p>

            <p>
              A mortgage interest calculator helps homeowners estimate
              how much interest will accumulate throughout the loan term.
              Understanding interest costs is important because mortgage interest
              often represents one of the largest financial expenses
              associated with homeownership.
            </p>

            <p>
              Interest rates directly impact monthly mortgage payments.
              Even a small increase in interest rate percentages
              may dramatically raise long-term borrowing costs.
              For example,
              a mortgage rate increase from 5% to 6.5%
              may increase lifetime interest expenses by tens of thousands of dollars.
            </p>

            <p>
              Mortgage interest calculations are commonly used by:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Homebuyers comparing mortgage offers</li>
              <li>Homeowners considering refinancing options</li>
              <li>Real estate investors evaluating financing costs</li>
              <li>Borrowers planning early repayment strategies</li>
              <li>Financial planners estimating housing expenses</li>

            </ul>

            <p>
              Most traditional mortgage loans use amortization schedules,
              where monthly payments remain relatively fixed over time.
              However,
              the balance between principal and interest changes gradually.
              Early mortgage payments typically contain higher interest portions,
              while later payments increasingly reduce principal balances.
            </p>

            <p>
              Homeowners may reduce total mortgage interest
              by making extra payments toward principal balances.
              Additional payments shorten repayment timelines
              and decrease overall borrowing costs.
              Refinancing to lower interest rates may also reduce
              long-term mortgage expenses.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Interest Breakdown
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
                  Total Interest
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
            Mortgage Balance Over Time
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={payoffData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Principal vs Interest
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
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Mortgage Interest Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              M = P × r × (1 + r)^n / ((1 + r)^n - 1)
            </p>

          </div>

          <div className="mt-6 space-y-4 text-slate-700 leading-8">

            <p>
              M = Monthly mortgage payment
            </p>

            <p>
              P = Loan principal amount
            </p>

            <p>
              r = Monthly interest rate
            </p>

            <p>
              n = Total number of monthly payments
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Mortgage Interest Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A homeowner borrowing $400,000
              with a 6.5% fixed mortgage rate
              over 30 years
              may pay approximately
              ${monthlyPayment.toFixed(0)}
              per month.
            </p>

            <p>
              Over the full loan term,
              total mortgage payments may exceed
              ${totalPaid.toFixed(0)},
              including roughly
              ${totalInterest.toFixed(0)}
              in interest expenses.
            </p>

            <p>
              This example demonstrates how mortgage interest
              significantly increases long-term homeownership costs.
              Lower interest rates,
              shorter repayment terms,
              and additional principal payments
              may substantially reduce borrowing expenses.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Interest FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is mortgage interest?
              </h3>

              <p>
                Mortgage interest is the fee lenders charge borrowers
                for financing real estate purchases.
                Interest is typically calculated as a percentage
                of the remaining loan balance.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Why are early mortgage payments mostly interest?
              </h3>

              <p>
                Mortgage amortization schedules prioritize interest payments
                during the early loan years because balances remain highest.
                Over time,
                principal payments gradually increase
                while interest costs decrease.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How can I reduce mortgage interest costs?
              </h3>

              <p>
                Homeowners may reduce mortgage interest
                by refinancing to lower rates,
                shortening loan terms,
                or making additional principal payments.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does loan term affect total interest?
              </h3>

              <p>
                Yes.
                Longer mortgage terms generally lower monthly payments
                but increase total interest expenses over time.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a fixed-rate mortgage?
              </h3>

              <p>
                A fixed-rate mortgage maintains the same interest rate
                throughout the loan term,
                resulting in predictable monthly payments.
              </p>

            </div>

          </div>

        </div>

        {/* RELATED TOOLS */}

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
              href="/mortgage-payoff-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Payoff Calculator
            </a>

            <a
              href="/amortization-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Amortization Calculator
            </a>

            <a
              href="/refinance-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Refinance Calculator
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
            suffix ? "pr-24" : ""
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
  value: string
}) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-700">
          {label}
        </span>

        <span className="font-bold">
          {value}
        </span>

      </div>

    </div>

  )
}