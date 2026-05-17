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

export default function CarAffordabilityCalculator() {

  const [monthlyIncome, setMonthlyIncome] =
    useState(8000)

  const [monthlyDebt, setMonthlyDebt] =
    useState(1200)

  const [downPayment, setDownPayment] =
    useState(5000)

  const [interestRate, setInterestRate] =
    useState(6.5)

  const [loanTerm, setLoanTerm] =
    useState(72)

  const maxMonthlyPayment =
    monthlyIncome * 0.15

  const monthlyRate =
    interestRate / 100 / 12

  const affordableLoan =
    (
      maxMonthlyPayment *
      (
        1 -
        Math.pow(
          1 + monthlyRate,
          -loanTerm
        )
      )
    ) / monthlyRate

  const affordableVehiclePrice =
    affordableLoan + downPayment

  const totalPayment =
    maxMonthlyPayment * loanTerm

  const totalInterest =
    totalPayment - affordableLoan

  const pieData = [
    {
      name: "Vehicle Budget",
      value: affordableLoan,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ]

  const compareData = [
    {
      name: "Monthly Income",
      value: monthlyIncome,
    },
    {
      name: "Monthly Debt",
      value: monthlyDebt,
    },
    {
      name: "Car Budget",
      value: maxMonthlyPayment,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: affordableLoan * 0.84,
      },
      {
        year: "Year 2",
        value: affordableLoan * 0.68,
      },
      {
        year: "Year 3",
        value: affordableLoan * 0.5,
      },
      {
        year: "Year 4",
        value: affordableLoan * 0.32,
      },
      {
        year: "Year 5",
        value: affordableLoan * 0.14,
      },
      {
        year: "Year 6",
        value: 0,
      },
    ]

  }, [
    affordableLoan,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-cyan-700 to-blue-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Car Affordability Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate how much vehicle you can afford
              based on income,
              debt,
              interest rates,
              and monthly payment budgets.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Monthly Income"
                  value={monthlyIncome}
                  setValue={setMonthlyIncome}
                  prefix="$"
                />

                <InputField
                  label="Monthly Debt"
                  value={monthlyDebt}
                  setValue={setMonthlyDebt}
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

              <div className="bg-gradient-to-r from-cyan-700 to-blue-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Affordable Vehicle Price
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${affordableVehiclePrice.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Affordability Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Estimated Loan Amount"
                    value={`$${affordableLoan.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Budget"
                    value={`$${maxMonthlyPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Affordable Vehicle"
                    value={`$${affordableVehiclePrice.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Car Affordability Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A car affordability calculator helps buyers estimate
              how much vehicle they can reasonably afford
              based on income,
              debt obligations,
              interest rates,
              and monthly financial goals.
            </p>

            <p>
              Vehicle affordability is important because
              transportation expenses may significantly affect
              long-term financial stability.
            </p>

            <p>
              Many financial experts recommend
              keeping total vehicle costs
              below 10% to 15%
              of gross monthly income.
            </p>

            <p>
              Car affordability calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Maximum affordable vehicle price</li>

              <li>Monthly payment budgets</li>

              <li>Estimated financing costs</li>

              <li>Total interest expenses</li>

              <li>Loan affordability limits</li>

            </ul>

            <p>
              Affordability depends on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly income</li>

              <li>Debt-to-income ratio</li>

              <li>Credit score</li>

              <li>Down payment amount</li>

              <li>Loan interest rates</li>

            </ul>

            <p>
              Buyers should also consider
              non-loan vehicle expenses,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Insurance</li>

              <li>Fuel costs</li>

              <li>Maintenance</li>

              <li>Parking fees</li>

              <li>Registration and taxes</li>

            </ul>

            <p>
              Longer auto loans
              may reduce monthly payments
              but increase long-term financing costs.
            </p>

            <p>
              Large down payments
              reduce total loan balances
              and improve overall affordability.
            </p>

            <p>
              Car affordability calculators help consumers
              avoid overextending financially
              and support more sustainable budgeting decisions.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Budget Breakdown
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

                    <Cell fill="#0f766e" />
                    <Cell fill="#67e8f9" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Affordable Loan"
                value={`$${affordableLoan.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Cost"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Vehicle Price"
                value={`$${affordableVehiclePrice.toFixed(0)}`}
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
                  stroke="#0891b2"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Budget Comparison
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
                  fill="#0891b2"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Car Affordability Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Affordable Loan =
              Monthly Budget ×
              (1 − (1 + r)^−n) ÷ r
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Car Affordability Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A buyer earning
              $8,000 per month
              with moderate debt
              may choose to limit
              vehicle payments
              to approximately
              ${maxMonthlyPayment.toFixed(0)}
              monthly.
            </p>

            <p>
              With a
              ${downPayment.toFixed(0)}
              down payment
              and 6.5% interest rate,
              the buyer may afford
              a vehicle priced near
              ${affordableVehiclePrice.toFixed(0)}.
            </p>

            <p>
              This example demonstrates
              how monthly income,
              interest rates,
              and loan terms
              affect overall vehicle affordability.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Car Affordability FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How much car can I afford?
              </h3>

              <p>
                Vehicle affordability depends on income,
                debt,
                interest rates,
                and monthly budgeting preferences.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What percentage of income should go toward a car?
              </h3>

              <p>
                Many experts recommend
                keeping vehicle payments below
                10% to 15%
                of gross monthly income.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does a larger down payment help?
              </h3>

              <p>
                Larger down payments
                reduce financing costs
                and improve affordability.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are longer loans better?
              </h3>

              <p>
                Longer loan terms reduce monthly payments
                but increase total interest expenses.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I include insurance in my budget?
              </h3>

              <p>
                Yes.
                Insurance,
                fuel,
                maintenance,
                and taxes
                should all be included
                when estimating vehicle affordability.
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
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
            </a>

            <a
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/lease-calculator"
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
            >
              Lease Calculator
            </a>

            <a
              href="/auto-refinance-calculator"
              className="bg-slate-100 hover:bg-cyan-50 rounded-2xl p-5 font-bold"
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