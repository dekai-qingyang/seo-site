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

export default function PassiveIncomeCalculator() {

  const [investmentBalance, setInvestmentBalance] = useState(350000);

  const [monthlyContribution, setMonthlyContribution] = useState(1200);

  const [annualReturn, setAnnualReturn] = useState(7);

  const [years, setYears] = useState(20);

  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const monthlyRate =
    annualReturn / 100 / 12;

  const totalMonths =
    years * 12;

  let futurePortfolio =
    investmentBalance *
    Math.pow(1 + monthlyRate, totalMonths);

  futurePortfolio +=
    monthlyContribution *
    (
      (
        Math.pow(1 + monthlyRate, totalMonths) - 1
      ) / monthlyRate
    );

  const totalContributions =
    investmentBalance +
    monthlyContribution * totalMonths;

  const investmentGrowth =
    futurePortfolio - totalContributions;

  const annualPassiveIncome =
    futurePortfolio *
    (withdrawalRate / 100);

  const monthlyPassiveIncome =
    annualPassiveIncome / 12;

  const pieData = [
    {
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Investment Growth",
      value: investmentGrowth,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: futurePortfolio * 0.07,
      },

      {
        year: "Year 5",
        value: futurePortfolio * 0.28,
      },

      {
        year: "Year 10",
        value: futurePortfolio * 0.53,
      },

      {
        year: "Year 15",
        value: futurePortfolio * 0.76,
      },

      {
        year: "Year 20",
        value: futurePortfolio,
      },
    ];

  }, [futurePortfolio]);

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
      value: futurePortfolio,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-900 to-lime-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Passive Income Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate long-term passive income,
              investment portfolio growth,
              dividend income,
              and financial independence progress using this free passive income calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Current Investments"
                  value={investmentBalance}
                  setValue={setInvestmentBalance}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contributions"
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

                <InputField
                  label="Withdrawal Rate"
                  value={withdrawalRate}
                  setValue={setWithdrawalRate}
                  suffix="%"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-lime-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-900 to-lime-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Monthly Passive Income
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${monthlyPassiveIncome.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Passive Income Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Future Portfolio"
                    value={`$${futurePortfolio.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Investment Growth"
                    value={`$${investmentGrowth.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Annual Passive Income"
                    value={`$${annualPassiveIncome.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Passive Income"
                    value={`$${monthlyPassiveIncome.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Passive Income Breakdown
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

                    <Cell fill="#14532d" />
                    <Cell fill="#84cc16" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Contributions"
                value={`$${totalContributions.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Growth"
                value={`$${investmentGrowth.toFixed(0)}`}
              />

              <SummaryCard
                title="Future Portfolio"
                value={`$${futurePortfolio.toFixed(0)}`}
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

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#14532d"
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
                  fill="#14532d"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Passive Income Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A passive income calculator helps individuals estimate long-term investment income,
              portfolio growth,
              financial independence progress,
              and recurring cash flow generated from investments.
              Passive income planning is commonly used for retirement preparation,
              FIRE strategies,
              dividend investing,
              and long-term wealth accumulation.
            </p>

            <p>
              Many investors focus on building passive income streams to reduce dependence on traditional employment income.
              Passive income may provide greater financial flexibility,
              long-term stability,
              and early retirement opportunities.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Passive Income?
            </h3>

            <p>
              Passive income refers to recurring earnings generated from investments,
              rental properties,
              dividends,
              royalties,
              businesses,
              or other income-producing assets that require limited ongoing active work.
            </p>

            <p>
              Unlike active employment income,
              passive income continues generating cash flow even when individuals are not actively working full time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Passive Income Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Passive Income = Portfolio Value × Withdrawal Rate
              </code>

            </div>

            <p>
              Investors commonly use the 4% withdrawal rule when estimating sustainable retirement income from long-term investment portfolios.
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Portfolio Value = Total investment balance
              </li>

              <li>
                Withdrawal Rate = Estimated annual income percentage
              </li>

              <li>
                Passive Income = Estimated recurring yearly cash flow
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Growth Matters
            </h3>

            <p>
              Compound growth allows investments to generate returns on previous earnings over time.
              As portfolios increase in size,
              future gains compound on larger balances,
              accelerating wealth and passive income growth.
            </p>

            <p>
              Investors who begin investing early often benefit substantially from long-term compounding effects across decades.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Passive Income Scenario
            </h3>

            <p>
              Suppose an investor maintains $350,000 in diversified investments,
              contributes $1,200 monthly,
              and earns an average annual return of 7%.
              Over 20 years,
              compound growth may significantly increase future portfolio value and estimated passive income.
            </p>

            <p>
              Using a 4% withdrawal strategy,
              the portfolio may potentially generate sustainable annual passive income for retirement planning purposes.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common Passive Income Sources
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Dividend-paying stocks
              </li>

              <li>
                ETFs and index funds
              </li>

              <li>
                Real estate investments
              </li>

              <li>
                Rental properties
              </li>

              <li>
                Online businesses
              </li>

              <li>
                Bonds and fixed-income investments
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Financial Independence and FIRE
            </h3>

            <p>
              Financial independence occurs when passive income and investments can cover long-term living expenses without relying on active employment income.
            </p>

            <p>
              FIRE strategies often emphasize aggressive saving,
              disciplined investing,
              portfolio diversification,
              and reducing unnecessary spending to accelerate financial independence timelines.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Risks and Portfolio Management
            </h3>

            <p>
              Passive income portfolios may still experience market volatility,
              inflation risk,
              dividend reductions,
              and economic downturns.
              Diversification and long-term investment strategies may help reduce overall portfolio risk.
            </p>

            <p>
              Investors commonly combine stocks,
              ETFs,
              mutual funds,
              real estate,
              and retirement accounts to improve income stability and long-term growth potential.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Sustainable Withdrawal Rates
            </h3>

            <p>
              Sustainable withdrawal strategies aim to balance retirement income needs with portfolio longevity.
              Withdrawal rates that are too aggressive may increase the risk of depleting investments prematurely.
            </p>

            <p>
              Many retirement strategies use conservative withdrawal assumptions to improve long-term sustainability during changing market conditions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is considered passive income?"
                answer="Passive income includes recurring earnings generated from investments, dividends, rental properties, businesses, and other income-producing assets."
              />

              <FaqItem
                question="What is the 4% withdrawal rule?"
                answer="The 4% rule estimates sustainable retirement withdrawals by limiting annual portfolio withdrawals to approximately 4% of total investments."
              />

              <FaqItem
                question="Why is compound growth important?"
                answer="Compound growth allows investment returns to generate additional returns over time, accelerating wealth accumulation."
              />

              <FaqItem
                question="How can I increase passive income?"
                answer="Consistent investing, diversified portfolios, dividend reinvestment, and long-term savings strategies may increase future passive income potential."
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
                title: "Wealth Calculator",
                link: "/wealth-calculator",
              },

              {
                title: "Financial Independence Calculator",
                link: "/financial-independence-calculator",
              },

              {
                title: "FIRE Calculator",
                link: "/fire-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
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