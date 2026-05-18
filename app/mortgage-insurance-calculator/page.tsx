"use client"

import { useState } from "react"

export default function MortgageInsuranceCalculator() {

  const [homePrice, setHomePrice] =
    useState(450000)

  const [downPayment, setDownPayment] =
    useState(10)

  const [loanTerm, setLoanTerm] =
    useState(30)

  const [pmiRate, setPmiRate] =
    useState(0.8)

  const loanAmount =
    homePrice *
    (1 - downPayment / 100)

  const annualPMI =
    loanAmount *
    (pmiRate / 100)

  const monthlyPMI =
    annualPMI / 12

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-8">

            <h1 className="text-5xl font-black mb-4">
              Mortgage Insurance Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Calculate PMI costs,
              mortgage insurance payments,
              and total home loan expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 space-y-5">

              <InputField
                label="Home Price"
                value={homePrice}
                setValue={setHomePrice}
                prefix="$"
              />

              <InputField
                label="Down Payment"
                value={downPayment}
                setValue={setDownPayment}
                suffix="%"
              />

              <InputField
                label="Loan Term"
                value={loanTerm}
                setValue={setLoanTerm}
                suffix=" years"
              />

              <InputField
                label="PMI Rate"
                value={pmiRate}
                setValue={setPmiRate}
                suffix="%"
              />

            </div>

            <div className="bg-slate-50 p-8">

              <div className="bg-blue-600 text-white rounded-3xl p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly PMI Payment
                </p>

                <h2 className="text-5xl font-black">
                  ${monthlyPMI.toFixed(0)}
                </h2>

              </div>

              <div className="space-y-4">

                <SummaryCard
                  title="Loan Amount"
                  value={`$${loanAmount.toFixed(0)}`}
                />

                <SummaryCard
                  title="Annual PMI"
                  value={`$${annualPMI.toFixed(0)}`}
                />

                <SummaryCard
                  title="Monthly PMI"
                  value={`$${monthlyPMI.toFixed(0)}`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Explanation */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Mortgage Insurance Explanation
          </h2>

          <div className="space-y-6 text-slate-700 text-lg leading-8">

            <p>
              Mortgage insurance protects lenders
              when borrowers make smaller down payments.
              Private mortgage insurance,
              commonly called PMI,
              is usually required
              when homebuyers provide less than 20%
              down payment on conventional mortgage loans.
            </p>

            <p>
              Mortgage insurance costs vary depending on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Loan amount</li>

              <li>Credit score</li>

              <li>Down payment percentage</li>

              <li>Mortgage term length</li>

              <li>Property type</li>

            </ul>

            <p>
              A mortgage insurance calculator helps estimate
              monthly PMI payments
              and total borrowing costs.
              Mortgage insurance may significantly affect
              monthly housing expenses,
              especially for first-time homebuyers.
            </p>

            <p>
              Many homeowners remove PMI
              once loan balances fall below
              80% of the home value.
              Additional principal payments
              may accelerate PMI cancellation
              and reduce total housing costs.
            </p>

            <p>
              FHA loans may require mortgage insurance premiums
              throughout the loan term,
              while conventional loans
              often allow automatic PMI removal.
            </p>

          </div>

        </section>

        {/* Formula */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Mortgage Insurance Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 font-mono text-lg">

            Annual PMI = Loan Amount × PMI Rate

          </div>

        </section>

        {/* FAQ */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Mortgage Insurance FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-lg">

            <div>

              <h3 className="font-black text-2xl mb-3">
                What is PMI?
              </h3>

              <p>
                PMI stands for private mortgage insurance.
                It protects lenders when borrowers
                make smaller down payments.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Can PMI be removed?
              </h3>

              <p>
                Yes.
                Many conventional loans
                allow PMI removal
                once home equity reaches 20%.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Does PMI increase monthly payments?
              </h3>

              <p>
                Yes.
                Mortgage insurance is usually added
                to monthly mortgage costs.
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

      <p className="text-slate-700 mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-black">
        {value}
      </h3>

    </div>

  )
}