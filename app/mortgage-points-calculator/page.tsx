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

export default function MortgagePointsCalculator() {

  const [loanAmount, setLoanAmount] =
    useState(400000)

  const [interestRate, setInterestRate] =
    useState(6.5)

  const [loanTerm, setLoanTerm] =
    useState(30)

  const [pointsPurchased, setPointsPurchased] =
    useState(2)

  const pointCost =
    loanAmount * (pointsPurchased / 100)

  const reducedRate =
    interestRate - (pointsPurchased * 0.25)

  const originalMonthlyRate =
    interestRate / 100 / 12

  const reducedMonthlyRate =
    reducedRate / 100 / 12

  const totalPayments =
    loanTerm * 12

  const originalPayment =
    (
      loanAmount *
      originalMonthlyRate *
      Math.pow(
        1 + originalMonthlyRate,
        totalPayments
      )
    ) /
    (
      Math.pow(
        1 + originalMonthlyRate,
        totalPayments
      ) - 1
    )

  const reducedPayment =
    (
      loanAmount *
      reducedMonthlyRate *
      Math.pow(
        1 + reducedMonthlyRate,
        totalPayments
      )
    ) /
    (
      Math.pow(
        1 + reducedMonthlyRate,
        totalPayments
      ) - 1
    )

  const monthlySavings =
    originalPayment - reducedPayment

  const lifetimeSavings =
    monthlySavings * totalPayments

  const breakEvenMonths =
    pointCost / monthlySavings

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
        balance * reducedMonthlyRate

      const principal =
        reducedPayment - interest

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
    reducedMonthlyRate,
    reducedPayment,
    totalPayments,
  ])

  const pieData = [
    {
      name: "Point Cost",
      value: pointCost,
    },
    {
      name: "Lifetime Savings",
      value: lifetimeSavings,
    },
  ]

  const compareData = [
    {
      name: "Original Payment",
      value: originalPayment,
    },
    {
      name: "Reduced Payment",
      value: reducedPayment,
    },
  ]

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Mortgage Points Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate mortgage points costs,
              reduced interest rates,
              and long-term interest savings.
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

                <InputField
                  label="Mortgage Points"
                  value={pointsPurchased}
                  setValue={setPointsPurchased}
                />

              </div>

            </div>

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Savings
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlySavings.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Mortgage Points Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Points Cost"
                    value={`$${pointCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Reduced Rate"
                    value={`${reducedRate.toFixed(2)}%`}
                  />

                  <SummaryRow
                    label="Lifetime Savings"
                    value={`$${lifetimeSavings.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Break Even"
                    value={`${breakEvenMonths.toFixed(0)} Months`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Mortgage Points Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              Mortgage points are upfront fees paid to lenders
              in exchange for reduced mortgage interest rates.
              These points are commonly referred to as discount points
              because they lower long-term borrowing costs.
              Each mortgage point generally equals 1%
              of the total loan amount.
            </p>

            <p>
              Homebuyers often purchase mortgage points
              to reduce monthly mortgage payments
              and save money over the life of the loan.
              Mortgage points may be beneficial for borrowers
              planning to stay in a property for many years.
            </p>

            <p>
              A mortgage points calculator helps estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Total upfront mortgage points costs</li>

              <li>Potential monthly payment reductions</li>

              <li>Interest savings over the loan term</li>

              <li>Break-even periods for points purchases</li>

              <li>Long-term mortgage affordability</li>

            </ul>

            <p>
              Mortgage points are commonly used
              in fixed-rate mortgage loans,
              refinance loans,
              jumbo mortgages,
              and investment property financing.
            </p>

            <p>
              For example,
              purchasing 2 mortgage points
              on a $400,000 mortgage loan
              may cost approximately $8,000 upfront.
              However,
              the lower interest rate could reduce
              monthly payments
              and save tens of thousands of dollars
              throughout the loan term.
            </p>

            <p>
              Borrowers should compare upfront costs
              against long-term savings.
              If a homeowner sells or refinances the property
              before reaching the break-even point,
              purchasing mortgage points may not provide
              maximum financial benefit.
            </p>

            <p>
              Mortgage points may also offer tax advantages
              in certain situations.
              Some borrowers may deduct eligible points
              as mortgage interest expenses,
              depending on local tax laws
              and property financing conditions.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Points Cost vs Savings
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

                <div className="text-slate-500 mb-1">
                  Points Cost
                </div>

                <div className="text-2xl font-black">
                  ${pointCost.toFixed(0)}
                </div>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="text-slate-500 mb-1">
                  Estimated Savings
                </div>

                <div className="text-2xl font-black">
                  ${lifetimeSavings.toFixed(0)}
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
            Monthly Payment Comparison
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
            Mortgage Points Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Mortgage Points Cost = Loan Amount × Points Percentage
            </p>

          </div>

          <div className="mt-6 space-y-4 text-slate-700 leading-8">

            <p>
              Points Cost = Total upfront payment for discount points
            </p>

            <p>
              Loan Amount = Mortgage principal balance
            </p>

            <p>
              Points Percentage = Number of purchased points
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Mortgage Points Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A homeowner financing a $400,000 property
              may choose to purchase 2 mortgage points
              for approximately $8,000.
            </p>

            <p>
              If the mortgage rate decreases
              from 6.5% to 6.0%,
              monthly mortgage payments
              may decrease substantially.
            </p>

            <p>
              Over a 30-year mortgage term,
              long-term savings could exceed
              ${lifetimeSavings.toFixed(0)},
              depending on repayment schedules
              and market conditions.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Points FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What are mortgage points?
              </h3>

              <p>
                Mortgage points are upfront fees paid to lenders
                to reduce mortgage interest rates
                and lower long-term borrowing costs.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How much does one mortgage point cost?
              </h3>

              <p>
                One mortgage point typically equals
                1% of the total mortgage loan amount.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are mortgage points worth it?
              </h3>

              <p>
                Mortgage points may be beneficial
                for homeowners planning to keep
                their mortgage loans for many years.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a break-even period?
              </h3>

              <p>
                The break-even period measures
                how long monthly savings take
                to recover upfront mortgage points costs.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can mortgage points reduce monthly payments?
              </h3>

              <p>
                Yes.
                Purchasing mortgage points may lower interest rates
                and reduce monthly mortgage payments.
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
              href="/mortgage-interest-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Interest Calculator
            </a>

            <a
              href="/mortgage-payoff-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Payoff Calculator
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
            suffix ? "pr-24" : ""
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
  value: string
}) {

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