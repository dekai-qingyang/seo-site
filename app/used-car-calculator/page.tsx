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

export default function UsedCarCalculator() {

  const [vehiclePrice, setVehiclePrice] =
    useState(24000)

  const [downPayment, setDownPayment] =
    useState(4000)

  const [interestRate, setInterestRate] =
    useState(7.2)

  const [loanTerm, setLoanTerm] =
    useState(60)

  const [tradeInValue, setTradeInValue] =
    useState(3000)

  const loanAmount =
    vehiclePrice -
    downPayment -
    tradeInValue

  const monthlyRate =
    interestRate / 100 / 12

  const monthlyPayment =
    (
      loanAmount *
      monthlyRate
    ) /
    (
      1 -
      Math.pow(
        1 + monthlyRate,
        -loanTerm
      )
    )

  const totalPayment =
    monthlyPayment * loanTerm

  const totalInterest =
    totalPayment - loanAmount

  const estimatedValueAfterFiveYears =
    vehiclePrice * 0.45

  const pieData = [
    {
      name: "Loan Amount",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const compareData = [
    {
      name: "Purchase Price",
      value: vehiclePrice,
    },
    {
      name: "Estimated Value",
      value: estimatedValueAfterFiveYears,
    },
    {
      name: "Interest Paid",
      value: totalInterest,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: loanAmount * 0.82,
      },
      {
        year: "Year 2",
        value: loanAmount * 0.64,
      },
      {
        year: "Year 3",
        value: loanAmount * 0.44,
      },
      {
        year: "Year 4",
        value: loanAmount * 0.22,
      },
      {
        year: "Year 5",
        value: 0,
      },
    ]

  }, [
    loanAmount,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-orange-700 to-red-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Used Car Calculator
            </h1>

            <p className="text-orange-100 text-sm lg:text-lg">
              Estimate used car financing,
              loan payments,
              interest costs,
              and long-term vehicle ownership expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Used Car Price"
                  value={vehiclePrice}
                  setValue={setVehiclePrice}
                  prefix="$"
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  setValue={setDownPayment}
                  prefix="$"
                />

                <InputField
                  label="Trade-In Value"
                  value={tradeInValue}
                  setValue={setTradeInValue}
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
                  suffix=" months"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-orange-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-orange-700 to-red-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-orange-100 mb-2">
                  Estimated Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Used Car Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={`$${monthlyPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Payment"
                    value={`$${totalPayment.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Used Car Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A used car calculator helps buyers estimate
              monthly payments,
              financing expenses,
              and long-term ownership costs
              for pre-owned vehicles.
            </p>

            <p>
              Used vehicles often provide lower purchase prices
              compared to new cars,
              but financing rates
              may sometimes be higher.
            </p>

            <p>
              Used car calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly loan payments</li>

              <li>Total financing costs</li>

              <li>Interest expenses</li>

              <li>Vehicle depreciation</li>

              <li>Ownership affordability</li>

            </ul>

            <p>
              Financing costs usually depend on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vehicle purchase price</li>

              <li>Down payment amount</li>

              <li>Trade-in value</li>

              <li>Credit score</li>

              <li>Loan interest rates</li>

            </ul>

            <p>
              Used vehicles may offer several advantages,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Lower depreciation losses</li>

              <li>Reduced purchase prices</li>

              <li>Lower insurance costs</li>

              <li>Smaller registration fees</li>

            </ul>

            <p>
              However,
              buyers should also consider:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Maintenance expenses</li>

              <li>Vehicle history</li>

              <li>Warranty limitations</li>

              <li>Repair risks</li>

            </ul>

            <p>
              Trade-in values
              can significantly reduce financing balances
              and monthly payments.
            </p>

            <p>
              Larger down payments
              may also reduce interest costs
              and improve loan affordability.
            </p>

            <p>
              Used car calculators help consumers compare
              financing scenarios
              and estimate total ownership expenses
              before purchasing a vehicle.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Financing Breakdown
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

                    <Cell fill="#ea580c" />
                    <Cell fill="#fdba74" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Loan Amount"
                value={`$${loanAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Paid"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Cost"
                value={`$${totalPayment.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Loan Balance Trend
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ea580c"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Used Vehicle Comparison
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
                  fill="#ea580c"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Used Car Loan Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Monthly Payment =
              P × r ÷ (1 − (1 + r)^−n)
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Used Car Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A buyer purchasing
              a used vehicle priced at
              $24,000
              with a
              $4,000 down payment
              and
              $3,000 trade-in value
              may finance approximately
              ${loanAmount.toFixed(0)}.
            </p>

            <p>
              With a 7.2% interest rate
              over 60 months,
              monthly payments
              may reach approximately
              ${monthlyPayment.toFixed(0)}.
            </p>

            <p>
              Total financing expenses
              may exceed
              ${totalInterest.toFixed(0)}
              over the loan term.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Used Car FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are used cars cheaper to finance?
              </h3>

              <p>
                Used cars generally cost less,
                but financing rates may sometimes be higher
                than new vehicle loans.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Do used cars depreciate less?
              </h3>

              <p>
                Used vehicles usually experience slower depreciation
                compared to new vehicles.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I make a larger down payment?
              </h3>

              <p>
                Larger down payments reduce loan balances
                and lower monthly financing costs.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a trade-in value?
              </h3>

              <p>
                Trade-in value represents
                the estimated credit
                received when exchanging an existing vehicle.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I check vehicle history reports?
              </h3>

              <p>
                Yes.
                Buyers should review accident history,
                maintenance records,
                and ownership information
                before purchasing used vehicles.
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
              href="/car-payment-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
            </a>

            <a
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/trade-in-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Trade In Calculator
            </a>

            <a
              href="/vehicle-depreciation-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Depreciation Calculator
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
}: any) {

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
          className="w-full border border-slate-200 rounded-2xl py-3 pl-8 pr-8 bg-white"
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
}: any) {

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

function SummaryCard({
  title,
  value,
}: any) {

  return (

    <div className="bg-slate-100 rounded-2xl p-5">

      <div className="text-slate-500 mb-1">
        {title}
      </div>

      <div className="text-2xl font-black">
        {value}
      </div>

    </div>

  )
}