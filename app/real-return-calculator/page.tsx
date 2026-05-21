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
} from "recharts";

export default function RealReturnCalculator() {

  const [investmentAmount, setInvestmentAmount] = useState(50000);

  const [nominalReturn, setNominalReturn] = useState(8);

  const [inflationRate, setInflationRate] = useState(3);

  const [years, setYears] = useState(20);

  const realReturnRate =
    (
      (
        (1 + nominalReturn / 100) /
        (1 + inflationRate / 100)
      ) - 1
    ) * 100;

  const futureNominalValue =
    investmentAmount *
    Math.pow(
      1 + nominalReturn / 100,
      years
    );

  const futureRealValue =
    investmentAmount *
    Math.pow(
      1 + realReturnRate / 100,
      years
    );

  const inflationImpact =
    futureNominalValue - futureRealValue;

  const pieData = [
    {
      name: "Real Value",
      value: futureRealValue,
    },

    {
      name: "Inflation Impact",
      value: inflationImpact,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        nominal: futureNominalValue * 0.08,
        real: futureRealValue * 0.09,
      },

      {
        year: "Year 5",
        nominal: futureNominalValue * 0.32,
        real: futureRealValue * 0.28,
      },

      {
        year: "Year 10",
        nominal: futureNominalValue * 0.58,
        real: futureRealValue * 0.49,
      },

      {
        year: "Year 15",
        nominal: futureNominalValue * 0.81,
        real: futureRealValue * 0.72,
      },

      {
        year: "Year 20",
        nominal: futureNominalValue,
        real: futureRealValue,
      },

    ];

  }, [
    futureNominalValue,
    futureRealValue,
  ]);

  const compareData = [
    {
      name: "Nominal Value",
      value: futureNominalValue,
    },

    {
      name: "Real Value",
      value: futureRealValue,
    },

    {
      name: "Inflation Loss",
      value: inflationImpact,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-violet-900 to-purple-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Real Return Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate inflation-adjusted investment returns,
              real purchasing power,
              portfolio growth,
              and long-term investment performance using this free real return calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Investment Amount"
                  value={investmentAmount}
                  setValue={setInvestmentAmount}
                  prefix="$"
                />

                <InputField
                  label="Nominal Annual Return"
                  value={nominalReturn}
                  setValue={setNominalReturn}
                  suffix="%"
                />

                <InputField
                  label="Inflation Rate"
                  value={inflationRate}
                  setValue={setInflationRate}
                  suffix="%"
                />

                <InputField
                  label="Investment Years"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-purple-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-violet-900 to-purple-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Real Return Rate
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  {realReturnRate.toFixed(2)}%
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Real Return Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Future Nominal Value"
                    value={`$${futureNominalValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Future Real Value"
                    value={`$${futureRealValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Inflation Impact"
                    value={`$${inflationImpact.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Real Return Rate"
                    value={`${realReturnRate.toFixed(2)}%`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Real Return Breakdown
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

                    <Cell fill="#4c1d95" />
                    <Cell fill="#c084fc" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Future Real Value"
                value={`$${futureRealValue.toFixed(0)}`}
              />

              <SummaryCard
                title="Inflation Loss"
                value={`$${inflationImpact.toFixed(0)}`}
              />

              <SummaryCard
                title="Nominal Future Value"
                value={`$${futureNominalValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Real vs Nominal Growth Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="nominal"
                  stroke="#4c1d95"
                  strokeWidth={4}
                />

                <Line
                  type="monotone"
                  dataKey="real"
                  stroke="#c084fc"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Investment Comparison Overview
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
                  fill="#4c1d95"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Real Return Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A real return calculator helps investors estimate inflation-adjusted investment performance by accounting for the effects of inflation on purchasing power.
              Real returns provide a more accurate measurement of investment growth because they reflect actual increases in wealth after inflation is considered.
            </p>

            <p>
              Investors commonly use real return calculations when evaluating retirement planning,
              portfolio performance,
              long-term investing,
              wealth accumulation,
              and future purchasing power projections.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Real Return?
            </h3>

            <p>
              Real return represents the actual investment return after subtracting inflation.
              While nominal returns show total investment growth,
              real returns reflect the true increase in purchasing power over time.
            </p>

            <p>
              Inflation reduces the value of money,
              meaning nominal investment gains may appear larger than actual real-world wealth growth.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Real Return Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Real Return = ((1 + Nominal Return) / (1 + Inflation Rate)) - 1
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Nominal Return = Total investment return before inflation
              </li>

              <li>
                Inflation Rate = Annual inflation percentage
              </li>

              <li>
                Real Return = Inflation-adjusted investment growth
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Real Returns Matter
            </h3>

            <p>
              Real returns provide a more realistic measurement of investment performance because they reflect actual purchasing power growth instead of raw portfolio gains alone.
            </p>

            <p>
              Investors focusing only on nominal returns may underestimate the long-term impact inflation can have on retirement savings and future financial goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Real Return Scenario
            </h3>

            <p>
              Suppose an investment portfolio earns an average annual return of 8% while inflation averages 3%.
              Although the nominal return equals 8%,
              the inflation-adjusted real return is significantly lower.
            </p>

            <p>
              Over long investment periods,
              even moderate inflation may substantially reduce future purchasing power and overall real investment growth.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Inflation and Purchasing Power
            </h3>

            <p>
              Inflation gradually increases the cost of goods and services over time,
              reducing the purchasing power of future money.
              Real return analysis helps investors estimate whether investment growth is truly outpacing inflation.
            </p>

            <p>
              Retirement planning strategies commonly incorporate inflation assumptions to better estimate future living expenses and investment needs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Real Returns and Retirement Planning
            </h3>

            <p>
              Retirement investors frequently rely on real return projections when estimating future portfolio sustainability and passive income potential.
            </p>

            <p>
              Conservative retirement plans often use inflation-adjusted return assumptions to improve long-term financial planning accuracy.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Investment Risk and Diversification
            </h3>

            <p>
              Investment returns may fluctuate depending on market volatility,
              economic conditions,
              inflation trends,
              and portfolio allocation strategies.
              Diversified investments may help reduce overall portfolio risk and improve long-term stability.
            </p>

            <p>
              Investors commonly diversify across stocks,
              ETFs,
              bonds,
              real estate,
              and inflation-resistant assets to protect long-term purchasing power.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Real Return vs Nominal Return
            </h3>

            <p>
              Nominal returns represent raw investment gains before inflation,
              while real returns represent actual purchasing power growth after inflation adjustments.
            </p>

            <p>
              Understanding the difference between nominal and real returns may help investors make more informed long-term financial decisions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a real return?"
                answer="A real return measures investment performance after adjusting for inflation and purchasing power changes."
              />

              <FaqItem
                question="Why is inflation important in investing?"
                answer="Inflation reduces purchasing power over time, meaning future money may buy fewer goods and services."
              />

              <FaqItem
                question="What is the difference between nominal and real returns?"
                answer="Nominal returns show total investment growth before inflation, while real returns account for inflation effects."
              />

              <FaqItem
                question="Why do retirement plans use real returns?"
                answer="Real return assumptions provide more realistic long-term estimates for future purchasing power and retirement sustainability."
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
                title: "Inflation Calculator",
                link: "/inflation-calculator",
              },

              {
                title: "Annual Return Calculator",
                link: "/annual-return-calculator",
              },

              {
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
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

    <div className="bg-slate-100 rounded-2xl p-5">

      <div className="text-slate-600 mb-1 font-semibold">
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