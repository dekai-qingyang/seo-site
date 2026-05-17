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

export default function CarLeaseCalculator() {

  const [vehiclePrice, setVehiclePrice] =
    useState(48000)

  const [downPayment, setDownPayment] =
    useState(4000)

  const [residualValue, setResidualValue] =
    useState(27000)

  const [leaseTerm, setLeaseTerm] =
    useState(36)

  const [moneyFactor, setMoneyFactor] =
    useState(0.0028)

  const depreciationFee =
    (
      vehiclePrice -
      residualValue -
      downPayment
    ) / leaseTerm

  const financeFee =
    (
      vehiclePrice +
      residualValue
    ) * moneyFactor

  const monthlyLease =
    depreciationFee + financeFee

  const totalLeaseCost =
    monthlyLease * leaseTerm

  const totalFinanceFees =
    financeFee * leaseTerm

  const pieData = [
    {
      name: "Depreciation",
      value: depreciationFee * leaseTerm,
    },
    {
      name: "Finance Fees",
      value: totalFinanceFees,
    },
  ]

  const compareData = [
    {
      name: "Vehicle Price",
      value: vehiclePrice,
    },
    {
      name: "Residual Value",
      value: residualValue,
    },
    {
      name: "Total Lease Cost",
      value: totalLeaseCost,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        period: "6M",
        value: totalLeaseCost * 0.18,
      },
      {
        period: "12M",
        value: totalLeaseCost * 0.35,
      },
      {
        period: "18M",
        value: totalLeaseCost * 0.52,
      },
      {
        period: "24M",
        value: totalLeaseCost * 0.7,
      },
      {
        period: "30M",
        value: totalLeaseCost * 0.86,
      },
      {
        period: "36M",
        value: totalLeaseCost,
      },
    ]

  }, [
    totalLeaseCost,
  ])

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-violet-700 to-blue-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Car Lease Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate car lease payments,
              depreciation costs,
              finance charges,
              and total leasing expenses.
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
                  label="Residual Value"
                  value={residualValue}
                  setValue={setResidualValue}
                  prefix="$"
                />

                <InputField
                  label="Lease Term"
                  value={leaseTerm}
                  setValue={setLeaseTerm}
                  suffix=" months"
                />

                <InputField
                  label="Money Factor"
                  value={moneyFactor}
                  setValue={setMoneyFactor}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-violet-700 to-blue-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Monthly Lease
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyLease.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Lease Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Monthly Lease"
                    value={`$${monthlyLease.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Lease Cost"
                    value={`$${totalLeaseCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Residual Value"
                    value={`$${residualValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Finance Charges"
                    value={`$${totalFinanceFees.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Car Lease Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A car lease calculator helps drivers estimate
              monthly leasing costs
              based on vehicle price,
              residual value,
              money factor,
              and lease duration.
            </p>

            <p>
              Vehicle leasing differs from traditional financing
              because lessees pay mainly for depreciation
              rather than full ownership.
            </p>

            <p>
              Car lease calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly lease payments</li>

              <li>Total lease expenses</li>

              <li>Residual vehicle value</li>

              <li>Finance charges</li>

              <li>Depreciation costs</li>

            </ul>

            <p>
              Monthly lease costs are usually affected by:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vehicle MSRP</li>

              <li>Residual value percentage</li>

              <li>Lease term</li>

              <li>Money factor</li>

              <li>Down payment amount</li>

            </ul>

            <p>
              Residual value represents
              the estimated market value
              of the vehicle
              after the lease expires.
            </p>

            <p>
              Vehicles with higher residual values
              often provide lower monthly lease payments
              because depreciation costs are reduced.
            </p>

            <p>
              The money factor functions similarly
              to an interest rate
              and determines financing costs.
            </p>

            <p>
              Lower money factors
              generally improve lease affordability.
            </p>

            <p>
              Leasing may offer:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Lower monthly costs</li>

              <li>Access to newer vehicles</li>

              <li>Reduced maintenance concerns</li>

              <li>Frequent vehicle upgrades</li>

            </ul>

            <p>
              However,
              leasing also involves:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Mileage restrictions</li>

              <li>Wear and tear charges</li>

              <li>Limited ownership benefits</li>

              <li>Potential early termination penalties</li>

            </ul>

            <p>
              Car lease calculators help consumers compare
              leasing versus financing
              and evaluate long-term transportation costs.
            </p>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Lease Cost Breakdown
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
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Depreciation Cost"
                value={`$${(depreciationFee * leaseTerm).toFixed(0)}`}
              />

              <SummaryCard
                title="Finance Charges"
                value={`$${totalFinanceFees.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Lease Cost"
                value={`$${totalLeaseCost.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Lease Payment Trend
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="period" />

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
            Lease Comparison
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
            Car Lease Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Monthly Lease =
              Depreciation Fee + Finance Fee
            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Car Lease Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A driver leasing
              a $48,000 vehicle
              with a residual value
              of $27,000
              over 36 months
              may pay approximately
              ${monthlyLease.toFixed(0)}
              monthly.
            </p>

            <p>
              Total lease costs
              may exceed
              ${totalLeaseCost.toFixed(0)}
              throughout the lease term.
            </p>

            <p>
              This example demonstrates
              how residual values,
              depreciation,
              and money factors
              influence lease affordability.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Car Lease FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Is leasing cheaper than buying?
              </h3>

              <p>
                Leasing may reduce monthly payments
                but does not provide ownership equity.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a residual value?
              </h3>

              <p>
                Residual value is the estimated market value
                of the vehicle at lease expiration.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What does money factor mean?
              </h3>

              <p>
                Money factor represents the financing rate
                used to calculate lease finance charges.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Do leases have mileage limits?
              </h3>

              <p>
                Most leases include annual mileage limits
                and excess mileage fees.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I put money down on a lease?
              </h3>

              <p>
                Down payments reduce monthly lease costs
                but may increase financial risk
                if the vehicle is stolen or totaled.
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
              href="/lease-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
            >
              Lease Calculator
            </a>

            <a
              href="/car-payment-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
            </a>

            <a
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/trade-in-calculator"
              className="bg-slate-100 hover:bg-violet-50 rounded-2xl p-5 font-bold"
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