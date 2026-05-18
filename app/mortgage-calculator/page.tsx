"use client"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export default function MortgageCalculator() {

  const [homePrice, setHomePrice] = useState(500000)

  const [downPaymentMode, setDownPaymentMode] = useState("%")

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

  const years = Array.from(
    { length: 30 },
    (_, i) => 2025 + i
  )

  const actualDownPayment =
    downPaymentMode === "%"
      ? homePrice * (downPayment / 100)
      : downPayment

  const loanAmount =
    homePrice - actualDownPayment

  const monthlyInterest =
    interestRate / 100 / 12

  const totalPayments =
    loanTerm * 12

  const monthlyPayment =
    loanAmount *
    (
      monthlyInterest *
      Math.pow(
        1 + monthlyInterest,
        totalPayments
      )
    ) /
    (
      Math.pow(
        1 + monthlyInterest,
        totalPayments
      ) - 1
    )

  const totalCost =
    monthlyPayment * totalPayments

  const totalInterest =
    totalCost - loanAmount

  const chartData = [
    {
      name: "Principal",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const amortizationSchedule = useMemo(() => {

    let balance = loanAmount

    const rows = []

    for (let i = 1; i <= totalPayments; i++) {

      const interest =
        balance * monthlyInterest

      const principal =
        monthlyPayment - interest

      balance -= principal

      rows.push({
        payment: i,
        interest,
        principal,
        balance:
          balance > 0 ? balance : 0,
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

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Mortgage Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Calculate mortgage payments,
              amortization schedules,
              and total loan costs instantly.
            </p>

          </div>

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

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Down Payment
                  </label>

                  <div className="flex gap-2">

                    <div className="relative flex-1">

                      {downPaymentMode === "$" && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">
                          $
                        </span>
                      )}

                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) =>
                          setDownPayment(
                            Number(e.target.value)
                          )
                        }
                        className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white shadow-sm ${
                          downPaymentMode === "$"
                            ? "pl-9"
                            : ""
                        }`}
                      />

                    </div>

                    <select
                      value={downPaymentMode}
                      onChange={(e) =>
                        setDownPaymentMode(
                          e.target.value
                        )
                      }
                      className="border border-slate-200 rounded-2xl px-3 bg-white"
                    >
                      <option value="%">%</option>
                      <option value="$">$</option>
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

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Start Date
                  </label>

                  <div className="grid grid-cols-2 gap-2">

                    <select
                      value={startMonth}
                      onChange={(e) =>
                        setStartMonth(
                          e.target.value
                        )
                      }
                      className="border border-slate-200 rounded-2xl py-3 px-3 bg-white"
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
                        setStartYear(
                          Number(e.target.value)
                        )
                      }
                      className="border border-slate-200 rounded-2xl py-3 px-3 bg-white"
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

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(2)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-6">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
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
                    label="Total Interest"
                    value={totalInterest}
                  />

                  <SummaryRow
                    label="Total Loan Cost"
                    value={totalCost}
                  />

                </div>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="p-4 lg:p-6">

                  <div className="flex gap-4 mb-5">

                    <button
                      onClick={() =>
                        setScheduleMode("monthly")
                      }
                      className={`font-bold ${
                        scheduleMode === "monthly"
                          ? "text-black"
                          : "text-blue-600"
                      }`}
                    >
                      Monthly
                    </button>

                    <button
                      onClick={() =>
                        setScheduleMode("annual")
                      }
                      className={`font-bold ${
                        scheduleMode === "annual"
                          ? "text-black"
                          : "text-blue-600"
                      }`}
                    >
                      Annual
                    </button>

                  </div>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full text-left">

                    <thead className="bg-blue-600 text-white">

                      <tr>

                        <th className="py-4 px-4">
                          Payment
                        </th>

                        <th className="py-4 px-4">
                          Interest
                        </th>

                        <th className="py-4 px-4">
                          Principal
                        </th>

                        <th className="py-4 px-4">
                          Balance
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {(scheduleMode === "monthly"
                        ? amortizationSchedule.slice(0, 12)
                        : amortizationSchedule
                            .filter(
                              (_, index) =>
                                index % 12 === 0
                            )
                            .slice(0, loanTerm)
                      ).map((row, index) => (

                        <tr
                          key={index}
                          className="border-b border-slate-100"
                        >

                          <td className="py-4 px-4">
                            {index + 1}
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

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RESULT */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Mortgage Payment Explanation
          </h2>

          <p className="text-slate-700 leading-8 text-lg">

            Based on a home price of
            <strong> ${homePrice.toLocaleString()}</strong>,
            your estimated monthly mortgage payment is
            <strong> ${monthlyPayment.toFixed(2)}</strong>.

          </p>

        </div>

        {/* CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage Cost Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
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
                  Interest
                </div>

                <div className="text-2xl font-black">
                  ${totalInterest.toFixed(0)}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Mortgage Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              M = P × [ r(1+r)^n ] / [ (1+r)^n − 1 ]
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Mortgage FAQ
          </h2>

          <div className="space-y-6">

            <div>

              <h3 className="font-bold text-xl mb-2">
                How is mortgage calculated?
              </h3>

              <p className="text-slate-700 leading-8">
                Mortgage payments depend on
                loan amount, interest rate,
                and repayment term.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-xl mb-2">
                Can I reduce my payment?
              </h3>

              <p className="text-slate-700 leading-8">
                Larger down payments and
                lower interest rates reduce
                monthly costs.
              </p>

            </div>

          </div>

        </div>
{/* SEO CONTENT */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

  <h2 className="text-3xl font-black mb-8">
    Mortgage Learning Center
  </h2>

  <div className="space-y-14 text-slate-700">

    {/* SECTION 1 */}

    <section>

      <h3 className="text-2xl font-black mb-5">
        How Does a Mortgage Calculator Work?
      </h3>

      <div className="space-y-5 leading-8 text-lg">

        <p>
          A mortgage calculator helps homebuyers estimate
          monthly mortgage payments based on loan amount,
          interest rate,
          and repayment term.
        </p>

        <p>
          Mortgage calculations are important because
          home loans are long-term financial commitments
          that may last 15 to 30 years.
          Even small changes in interest rates
          may significantly affect monthly payments
          and total interest costs.
        </p>

        <p>
          Most mortgage calculators estimate:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Monthly mortgage payments</li>

          <li>Total interest costs</li>

          <li>Total repayment amount</li>

          <li>Amortization schedules</li>

          <li>Loan payoff timelines</li>

        </ul>

        <p>
          Mortgage payments usually include:
          principal,
          interest,
          taxes,
          insurance,
          and HOA fees.
          However,
          many calculators focus only on principal
          and interest calculations.
        </p>

        <p>
          Mortgage calculators are commonly used when:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Buying a new home</li>

          <li>Comparing mortgage lenders</li>

          <li>Refinancing existing loans</li>

          <li>Estimating affordability</li>

          <li>Planning long-term budgets</li>

        </ul>

        <p>
          Mortgage calculators simplify complicated financial calculations
          and help borrowers better understand
          the long-term cost of homeownership.
        </p>

      </div>

    </section>

    {/* SECTION 2 */}

    <section>

      <h3 className="text-2xl font-black mb-5">
        15-Year vs 30-Year Mortgage
      </h3>

      <div className="space-y-5 leading-8 text-lg">

        <p>
          One of the most important mortgage decisions
          is choosing between a 15-year
          and a 30-year loan term.
        </p>

        <p>
          A 15-year mortgage
          usually has:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Higher monthly payments</li>

          <li>Lower total interest costs</li>

          <li>Faster equity growth</li>

          <li>Earlier loan payoff</li>

        </ul>

        <p>
          A 30-year mortgage
          generally provides:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Lower monthly payments</li>

          <li>Greater monthly cash flow flexibility</li>

          <li>Higher total interest costs</li>

          <li>Longer repayment periods</li>

        </ul>

        <p>
          Homebuyers with higher income
          may prefer shorter mortgage terms
          because they reduce long-term borrowing expenses.
        </p>

        <p>
          However,
          many borrowers choose 30-year mortgages
          because lower monthly payments
          improve affordability
          and reduce financial pressure.
        </p>

        <p>
          Mortgage calculators help borrowers compare
          long-term costs between different repayment options
          before selecting a mortgage structure.
        </p>

      </div>

    </section>

    {/* SECTION 3 */}

    <section>

      <h3 className="text-2xl font-black mb-5">
        How Much House Can I Afford?
      </h3>

      <div className="space-y-5 leading-8 text-lg">

        <p>
          Home affordability depends on:
          income,
          debt,
          interest rates,
          down payment size,
          and overall monthly expenses.
        </p>

        <p>
          Mortgage lenders commonly evaluate:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Debt-to-income ratio</li>

          <li>Employment stability</li>

          <li>Credit scores</li>

          <li>Cash reserves</li>

          <li>Down payment amounts</li>

        </ul>

        <p>
          Financial experts often recommend
          limiting housing costs
          to approximately
          28% of gross monthly income.
        </p>

        <p>
          Mortgage affordability calculators help borrowers estimate:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Maximum loan amounts</li>

          <li>Affordable monthly payments</li>

          <li>Estimated down payments</li>

          <li>Interest affordability</li>

        </ul>

        <p>
          Rising mortgage rates
          significantly reduce affordability
          because monthly payments increase
          even if home prices remain unchanged.
        </p>

        <p>
          Buyers should also budget for:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Property taxes</li>

          <li>Insurance</li>

          <li>Maintenance</li>

          <li>Closing costs</li>

          <li>HOA fees</li>

        </ul>

      </div>

    </section>

    {/* SECTION 4 */}

    <section>

      <h3 className="text-2xl font-black mb-5">
        Fixed vs Adjustable Rate Mortgage
      </h3>

      <div className="space-y-5 leading-8 text-lg">

        <p>
          Fixed-rate mortgages
          maintain the same interest rate
          throughout the entire loan term.
        </p>

        <p>
          Adjustable-rate mortgages,
          commonly called ARM loans,
          begin with lower introductory rates
          before adjusting periodically
          according to market conditions.
        </p>

        <p>
          Fixed-rate mortgages provide:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Stable monthly payments</li>

          <li>Predictable long-term budgeting</li>

          <li>Lower payment risk</li>

        </ul>

        <p>
          ARM loans may provide:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Lower initial payments</li>

          <li>Short-term savings</li>

          <li>Greater flexibility for short-term homeowners</li>

        </ul>

        <p>
          However,
          adjustable-rate mortgages
          may become more expensive
          if future interest rates rise significantly.
        </p>

        <p>
          Mortgage calculators help borrowers estimate
          potential payment increases
          and compare long-term costs
          between mortgage structures.
        </p>

      </div>

    </section>

    {/* SECTION 5 */}

    <section>

      <h3 className="text-2xl font-black mb-5">
        Ways to Lower Monthly Mortgage Payments
      </h3>

      <div className="space-y-5 leading-8 text-lg">

        <p>
          Many homeowners look for ways
          to reduce monthly mortgage expenses
          and improve long-term affordability.
        </p>

        <p>
          Common strategies include:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Increasing down payments</li>

          <li>Improving credit scores</li>

          <li>Refinancing into lower rates</li>

          <li>Extending loan terms</li>

          <li>Eliminating mortgage insurance</li>

        </ul>

        <p>
          Larger down payments
          reduce loan balances,
          which lowers monthly principal
          and interest payments.
        </p>

        <p>
          Borrowers with strong credit profiles
          may qualify for lower interest rates,
          significantly reducing long-term borrowing costs.
        </p>

        <p>
          Refinancing may also reduce payments
          if mortgage rates decline
          after the original loan was issued.
        </p>

        <p>
          However,
          refinancing involves closing costs
          and should be evaluated carefully
          before replacing an existing mortgage.
        </p>

        <p>
          Mortgage calculators help homeowners compare:
        </p>

        <ul className="list-disc pl-6 space-y-2">

          <li>Current vs refinance payments</li>

          <li>Interest savings</li>

          <li>Loan payoff timelines</li>

          <li>Monthly affordability</li>

        </ul>

      </div>

    </section>

  </div>

</div>
        {/* RELATED */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Related Calculators
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

            <a
              href="/refinance-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Refinance Calculator
            </a>

            <a
              href="/affordability-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Affordability Calculator
            </a>

            <a
              href="/auto-loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Auto Loan Calculator
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
            suffix ? "pr-20" : ""
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
  value: number
}) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-700">
          {label}
        </span>

        <span className="font-bold">
          ${value.toFixed(2)}
        </span>

      </div>

    </div>

  )
}

  