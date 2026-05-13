"use client"

import { useMemo, useState } from "react"

export default function MortgageCalculator() {

  const [homePrice, setHomePrice] = useState(500000)
  const [downPaymentMode, setDownPaymentMode] = useState("$")
  const [downPayment, setDownPayment] = useState(20)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(6.5)
  const [startMonth, setStartMonth] = useState("January")
  const [startYear, setStartYear] = useState(2026)
  const [scheduleMode, setScheduleMode] = useState("monthly")

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = Array.from({ length: 30 }, (_, i) => 2025 + i)

  const actualDownPayment =
    downPaymentMode === "%"
      ? homePrice * (downPayment / 100)
      : downPayment

  const loanAmount = homePrice - actualDownPayment

  const monthlyInterest = interestRate / 100 / 12

  const totalPayments = loanTerm * 12

  const monthlyPayment =
    loanAmount *
    (monthlyInterest *
      Math.pow(1 + monthlyInterest, totalPayments)) /
    (Math.pow(1 + monthlyInterest, totalPayments) - 1)

  const amortizationSchedule = useMemo(() => {

    let balance = loanAmount

    const rows = []

    for (let i = 1; i <= totalPayments; i++) {

      const interest = balance * monthlyInterest

      const principal = monthlyPayment - interest

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
    loanAmount,
    monthlyInterest,
    monthlyPayment,
    totalPayments,
  ])

  return (
    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          {/* HERO */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-2 lg:mb-4 leading-tight">
              Mortgage Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Calculate mortgage payments, amortization schedules,
              and total home financing costs instantly.
            </p>

          </div>

          {/* BODY */}

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Home Price"
                  value={homePrice}
                  setValue={setHomePrice}
                  prefix="$"
                />

                {/* DOWN PAYMENT */}

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Down Payment
                  </label>

                  <div className="flex gap-2">

                    <div className="relative flex-1">

                      {downPaymentMode === "$" && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          $
                        </span>
                      )}

                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) =>
                          setDownPayment(Number(e.target.value))
                        }
                        className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          downPaymentMode === "$" ? "pl-9" : ""
                        }`}
                      />

                    </div>

                    <select
                      value={downPaymentMode}
                      onChange={(e) =>
                        setDownPaymentMode(e.target.value)
                      }
                      className="border border-slate-200 rounded-2xl px-3 bg-white shadow-sm font-semibold"
                    >
                      <option value="$">$</option>
                      <option value="%">%</option>
                    </select>

                  </div>

                </div>

                <InputField
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="Years"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                {/* START DATE */}

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Start Date
                  </label>

                  <div className="grid grid-cols-2 gap-2">

                    <select
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl py-3 px-3 bg-white shadow-sm text-sm"
                    >
                      {months.map((month) => (
                        <option key={month}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      value={startYear}
                      onChange={(e) =>
                        setStartYear(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 px-3 bg-white shadow-sm text-sm"
                    >
                      {years.map((year) => (
                        <option key={year}>
                          {year}
                        </option>
                      ))}
                    </select>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              {/* PAYMENT */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-5 lg:mb-8">

                <p className="text-blue-100 text-sm lg:text-lg mb-2">
                  Monthly Mortgage Payment
                </p>

                <h2 className="text-3xl lg:text-5xl font-black break-all">
                  ${monthlyPayment.toFixed(2)}
                </h2>

              </div>

              {/* SUMMARY */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-5 lg:mb-8">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Mortgage Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Home Price"
                    value={homePrice}
                  />

                  <SummaryRow
                    label="Down Payment"
                    value={actualDownPayment}
                  />

                  <SummaryRow
                    label="Loan Amount"
                    value={loanAmount}
                  />

                  <SummaryRow
                    label="Interest Rate"
                    value={interestRate}
                    suffix="%"
                  />

                  <SummaryRow
                    label="Loan Term"
                    value={loanTerm}
                    suffix=" years"
                  />

                </div>

              </div>

              {/* SCHEDULE */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="p-4 lg:p-6">

                  <div className="flex gap-5 mb-5 overflow-x-auto">

                    <button
                      onClick={() => setScheduleMode("annual")}
                      className={`text-base lg:text-2xl font-bold whitespace-nowrap ${
                        scheduleMode === "annual"
                          ? "text-black underline"
                          : "text-blue-700 underline"
                      }`}
                    >
                      Annual Schedule
                    </button>

                    <button
                      onClick={() => setScheduleMode("monthly")}
                      className={`text-base lg:text-2xl font-bold whitespace-nowrap ${
                        scheduleMode === "monthly"
                          ? "text-black underline"
                          : "text-blue-700 underline"
                      }`}
                    >
                      Monthly Schedule
                    </button>

                  </div>

                </div>

                {/* MOBILE CARD MODE */}

                <div className="block lg:hidden divide-y divide-slate-200">

                  {(scheduleMode === "monthly"
                    ? amortizationSchedule.slice(0, 12)
                    : amortizationSchedule
                        .filter((_, index) => index % 12 === 0)
                        .slice(0, loanTerm)
                  ).map((row, index) => {

                    const displayMonth =
                      scheduleMode === "monthly"
                        ? months[index % 12]
                        : startMonth

                    const displayDate =
                      `${displayMonth} ${
                        startYear + Math.floor(index / 12)
                      }`

                    return (

                      <div
                        key={index}
                        className="p-4"
                      >

                        <div className="flex justify-between items-center mb-3">

                          <div className="font-bold text-lg">
                            {scheduleMode === "monthly"
                              ? `Month ${index + 1}`
                              : `Year ${index + 1}`}
                          </div>

                          <div className="text-sm text-slate-500">
                            {displayDate}
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

                    )
                  })}

                </div>

                {/* DESKTOP TABLE */}

                <div className="hidden lg:block overflow-x-auto">

                  <table className="w-full text-left">

                    <thead className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">

                      <tr>

                        <th className="py-4 px-4 text-lg font-bold">
                          {scheduleMode === "monthly"
                            ? "Month"
                            : "Year"}
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Date
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

                      {(scheduleMode === "monthly"
                        ? amortizationSchedule.slice(0, 12)
                        : amortizationSchedule
                            .filter((_, index) => index % 12 === 0)
                            .slice(0, loanTerm)
                      ).map((row, index) => {

                        const displayMonth =
                          scheduleMode === "monthly"
                            ? months[index % 12]
                            : startMonth

                        const displayDate =
                          `${displayMonth} ${
                            startYear + Math.floor(index / 12)
                          }`

                        return (

                          <tr
                            key={index}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >

                            <td className="py-4 px-4 font-semibold">
                              {index + 1}
                            </td>

                            <td className="py-4 px-4">
                              {displayDate}
                            </td>

                            <td className="py-4 px-4">
                              ${row.interest.toFixed(2)}
                            </td>

                            <td className="py-4 px-4">
                              ${row.principal.toFixed(2)}
                            </td>

                            <td className="py-4 px-4 font-bold">
                              ${row.balance.toFixed(0)}
                            </td>

                          </tr>

                        )
                      })}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>
{/* RESULT EXPLANATION */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6 lg:mt-10">

  <h2 className="text-2xl lg:text-3xl font-black mb-5">
    Mortgage Payment Explanation
  </h2>

  <p className="text-slate-700 text-base lg:text-lg leading-8">
    Based on a home price of <strong>${homePrice.toLocaleString()}</strong>,
    a down payment of <strong>${actualDownPayment.toFixed(0)}</strong>,
    an interest rate of <strong>{interestRate}%</strong>,
    and a <strong>{loanTerm}-year</strong> loan term,
    your estimated monthly mortgage payment is
    <strong> ${monthlyPayment.toFixed(2)}</strong>.
  </p>

  <p className="text-slate-700 text-base lg:text-lg leading-8 mt-4">
    Over the life of the loan, you will pay both principal and interest.
    Lower interest rates and larger down payments can reduce monthly costs.
  </p>

</div>

{/* FORMULA */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6">

  <h2 className="text-2xl lg:text-3xl font-black mb-5">
    Mortgage Formula
  </h2>

  <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

    <p className="text-lg font-mono">
      M = P × [ r(1+r)^n ] / [ (1+r)^n − 1 ]
    </p>

  </div>

  <div className="mt-5 text-slate-700 leading-8">

    <p><strong>M</strong> = Monthly Payment</p>
    <p><strong>P</strong> = Loan Amount</p>
    <p><strong>r</strong> = Monthly Interest Rate</p>
    <p><strong>n</strong> = Number of Monthly Payments</p>

  </div>

</div>

{/* EXAMPLE */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6">

  <h2 className="text-2xl lg:text-3xl font-black mb-5">
    Mortgage Calculation Example
  </h2>

  <div className="space-y-4 text-slate-700 text-base lg:text-lg leading-8">

    <p>
      Suppose you purchase a home for <strong>$500,000</strong>
      with a <strong>20% down payment</strong>.
    </p>

    <p>
      Your loan amount would be approximately
      <strong> $400,000</strong>.
    </p>

    <p>
      With a <strong>6.5% interest rate</strong> over
      <strong> 30 years</strong>, your estimated monthly
      payment would be approximately
      <strong> ${monthlyPayment.toFixed(2)}</strong>.
    </p>

  </div>

</div>

{/* FAQ */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6">

  <h2 className="text-2xl lg:text-3xl font-black mb-6">
    Mortgage Calculator FAQ
  </h2>

  <div className="space-y-6">

    <div>
      <h3 className="font-bold text-xl mb-2">
        How is a mortgage payment calculated?
      </h3>

      <p className="text-slate-700 leading-8">
        Mortgage payments are based on the loan amount,
        interest rate, and repayment term.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-xl mb-2">
        What affects mortgage afford
        ability?
      </h3>

      <p className="text-slate-700 leading-8">
        Income, debt, credit score, down payment,
        and interest rates all affect affordability.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-xl mb-2">
        Can I lower my monthly payment?
      </h3>

      <p className="text-slate-700 leading-8">
        Yes. Increasing your down payment or selecting
        a longer loan term can reduce monthly costs.
      </p>
    </div>

  </div>

</div>

{/* RELATED CALCULATORS */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-8 mt-6 mb-10">

  <h2 className="text-2xl lg:text-3xl font-black mb-6">
    Related Calculators
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

    <a
      href="/loan-calculator"
      className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold transition"
    >
      Loan Calculator
    </a>

    <a
      href="/refinance-calculator"
      className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold transition"
    >
      Refinance Calculator
    </a>

    <a
      href="/affordability-calculator"
      className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold transition"
    >
      Affordability Calculator
    </a>

    <a
      href="/auto-loan-calculator"
      className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold transition"
    >
      Auto Loan Calculator
    </a>

  </div>

</div>
        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-10 mt-6 lg:mt-10">

          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            Mortgage Loan Guide
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-base lg:text-lg">

            <p>
              A mortgage calculator helps estimate monthly mortgage payments,
              total interest costs, and loan amortization over time.
              Homebuyers can use this calculator to better understand
              affordability before purchasing a property.
            </p>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                What Is a Mortgage?
              </h3>

              <p>
                A mortgage is a secured loan used to purchase real estate.
                Borrowers repay the loan over time through monthly payments
                that include both principal and interest.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                How Mortgage Payments Work
              </h3>

              <p>
                Mortgage payments are calculated based on the loan amount,
                interest rate, and loan term.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Understanding Amortization
              </h3>

              <p>
                Mortgage amortization schedules show how each payment
                is split between principal and interest throughout
                the life of the loan.
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

          {suffix === "%"
            ? `${value.toFixed(2)}%`
            : suffix
            ? `${value}${suffix}`
            : `$${value.toFixed(2)}`}

        </span>

      </div>

    </div>

  )
}


  