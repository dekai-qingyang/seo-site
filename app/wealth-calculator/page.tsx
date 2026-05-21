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

export default function WealthCalculator() {

  const [startingWealth, setStartingWealth] = useState(75000);

  const [monthlyContribution, setMonthlyContribution] = useState(1500);

  const [annualReturn, setAnnualReturn] = useState(8);

  const [years, setYears] = useState(25);

  const monthlyRate =
    annualReturn / 100 / 12;

  const totalMonths =
    years * 12;

  let futureWealth =
    startingWealth *
    Math.pow(1 + monthlyRate, totalMonths);

  futureWealth +=
    monthlyContribution *
    (
      (
        Math.pow(1 + monthlyRate, totalMonths) - 1
      ) / monthlyRate
    );

  const totalContributions =
    startingWealth +
    monthlyContribution * totalMonths;

  const wealthGrowth =
    futureWealth - totalContributions;

  const passiveIncomeEstimate =
    futureWealth * 0.04;

  const pieData = [
    {
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Investment Growth",
      value: wealthGrowth,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: futureWealth * 0.06,
      },

      {
        year: "Year 5",
        value: futureWealth * 0.24,
      },

      {
        year: "Year 10",
        value: futureWealth * 0.46,
      },

      {
        year: "Year 15",
        value: futureWealth * 0.67,
      },

      {
        year: "Year 25",
        value: futureWealth,
      },
    ];

  }, [futureWealth]);

  const compareData = [
    {
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Growth",
      value: wealthGrowth,
    },

    {
      name: "Future Wealth",
      value: futureWealth,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-amber-700 to-yellow-500 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Wealth Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate long-term wealth growth,
              compound investment returns,
              passive income potential,
              and financial independence progress using this free wealth calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Current Wealth"
                  value={startingWealth}
                  setValue={setStartingWealth}
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

            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-amber-700 to-yellow-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Future Wealth
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureWealth.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Wealth Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
                    value={`$${totalContributions.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Investment Growth"
                    value={`$${wealthGrowth.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Future Wealth"
                    value={`$${futureWealth.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Passive Income"
                    value={`$${passiveIncomeEstimate.toFixed(0)}/yr`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Wealth Breakdown
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

                    <Cell fill="#b45309" />
                    <Cell fill="#fde68a" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Personal Contributions"
                value={`$${totalContributions.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Growth"
                value={`$${wealthGrowth.toFixed(0)}`}
              />

              <SummaryCard
                title="Future Wealth"
                value={`$${futureWealth.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Wealth Growth Timeline
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
                  stroke="#b45309"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Wealth Comparison Overview
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
                  fill="#b45309"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Wealth Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A wealth calculator helps individuals estimate future financial growth,
              long-term investment accumulation,
              passive income potential,
              and progress toward financial independence.
              Wealth planning is commonly used in retirement preparation,
              FIRE strategies,
              portfolio management,
              and long-term financial goal setting.
            </p>

            <p>
              Tracking wealth growth over time may help individuals improve savings habits,
              optimize investment strategies,
              reduce debt,
              and build sustainable long-term financial security.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Wealth?
            </h3>

            <p>
              Wealth represents the total value of financial assets,
              investments,
              savings,
              business ownership,
              real estate,
              and other valuable resources accumulated over time.
            </p>

            <p>
              Long-term wealth building often depends on consistent investing,
              compound growth,
              disciplined savings,
              and maintaining manageable debt levels.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Wealth Growth Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Future Wealth = Principal × (1 + r)^n
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Principal = Starting wealth or investment balance
              </li>

              <li>
                r = Annual investment return rate
              </li>

              <li>
                n = Number of compounding periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Growth Matters
            </h3>

            <p>
              Compound growth allows investment earnings to generate additional returns over time.
              As wealth increases,
              future returns apply to larger balances,
              accelerating long-term financial growth.
            </p>

            <p>
              Investors who begin saving and investing early often benefit substantially from decades of compounding effects.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Wealth Building Scenario
            </h3>

            <p>
              Suppose an individual begins with $75,000 in combined savings and investments,
              contributes $1,500 monthly,
              and earns an average annual return of 8%.
              Over 25 years,
              compound growth may significantly increase overall wealth accumulation.
            </p>

            <p>
              Long-term investing strategies often prioritize diversification,
              disciplined contributions,
              and consistent portfolio management through changing market conditions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Wealth and Passive Income
            </h3>

            <p>
              Many investors focus on wealth accumulation to generate passive income through dividends,
              rental properties,
              retirement accounts,
              and diversified investment portfolios.
            </p>

            <p>
              Passive income strategies may provide greater financial flexibility and support long-term retirement goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Factors Affecting Wealth Growth
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Savings rate consistency
              </li>

              <li>
                Investment return performance
              </li>

              <li>
                Inflation and purchasing power
              </li>

              <li>
                Tax efficiency
              </li>

              <li>
                Debt management
              </li>

              <li>
                Asset allocation strategies
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Diversification and Risk Management
            </h3>

            <p>
              Diversification helps reduce investment risk by spreading assets across multiple sectors,
              industries,
              and asset classes.
              Diversified portfolios may experience smoother long-term performance during market volatility.
            </p>

            <p>
              Many wealth-building strategies combine stocks,
              ETFs,
              mutual funds,
              bonds,
              real estate,
              and retirement accounts to improve financial stability.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Wealth and Financial Independence
            </h3>

            <p>
              Financial independence occurs when investments and passive income sufficiently cover long-term living expenses.
              Wealth calculators may help estimate how savings and investment strategies affect future independence timelines.
            </p>

            <p>
              FIRE strategies commonly emphasize aggressive saving,
              investment growth,
              and disciplined spending to accelerate wealth accumulation.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="How can I increase my wealth faster?"
                answer="Consistent investing, reducing high-interest debt, increasing savings rates, and maintaining diversified portfolios may improve long-term wealth growth."
              />

              <FaqItem
                question="Why is compound growth important?"
                answer="Compound growth allows investment returns to generate additional returns over time, accelerating wealth accumulation."
              />

              <FaqItem
                question="What investments are commonly used for wealth building?"
                answer="Stocks, ETFs, mutual funds, retirement accounts, real estate, and diversified portfolios are commonly used for long-term wealth growth."
              />

              <FaqItem
                question="What is passive income?"
                answer="Passive income refers to recurring earnings generated from investments, dividends, rental income, or business ownership with limited ongoing active work."
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
                title: "Net Worth Calculator",
                link: "/net-worth-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "FIRE Calculator",
                link: "/fire-calculator",
              },

              {
                title: "Financial Independence Calculator",
                link: "/financial-independence-calculator",
              },

              {
                title: "Passive Income Calculator",
                link: "/passive-income-calculator",
              },

              {
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
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