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

export default function FinancialIndependenceCalculator() {

  const [currentSavings, setCurrentSavings] = useState(120000);

  const [monthlyContribution, setMonthlyContribution] = useState(2000);

  const [annualExpenses, setAnnualExpenses] = useState(50000);

  const [annualReturn, setAnnualReturn] = useState(8);

  const [years, setYears] = useState(20);

  const fireTarget =
    annualExpenses * 25;

  const monthlyRate =
    annualReturn / 100 / 12;

  const totalMonths =
    years * 12;

  let futurePortfolio =
    currentSavings *
    Math.pow(1 + monthlyRate, totalMonths);

  futurePortfolio +=
    monthlyContribution *
    (
      (
        Math.pow(1 + monthlyRate, totalMonths) - 1
      ) / monthlyRate
    );

  const totalContributions =
    currentSavings +
    monthlyContribution * totalMonths;

  const investmentGrowth =
    futurePortfolio - totalContributions;

  const progressToFI =
    (
      futurePortfolio /
      fireTarget
    ) * 100;

  const estimatedPassiveIncome =
    futurePortfolio * 0.04;

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
        value: futurePortfolio * 0.26,
      },

      {
        year: "Year 10",
        value: futurePortfolio * 0.51,
      },

      {
        year: "Year 15",
        value: futurePortfolio * 0.74,
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
      name: "FI Portfolio",
      value: futurePortfolio,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-cyan-900 to-sky-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Financial Independence Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate your FIRE number,
              retirement portfolio growth,
              passive income potential,
              and timeline to financial independence using this free calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Current Savings & Investments"
                  value={currentSavings}
                  setValue={setCurrentSavings}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contributions"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
                  prefix="$"
                />

                <InputField
                  label="Annual Living Expenses"
                  value={annualExpenses}
                  setValue={setAnnualExpenses}
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

            <div className="bg-gradient-to-b from-sky-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-cyan-900 to-sky-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated FIRE Portfolio
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futurePortfolio.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Financial Independence Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="FIRE Target Number"
                    value={`$${fireTarget.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Portfolio Growth"
                    value={`$${investmentGrowth.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Progress to FI"
                    value={`${progressToFI.toFixed(1)}%`}
                  />

                  <SummaryRow
                    label="Estimated Passive Income"
                    value={`$${estimatedPassiveIncome.toFixed(0)}/yr`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            FIRE Portfolio Breakdown
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

                    <Cell fill="#0c4a6e" />
                    <Cell fill="#38bdf8" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Total Contributions"
                value={`$${totalContributions.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Growth"
                value={`$${investmentGrowth.toFixed(0)}`}
              />

              <SummaryCard
                title="Future FIRE Portfolio"
                value={`$${futurePortfolio.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Financial Independence Timeline
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
                  stroke="#0c4a6e"
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
                  fill="#0c4a6e"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Financial Independence Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A financial independence calculator helps individuals estimate how long it may take to achieve financial freedom through investing,
              savings growth,
              and passive income generation.
              Financial independence planning is commonly associated with FIRE strategies,
              retirement preparation,
              long-term investing,
              and wealth accumulation.
            </p>

            <p>
              Many individuals pursue financial independence to reduce dependence on traditional employment income and gain greater control over their lifestyle,
              retirement timing,
              and long-term financial security.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Financial Independence?
            </h3>

            <p>
              Financial independence occurs when investments,
              passive income,
              and accumulated assets generate enough income to cover ongoing living expenses without relying on active employment income.
            </p>

            <p>
              Investors commonly estimate financial independence targets using the 25x expenses rule,
              which suggests saving approximately 25 times annual living expenses.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              FIRE Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                FIRE Number = Annual Expenses × 25
              </code>

            </div>

            <p>
              This formula is based on the widely known 4% withdrawal rule commonly used in retirement planning and financial independence calculations.
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Annual Expenses = Estimated yearly living costs
              </li>

              <li>
                FIRE Number = Target portfolio needed for independence
              </li>

              <li>
                4% Rule = Estimated sustainable withdrawal strategy
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Growth Matters
            </h3>

            <p>
              Compound growth allows investment earnings to generate additional returns over time.
              Long-term investing combined with consistent savings contributions may significantly accelerate financial independence timelines.
            </p>

            <p>
              Investors who begin investing earlier often benefit substantially from decades of compounding effects.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Financial Independence Scenario
            </h3>

            <p>
              Suppose an individual spends $50,000 annually and targets financial independence using the 25x expenses rule.
              The estimated FIRE target would equal approximately $1.25 million.
            </p>

            <p>
              By investing consistently,
              increasing savings rates,
              and maintaining diversified portfolios,
              individuals may potentially accelerate their path toward financial independence.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common FIRE Strategies
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Aggressive savings rates
              </li>

              <li>
                Long-term stock investing
              </li>

              <li>
                Dividend investing
              </li>

              <li>
                Real estate investing
              </li>

              <li>
                Reducing unnecessary expenses
              </li>

              <li>
                Increasing income streams
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Savings Rate and Financial Independence
            </h3>

            <p>
              Savings rate plays a major role in determining how quickly financial independence may be achieved.
              Higher savings and investment contributions generally shorten the timeline to financial freedom.
            </p>

            <p>
              Many FIRE strategies prioritize maximizing savings rates while maintaining sustainable lifestyles and long-term investment growth.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Risks and Market Volatility
            </h3>

            <p>
              Financial independence portfolios may experience market volatility,
              inflation risk,
              economic downturns,
              and investment uncertainty.
              Diversification and long-term investing strategies may help reduce portfolio risk over time.
            </p>

            <p>
              Investors commonly diversify across stocks,
              ETFs,
              bonds,
              mutual funds,
              retirement accounts,
              and real estate investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Sustainable Withdrawal Strategies
            </h3>

            <p>
              Sustainable withdrawal planning helps reduce the risk of exhausting investment portfolios too quickly during retirement.
              Conservative withdrawal assumptions may improve long-term portfolio sustainability during uncertain market conditions.
            </p>

            <p>
              Many financial independence strategies emphasize maintaining flexible spending,
              diversified investments,
              and emergency reserves for additional protection.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is financial independence?"
                answer="Financial independence occurs when investments and passive income can sustainably cover long-term living expenses."
              />

              <FaqItem
                question="What is the 25x expenses rule?"
                answer="The 25x rule estimates financial independence targets by multiplying annual expenses by 25."
              />

              <FaqItem
                question="What is the 4% rule?"
                answer="The 4% rule estimates sustainable retirement withdrawals at approximately 4% of total portfolio value annually."
              />

              <FaqItem
                question="How can I reach financial independence faster?"
                answer="Increasing savings rates, investing consistently, reducing debt, and maintaining diversified portfolios may accelerate financial independence timelines."
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
                title: "FIRE Calculator",
                link: "/fire-calculator",
              },

              {
                title: "Passive Income Calculator",
                link: "/passive-income-calculator",
              },

              {
                title: "Wealth Calculator",
                link: "/wealth-calculator",
              },

              {
                title: "Net Worth Calculator",
                link: "/net-worth-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
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