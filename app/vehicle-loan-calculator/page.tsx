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

export default function VehicleLoanCalculator() {

  const [vehiclePrice, setVehiclePrice] =
    useState(38000)

  const [downPayment, setDownPayment] =
    useState(5000)

  const [interestRate, setInterestRate] =
    useState(6.8)

  const [loanTerm, setLoanTerm] =
    useState(72)

  const [tradeInValue, setTradeInValue] =
    useState(4000)

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

  const estimatedVehicleValue =
    vehiclePrice * 0.42

  const pieData = [
    {
      name: "Loan Balance",
      value: loanAmount,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const compareData = [
    {
      name: "Vehicle Price",
      value: vehiclePrice,
    },
    {
      name: "Estimated Value",
      value: estimatedVehicleValue,
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
        value: loanAmount * 0.84,
      },
      {
        year: "Year 2",
        value: loanAmount * 0.66,
      },
      {
        year: "Year 3",
        value: loanAmount * 0.48,
      },
      {
        year: "Year 4",
        value: loanAmount * 0.3,
      },
      {
        year: "Year 5",
        value: loanAmount * 0.14,
      },
      {
        year: "Year 6",
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

          <div className="bg-gradient-to-r from-sky-700 to-blue-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Vehicle Loan Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate vehicle financing,
              monthly auto loan payments,
              interest expenses,
              and total transportation borrowing costs.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Vehicle Price"
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

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-sky-700 to-blue-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Vehicle Loan Summary
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
            Vehicle Loan Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A vehicle loan calculator helps drivers estimate
              monthly financing payments,
              interest expenses,
              and total borrowing costs
              when purchasing a vehicle.
            </p>

            <p>
              Vehicle financing is one of the largest
              consumer loan categories
              and plays an important role
              in personal budgeting.
            </p>

            <p>
              Vehicle loan calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly auto loan payments</li>

              <li>Total interest expenses</li>

              <li>Total financing costs</li>

              <li>Loan affordability</li>

              <li>Vehicle ownership expenses</li>

            </ul>

            <p>
              Financing costs depend on several factors,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vehicle purchase price</li>

              <li>Interest rate</li>

              <li>Down payment amount</li>

              <li>Trade-in value</li>

              <li>Loan duration</li>

            </ul>

            <p>
              Longer vehicle loans
              generally reduce monthly payments
              but increase total borrowing costs
              because interest accumulates over time.
            </p>

            <p>
              Shorter financing terms
              may increase monthly obligations
              while reducing long-term interest expenses.
            </p>

            <p>
              Interest rates vary depending on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Credit score</li>

              <li>Vehicle age</li>

              <li>Economic conditions</li>

              <li>Lender requirements</li>

              <li>Loan term length</li>

            </ul>

            <p>
              Trade-in values
              reduce financing balances
              and may lower total borrowing costs.
            </p>

            <p>
              Buyers should also consider
              additional ownership costs,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Insurance</li>

              <li>Fuel expenses</li>

              <li>Maintenance</li>

              <li>Vehicle taxes</li>

              <li>Registration fees</li>

            </ul>

            <p>
              Vehicle loan calculators help consumers compare
              financing scenarios
              and estimate long-term transportation affordability.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Financing Breakdown
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

                    <Cell fill="#0284c7" />
                    <Cell fill="#7dd3fc" />

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
                title="Total Repayment"
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
                  stroke="#0284c7"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Ownership Comparison
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
                  fill="#0284c7"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Vehicle Loan Formula
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
            Vehicle Loan Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A driver purchasing
              a $38,000 vehicle
              with a $5,000 down payment
              and a $4,000 trade-in
              may finance approximately
              ${loanAmount.toFixed(0)}.
            </p>

            <p>
              With a 6.8% interest rate
              over 72 months,
              estimated monthly payments
              may reach approximately
              ${monthlyPayment.toFixed(0)}.
            </p>

            <p>
              Total financing costs
              may exceed
              ${totalInterest.toFixed(0)}
              throughout the loan term.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Loan FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What affects vehicle loan payments?
              </h3>

              <p>
                Vehicle price,
                interest rate,
                loan term,
                down payment,
                and trade-in value
                all affect monthly financing costs.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are longer loans better?
              </h3>

              <p>
                Longer loans reduce monthly payments
                but usually increase total interest expenses.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does a larger down payment help?
              </h3>

              <p>
                Larger down payments reduce financing balances
                and may lower borrowing costs.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I include insurance costs?
              </h3>

              <p>
                Yes.
                Insurance,
                maintenance,
                and fuel costs
                should all be included
                when estimating vehicle affordability.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can I refinance a vehicle loan?
              </h3>

              <p>
                Many lenders allow refinancing
                to reduce interest rates
                or lower monthly payments.
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
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
            </a>

            <a
              href="/used-car-calculator"
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
            >
              Used Car Calculator
            </a>

            <a
              href="/auto-refinance-calculator"
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
            >
              Auto Refinance Calculator
            </a>

            <a
              href="/trade-in-calculator"
              className="bg-slate-100 hover:bg-sky-50 rounded-2xl p-5 font-bold"
            >
              Trade In Calculator
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
          className="w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white"
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