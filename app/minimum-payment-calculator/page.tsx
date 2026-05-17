"use client";

import InputField from "@/components/InputField";

import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function MinimumPaymentCalculator() {

  const [balance, setBalance] =
    useState(8500);

  const [interestRate, setInterestRate] =
    useState(22);

  const [minimumPercent, setMinimumPercent] =
    useState(3);

  const [extraPayment, setExtraPayment] =
    useState(120);

  const minimumPayment =
    balance *
    (minimumPercent / 100);

  const monthlyRate =
    interestRate / 100 / 12;

  const estimatedInterest =
    balance * monthlyRate * 12;

  const payoffMonths =
    balance /
    (minimumPayment + extraPayment);

  const totalInterest =
    estimatedInterest *
    (payoffMonths / 12);

  const totalRepayment =
    balance + totalInterest;

  const pieData = [
    {
      name: "Balance",
      value: balance,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ];

  const compareData = [
    {
      name: "Minimum Payment",
      value: minimumPayment,
    },
    {
      name: "Extra Payment",
      value: extraPayment,
    },
    {
      name: "Interest Cost",
      value: totalInterest,
    },
  ];

  const trendData = useMemo(() => {

    return [
      {
        month: "Month 1",
        value: balance * 0.92,
      },
      {
        month: "Month 6",
        value: balance * 0.68,
      },
      {
        month: "Month 12",
        value: balance * 0.46,
      },
      {
        month: "Month 18",
        value: balance * 0.24,
      },
      {
        month: "Month 24",
        value: balance * 0.08,
      },
    ];

  }, [balance]);

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              Minimum Payment Calculator
            </h1>

            <p className="text-rose-100 text-sm lg:text-lg">
              Estimate minimum credit card payments,
              payoff timelines,
              interest costs,
              and debt repayment strategies.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Credit Card Balance"
                  value={balance}
                  setValue={setBalance}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Minimum Payment Percentage"
                  value={minimumPercent}
                  setValue={setMinimumPercent}
                  suffix="%"
                />

                <InputField
                  label="Extra Monthly Payment"
                  value={extraPayment}
                  setValue={setExtraPayment}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-rose-50 to-white p-4 lg:p-8">

              <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white rounded-3xl p-5 lg:p-8 mb-6">

                <p className="text-rose-100 mb-2">
                  Estimated Minimum Payment
                </p>

                <h2 className="text-4xl lg:text-5xl font-black">
                  ${minimumPayment.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Payment Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Minimum Payment"
                    value={`$${minimumPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Payoff Time"
                    value={`${payoffMonths.toFixed(0)} months`}
                  />

                  <SummaryRow
                    label="Total Repayment"
                    value={`$${totalRepayment.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* IMAGE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-4 lg:p-8 mt-6">

          <div className="w-full h-[300px] lg:h-[420px] overflow-hidden rounded-3xl">

            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop"
              className="w-full h-full object-cover rounded-3xl"
              alt="Minimum payment calculator"
            />

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Debt Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#be123c" />
                    <Cell fill="#fda4af" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Balance"
                value={`$${balance.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Cost"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Repayment"
                value={`$${totalRepayment.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Balance Reduction Trend
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#be123c"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6">

          <h2 className="text-3xl font-black mb-6">
            Payment Comparison
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <BarChart data={compareData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#be123c"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-6 mb-10">

          <h2 className="text-3xl font-black mb-5">
            Minimum Payment Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-5 overflow-x-auto">

            <p className="text-lg font-mono">
              Minimum Payment =
              Credit Card Balance × Minimum Percentage
            </p>

          </div>

        </div>

      </div>

    </main>

  );
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

  );
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

  );

}