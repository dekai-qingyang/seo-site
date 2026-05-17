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

export default function CarPaymentCalculator() {

  const [vehiclePrice, setVehiclePrice] =
    useState(45000)

  const [downPayment, setDownPayment] =
    useState(5000)

  const [interestRate, setInterestRate] =
    useState(6.5)

  const [loanTerm, setLoanTerm] =
    useState(72)

  const loanAmount =
    vehiclePrice - downPayment

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
      name: "Vehicle Price",
      value: vehiclePrice,
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
        value: loanAmount * 0.88,
      },
      {
        year: "Year 2",
        value: loanAmount * 0.72,
      },
      {
        year: "Year 3",
        value: loanAmount * 0.52,
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

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Car Payment Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate monthly auto loan payments,
              interest costs,
              total financing expenses,
              and vehicle affordability.
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

              <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

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
                    Loan Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Payment"
                    value={`$${totalPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={`$${monthlyPayment.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Car Payment Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A car payment calculator helps buyers estimate
              monthly auto loan payments
              based on vehicle price,
              interest rate,
              loan term,
              and down payment amount.
            </p>

            <p>
              Auto financing is one of the most common forms
              of consumer debt.
              Understanding monthly loan costs
              is important for budgeting
              and long-term financial planning.
            </p>

            <p>
              Car payment calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly vehicle payments</li>

              <li>Total interest costs</li>

              <li>Total financing expenses</li>

              <li>Loan affordability</li>

              <li>Long-term repayment costs</li>

            </ul>

            <p>
              Monthly payments depend on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vehicle purchase price</li>

              <li>Down payment amount</li>

              <li>Interest rate</li>

              <li>Loan term length</li>

              <li>Trade-in value</li>

            </ul>

            <p>
              Longer loan terms
              usually reduce monthly payments
              but increase total interest costs.
            </p>

            <p>
              Shorter auto loans
              generally save money over time
              because borrowers pay less interest.
            </p>

            <p>
              Interest rates vary significantly
              depending on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Credit score</li>

              <li>Vehicle age</li>

              <li>Lender policies</li>

              <li>Loan duration</li>

              <li>Economic conditions</li>

            </ul>

            <p>
              Buyers should also budget for:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Insurance</li>

              <li>Fuel expenses</li>

              <li>Maintenance</li>

              <li>Registration fees</li>

              <li>Vehicle depreciation</li>

            </ul>

            <p>
              Car payment calculators help buyers compare
              financing scenarios
              and make more informed purchasing decisions.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Loan vs Interest Breakdown
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

                    <Cell fill="#2563eb" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Vehicle Loan"
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
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Cost Comparison
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
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Car Payment Formula
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
            Car Payment Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A buyer financing
              a $45,000 vehicle
              with a $5,000 down payment
              at 6.5% interest
              over 72 months
              may pay approximately
              ${monthlyPayment.toFixed(0)}
              per month.
            </p>

            <p>
              Total interest expenses
              may exceed
              ${totalInterest.toFixed(0)}
              during the loan term.
            </p>

            <p>
              This example demonstrates
              how longer financing periods
              increase total borrowing costs
              despite lower monthly payments.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Car Payment FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What affects car loan payments?
              </h3>

              <p>
                Vehicle price,
                interest rate,
                loan term,
                and down payment
                all affect monthly car payments.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Is a longer loan term better?
              </h3>

              <p>
                Longer loan terms reduce monthly payments
                but usually increase total interest expenses.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How much should I put down on a car?
              </h3>

              <p>
                Larger down payments reduce financing costs
                and lower monthly loan payments.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Do car loans include taxes and fees?
              </h3>

              <p>
                Some lenders finance taxes and registration fees,
                while others require upfront payment.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Can I pay off my auto loan early?
              </h3>

              <p>
                Many auto loans allow early repayment,
                reducing long-term interest expenses.
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
              href="/auto-loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Auto Loan Calculator
            </a>

            <a
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </a>

            <a
              href="/interest-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Interest Calculator
            </a>

            <a
              href="/amortization-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Amortization Calculator
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