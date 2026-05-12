"use client"

import { useMemo, useState } from "react"

export default function RefinanceCalculator() {

  const [currentBalance, setCurrentBalance] = useState(350000)

  const [currentRate, setCurrentRate] = useState(7.2)

  const [newRate, setNewRate] = useState(5.8)

  const [remainingTerm, setRemainingTerm] = useState(25)

  const [closingCosts, setClosingCosts] = useState(5000)

  const currentMonthlyRate = currentRate / 100 / 12

  const newMonthlyRate = newRate / 100 / 12

  const totalPayments = remainingTerm * 12

  const currentPayment =
    currentBalance *
    (currentMonthlyRate *
      Math.pow(1 + currentMonthlyRate, totalPayments)) /
    (Math.pow(1 + currentMonthlyRate, totalPayments) - 1)

  const newPayment =
    currentBalance *
    (newMonthlyRate *
      Math.pow(1 + newMonthlyRate, totalPayments)) /
    (Math.pow(1 + newMonthlyRate, totalPayments) - 1)

  const monthlySavings =
    currentPayment - newPayment

  const lifetimeSavings =
    monthlySavings * totalPayments - closingCosts

  const breakEvenMonths =
    closingCosts / monthlySavings

  const refinanceReport = useMemo(() => {

    let balance = currentBalance

    const rows = []

    for (let i = 1; i <= totalPayments; i++) {

      const interest = balance * newMonthlyRate

      const principal = newPayment - interest

      balance -= principal

      rows.push({
        payment: i,
        interest,
        principal,
        balance: balance > 0 ? balance : 0,
      })
    }

    return rows

  }, [
    currentBalance,
    newMonthlyRate,
    newPayment,
    totalPayments,
  ])

  return (
    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          {/* HERO */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-2 lg:mb-4">
              Refinance Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg leading-7">
              Estimate refinancing savings, monthly payments,
              break-even points, and long-term mortgage costs.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Current Loan Balance"
                  value={currentBalance}
                  setValue={setCurrentBalance}
                  prefix="$"
                />

                <InputField
                  label="Current Interest Rate"
                  value={currentRate}
                  setValue={setCurrentRate}
                  suffix="%"
                />

                <InputField
                  label="New Interest Rate"
                  value={newRate}
                  setValue={setNewRate}
                  suffix="%"
                />

                <InputField
                  label="Remaining Loan Term"
                  value={remainingTerm}
                  setValue={setRemainingTerm}
                  suffix="Years"
                />

                <InputField
                  label="Closing Costs"
                  value={closingCosts}
                  setValue={setClosingCosts}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              {/* RESULT */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-5 lg:mb-8">

                <p className="text-blue-100 text-sm lg:text-lg mb-2">
                  Estimated Monthly Savings
                </p>

                <h2 className="text-3xl lg:text-5xl font-black break-all">
                  ${monthlySavings.toFixed(2)}
                </h2>

              </div>

              {/* SUMMARY */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-5 lg:mb-8">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Refinance Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Current Payment"
                    value={currentPayment}
                  />

                  <SummaryRow
                    label="New Payment"
                    value={newPayment}
                  />

                  <SummaryRow
                    label="Monthly Savings"
                    value={monthlySavings}
                  />

                  <SummaryRow
                    label="Lifetime Savings"
                    value={lifetimeSavings}
                  />

                  <SummaryRow
                    label="Break-even Point"
                    value={breakEvenMonths}
                    suffix=" months"
                  />

                </div>

              </div>

              {/* REPORT */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Refinance Report
                  </h3>

                </div>

                {/* MOBILE */}

                <div className="block lg:hidden divide-y divide-slate-200">

                  {refinanceReport.slice(0, 12).map((row, index) => (

                    <div
                      key={index}
                      className="p-4"
                    >

                      <div className="flex justify-between items-center mb-3">

                        <div className="font-bold text-lg">
                          Payment {index + 1}
                        </div>

                        <div className="text-sm text-slate-500">
                          Month
                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="bg-slate-50 rounded-2xl p-3">

                          <div className="text-slate-500 mb-1">
                            Interest
                          </div>

                          <div className="font-bold">
                            ${row.interest.toFixed(0)}
                          </div>

                        </div>

                        <div className="bg-slate-50 rounded-2xl p-3">

                          <div className="text-slate-500 mb-1">
                            Principal
                          </div>

                          <div className="font-bold">
                            ${row.principal.toFixed(0)}
                          </div>

                        </div>

                        <div className="bg-blue-50 rounded-2xl p-3 col-span-2">

                          <div className="text-slate-500 mb-1">
                            Remaining Balance
                          </div>

                          <div className="font-black text-lg">
                            ${row.balance.toFixed(0)}
                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* DESKTOP */}

                <div className="hidden lg:block overflow-x-auto">

                  <table className="w-full text-left">

                    <thead className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">

                      <tr>

                        <th className="py-4 px-4 text-lg font-bold">
                          Payment
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Interest
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Principal
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Balance
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {refinanceReport.slice(0, 12).map((row, index) => (

                        <tr
                          key={index}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >

                          <td className="py-4 px-4 font-semibold">
                            {index + 1}
                          </td>

                          <td className="py-4 px-4">
                            ${row.interest.toFixed(2)}
                          </td>

                          <td className="py-4 px-4">
                            ${row.principal.toFixed(2)}
                          </td>

                          <td className="py-4 px-4 font-bold">
                            ${row.balance.toFixed(2)}
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

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-10 mt-6 lg:mt-10">

          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            Understanding Mortgage Refinancing
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-base lg:text-lg">

            <p>
              Mortgage refinancing replaces an existing home loan
              with a new mortgage that usually offers a lower
              interest rate or improved loan terms.
            </p>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Why Refinance a Mortgage?
              </h3>

              <p>
                Homeowners refinance to reduce monthly payments,
                lower total interest costs, shorten loan terms,
                or access home equity.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                How Refinance Savings Work
              </h3>

              <p>
                Lower interest rates can reduce monthly mortgage
                payments and save thousands of dollars over the
                life of the loan.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Break-even Point
              </h3>

              <p>
                The refinance break-even point measures how long
                it takes for monthly savings to recover refinancing
                closing costs.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Frequently Asked Questions
              </h3>

              <div className="space-y-5">

                <div>

                  <h4 className="font-bold text-xl mb-2 text-black">
                    Is refinancing worth it?
                  </h4>

                  <p>
                    Refinancing may be worthwhile if savings exceed
                    closing costs and homeowners plan to stay long enough
                    to reach the break-even point.
                  </p>

                </div>

                <div>

                  <h4 className="font-bold text-xl mb-2 text-black">
                    Does refinancing hurt credit scores?
                  </h4>

                  <p>
                    Refinancing may temporarily lower credit scores
                    due to hard credit inquiries, but long-term impacts
                    are usually minimal.
                  </p>

                </div>

              </div>

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
          onChange={(e) => setValue(Number(e.target.value))}
          className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            prefix ? "pl-9" : ""
          } ${
            suffix ? "pr-20" : ""
          }`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
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
}: {
  label: string
  value: number
  suffix?: string
}) {
  return (

    <div className="px-4 lg:px-6 py-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1">

        <span className="text-slate-500 text-sm lg:text-base">
          {label}
        </span>

        <span className="font-bold text-base lg:text-lg break-all">

          {suffix
            ? `${value.toFixed(0)}${suffix}`
            : `$${value.toFixed(2)}`}

        </span>

      </div>

    </div>

  )
}