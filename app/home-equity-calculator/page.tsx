"use client"

import { useState } from "react"

export default function HomeEquityCalculator() {

  const [homeValue, setHomeValue] =
    useState(650000)

  const [mortgageBalance, setMortgageBalance] =
    useState(320000)

  const homeEquity =
    homeValue - mortgageBalance

  const equityPercentage =
    (homeEquity / homeValue) * 100

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-8">

            <h1 className="text-5xl font-black mb-4">
              Home Equity Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Estimate home equity value,
              mortgage balances,
              and property ownership percentages.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 space-y-5">

              <InputField
                label="Current Home Value"
                value={homeValue}
                setValue={setHomeValue}
                prefix="$"
              />

              <InputField
                label="Remaining Mortgage Balance"
                value={mortgageBalance}
                setValue={setMortgageBalance}
                prefix="$"
              />

            </div>

            <div className="bg-slate-50 p-8">

              <div className="bg-blue-600 text-white rounded-3xl p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Home Equity
                </p>

                <h2 className="text-5xl font-black">
                  ${homeEquity.toFixed(0)}
                </h2>

              </div>

              <div className="space-y-4">

                <SummaryCard
                  title="Equity Percentage"
                  value={`${equityPercentage.toFixed(1)}%`}
                />

                <SummaryCard
                  title="Mortgage Balance"
                  value={`$${mortgageBalance.toFixed(0)}`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Explanation */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity Explanation
          </h2>

          <div className="space-y-6 text-slate-700 text-lg leading-8">

            <p>
              Home equity represents the portion
              of a property's value
              that homeowners truly own.
              Equity increases as mortgage balances decrease
              or property values rise over time.
            </p>

            <p>
              A home equity calculator estimates
              current ownership value
              by subtracting remaining mortgage balances
              from estimated property value.
            </p>

            <p>
              Home equity is important because
              it affects:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Refinancing eligibility</li>

              <li>HELOC borrowing limits</li>

              <li>Home equity loans</li>

              <li>Mortgage insurance removal</li>

              <li>Net worth calculations</li>

            </ul>

            <p>
              Homeowners build equity
              through monthly mortgage payments,
              property appreciation,
              renovations,
              and additional principal payments.
            </p>

            <p>
              Strong home equity positions
              may provide financial flexibility,
              lower borrowing risks,
              and increased property wealth.
            </p>

            <p>
              Real estate markets significantly impact equity.
              Rising home values may rapidly increase equity,
              while declining markets may reduce ownership value.
            </p>

            <p>
              Mortgage lenders often require
              minimum equity percentages
              before approving refinancing
              or home equity credit lines.
            </p>

          </div>

        </section>

        {/* Formula */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 font-mono text-lg">

            Home Equity = Home Value − Mortgage Balance

          </div>

        </section>

        {/* FAQ */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-lg">

            <div>

              <h3 className="font-black text-2xl mb-3">
                What is home equity?
              </h3>

              <p>
                Home equity is the difference
                between property value
                and remaining mortgage debt.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                How do homeowners build equity?
              </h3>

              <p>
                Equity grows through mortgage payments,
                home appreciation,
                and additional principal payments.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Can home equity be borrowed?
              </h3>

              <p>
                Yes.
                Homeowners may access equity
                through HELOCs,
                home equity loans,
                or cash-out refinancing.
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
}: any) {

  return (

    <div>

      <label className="block font-semibold mb-2">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          {prefix}
        </span>

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className="w-full border rounded-2xl py-3 pl-8 pr-4"
        />

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