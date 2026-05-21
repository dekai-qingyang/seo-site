"use client";

import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function InflationCalculator() {

  const [currentAmount, setCurrentAmount] = useState(10000);

  const [inflationRate, setInflationRate] = useState(3);

  const [years, setYears] = useState(20);

  const futureValue =
    currentAmount *
    Math.pow(
      1 + inflationRate / 100,
      years
    );

  const purchasingPowerLoss =
    futureValue - currentAmount;

  const yearlyInflationCost =
    purchasingPowerLoss / years;

  const realValueToday =
    currentAmount /
    Math.pow(
      1 + inflationRate / 100,
      years
    );

  const pieData = [
    {
      name: "Original Value",
      value: currentAmount,
    },

    {
      name: "Inflation Impact",
      value: purchasingPowerLoss,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: currentAmount *
          Math.pow(
            1 + inflationRate / 100,
            1
          ),
      },

      {
        year: "Year 5",
        value: currentAmount *
          Math.pow(
            1 + inflationRate / 100,
            5
          ),
      },

      {
        year: "Year 10",
        value: currentAmount *
          Math.pow(
            1 + inflationRate / 100,
            10
          ),
      },

      {
        year: "Year 15",
        value: currentAmount *
          Math.pow(
            1 + inflationRate / 100,
            15
          ),
      },

      {
        year: "Year 20",
        value: futureValue,
      },

    ];

  }, [
    currentAmount,
    inflationRate,
    futureValue,
  ]);

  const compareData = [
    {
      name: "Current Value",
      value: currentAmount,
    },

    {
      name: "Future Cost",
      value: futureValue,
    },

    {
      name: "Inflation Increase",
      value: purchasingPowerLoss,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-cyan-900 to-sky-500 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Inflation Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate future purchasing power,
              inflation impact,
              rising costs,
              and long-term money value using this professional inflation calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Current Amount"
                  value={currentAmount}
                  setValue={setCurrentAmount}
                  prefix="$"
                />

                <InputField
                  label="Annual Inflation Rate"
                  value={inflationRate}
                  setValue={setInflationRate}
                  suffix="%"
                />

                <InputField
                  label="Years"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-sky-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-cyan-900 to-sky-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Future Cost
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Inflation Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Purchasing Power Loss"
                    value={`$${purchasingPowerLoss.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Average Annual Inflation Cost"
                    value={`$${yearlyInflationCost.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Future Value"
                    value={`$${futureValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Real Value Today"
                    value={`$${realValueToday.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <SummaryCard
            title="Current Amount"
            value={`$${currentAmount.toFixed(0)}`}
          />

          <SummaryCard
            title="Inflation Impact"
            value={`$${purchasingPowerLoss.toFixed(0)}`}
          />

          <SummaryCard
            title="Future Cost"
            value={`$${futureValue.toFixed(0)}`}
          />

          <SummaryCard
            title="Inflation Rate"
            value={`${inflationRate}%`}
          />

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Inflation Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#164e63" />
                    <Cell fill="#38bdf8" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Current Purchasing Power"
                value={`$${currentAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Inflation Cost"
                value={`$${purchasingPowerLoss.toFixed(0)}`}
              />

              <SummaryCard
                title="Future Cost Estimate"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Inflation Growth Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#164e63"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Inflation Comparison Overview
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
                  fill="#164e63"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Inflation Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 overflow-auto mb-6">

            <code className="text-lg">
              Future Value = Present Value × (1 + Inflation Rate)^Years
            </code>

          </div>

          <p className="text-slate-700 leading-8">
            Inflation calculations estimate how prices increase over time due to rising costs and declining purchasing power.
            Compound inflation means prices may continue increasing year after year,
            significantly affecting future living expenses and long-term financial planning.
          </p>

        </section>

        {/* EXAMPLES */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Inflation Examples
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <div className="border rounded-2xl p-6">

              <h3 className="text-2xl font-black mb-3 text-slate-900">
                Example 1 — Grocery Costs
              </h3>

              <p>
                Suppose groceries cost $500 per month today and inflation averages 3% annually.
                Over time,
                food expenses may rise significantly due to compound inflation effects.
              </p>

            </div>

            <div className="border rounded-2xl p-6">

              <h3 className="text-2xl font-black mb-3 text-slate-900">
                Example 2 — Retirement Planning
              </h3>

              <p>
                Retirement investors commonly estimate future living expenses using inflation projections.
                Higher inflation rates may require larger retirement portfolios to maintain the same purchasing power.
              </p>

            </div>

          </div>

        </section>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Inflation Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An inflation calculator helps estimate how rising prices reduce purchasing power over time.
              Inflation affects nearly every aspect of personal finance,
              including retirement planning,
              savings,
              investing,
              housing costs,
              healthcare expenses,
              and long-term budgeting.
            </p>

            <p>
              Investors,
              businesses,
              and households commonly use inflation projections to estimate future expenses and evaluate the long-term value of money.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Inflation?
            </h3>

            <p>
              Inflation refers to the general increase in prices over time.
              As inflation rises,
              the purchasing power of money declines because goods and services become more expensive.
            </p>

            <p>
              Even moderate inflation may significantly affect long-term financial planning because inflation compounds year after year.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Inflation Matters
            </h3>

            <p>
              Inflation directly impacts daily living expenses,
              retirement planning,
              healthcare costs,
              education expenses,
              and long-term investment performance.
            </p>

            <p>
              Investors commonly seek investments that generate returns exceeding inflation in order to preserve purchasing power over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Purchasing Power
            </h3>

            <p>
              Purchasing power measures how much goods and services money can buy at different points in time.
              Higher inflation reduces purchasing power because prices rise faster than income or savings growth.
            </p>

            <p>
              Inflation-adjusted analysis helps individuals estimate realistic future financial needs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Inflation and Retirement
            </h3>

            <p>
              Retirement planning often requires long-term inflation projections because future living expenses may rise substantially over decades.
            </p>

            <p>
              Retirees commonly use inflation-adjusted income planning to estimate future healthcare,
              housing,
              and lifestyle costs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Inflation and Investing
            </h3>

            <p>
              Investors frequently compare nominal investment returns against inflation-adjusted real returns.
              Investments producing returns below inflation may lose purchasing power over time.
            </p>

            <p>
              Many long-term investors diversify across stocks,
              bonds,
              real estate,
              ETFs,
              and inflation-resistant assets to help reduce inflation risk.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Compound Inflation
            </h3>

            <p>
              Compound inflation means rising prices accumulate year after year,
              creating exponential long-term cost increases.
              Small inflation differences may produce large changes in future living expenses over long periods.
            </p>

            <p>
              Understanding compound inflation may help individuals make more informed long-term financial decisions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Inflation Risk Management
            </h3>

            <p>
              Inflation risk refers to the possibility that rising prices reduce the value of savings and future income.
              Investors commonly use diversification,
              long-term investing,
              and inflation-adjusted planning strategies to reduce inflation exposure.
            </p>

            <p>
              Financial planning strategies often incorporate inflation estimates to improve future budgeting accuracy.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is inflation?"
                answer="Inflation refers to rising prices over time, which reduces purchasing power and increases future living costs."
              />

              <FaqItem
                question="Why does inflation matter?"
                answer="Inflation affects savings, retirement planning, investment returns, and future living expenses."
              />

              <FaqItem
                question="What is purchasing power?"
                answer="Purchasing power measures how much goods and services money can buy over time."
              />

              <FaqItem
                question="Why do investors care about inflation?"
                answer="Inflation may reduce real investment returns and long-term portfolio purchasing power."
              />

            </div>

          </div>

        </section>

        {/* RELATED */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Related Calculators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              {
                title: "Real Return Calculator",
                link: "/real-return-calculator",
              },

              {
                title: "Present Value Calculator",
                link: "/present-value-calculator",
              },

              {
                title: "Future Value Calculator",
                link: "/future-value-calculator",
              },

              {
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
              },

              {
                title: "Wealth Calculator",
                link: "/wealth-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

            ].map((item) => (

              <a
                key={item.link}
                href={item.link}
                className="border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition"
              >

                <div className="font-bold text-lg text-slate-900">
                  {item.title}
                </div>

              </a>

            ))}

          </div>

        </div>

      </div>

    </main>

  );
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

      <label className="block text-sm font-bold mb-2 text-slate-800">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className={`w-full border border-slate-200 rounded-2xl py-3 bg-white text-black font-bold text-lg ${
            prefix ? "pl-10" : "pl-4"
          } ${suffix ? "pr-20" : "pr-4"}`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold text-sm">
            {suffix}
          </span>
        )}

      </div>

    </div>

  );

}

function SummaryRow({
  label,
  value,
}: any) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-600 font-semibold">
          {label}
        </span>

        <span className="font-black text-slate-900">
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

    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">

      <div className="text-slate-600 mb-2 font-semibold">
        {title}
      </div>

      <div className="text-3xl font-black tracking-tight text-slate-900">
        {value}
      </div>

    </div>

  );

}

function FaqItem({
  question,
  answer,
}: any) {

  return (

    <div className="border rounded-2xl p-6">

      <h3 className="font-black text-xl mb-3 text-slate-900">
        {question}
      </h3>

      <p className="text-slate-700 leading-8">
        {answer}
      </p>

    </div>

  );

}