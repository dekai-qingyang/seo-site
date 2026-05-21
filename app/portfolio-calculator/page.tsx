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

export default function PortfolioCalculator() {

  const [initialInvestment, setInitialInvestment] = useState(50000);

  const [monthlyContribution, setMonthlyContribution] = useState(1000);

  const [annualReturn, setAnnualReturn] = useState(8);

  const [years, setYears] = useState(20);

  const monthlyRate =
    annualReturn / 100 / 12;

  const totalMonths =
    years * 12;

  let futureValue =
    initialInvestment *
    Math.pow(1 + monthlyRate, totalMonths);

  futureValue +=
    monthlyContribution *
    (
      (
        Math.pow(1 + monthlyRate, totalMonths) - 1
      ) / monthlyRate
    );

  const totalContributions =
    initialInvestment +
    monthlyContribution * totalMonths;

  const totalGrowth =
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
      value: totalGrowth,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: futureValue * 0.08,
      },

      {
        year: "Year 5",
        value: futureValue * 0.27,
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
      name: "Deposits",
      value: totalContributions,
    },

    {
      name: "Growth",
      value: totalGrowth,
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

          <div className="bg-gradient-to-r from-slate-900 to-indigo-800 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Portfolio Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate portfolio growth,
              compound investment returns,
              diversification performance,
              and long-term wealth accumulation using this free portfolio calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Initial Investment"
                  value={initialInvestment}
                  setValue={setInitialInvestment}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
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

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-slate-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-slate-900 to-indigo-800 rounded-3xl p-6 text-white mb-6">

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
                    Portfolio Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
                    value={`$${totalContributions.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Investment Growth"
                    value={`$${totalGrowth.toFixed(0)}`}
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
            Portfolio Allocation Overview
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

                    <Cell fill="#312e81" />
                    <Cell fill="#818cf8" />

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
                title="Portfolio Growth"
                value={`$${totalGrowth.toFixed(0)}`}
              />

              <SummaryCard
                title="Projected Value"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Portfolio Growth Timeline
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
                  stroke="#312e81"
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
                  fill="#312e81"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Portfolio Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A portfolio calculator helps investors estimate long-term portfolio growth,
              investment allocation performance,
              compound returns,
              and wealth accumulation over time.
              Portfolio management plays an important role in retirement planning,
              passive investing,
              risk management,
              and long-term financial independence strategies.
            </p>

            <p>
              Investors commonly use portfolio calculators to evaluate future account balances,
              compare investment return scenarios,
              and understand how recurring contributions affect total portfolio value.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is an Investment Portfolio?
            </h3>

            <p>
              An investment portfolio is a collection of financial assets such as stocks,
              ETFs,
              mutual funds,
              bonds,
              real estate,
              and cash investments.
              Diversified portfolios help spread risk across multiple asset classes and industries.
            </p>

            <p>
              Long-term portfolio investing is widely used for retirement planning,
              wealth accumulation,
              passive income generation,
              and financial independence goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Portfolio Growth Formula
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
                Principal = Initial portfolio balance
              </li>

              <li>
                r = Annual investment return rate
              </li>

              <li>
                n = Number of compounding periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Portfolio Diversification
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Reduced company-specific risk
              </li>

              <li>
                Exposure to multiple industries
              </li>

              <li>
                Improved long-term stability
              </li>

              <li>
                Better risk management
              </li>

              <li>
                Potentially smoother returns
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example Portfolio Scenario
            </h3>

            <p>
              Suppose an investor begins with $50,000 and contributes $1,000 monthly into a diversified portfolio earning an average annual return of 8%.
              Over 20 years,
              compound growth and recurring investments may significantly increase portfolio value.
            </p>

            <p>
              Long-term investing strategies often benefit from disciplined contributions and reinvestment of dividends and capital gains.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Growth Matters
            </h3>

            <p>
              Compound growth allows investment earnings to generate additional earnings over time.
              As portfolio balances increase,
              future returns apply to larger amounts,
              accelerating wealth accumulation.
            </p>

            <p>
              Investors who begin investing early often benefit substantially from long-term compounding effects across decades of portfolio growth.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common Portfolio Risks
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Market volatility
              </li>

              <li>
                Economic downturns
              </li>

              <li>
                Inflation risk
              </li>

              <li>
                Interest rate fluctuations
              </li>

              <li>
                Sector concentration risk
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Asset Allocation Strategies
            </h3>

            <p>
              Asset allocation refers to how investments are distributed among stocks,
              bonds,
              ETFs,
              mutual funds,
              and cash investments.
              Different allocation strategies may affect both risk levels and expected long-term returns.
            </p>

            <p>
              Younger investors often maintain higher stock exposure for growth,
              while conservative investors may prefer balanced or income-focused allocations.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Portfolio Rebalancing
            </h3>

            <p>
              Portfolio rebalancing involves adjusting investment allocations periodically to maintain target asset distributions.
              Rebalancing may help manage risk exposure during changing market conditions.
            </p>

            <p>
              Many investors rebalance portfolios annually or quarterly depending on investment objectives and market performance.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a diversified portfolio?"
                answer="A diversified portfolio spreads investments across multiple assets, industries, and markets to reduce overall risk."
              />

              <FaqItem
                question="What return should I expect from a portfolio?"
                answer="Long-term diversified portfolios historically average around 7% to 10% annual returns depending on allocation and market conditions."
              />

              <FaqItem
                question="Why are monthly contributions important?"
                answer="Recurring investments may significantly increase long-term portfolio growth through compound returns."
              />

              <FaqItem
                question="Should I rebalance my portfolio?"
                answer="Many investors rebalance portfolios periodically to maintain desired risk levels and asset allocations."
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
                title: "Investment Calculator",
                link: "/investment-calculator",
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
                title: "Net Worth Calculator",
                link: "/net-worth-calculator",
              },

              {
                title: "FIRE Calculator",
                link: "/fire-calculator",
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