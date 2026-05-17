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

export default function FuelCostCalculator() {

  const [distance, setDistance] =
    useState(1500)

  const [fuelEfficiency, setFuelEfficiency] =
    useState(30)

  const [fuelPrice, setFuelPrice] =
    useState(4.1)

  const [monthlyMiles, setMonthlyMiles] =
    useState(1600)

  const gallonsUsed =
    distance / fuelEfficiency

  const tripFuelCost =
    gallonsUsed * fuelPrice

  const monthlyFuelCost =
    (monthlyMiles / fuelEfficiency) *
    fuelPrice

  const yearlyFuelCost =
    monthlyFuelCost * 12

  const fiveYearFuelCost =
    yearlyFuelCost * 5

  const estimatedMaintenance =
    yearlyFuelCost * 0.35

  const pieData = [
    {
      name: "Fuel Expenses",
      value: yearlyFuelCost,
    },
    {
      name: "Maintenance",
      value: estimatedMaintenance,
    },
  ]

  const compareData = [
    {
      name: "Trip Cost",
      value: tripFuelCost,
    },
    {
      name: "Monthly Fuel",
      value: monthlyFuelCost,
    },
    {
      name: "Yearly Fuel",
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

          <div className="bg-gradient-to-r from-yellow-600 to-orange-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Fuel Cost Calculator
            </h1>

            <p className="text-yellow-100 text-sm lg:text-lg">
              Estimate fuel expenses,
              gasoline usage,
              commuting costs,
              and long-term transportation affordability.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Driving Distance"
                  value={distance}
                  setValue={setDistance}
                  suffix=" miles"
                />

                <InputField
                  label="Vehicle MPG"
                  value={fuelEfficiency}
                  setValue={setFuelEfficiency}
                  suffix=" MPG"
                />

                <InputField
                  label="Fuel Price"
                  value={fuelPrice}
                  setValue={setFuelPrice}
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

            <div className="bg-gradient-to-b from-yellow-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-yellow-600 to-orange-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-yellow-100 mb-2">
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
                    label="Gallons Used"
                    value={`${gallonsUsed.toFixed(1)} gal`}
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
            Fuel Cost Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A fuel cost calculator helps drivers estimate
              gasoline expenses,
              transportation costs,
              and long-term fuel spending
              based on driving habits and vehicle efficiency.
            </p>

            <p>
              Fuel costs represent
              one of the most significant recurring expenses
              associated with vehicle ownership.
            </p>

            <p>
              Fuel calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Trip fuel expenses</li>

              <li>Monthly gasoline costs</li>

              <li>Annual transportation spending</li>

              <li>Long-term vehicle affordability</li>

              <li>Fuel efficiency savings</li>

            </ul>

            <p>
              Fuel costs depend on multiple factors,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Driving distance</li>

              <li>Vehicle fuel economy</li>

              <li>Fuel prices</li>

              <li>Traffic conditions</li>

              <li>Driving behavior</li>

            </ul>

            <p>
              Vehicles with higher MPG ratings
              generally reduce transportation expenses
              and lower long-term ownership costs.
            </p>

            <p>
              Aggressive acceleration,
              excessive idling,
              and poor maintenance
              may reduce fuel efficiency
              and increase gasoline spending.
            </p>

            <p>
              Fuel prices can fluctuate significantly
              depending on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Global oil prices</li>

              <li>Regional supply conditions</li>

              <li>Seasonal demand</li>

              <li>Local fuel taxes</li>

              <li>Economic conditions</li>

            </ul>

            <p>
              Long-distance commuters
              often compare:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Hybrid vehicles</li>

              <li>Electric vehicles</li>

              <li>Fuel-efficient sedans</li>

              <li>Compact SUVs</li>

            </ul>

            <p>
              Fuel calculators help consumers estimate
              whether upgrading to fuel-efficient vehicles
              may reduce long-term transportation costs.
            </p>

            <p>
              Businesses also use fuel calculators
              to estimate delivery expenses,
              fleet operating costs,
              and transportation budgets.
            </p>

            <p>
              Understanding fuel expenses
              helps households create accurate budgets
              and prepare for future transportation costs.
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

                    <Cell fill="#ca8a04" />
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
                  stroke="#ca8a04"
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
                  fill="#ca8a04"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Fuel Cost Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Fuel Cost =
              (Distance ÷ MPG) × Fuel Price
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Fuel Cost Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A driver traveling
              1,500 miles
              in a vehicle averaging
              30 MPG
              with gasoline priced at
              $4.10 per gallon
              may spend approximately
              ${tripFuelCost.toFixed(0)}
              on fuel.
            </p>

            <p>
              Monthly commuting expenses
              for drivers covering
              1,600 miles monthly
              may exceed
              ${monthlyFuelCost.toFixed(0)}.
            </p>

            <p>
              Over five years,
              fuel expenses
              may surpass
              ${fiveYearFuelCost.toFixed(0)}
              depending on gasoline prices,
              driving conditions,
              and vehicle efficiency.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Fuel Cost FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                How do I estimate fuel costs?
              </h3>

              <p>
                Divide driving distance
                by vehicle MPG,
                then multiply by fuel price.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What affects fuel efficiency?
              </h3>

              <p>
                Vehicle maintenance,
                driving habits,
                tire pressure,
                traffic,
                and vehicle weight
                all affect fuel economy.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Are fuel-efficient vehicles worth it?
              </h3>

              <p>
                Drivers with long commutes
                may reduce long-term transportation expenses
                with higher MPG vehicles.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Do gas prices change frequently?
              </h3>

              <p>
                Fuel prices may fluctuate
                based on oil markets,
                taxes,
                regional demand,
                and economic conditions.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I consider hybrid or EV vehicles?
              </h3>

              <p>
                Hybrid and electric vehicles
                may significantly reduce fuel expenses
                depending on driving distance
                and charging availability.
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
              href="/gas-cost-calculator"
              className="bg-slate-100 hover:bg-yellow-50 rounded-2xl p-5 font-bold"
            >
              Gas Cost Calculator
            </a>

            <a
              href="/ev-savings-calculator"
              className="bg-slate-100 hover:bg-yellow-50 rounded-2xl p-5 font-bold"
            >
              EV Savings Calculator
            </a>

            <a
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-yellow-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/car-payment-calculator"
              className="bg-slate-100 hover:bg-yellow-50 rounded-2xl p-5 font-bold"
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