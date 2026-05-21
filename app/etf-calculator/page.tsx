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

export default function ETFCalculator() {

  const [investment, setInvestment] = useState(15000);

  const [annualReturn, setAnnualReturn] = useState(8);

  const [years, setYears] = useState(20);

  const [monthlyContribution, setMonthlyContribution] = useState(500);

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
      name: "ETF Growth",
      value: investmentGrowth,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: futureValue * 0.07,
      },

      {
        year: "Year 5",
        value: futureValue * 0.28,
      },

      {
        year: "Year 10",
        value: futureValue * 0.53,
      },

      {
        year: "Year 15",
        value: futureValue * 0.76,
      },

      {
        year: "Year 20",
        value: futureValue,
      },
    ];

  }, [futureValue]);

  const compareData = [
    {
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Growth",
      value: investmentGrowth,
    },

    {
      name: "Portfolio",
      value: futureValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-cyan-700 to-blue-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              ETF Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate ETF investment growth,
              portfolio returns,
              compound earnings,
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

            <div className="bg-gradient-to-b from-cyan-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-cyan-700 to-blue-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated ETF Portfolio
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    ETF Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
                    value={`$${totalContributions.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="ETF Growth"
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
            ETF Portfolio Breakdown
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

                    <Cell fill="#0369a1" />
                    <Cell fill="#7dd3fc" />

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
                title="ETF Earnings"
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
            ETF Growth Timeline
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
                  stroke="#0369a1"
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
                  fill="#0369a1"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            ETF Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An ETF calculator helps investors estimate future portfolio value,
              compound growth,
              dividend reinvestment,
              and long-term ETF investment performance.
              ETFs,
              also known as exchange-traded funds,
              are among the most popular investment products used for diversification and passive investing strategies.
            </p>

            <p>
              ETF investing allows investors to buy baskets of assets through a single fund.
              Many ETFs track stock indexes,
              sectors,
              commodities,
              bonds,
              or global markets.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is an ETF?
            </h3>

            <p>
              An ETF is an exchange-traded fund that holds multiple securities and trades on stock exchanges similarly to individual stocks.
              ETFs often provide instant diversification,
              lower management fees,
              and flexible trading opportunities.
            </p>

            <p>
              Investors commonly use ETFs for retirement investing,
              passive income strategies,
              long-term wealth accumulation,
              and diversified portfolio construction.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              ETF Growth Formula
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
                r = Average annual return rate
              </li>

              <li>
                n = Number of compounding periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of ETF Investing
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Instant diversification
              </li>

              <li>
                Lower management costs
              </li>

              <li>
                Long-term compound growth
              </li>

              <li>
                Flexible stock exchange trading
              </li>

              <li>
                Exposure to multiple markets and sectors
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example ETF Scenario
            </h3>

            <p>
              Suppose an investor contributes $15,000 initially and adds $500 monthly into diversified ETFs earning an average annual return of 8%.
              Over 20 years,
              compounding and recurring contributions may significantly increase portfolio value.
            </p>

            <p>
              Many long-term investors use ETFs to automate retirement contributions and maintain diversified investment exposure.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Diversification Matters
            </h3>

            <p>
              Diversification helps reduce investment risk by spreading capital across multiple securities,
              industries,
              and markets.
              ETFs simplify diversification because a single ETF may contain hundreds or thousands of holdings.
            </p>

            <p>
              Broad market ETFs are commonly used in passive investing and FIRE strategies because of their low costs and long-term growth potential.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Dividend Reinvestment
            </h3>

            <p>
              Many ETFs distribute dividends.
              Reinvesting dividends may accelerate portfolio growth because dividends purchase additional ETF shares that may generate future returns.
            </p>

            <p>
              Dividend reinvestment is a key component of many long-term wealth accumulation strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              ETF Risks
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Market volatility
              </li>

              <li>
                Economic downturns
              </li>

              <li>
                Interest rate risk
              </li>

              <li>
                Sector concentration risk
              </li>

              <li>
                Tracking error risk
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              ETF vs Mutual Funds
            </h3>

            <p>
              ETFs trade throughout the day like stocks,
              while mutual funds are generally priced once daily.
              ETFs often have lower fees and greater tax efficiency compared to traditional mutual funds.
            </p>

            <p>
              However,
              both ETFs and mutual funds may provide diversified investment exposure depending on investor goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Are ETFs good for beginners?"
                answer="Many beginner investors use ETFs because they offer diversification, lower costs, and simplified investing."
              />

              <FaqItem
                question="Can ETFs pay dividends?"
                answer="Yes. Many ETFs distribute dividends that may be reinvested for additional growth."
              />

              <FaqItem
                question="Are ETFs safer than individual stocks?"
                answer="Diversified ETFs may reduce company-specific risk compared to investing in single stocks."
              />

              <FaqItem
                question="What return should I expect from ETFs?"
                answer="Returns vary by ETF type, market conditions, and investment strategy. Historical stock market ETF returns often average between 7% and 10% annually over long periods."
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
                title: "Stock Calculator",
                link: "/stock-calculator",
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
                title: "Mutual Fund Calculator",
                link: "/mutual-fund-calculator",
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