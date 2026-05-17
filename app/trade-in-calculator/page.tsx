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

export default function TradeInCalculator() {

  const [newVehiclePrice, setNewVehiclePrice] =
    useState(42000)

  const [tradeInValue, setTradeInValue] =
    useState(9000)

  const [loanRate, setLoanRate] =
    useState(6.5)

  const [loanTerm, setLoanTerm] =
    useState(72)

  const [downPayment, setDownPayment] =
    useState(4000)

  const loanAmount =
    newVehiclePrice -
    tradeInValue -
    downPayment

  const monthlyRate =
    loanRate / 100 / 12

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

  const totalSavings =
    tradeInValue + totalInterest * 0.18

  const pieData = [
    {
      name: "Trade-In Savings",
      value: tradeInValue,
    },
    {
      name: "Remaining Loan",
      value: loanAmount,
    },
  ]

  const compareData = [
    {
      name: "Vehicle Price",
      value: newVehiclePrice,
    },
    {
      name: "Trade-In Value",
      value: tradeInValue,
    },
    {
      name: "Loan Amount",
      value: loanAmount,
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
        value: loanAmount * 0.12,
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

          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Trade In Calculator
            </h1>

            <p className="text-emerald-100 text-sm lg:text-lg">
              Estimate vehicle trade-in value,
              financing savings,
              reduced loan balances,
              and total auto loan affordability.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="New Vehicle Price"
                  value={newVehiclePrice}
                  setValue={setNewVehiclePrice}
                  prefix="$"
                />

                <InputField
                  label="Trade-In Value"
                  value={tradeInValue}
                  setValue={setTradeInValue}
                  prefix="$"
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  setValue={setDownPayment}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={loanRate}
                  setValue={setLoanRate}
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

            <div className="bg-gradient-to-b from-emerald-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-emerald-100 mb-2">
                  Estimated Monthly Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Trade-In Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Trade-In Credit"
                    value={`$${tradeInValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Savings"
                    value={`$${totalSavings.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Trade In Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A trade in calculator helps drivers estimate
              how much value their current vehicle
              may contribute toward the purchase
              of a newer vehicle.
            </p>

            <p>
              Trade-in value directly reduces
              financing balances
              and may significantly lower
              monthly vehicle loan payments.
            </p>

            <p>
              Trade in calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Trade-in vehicle value</li>

              <li>Reduced financing balances</li>

              <li>Monthly payment savings</li>

              <li>Total loan affordability</li>

              <li>Estimated interest reductions</li>

            </ul>

            <p>
              Vehicle trade-in values
              depend on many factors,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vehicle age</li>

              <li>Mileage</li>

              <li>Accident history</li>

              <li>Maintenance condition</li>

              <li>Market demand</li>

            </ul>

            <p>
              Vehicles with lower mileage
              and strong maintenance records
              generally receive higher trade-in offers.
            </p>

            <p>
              Trade-ins may also reduce
              taxable purchase amounts
              in some states,
              lowering total transaction expenses.
            </p>

            <p>
              Larger trade-in credits
              may significantly improve:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly affordability</li>

              <li>Loan approval chances</li>

              <li>Interest savings</li>

              <li>Total borrowing costs</li>

            </ul>

            <p>
              Drivers should compare:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Dealer trade-in offers</li>

              <li>Private sale prices</li>

              <li>Online vehicle valuations</li>

              <li>Local market demand</li>

            </ul>

            <p>
              Trade in calculators help consumers understand
              how vehicle equity
              may reduce future financing costs
              and improve transportation budgeting.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Trade-In Savings Breakdown
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

                    <Cell fill="#059669" />
                    <Cell fill="#6ee7b7" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Trade-In Value"
                value={`$${tradeInValue.toFixed(0)}`}
              />

              <SummaryCard
                title="Loan Balance"
                value={`$${loanAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Savings"
                value={`$${totalSavings.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Remaining Loan Balance Trend
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
                  stroke="#059669"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Financing Comparison
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
                  fill="#059669"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Trade In Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Loan Amount =
              Vehicle Price − Trade-In Value − Down Payment
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Trade In Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A buyer purchasing
              a $42,000 vehicle
              with a $9,000 trade-in
              and a $4,000 down payment
              may reduce financing needs
              to approximately
              ${loanAmount.toFixed(0)}.
            </p>

            <p>
              With a 6.5% interest rate
              over 72 months,
              monthly payments
              may decrease substantially
              compared to financing the full vehicle price.
            </p>

            <p>
              Total financing savings
              may exceed
              ${totalSavings.toFixed(0)}
              throughout the loan period.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Trade In FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What affects trade-in value?
              </h3>

              <p>
                Mileage,
                condition,
                vehicle age,
                accident history,
                and market demand
                all affect trade-in offers.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Is trading in better than selling privately?
              </h3>

              <p>
                Private sales may provide higher prices,
                while trade-ins offer convenience
                and faster transactions.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does a trade-in reduce taxes?
              </h3>

              <p>
                Some states reduce taxable vehicle prices
                based on trade-in credits.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can negative equity affect trade-ins?
              </h3>

              <p>
                Yes.
                Owing more than the vehicle value
                may increase financing balances.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I repair my car before trading it in?
              </h3>

              <p>
                Minor repairs and detailing
                may improve trade-in offers,
                depending on vehicle condition.
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
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-emerald-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/car-payment-calculator"
              className="bg-slate-100 hover:bg-emerald-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
            </a>

            <a
              href="/used-car-calculator"
              className="bg-slate-100 hover:bg-emerald-50 rounded-2xl p-5 font-bold"
            >
              Used Car Calculator
            </a>

            <a
              href="/auto-refinance-calculator"
              className="bg-slate-100 hover:bg-emerald-50 rounded-2xl p-5 font-bold"
            >
              Auto Refinance Calculator
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