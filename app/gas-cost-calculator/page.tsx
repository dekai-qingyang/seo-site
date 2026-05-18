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

export default function GasCostCalculator() {

  const [tripDistance, setTripDistance] =
    useState(1200)

  const [fuelEfficiency, setFuelEfficiency] =
    useState(28)

  const [gasPrice, setGasPrice] =
    useState(3.9)

  const [monthlyMiles, setMonthlyMiles] =
    useState(1400)

  const gallonsNeeded =
    tripDistance / fuelEfficiency

  const tripFuelCost =
    gallonsNeeded * gasPrice

  const monthlyFuelCost =
    (monthlyMiles / fuelEfficiency) *
    gasPrice

  const yearlyFuelCost =
    monthlyFuelCost * 12

  const fiveYearFuelCost =
    yearlyFuelCost * 5

  const pieData = [
    {
      name: "Fuel Expenses",
      value: yearlyFuelCost,
    },
    {
      name: "Other Driving Costs",
      value: yearlyFuelCost * 0.45,
    },
  ]

  const compareData = [
    {
      name: "Trip Cost",
      value: tripFuelCost,
    },
    {
      name: "Monthly Cost",
      value: monthlyFuelCost,
    },
    {
      name: "Yearly Cost",
      value: yearlyFuelCost,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: yearlyFuelCost,
      },
      {
        year: "Year 2",
        value: yearlyFuelCost * 2,
      },
      {
        year: "Year 3",
        value: yearlyFuelCost * 3,
      },
      {
        year: "Year 4",
        value: yearlyFuelCost * 4,
      },
      {
        year: "Year 5",
        value: yearlyFuelCost * 5,
      },
    ]

  }, [
    yearlyFuelCost,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Gas Cost Calculator
            </h1>

            <p className="text-orange-100 text-sm lg:text-lg">
              Estimate fuel expenses,
              gas usage,
              trip fuel costs,
              and long-term transportation expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Trip Distance"
                  value={tripDistance}
                  setValue={setTripDistance}
                  suffix=" miles"
                />

                <InputField
                  label="Vehicle MPG"
                  value={fuelEfficiency}
                  setValue={setFuelEfficiency}
                  suffix=" MPG"
                />

                <InputField
                  label="Gas Price"
                  value={gasPrice}
                  setValue={setGasPrice}
                  prefix="$"
                />

                <InputField
                  label="Monthly Miles Driven"
                  value={monthlyMiles}
                  setValue={setMonthlyMiles}
                  suffix=" miles"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-orange-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-orange-100 mb-2">
                  Estimated Trip Fuel Cost
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${tripFuelCost.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Fuel Cost Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Gallons Needed"
                    value={`${gallonsNeeded.toFixed(1)} gal`}
                  />

                  <SummaryRow
                    label="Monthly Fuel Cost"
                    value={`$${monthlyFuelCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Yearly Fuel Cost"
                    value={`$${yearlyFuelCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="5-Year Fuel Cost"
                    value={`$${fiveYearFuelCost.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Gas Cost Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A gas cost calculator helps drivers estimate
              fuel expenses
              for road trips,
              daily commuting,
              and long-term vehicle ownership.
            </p>

            <p>
              Fuel costs represent
              one of the largest recurring transportation expenses
              for many households.
            </p>

            <p>
              Gas calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Trip fuel expenses</li>

              <li>Monthly gas spending</li>

              <li>Annual transportation fuel costs</li>

              <li>Vehicle efficiency savings</li>

              <li>Long-term driving expenses</li>

            </ul>

            <p>
              Fuel expenses depend on several factors,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Driving distance</li>

              <li>Vehicle fuel efficiency</li>

              <li>Gasoline prices</li>

              <li>Driving habits</li>

              <li>Traffic conditions</li>

            </ul>

            <p>
              Vehicles with higher fuel efficiency
              generally reduce transportation expenses
              and long-term ownership costs.
            </p>

            <p>
              Fuel-efficient vehicles may become increasingly valuable
              during periods of rising gas prices.
            </p>

            <p>
              Drivers should also consider:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Highway versus city driving</li>

              <li>Seasonal fuel price fluctuations</li>

              <li>Vehicle maintenance quality</li>

              <li>Tire pressure efficiency</li>

              <li>Vehicle weight</li>

            </ul>

            <p>
              Poor maintenance
              may reduce fuel efficiency
              and increase gasoline expenses over time.
            </p>

            <p>
              Fuel cost calculators help consumers compare
              transportation budgets,
              evaluate vehicle affordability,
              and estimate road trip expenses.
            </p>

            <p>
              Long-distance commuters
              often use fuel calculators
              to determine whether hybrid
              or electric vehicles
              may reduce overall transportation costs.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Fuel Expense Breakdown
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

                    <Cell fill="#d97706" />
                    <Cell fill="#fdba74" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Trip Fuel Cost"
                value={`$${tripFuelCost.toFixed(0)}`}
              />

              <SummaryCard
                title="Yearly Fuel Cost"
                value={`$${yearlyFuelCost.toFixed(0)}`}
              />

              <SummaryCard
                title="5-Year Fuel Cost"
                value={`$${fiveYearFuelCost.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Long-Term Fuel Spending Trend
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
                  stroke="#d97706"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Fuel Cost Comparison
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
                  fill="#d97706"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Gas Cost Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Fuel Cost =
              (Distance ÷ MPG) × Gas Price
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Gas Cost Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A driver traveling
              1,200 miles
              in a vehicle averaging
              28 MPG
              with gas prices at
              $3.90 per gallon
              may spend approximately
              ${tripFuelCost.toFixed(0)}
              on fuel.
            </p>

            <p>
              Monthly fuel expenses
              for a commuter driving
              1,400 miles monthly
              may exceed
              ${monthlyFuelCost.toFixed(0)}.
            </p>

            <p>
              Over five years,
              total fuel costs
              may surpass
              ${fiveYearFuelCost.toFixed(0)}
              depending on gasoline prices
              and driving habits.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Gas Cost FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How do I calculate gas costs?
              </h3>

              <p>
                Divide driving distance
                by vehicle MPG,
                then multiply by gasoline price.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Does highway driving save fuel?
              </h3>

              <p>
                Highway driving
                often improves fuel efficiency
                compared to city traffic conditions.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What affects fuel efficiency?
              </h3>

              <p>
                Vehicle maintenance,
                tire pressure,
                driving speed,
                and traffic conditions
                all affect MPG performance.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are fuel-efficient cars worth it?
              </h3>

              <p>
                Drivers with long commutes
                may significantly reduce
                long-term transportation costs
                with higher MPG vehicles.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I consider electric vehicles?
              </h3>

              <p>
                Electric vehicles may reduce fuel expenses
                depending on electricity costs,
                charging access,
                and annual mileage.
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
              href="/fuel-cost-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Fuel Cost Calculator
            </a>

            <a
              href="/ev-savings-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              EV Savings Calculator
            </a>

            <a
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/car-payment-calculator"
              className="bg-slate-100 hover:bg-orange-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
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
          className="w-full border border-slate-200 rounded-2xl py-3 pl-8 pr-8 bg-white"
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
}: any) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-700">
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

      <div className="text-slate-700 mb-1">
        {title}
      </div>

      <div className="text-2xl font-black">
        {value}
      </div>

    </div>

  )
}