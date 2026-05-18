"use client";

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

export default function DebtPayoffCalculator() {

  const [balance, setBalance] = useState(15000);

  const [interestRate, setInterestRate] = useState(18);

  const [monthlyPayment, setMonthlyPayment] = useState(450);

  const monthlyInterest =
    (balance * (interestRate / 100)) / 12;

  const estimatedMonths =
    balance / (monthlyPayment - monthlyInterest);

  const totalInterest =
    monthlyInterest * estimatedMonths;

  const totalRepayment =
    balance + totalInterest;

  const pieData = [
    {
      name: "Debt Balance",
      value: balance,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
  ];

  const compareData = [
    {
      name: "Balance",
      value: balance,
    },
    {
      name: "Interest",
      value: totalInterest,
    },
    {
      name: "Monthly Payment",
      value: monthlyPayment,
    },
  ];

  const trendData = useMemo(() => {

    return [
      {
        month: "Month 1",
        value: balance * 0.94,
      },
      {
        month: "Month 6",
        value: balance * 0.72,
      },
      {
        month: "Month 12",
        value: balance * 0.55,
      },
      {
        month: "Month 18",
        value: balance * 0.32,
      },
      {
        month: "Month 24",
        value: balance * 0.08,
      },
    ];

  }, [balance]);

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white px-6 py-8">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Debt Payoff Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Calculate debt payoff time,
              monthly interest costs,
              repayment schedules,
              and total borrowing expenses.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Debt Balance
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">
                      $
                    </span>

                    <input
                      type="number"
                      value={balance}
                      onChange={(e) =>
                        setBalance(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Interest Rate
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) =>
                        setInterestRate(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700">
                      %
                    </span>

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Monthly Payment
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">
                      $
                    </span>

                    <input
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) =>
                        setMonthlyPayment(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white rounded-3xl p-6 mb-6">

                <p className="text-blue-100 mb-2">
                  Estimated Debt Free Time
                </p>

                <h2 className="text-5xl font-black">
                  {estimatedMonths.toFixed(0)} Months
                </h2>

              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-bold">
                    Payment Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Monthly Interest"
                    value={`$${monthlyInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Debt Free Timeline"
                    value={`${estimatedMonths.toFixed(0)} months`}
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

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

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

                    <Cell fill="#1d4ed8" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Debt Balance"
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

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Debt Reduction Trend
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
                  stroke="#1d4ed8"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

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
                  fill="#1d4ed8"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>
{/* RELATED TOOLS */}

<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

  <h2 className="text-3xl font-black mb-6">
    Related Calculators
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

    {[
      {
        title: "Loan Payoff Calculator",
        link: "/loan-payoff-calculator",
      },

      {
        title: "Personal Loan Calculator",
        link: "/personal-loan-calculator",
      },

      {
        title: "APR Calculator",
        link: "/apr-calculator",
      },

      {
        title: "Balance Transfer Calculator",
        link: "/balance-transfer-calculator",
      },

      {
        title: "Debt Consolidation Calculator",
        link: "/debt-consolidation-calculator",
      },

      {
        title: "Credit Utilization Calculator",
        link: "/credit-utilization-calculator",
      },

    ].map((item) => (

      <a
        key={item.link}
        href={item.link}
        className="border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition"
      >

        <div className="font-bold text-lg">
          {item.title}
        </div>

      </a>

    ))}

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

        <span className="text-slate-700">
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

      <div className="text-slate-700 mb-1">
        {title}
      </div>

      <div className="text-2xl font-black">
        {value}
      </div>

    </div>

  );

}