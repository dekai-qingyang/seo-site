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

export default function EvSavingsCalculator() {

  const [annualMiles, setAnnualMiles] =
    useState(15000)

  const [gasPrice, setGasPrice] =
    useState(4.2)

  const [gasVehicleMPG, setGasVehicleMPG] =
    useState(28)

  const [electricityRate, setElectricityRate] =
    useState(0.16)

  const [evEfficiency, setEvEfficiency] =
    useState(0.31)

  const yearlyGasCost =
    (
      annualMiles /
      gasVehicleMPG
    ) * gasPrice

  const yearlyChargingCost =
    annualMiles *
    evEfficiency *
    electricityRate

  const yearlySavings =
    yearlyGasCost -
    yearlyChargingCost

  const fiveYearSavings =
    yearlySavings * 5

  const tenYearSavings =
    yearlySavings * 10

  const estimatedMaintenanceSavings =
    yearlySavings * 0.4

  const pieData = [
    {
      name: "Gas Vehicle Costs",
      value: yearlyGasCost,
    },
    {
      name: "EV Charging Costs",
      value: yearlyChargingCost,
    },
  ]

  const compareData = [
    {
      name: "Gas Vehicle",
      value: yearlyGasCost,
    },
    {
      name: "EV Charging",
      value: yearlyChargingCost,
    },
    {
      name: "Yearly Savings",
      value: yearlySavings,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: yearlySavings,
      },
      {
        year: "Year 3",
        value: yearlySavings * 3,
      },
      {
        year: "Year 5",
        value: fiveYearSavings,
      },
      {
        year: "Year 7",
        value: yearlySavings * 7,
      },
      {
        year: "Year 10",
        value: tenYearSavings,
      },
    ]

  }, [
    yearlySavings,
    fiveYearSavings,
    tenYearSavings,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              EV Savings Calculator
            </h1>

            <p className="text-green-100 text-sm lg:text-lg">
              Estimate electric vehicle savings,
              fuel cost reductions,
              charging expenses,
              and long-term EV ownership benefits.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Annual Miles Driven"
                  value={annualMiles}
                  setValue={setAnnualMiles}
                  suffix=" miles"
                />

                <InputField
                  label="Gasoline Price"
                  value={gasPrice}
                  setValue={setGasPrice}
                  prefix="$"
                />

                <InputField
                  label="Gas Vehicle MPG"
                  value={gasVehicleMPG}
                  setValue={setGasVehicleMPG}
                  suffix=" MPG"
                />

                <InputField
                  label="Electricity Rate"
                  value={electricityRate}
                  setValue={setElectricityRate}
                  prefix="$"
                />

                <InputField
                  label="EV kWh Per Mile"
                  value={evEfficiency}
                  setValue={setEvEfficiency}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-green-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-green-100 mb-2">
                  Estimated Yearly Savings
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${yearlySavings.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    EV Savings Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Gas Vehicle Cost"
                    value={`$${yearlyGasCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="EV Charging Cost"
                    value={`$${yearlyChargingCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="5-Year Savings"
                    value={`$${fiveYearSavings.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="10-Year Savings"
                    value={`$${tenYearSavings.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            EV Savings Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              An EV savings calculator helps drivers estimate
              how much money electric vehicles
              may save compared to gasoline-powered vehicles
              over time.
            </p>

            <p>
              Electric vehicles typically reduce
              fuel expenses,
              maintenance costs,
              and long-term transportation spending.
            </p>

            <p>
              EV savings calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Fuel savings</li>

              <li>Charging expenses</li>

              <li>Long-term transportation costs</li>

              <li>Maintenance savings</li>

              <li>Ownership affordability</li>

            </ul>

            <p>
              Electric vehicles generally cost less to operate
              because electricity
              is often cheaper than gasoline
              on a per-mile basis.
            </p>

            <p>
              EV savings depend on multiple factors,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Annual mileage</li>

              <li>Local fuel prices</li>

              <li>Electricity rates</li>

              <li>Vehicle efficiency</li>

              <li>Charging behavior</li>

            </ul>

            <p>
              Drivers with long commutes
              may experience larger EV savings
              because fuel costs accumulate rapidly
              in gasoline-powered vehicles.
            </p>

            <p>
              Electric vehicles may also reduce:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Oil change expenses</li>

              <li>Brake maintenance</li>

              <li>Engine repairs</li>

              <li>Transmission servicing</li>

            </ul>

            <p>
              Many electric vehicles use regenerative braking,
              which may reduce brake wear
              and lower maintenance expenses.
            </p>

            <p>
              EV owners should also consider:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Charging station access</li>

              <li>Home charger installation</li>

              <li>Battery warranty coverage</li>

              <li>Cold weather efficiency</li>

              <li>Insurance costs</li>

            </ul>

            <p>
              Government tax credits
              and incentives
              may also improve EV affordability
              depending on regional programs.
            </p>

            <p>
              Businesses increasingly adopt electric fleets
              to reduce transportation costs
              and lower fuel spending.
            </p>

            <p>
              EV savings calculators help consumers compare
              long-term vehicle ownership costs
              and determine whether electric vehicles
              fit their financial goals.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            EV Savings Breakdown
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

                    <Cell fill="#15803d" />
                    <Cell fill="#86efac" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Yearly Fuel Savings"
                value={`$${yearlySavings.toFixed(0)}`}
              />

              <SummaryCard
                title="5-Year Savings"
                value={`$${fiveYearSavings.toFixed(0)}`}
              />

              <SummaryCard
                title="Maintenance Savings"
                value={`$${estimatedMaintenanceSavings.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Long-Term EV Savings Trend
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
                  stroke="#15803d"
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
                  fill="#15803d"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            EV Savings Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              EV Savings =
              Gas Vehicle Fuel Cost − EV Charging Cost
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            EV Savings Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A driver traveling
              15,000 miles annually
              in a gasoline vehicle averaging
              28 MPG
              with fuel prices at
              $4.20 per gallon
              may spend approximately
              ${yearlyGasCost.toFixed(0)}
              yearly on fuel.
            </p>

            <p>
              An electric vehicle
              consuming
              0.31 kWh per mile
              with electricity priced at
              $0.16 per kWh
              may cost approximately
              ${yearlyChargingCost.toFixed(0)}
              yearly to charge.
            </p>

            <p>
              Total annual EV savings
              may exceed
              ${yearlySavings.toFixed(0)},
              while 10-year savings
              may surpass
              ${tenYearSavings.toFixed(0)}.
            </p>

          </div>

        </div>

        {/* FAQ */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

<h2 className="text-3xl font-black mb-6">
  EV Savings FAQ
</h2>

<div className="space-y-8 text-slate-700 leading-8">

  <div>

    <h3 className="font-bold text-2xl mb-3">
      Are electric vehicles cheaper to operate?
    </h3>

    <p>
      Electric vehicles often reduce fuel
      and maintenance expenses
      compared to gasoline-powered vehicles.
    </p>

  </div>

  <div>

    <h3 className="font-bold text-2xl mb-3">
      What affects EV savings?
    </h3>

    <p>
      Electricity rates,
      annual mileage,
      fuel prices,
      and charging habits
      all affect EV savings.
    </p>

  </div>

  <div>

    <h3 className="font-bold text-2xl mb-3">
      Do EVs require less maintenance?
    </h3>

    <p>
      Electric vehicles usually require fewer engine repairs,
      oil changes,
      and transmission services.
    </p>

  </div>

  <div>

    <h3 className="font-bold text-2xl mb-3">
      Are home chargers expensive?
    </h3>

    <p>
      Home charger installation costs vary,
      but many EV owners recover costs
      through long-term fuel savings.
    </p>

  </div>

  <div>

    <h3 className="font-bold text-2xl mb-3">
      Are EV tax credits available?
    </h3>

    <p>
      Government incentives,
      tax credits,
      and local rebate programs
      may improve EV affordability.
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
    className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
  >
    Fuel Cost Calculator
  </a>

  <a
    href="/gas-cost-calculator"
    className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
  >
    Gas Cost Calculator
  </a>

  <a
    href="/vehicle-loan-calculator"
    className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
  >
    Vehicle Loan Calculator
  </a>

  <a
    href="/car-payment-calculator"
    className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
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