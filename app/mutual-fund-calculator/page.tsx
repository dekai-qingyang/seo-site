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

export default function MutualFundCalculator() {

  const [investment, setInvestment] = useState(20000);

  const [annualReturn, setAnnualReturn] = useState(9);

  const [years, setYears] = useState(25);

  const [monthlyContribution, setMonthlyContribution] = useState(400);

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
      name: "Contributions",
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
        value: futureValue * 0.05,
      },

      {
        year: "Year 5",
        value: futureValue * 0.24,
      },

      {
        year: "Year 10",
        value: futureValue * 0.47,
      },

      {
        year: "Year 15",
        value: futureValue * 0.68,
      },

      {
        year: "Year 25",
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

          <div className="bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Mutual Fund Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate mutual fund investment growth,
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

            <div className="bg-gradient-to-b from-purple-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Mutual Fund Value
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Mutual Fund Summary
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
            Mutual Fund Portfolio Breakdown
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

                    <Cell fill="#7c3aed" />
                    <Cell fill="#c4b5fd" />

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
                title="Investment Growth"
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
            Mutual Fund Growth Timeline
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
                  stroke="#7c3aed"
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
                  fill="#7c3aed"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Mutual Fund Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A mutual fund calculator helps investors estimate long-term portfolio growth,
              compound returns,
              investment earnings,
              and future account balances.
              Mutual funds remain one of the most widely used investment vehicles for retirement savings,
              wealth accumulation,
              and diversified portfolio management.
            </p>

            <p>
              Investors often use mutual fund calculators to estimate how recurring contributions and compound growth may affect long-term investment performance.
              Mutual funds may provide diversified exposure to stocks,
              bonds,
              international markets,
              and other asset classes.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is a Mutual Fund?
            </h3>

            <p>
              A mutual fund pools money from multiple investors and invests that capital into diversified portfolios managed by professional fund managers.
              Investors purchase shares of the mutual fund rather than individual securities directly.
            </p>

            <p>
              Mutual funds are commonly used in retirement accounts,
              employer-sponsored plans,
              long-term savings portfolios,
              and passive investment strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Mutual Fund Growth Formula
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
                r = Expected annual return rate
              </li>

              <li>
                n = Number of compounding periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Mutual Fund Investing
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Professional portfolio management
              </li>

              <li>
                Broad diversification
              </li>

              <li>
                Long-term compound growth
              </li>

              <li>
                Automatic reinvestment options
              </li>

              <li>
                Access to multiple asset classes
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example Mutual Fund Scenario
            </h3>

            <p>
              Suppose an investor contributes $20,000 initially and adds $400 monthly into diversified mutual funds earning an average annual return of 9%.
              Over 25 years,
              recurring investments and compounding may significantly increase total portfolio value.
            </p>

            <p>
              Long-term investing combined with disciplined contributions is commonly used for retirement planning and financial independence goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Growth Matters
            </h3>

            <p>
              Compound growth allows investment returns to generate additional returns over time.
              As mutual fund balances increase,
              future earnings apply to larger portfolio values,
              accelerating long-term wealth accumulation.
            </p>

            <p>
              Investors who begin saving early often benefit substantially from multi-decade compounding effects.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Mutual Fund Risks
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Market volatility
              </li>

              <li>
                Interest rate fluctuations
              </li>

              <li>
                Economic downturns
              </li>

              <li>
                Fund management risk
              </li>

              <li>
                Sector concentration exposure
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Mutual Funds vs ETFs
            </h3>

            <p>
              Mutual funds are generally priced once daily after market close,
              while ETFs trade throughout the trading day like stocks.
              ETFs often have lower expense ratios,
              while mutual funds may provide active portfolio management and automatic investment programs.
            </p>

            <p>
              Both mutual funds and ETFs may provide diversified exposure depending on investor objectives and portfolio strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Dividend Reinvestment
            </h3>

            <p>
              Many mutual funds distribute dividends and capital gains.
              Reinvesting those distributions may accelerate portfolio growth by purchasing additional shares that generate future returns.
            </p>

            <p>
              Dividend reinvestment is widely used in retirement and long-term passive investing strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Are mutual funds good for beginners?"
                answer="Many beginner investors use mutual funds because they provide diversification and professional portfolio management."
              />

              <FaqItem
                question="Do mutual funds pay dividends?"
                answer="Yes. Many mutual funds distribute dividends and capital gains to investors."
              />

              <FaqItem
                question="Can mutual funds lose value?"
                answer="Yes. Mutual fund values may fluctuate depending on market conditions and underlying investments."
              />

              <FaqItem
                question="What annual return should I expect?"
                answer="Returns vary by fund type and market conditions. Long-term stock mutual funds historically average around 7% to 10% annual returns over extended periods."
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