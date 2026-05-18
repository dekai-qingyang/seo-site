"use client"

import { useState } from "react"

export default function HELOCCalculator() {

  const [loanBalance, setLoanBalance] =
    useState(90000)

  const [interestRate, setInterestRate] =
    useState(7.5)

  const [repaymentYears, setRepaymentYears] =
    useState(15)

  const monthlyRate =
    interestRate / 100 / 12

  const totalPayments =
    repaymentYears * 12

  const monthlyPayment =
    (
      loanBalance *
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
    totalPaid - loanBalance

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-8">

            <h1 className="text-5xl font-black mb-4">
              HELOC Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Estimate HELOC payments,
              repayment schedules,
              and total borrowing costs.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 space-y-5">

              <InputField
                label="HELOC Balance"
                value={loanBalance}
                setValue={setLoanBalance}
                prefix="$"
              />

              <InputField
                label="Interest Rate"
                value={interestRate}
                setValue={setInterestRate}
                suffix="%"
              />

              <InputField
                label="Repayment Term"
                value={repaymentYears}
                setValue={setRepaymentYears}
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
            HELOC Explanation
          </h2>

          <div className="space-y-6 text-slate-700 text-lg leading-8">

            <p>
              A HELOC,
              or home equity line of credit,
              allows homeowners
              to access funds
              using home equity as collateral.
            </p>

            <p>
              HELOCs differ from traditional loans
              because borrowers may repeatedly access funds
              during approved draw periods.
            </p>

            <p>
              HELOC repayment schedules
              depend on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Borrowed balance</li>

              <li>Interest rates</li>

              <li>Repayment periods</li>

              <li>Variable market conditions</li>

            </ul>

            <p>
              HELOC calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly payments</li>

              <li>Total interest costs</li>

              <li>Repayment schedules</li>

              <li>Borrowing affordability</li>

            </ul>

            <p>
              HELOC interest rates
              often fluctuate with market conditions,
              which may increase repayment costs over time.
            </p>

            <p>
              Many homeowners use HELOCs
              for renovations,
              investments,
              tuition,
              or emergency financial needs.
            </p>

            <p>
              Because HELOCs are secured by homes,
              responsible repayment planning is essential
              to reduce financial risks.
            </p>

          </div>

        </section>

        {/* Formula */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            HELOC Payment Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 font-mono text-lg">

            M = P × r × (1 + r)^n / ((1 + r)^n − 1)

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
                Are HELOC rates variable?
              </h3>

              <p>
                Yes.
                Most HELOCs use variable interest rates.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                What are HELOCs used for?
              </h3>

              <p>
                HELOCs are often used
                for renovations,
                investments,
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
          className="w-full border rounded-2xl py-3 pl-10 pr-10"
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

      <p className="text-slate-700 mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-black">
        {value}
      </h3>

    </div>

  )
}