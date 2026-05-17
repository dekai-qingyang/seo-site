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

export default function LeaseCalculator() {

  const [vehiclePrice, setVehiclePrice] =
    useState(42000)

  const [downPayment, setDownPayment] =
    useState(3000)

  const [residualValue, setResidualValue] =
    useState(24000)

  const [leaseTerm, setLeaseTerm] =
    useState(36)

  const [moneyFactor, setMoneyFactor] =
    useState(0.0025)

  const depreciationCost =
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

  const monthlyPayment =
    depreciationCost + financeFee

  const totalLeaseCost =
    monthlyPayment * leaseTerm

  const pieData = [
    {
      name: "Depreciation",
      value: depreciationCost * leaseTerm,
    },
    {
      name: "Finance Fees",
      value: financeFee * leaseTerm,
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
      name: "Lease Cost",
      value: totalLeaseCost,
    },
  ]

  const trendData = useMemo(() => {

    return [
      {
        month: "6M",
        value: totalLeaseCost * 0.18,
      },
      {
        month: "12M",
        value: totalLeaseCost * 0.34,
      },
      {
        month: "18M",
        value: totalLeaseCost * 0.5,
      },
      {
        month: "24M",
        value: totalLeaseCost * 0.68,
      },
      {
        month: "30M",
        value: totalLeaseCost * 0.84,
      },
      {
        month: "36M",
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

          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Lease Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg">
              Estimate lease payments,
              residual values,
              depreciation costs,
              and monthly leasing expenses.
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

              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Lease Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${monthlyPayment.toFixed(0)}
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
                    value={`$${monthlyPayment.toFixed(0)}`}
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
                    label="Finance Fees"
                    value={`$${(financeFee * leaseTerm).toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Lease Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A lease calculator helps consumers estimate
              monthly lease payments
              based on vehicle price,
              residual value,
              lease term,
              money factor,
              and upfront costs.
            </p>

            <p>
              Vehicle leasing differs from traditional financing
              because drivers pay primarily for depreciation
              rather than full ownership.
            </p>

            <p>
              Lease calculators help estimate:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly lease payments</li>

              <li>Total lease expenses</li>

              <li>Residual vehicle value</li>

              <li>Finance charges</li>

              <li>Depreciation costs</li>

            </ul>

            <p>
              Monthly lease payments
              usually depend on:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Vehicle purchase price</li>

              <li>Residual value</li>

              <li>Lease duration</li>

              <li>Money factor</li>

              <li>Down payment</li>

            </ul>

            <p>
              Residual value represents
              the estimated vehicle value
              at the end of the lease term.
            </p>

            <p>
              Higher residual values
              generally reduce monthly lease payments
              because the vehicle depreciates less
              during the lease period.
            </p>

            <p>
              The money factor
              is similar to an interest rate
              used in traditional financing.
            </p>

            <p>
              Lower money factors
              reduce finance fees
              and improve affordability.
            </p>

            <p>
              Leasing may provide:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Lower monthly payments</li>

              <li>Shorter ownership cycles</li>

              <li>Warranty coverage</li>

              <li>Access to newer vehicles</li>

            </ul>

            <p>
              However,
              leases may include:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Mileage restrictions</li>

              <li>Wear and tear charges</li>

              <li>Early termination fees</li>

              <li>No ownership equity</li>

            </ul>

            <p>
              Lease calculators help drivers compare
              leasing versus financing
              and estimate long-term transportation expenses.
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

                    <Cell fill="#4338ca" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Depreciation Cost"
                value={`$${(depreciationCost * leaseTerm).toFixed(0)}`}
              />

              <SummaryCard
                title="Finance Charges"
                value={`$${(financeFee * leaseTerm).toFixed(0)}`}
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
            Lease Payment Progression
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4338ca"
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
                  fill="#4338ca"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-5">
            Lease Formula
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
            Lease Example
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-lg">

            <p>
              A driver leasing
              a $42,000 vehicle
              with a residual value
              of $24,000
              over 36 months
              may pay approximately
              ${monthlyPayment.toFixed(0)}
              monthly.
            </p>

            <p>
              Total lease expenses
              may exceed
              ${totalLeaseCost.toFixed(0)}
              over the lease period.
            </p>

            <p>
              This example demonstrates
              how depreciation,
              residual value,
              and money factors
              influence monthly lease costs.
            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Lease FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8">

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a residual value?
              </h3>

              <p>
                Residual value is the estimated vehicle value
                at the end of the lease term.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                What is a money factor?
              </h3>

              <p>
                A money factor is the financing rate
                used to calculate lease interest costs.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Is leasing cheaper than financing?
              </h3>

              <p>
                Leasing may reduce monthly payments
                but does not build ownership equity.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Do leases have mileage limits?
              </h3>

              <p>
                Most leases include mileage restrictions
                and may charge fees for excess mileage.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-2xl mb-3">
                Should I put money down on a lease?
              </h3>

              <p>
                Down payments reduce monthly lease costs
                but may increase financial risk
                if the vehicle is totaled.
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
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
            >
              Car Payment Calculator
            </a>

            <a
              href="/car-affordability-calculator"
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
            >
              Car Affordability Calculator
            </a>

            <a
              href="/vehicle-loan-calculator"
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
            >
              Vehicle Loan Calculator
            </a>

            <a
              href="/trade-in-calculator"
              className="bg-slate-100 hover:bg-indigo-50 rounded-2xl p-5 font-bold"
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