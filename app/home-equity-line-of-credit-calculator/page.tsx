"use client"

import { useState } from "react"

export default function HomeEquityLineOfCreditCalculator() {

  const [creditLimit, setCreditLimit] =
    useState(150000)

  const [borrowedAmount, setBorrowedAmount] =
    useState(80000)

  const [interestRate, setInterestRate] =
    useState(8)

  const monthlyInterest =
    borrowedAmount *
    (interestRate / 100 / 12)

  const annualInterest =
    monthlyInterest * 12

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-8">

            <h1 className="text-5xl font-black mb-4">
              Home Equity Line of Credit Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Estimate HELOC payments,
              credit line borrowing costs,
              and home equity usage.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 space-y-5">

              <InputField
                label="Credit Limit"
                value={creditLimit}
                setValue={setCreditLimit}
                prefix="$"
              />

              <InputField
                label="Borrowed Amount"
                value={borrowedAmount}
                setValue={setBorrowedAmount}
                prefix="$"
              />

              <InputField
                label="Interest Rate"
                value={interestRate}
                setValue={setInterestRate}
                suffix="%"
              />

            </div>

            <div className="bg-slate-50 p-8">

              <div className="bg-blue-600 text-white rounded-3xl p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Interest
                </p>

                <h2 className="text-5xl font-black">
                  ${monthlyInterest.toFixed(0)}
                </h2>

              </div>

              <div className="space-y-4">

                <SummaryCard
                  title="Annual Interest"
                  value={`$${annualInterest.toFixed(0)}`}
                />

                <SummaryCard
                  title="Available Credit"
                  value={`$${(
                    creditLimit - borrowedAmount
                  ).toFixed(0)}`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Explanation */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity Line of Credit Explanation
          </h2>

          <div className="space-y-6 text-slate-700 text-lg leading-8">

            <p>
              A home equity line of credit,
              commonly called a HELOC,
              allows homeowners to borrow money
              against available home equity.
              HELOCs function similarly to revolving credit lines,
              giving borrowers flexibility
              to withdraw funds when needed.
            </p>

            <p>
              Unlike traditional home equity loans,
              HELOCs typically use variable interest rates
              and flexible borrowing structures.
            </p>

            <p>
              Homeowners often use HELOCs for:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Home renovations</li>

              <li>Debt consolidation</li>

              <li>Emergency expenses</li>

              <li>Investment opportunities</li>

              <li>Large purchases</li>

            </ul>

            <p>
              A HELOC calculator estimates:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly interest costs</li>

              <li>Total borrowing expenses</li>

              <li>Available remaining credit</li>

              <li>Long-term repayment affordability</li>

            </ul>

            <p>
              HELOCs commonly include two phases:
              a draw period
              and a repayment period.
              During the draw period,
              borrowers may withdraw funds
              up to approved credit limits.
            </p>

            <p>
              During repayment periods,
              borrowers must repay principal balances
              and accumulated interest expenses.
            </p>

            <p>
              Because HELOC interest rates are usually variable,
              rising market rates
              may significantly increase borrowing costs over time.
            </p>

            <p>
              Responsible borrowing is important
              because homes secure HELOC loans.
              Failure to repay HELOC balances
              may increase foreclosure risks.
            </p>

          </div>

        </section>

        {/* Formula */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            HELOC Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 font-mono text-lg">

            Monthly Interest = Borrowed Amount × (Interest Rate ÷ 12)

          </div>

        </section>

        {/* FAQ */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            HELOC FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-lg">

            <div>

              <h3 className="font-black text-2xl mb-3">
                What is a HELOC?
              </h3>

              <p>
                A HELOC is a revolving line of credit
                secured by home equity.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Are HELOC interest rates fixed?
              </h3>

              <p>
                Most HELOCs use variable interest rates
                that may change over time.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                What can HELOC funds be used for?
              </h3>

              <p>
                HELOCs are commonly used
                for renovations,
                debt consolidation,
                and large financial expenses.
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