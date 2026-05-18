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

export default function VehicleDepreciationCalculator() {

  const [vehiclePrice, setVehiclePrice] =
    useState(42000)

  const [annualDepreciation, setAnnualDepreciation] =
    useState(15)

  const [ownershipYears, setOwnershipYears] =
    useState(5)

  const [annualMileage, setAnnualMileage] =
    useState(12000)

  const estimatedValue =
    vehiclePrice *
    Math.pow(
      1 - annualDepreciation / 100,
      ownershipYears
    )

  const totalDepreciation =
    vehiclePrice - estimatedValue

  const yearlyLoss =
    totalDepreciation / ownershipYears

  const depreciationPerMile =
    totalDepreciation / (annualMileage * ownershipYears)

  const pieData = [
    {
      name: "Remaining Vehicle Value",
      value: estimatedValue,
    },
    {
      name: "Depreciation Loss",
      value: totalDepreciation,
    },
  ]

  const compareData = [
    {
      name: "Original Price",
      value: vehiclePrice,
    },
    {
      name: "Estimated Value",
      value: estimatedValue,
    },
    {
      name: "Total Loss",
      value: totalDepreciation,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value:
          vehiclePrice *
          Math.pow(1 - annualDepreciation / 100, 1),
      },
      {
        year: "Year 2",
        value:
          vehiclePrice *
          Math.pow(1 - annualDepreciation / 100, 2),
      },
      {
        year: "Year 3",
        value:
          vehiclePrice *
          Math.pow(1 - annualDepreciation / 100, 3),
      },
      {
        year: "Year 4",
        value:
          vehiclePrice *
          Math.pow(1 - annualDepreciation / 100, 4),
      },
      {
        year: "Year 5",
        value:
          vehiclePrice *
          Math.pow(1 - annualDepreciation / 100, 5),
      },
    ]

  }, [
    vehiclePrice,
    annualDepreciation,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Vehicle Depreciation Calculator
            </h1>

            <p className="text-purple-100 text-sm lg:text-lg">
              Estimate vehicle depreciation,
              resale value,
              yearly value loss,
              and long-term car ownership costs.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Vehicle Purchase Price"
                  value={vehiclePrice}
                  setValue={setVehiclePrice}
                  prefix="$"
                />

                <InputField
                  label="Annual Depreciation Rate"
                  value={annualDepreciation}
                  setValue={setAnnualDepreciation}
                  suffix="%"
                />

                <InputField
                  label="Years Owned"
                  value={ownershipYears}
                  setValue={setOwnershipYears}
                  suffix=" years"
                />

                <InputField
                  label="Annual Mileage"
                  value={annualMileage}
                  setValue={setAnnualMileage}
                  suffix=" miles"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-purple-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-purple-100 mb-2">
                  Estimated Vehicle Value
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${estimatedValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Depreciation Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Depreciation"
                    value={`$${totalDepreciation.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Yearly Value Loss"
                    value={`$${yearlyLoss.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Remaining Value"
                    value={`$${estimatedValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Depreciation Per Mile"
                    value={`$${depreciationPerMile.toFixed(2)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Vehicle Depreciation Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A vehicle depreciation calculator helps drivers estimate
              how much value a vehicle may lose over time.
            </p>

            <p>
              Depreciation represents one of the largest ownership costs
              associated with vehicle purchases,
              especially for new cars.
            </p>

            <p>
              Vehicle depreciation calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Future resale value</li>

              <li>Yearly depreciation losses</li>

              <li>Long-term ownership costs</li>

              <li>Vehicle value trends</li>

              <li>Cost per mile driven</li>

            </ul>

            <p>
              Most vehicles lose value rapidly
              during the first few years of ownership.
            </p>

            <p>
              New vehicles may lose:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>15% to 25% during the first year</li>

              <li>40% to 60% within five years</li>

            </ul>

            <p>
              Depreciation rates depend on several factors,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vehicle brand reputation</li>

              <li>Mileage</li>

              <li>Accident history</li>

              <li>Maintenance condition</li>

              <li>Fuel efficiency</li>

              <li>Market demand</li>

            </ul>

            <p>
              Luxury vehicles often depreciate faster
              than economy vehicles,
              while reliable brands
              may retain resale value longer.
            </p>

            <p>
              High mileage generally reduces vehicle value
              because additional wear
              increases maintenance risks.
            </p>

            <p>
              Electric vehicles,
              hybrid vehicles,
              trucks,
              and SUVs
              may experience different depreciation patterns
              depending on consumer demand.
            </p>

            <p>
              Vehicle depreciation calculators help consumers compare
              long-term ownership costs
              before purchasing a vehicle.
            </p>

            <p>
              Businesses also use depreciation estimates
              for fleet budgeting,
              accounting,
              and tax planning purposes.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Value Breakdown
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

                    <Cell fill="#7c3aed" />
                    <Cell fill="#c4b5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Remaining Value"
                value={`$${estimatedValue.toFixed(0)}`}
              />

              <SummaryCard
                title="Depreciation Loss"
                value={`$${totalDepreciation.toFixed(0)}`}
              />

              <SummaryCard
                title="Yearly Loss"
                value={`$${yearlyLoss.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Vehicle Value Trend
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
                  stroke="#7c3aed"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Depreciation Comparison
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
                  fill="#7c3aed"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Vehicle Depreciation Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Future Value =
              Original Price × (1 − Depreciation Rate)^Years
            </p>

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