"use client"

import { useState } from "react"

export default function PropertyTaxCalculator() {

  const [homeValue, setHomeValue] =
    useState(500000)

  const [taxRate, setTaxRate] =
    useState(1.2)

  const annualTax =
    homeValue *
    (taxRate / 100)

  const monthlyTax =
    annualTax / 12

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-8">

            <h1 className="text-5xl font-black mb-4">
              Property Tax Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Estimate annual property taxes,
              monthly tax payments,
              and homeownership expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 space-y-5">

              <InputField
                label="Home Value"
                value={homeValue}
                setValue={setHomeValue}
                prefix="$"
              />

              <InputField
                label="Property Tax Rate"
                value={taxRate}
                setValue={setTaxRate}
                suffix="%"
              />

            </div>

            <div className="bg-slate-50 p-8">

              <div className="bg-blue-600 text-white rounded-3xl p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Annual Property Tax
                </p>

                <h2 className="text-5xl font-black">
                  ${annualTax.toFixed(0)}
                </h2>

              </div>

              <div className="space-y-4">

                <SummaryCard
                  title="Monthly Tax"
                  value={`$${monthlyTax.toFixed(0)}`}
                />

                <SummaryCard
                  title="Tax Rate"
                  value={`${taxRate}%`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Explanation */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Property Tax Explanation
          </h2>

          <div className="space-y-6 text-slate-700 text-lg leading-8">

            <p>
              Property taxes are recurring taxes
              charged by local governments
              based on real estate value.
              These taxes help fund schools,
              public infrastructure,
              emergency services,
              and local government operations.
            </p>

            <p>
              Property tax rates vary widely
              depending on location,
              home value,
              local tax laws,
              and municipality budgets.
            </p>

            <p>
              A property tax calculator estimates:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Annual property taxes</li>

              <li>Monthly tax obligations</li>

              <li>Total homeownership expenses</li>

              <li>Housing affordability</li>

            </ul>

            <p>
              Property taxes are usually included
              in escrow mortgage payments.
              Lenders often collect monthly property tax amounts
              together with principal and interest payments.
            </p>

            <p>
              Rising property values
              may increase annual property taxes.
              Homeowners should review local tax assessments
              regularly
              and understand possible exemptions
              or deductions available in their region.
            </p>

          </div>

        </section>

        {/* Formula */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Property Tax Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 font-mono text-lg">

            Property Tax = Home Value × Tax Rate

          </div>

        </section>

        {/* FAQ */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Property Tax FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-lg">

            <div>

              <h3 className="font-black text-2xl mb-3">
                What are property taxes?
              </h3>

              <p>
                Property taxes are local government taxes
                based on real estate value.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Are property taxes included in mortgages?
              </h3>

              <p>
                Many mortgage lenders
                include property taxes
                in monthly escrow payments.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Why do property taxes change?
              </h3>

              <p>
                Property values,
                local budgets,
                and assessment changes
                may increase or decrease property taxes.
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