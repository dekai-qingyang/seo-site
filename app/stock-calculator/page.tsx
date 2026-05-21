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

export default function StockCalculator() {

  const [investment, setInvestment] = useState(10000);

  const [annualReturn, setAnnualReturn] = useState(10);

  const [years, setYears] = useState(15);

  const [monthlyContribution, setMonthlyContribution] = useState(300);

  const monthlyRate =
    annualReturn / 100 / 12;

  const totalMonths =
    years * 12;

  let futureValue =
    investment *
    Math.pow(1 + monthlyRate, totalMonths);

  futureValue +=
    monthlyContribution *
    (
      (
        Math.pow(1 + monthlyRate, totalMonths) - 1
      ) / monthlyRate
    );

  const totalContributions =
    investment +
    monthlyContribution * totalMonths;

  const investmentGrowth =
    futureValue - totalContributions;

  const annualizedReturn =
    (
      (
        futureValue /
        totalContributions
      ) **
      (1 / years) -
      1
    ) * 100;

  const pieData = [
    {
      name: "Deposits",
      value: totalContributions,
    },

    {
      name: "Growth",
      value: investmentGrowth,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: futureValue * 0.08,
      },

      {
        year: "Year 3",
        value: futureValue * 0.23,
      },

      {
        year: "Year 5",
        value: futureValue * 0.39,
      },

      {
        year: "Year 10",
        value: futureValue * 0.71,
      },

      {
        year: "Year 15",
        value: futureValue,
      },
    ];

  }, [futureValue]);

  const compareData = [
    {
      name: "Deposits",
      value: totalContributions,
    },

    {
      name: "Investment Growth",
      value: investmentGrowth,
    },

    {
      name: "Final Portfolio",
      value: futureValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-700 to-green-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Stock Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate stock investment growth,
              compound returns,
              portfolio performance,
              dividend reinvestment,
              and long-term wealth accumulation.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Initial Investment"
                  value={investment}
                  setValue={setInvestment}
                  prefix="$"
                />

                <InputField
                  label="Expected Annual Return"
                  value={annualReturn}
                  setValue={setAnnualReturn}
                  suffix="%"
                />

                <InputField
                  label="Investment Years"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-emerald-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-700 to-green-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Portfolio Value
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Investment Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
                    value={`$${totalContributions.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Investment Growth"
                    value={`$${investmentGrowth.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Annualized Return"
                    value={`${annualizedReturn.toFixed(2)}%`}
                  />

                  <SummaryRow
                    label="Projected Portfolio"
                    value={`$${futureValue.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Portfolio Breakdown
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

                    <Cell fill="#047857" />
                    <Cell fill="#6ee7b7" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Invested Capital"
                value={`$${totalContributions.toFixed(0)}`}
              />

              <SummaryCard
                title="Growth Earnings"
                value={`$${investmentGrowth.toFixed(0)}`}
              />

              <SummaryCard
                title="Portfolio Value"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Stock Portfolio Growth Timeline
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
                  dataKey="value"
                  stroke="#047857"
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
                  fill="#047857"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Stock Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A stock calculator helps investors estimate future portfolio value,
              investment growth,
              annual returns,
              and long-term wealth accumulation.
              Stock investing remains one of the most popular strategies for building wealth through compound growth and capital appreciation.
            </p>

            <p>
              Investors commonly use stock calculators to estimate future investment performance,
              compare return scenarios,
              and evaluate how monthly contributions may affect portfolio growth over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Stock Investing Works
            </h3>

            <p>
              Stocks represent ownership shares in publicly traded companies.
              Investors may profit through stock price appreciation,
              dividend income,
              and long-term portfolio growth.
            </p>

            <p>
              Historically,
              broad stock market indexes have generated long-term annual returns that outperform many traditional savings products,
              although stock investing also involves market volatility and investment risk.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Stock Growth Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Future Value = Principal × (1 + r)^n
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Principal = Initial investment amount
              </li>

              <li>
                r = Investment return rate
              </li>

              <li>
                n = Number of compounding periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Long-Term Stock Investing
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Potential long-term capital appreciation
              </li>

              <li>
                Compound investment growth
              </li>

              <li>
                Dividend income opportunities
              </li>

              <li>
                Inflation protection potential
              </li>

              <li>
                Wealth accumulation over time
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example Stock Investment Scenario
            </h3>

            <p>
              Suppose an investor contributes $10,000 initially and adds $300 monthly into a diversified stock portfolio earning an average 10% annual return.
              Over 15 years,
              compound growth may significantly increase total portfolio value.
            </p>

            <p>
              Consistent investing combined with long investment horizons often produces stronger long-term outcomes than short-term trading strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Growth Matters
            </h3>

            <p>
              Compound growth allows investment earnings to generate additional earnings over time.
              As portfolios grow,
              future returns apply to larger balances,
              accelerating long-term wealth accumulation.
            </p>

            <p>
              Investors who begin investing early may benefit substantially from compounding over multiple decades.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Important Stock Market Risks
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Market volatility
              </li>

              <li>
                Economic downturns
              </li>

              <li>
                Company-specific risks
              </li>

              <li>
                Inflation and interest rate changes
              </li>

              <li>
                Short-term price fluctuations
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Diversification Strategies
            </h3>

            <p>
              Many investors reduce risk by diversifying portfolios across industries,
              geographic regions,
              ETFs,
              mutual funds,
              and asset classes.
            </p>

            <p>
              Diversification does not eliminate investment risk,
              but it may reduce the impact of poor performance from individual investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Dividend Reinvestment
            </h3>

            <p>
              Reinvesting dividends may further accelerate portfolio growth because dividends purchase additional shares that generate future returns.
            </p>

            <p>
              Long-term dividend reinvestment strategies are commonly used in retirement investing and passive wealth-building plans.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What annual return should I expect from stocks?"
                answer="Historical long-term stock market returns often average between 7% and 10%, although future performance is never guaranteed."
              />

              <FaqItem
                question="Do monthly contributions improve portfolio growth?"
                answer="Yes. Consistent investing may significantly increase long-term compound growth."
              />

              <FaqItem
                question="Should I reinvest dividends?"
                answer="Many long-term investors reinvest dividends to maximize compounding potential."
              />

              <FaqItem
                question="Are stocks risky investments?"
                answer="Stocks involve market risk and price volatility, but diversified long-term investing may reduce overall risk exposure."
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
                title: "ETF Calculator",
                link: "/etf-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "Investment Calculator",
                link: "/investment-calculator",
              },

              {
                title: "Dividend Calculator",
                link: "/dividend-calculator",
              },

              {
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
              },

              {
                title: "Net Worth Calculator",
                link: "/net-worth-calculator",
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