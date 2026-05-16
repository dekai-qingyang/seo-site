"use client"

import { useState } from "react"

export default function HomeEquityLoanCalculator() {

  const [loanAmount, setLoanAmount] =
    useState(120000)

  const [interestRate, setInterestRate] =
    useState(7.5)

  const [loanTerm, setLoanTerm] =
    useState(15)

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

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-8">

            <h1 className="text-5xl font-black mb-4">
              Home Equity Loan Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Calculate home equity loan payments,
              borrowing costs,
              and repayment schedules.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 space-y-5">

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

            <div className="bg-slate-50 p-8">

              <div className="bg-blue-600 text-white rounded-3xl p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Payment
                </p>

                <h2 className="text-5xl font-black">
                  ${monthlyPayment.toFixed(0)}
                </h2>

              </div>

              <div className="space-y-4">

                <SummaryCard
                  title="Total Interest"
                  value={`$${totalInterest.toFixed(0)}`}
                />

                <SummaryCard
                  title="Total Paid"
                  value={`$${totalPaid.toFixed(0)}`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Explanation */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity Loan Explanation
          </h2>

          <div className="space-y-6 text-slate-700 text-lg leading-8">

            <p>
              A home equity loan allows homeowners
              to borrow money
              using home equity as collateral.
              These loans usually provide fixed interest rates
              and predictable monthly payments.
            </p>

            <p>
              Home equity loans are commonly used for:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Home renovations</li>

              <li>Debt consolidation</li>

              <li>Emergency expenses</li>

              <li>Education costs</li>

              <li>Large purchases</li>

            </ul>

            <p>
              A home equity loan calculator estimates:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly loan payments</li>

              <li>Total interest expenses</li>

              <li>Total repayment costs</li>

              <li>Long-term borrowing affordability</li>

            </ul>

            <p>
              Lenders typically require
              minimum home equity levels
              and strong credit profiles
              before approving home equity loans.
            </p>

            <p>
              Borrowers should carefully compare
              home equity loans,
              HELOCs,
              and cash-out refinancing options
              before borrowing against property equity.
            </p>

            <p>
              Because homes secure these loans,
              missed payments may increase foreclosure risks.
              Responsible borrowing
              and long-term repayment planning
              are important for financial stability.
            </p>

          </div>

        </section>

        {/* Formula */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity Loan Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 font-mono text-lg">

            M = P × r × (1 + r)^n / ((1 + r)^n − 1)

          </div>

        </section>

        {/* FAQ */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity Loan FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-lg">

            <div>

              <h3 className="font-black text-2xl mb-3">
                What is a home equity loan?
              </h3>

              <p>
                A home equity loan allows homeowners
                to borrow money
                using home equity as collateral.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Are home equity loans fixed-rate?
              </h3>

              <p>
                Many home equity loans
                use fixed interest rates
                and fixed monthly payments.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                What are home equity loans used for?
              </h3>

              <p>
                Common uses include renovations,
                debt consolidation,
                and emergency expenses.
              </p>

            </div>

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
}: any) {

  return (

    <div>

      <label className="block font-semibold mb-2">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className="w-full border rounded-2xl py-3 px-4"
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {suffix}
          </span>
        )}

      </div>

    </div>

  )
}

function SummaryCard({
  title,
  value,
}: any) {

  return (

    <div className="bg-white rounded-2xl border p-5">

      <p className="text-slate-500 mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-black">
        {value}
      </h3>

    </div>

  )
}