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

export default function AnnualReturnCalculator() {

  const [startingValue, setStartingValue] = useState(20000);

  const [endingValue, setEndingValue] = useState(45000);

  const [years, setYears] = useState(10);

  const totalReturn =
    (
      (
        endingValue - startingValue
      ) / startingValue
    ) * 100;

  const annualizedReturn =
    (
      Math.pow(
        endingValue / startingValue,
        1 / years
      ) - 1
    ) * 100;

  const totalGrowth =
    endingValue - startingValue;

  const yearlyGrowth =
    totalGrowth / years;

  const pieData = [
    {
      name: "Initial Investment",
      value: startingValue,
    },

    {
      name: "Investment Growth",
      value: totalGrowth,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value:
          startingValue +
          yearlyGrowth * 1,
      },

      {
        year: "Year 3",
        value:
          startingValue +
          yearlyGrowth * 3,
      },

      {
        year: "Year 5",
        value:
          startingValue +
          yearlyGrowth * 5,
      },

      {
        year: "Year 7",
        value:
          startingValue +
          yearlyGrowth * 7,
      },

      {
        year: "Year 10",
        value: endingValue,
      },
    ];

  }, [
    startingValue,
    endingValue,
    yearlyGrowth,
  ]);

  const compareData = [
    {
      name: "Starting Value",
      value: startingValue,
    },

    {
      name: "Growth",
      value: totalGrowth,
    },

    {
      name: "Ending Value",
      value: endingValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-blue-900 to-cyan-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Annual Return Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate annualized investment returns,
              yearly portfolio performance,
              compound growth,
              and long-term investment gains using this free annual return calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Starting Investment Value"
                  value={startingValue}
                  setValue={setStartingValue}
                  prefix="$"
                />

                <InputField
                  label="Ending Investment Value"
                  value={endingValue}
                  setValue={setEndingValue}
                  prefix="$"
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

            <div className="bg-gradient-to-b from-cyan-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-blue-900 to-cyan-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Annualized Return
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  {annualizedReturn.toFixed(2)}%
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Annual Return Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Initial Investment"
                    value={`$${startingValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Ending Portfolio"
                    value={`$${endingValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Return"
                    value={`${totalReturn.toFixed(2)}%`}
                  />

                  <SummaryRow
                    label="Annualized Return"
                    value={`${annualizedReturn.toFixed(2)}%`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Investment Return Breakdown
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

                    <Cell fill="#1e3a8a" />
                    <Cell fill="#67e8f9" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Starting Value"
                value={`$${startingValue.toFixed(0)}`}
              />

              <SummaryCard
                title="Investment Growth"
                value={`$${totalGrowth.toFixed(0)}`}
              />

              <SummaryCard
                title="Final Portfolio"
                value={`$${endingValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Annual Growth Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1e3a8a"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Portfolio Comparison Overview
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
                  fill="#1e3a8a"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Annual Return Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An annual return calculator helps investors estimate yearly investment performance,
              annualized returns,
              portfolio growth,
              and long-term investment profitability.
              Annual return calculations are widely used in retirement planning,
              stock investing,
              mutual fund analysis,
              ETF investing,
              and portfolio management.
            </p>

            <p>
              Investors often compare annualized returns to evaluate how efficiently investments perform over time.
              Understanding annual return percentages may help investors compare portfolios,
              measure risk-adjusted performance,
              and evaluate long-term investment strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Annual Return?
            </h3>

            <p>
              Annual return refers to the yearly percentage gain or loss generated by an investment over a specific time period.
              It measures how much an investment grows on average each year,
              including compound growth effects.
            </p>

            <p>
              Annualized return calculations are commonly used because they standardize performance comparisons across investments with different durations.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Annual Return Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Annual Return = (Ending Value / Starting Value)^(1 ÷ Years) - 1
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Starting Value = Initial investment amount
              </li>

              <li>
                Ending Value = Final portfolio balance
              </li>

              <li>
                Years = Investment duration
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Annualized Returns Matter
            </h3>

            <p>
              Annualized returns provide a standardized measurement of investment performance.
              Investors may compare stocks,
              ETFs,
              mutual funds,
              retirement accounts,
              and portfolios more effectively using annualized performance metrics.
            </p>

            <p>
              Long-term investors often focus on consistent annual returns rather than short-term market fluctuations.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Annual Return Scenario
            </h3>

            <p>
              Suppose an investor grows a $20,000 portfolio into $45,000 over ten years.
              The annualized return calculation estimates the average yearly growth rate required to achieve that result.
            </p>

            <p>
              This helps investors compare performance against benchmarks,
              index funds,
              retirement goals,
              and alternative investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Factors Affecting Annual Returns
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Market volatility
              </li>

              <li>
                Economic conditions
              </li>

              <li>
                Investment fees and expenses
              </li>

              <li>
                Asset allocation strategies
              </li>

              <li>
                Portfolio diversification
              </li>

              <li>
                Interest rates and inflation
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Compound Growth and Annual Returns
            </h3>

            <p>
              Compound growth significantly affects long-term investment performance.
              Even moderate annual returns may produce substantial portfolio growth over long periods due to compounding effects.
            </p>

            <p>
              Investors who begin investing early often benefit more from compound growth because returns continue accumulating over decades.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Risk and Return Relationship
            </h3>

            <p>
              Investments with higher potential returns generally involve higher levels of market risk and volatility.
              Conservative portfolios may generate lower annual returns but offer reduced downside risk compared to aggressive growth portfolios.
            </p>

            <p>
              Investors commonly balance return objectives with risk tolerance and investment time horizons.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Using Annual Returns for Planning
            </h3>

            <p>
              Annual return estimates may help investors create realistic retirement plans,
              calculate future portfolio balances,
              and evaluate financial independence goals.
            </p>

            <p>
              Long-term planning often benefits from consistent investing,
              diversification,
              and disciplined portfolio management strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a good annual investment return?"
                answer="Long-term diversified stock portfolios historically average around 7% to 10% annual returns depending on allocation and market conditions."
              />

              <FaqItem
                question="Why is annualized return important?"
                answer="Annualized returns standardize investment performance comparisons across different time periods and portfolios."
              />

              <FaqItem
                question="Does annual return include compound growth?"
                answer="Yes. Annualized return calculations account for compound growth effects over time."
              />

              <FaqItem
                question="Can annual returns vary every year?"
                answer="Yes. Investment returns fluctuate depending on market conditions, economic trends, and portfolio allocation."
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
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "ETF Calculator",
                link: "/etf-calculator",
              },

              {
                title: "Mutual Fund Calculator",
                link: "/mutual-fund-calculator",
              },

              {
                title: "Stock Calculator",
                link: "/stock-calculator",
              },

              {
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
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