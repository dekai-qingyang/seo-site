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

export default function FIRECalculator() {

  const [currentInvestments, setCurrentInvestments] = useState(180000);

  const [monthlyContribution, setMonthlyContribution] = useState(2500);

  const [annualExpenses, setAnnualExpenses] = useState(60000);

  const [annualReturn, setAnnualReturn] = useState(8);

  const [years, setYears] = useState(18);

  const fireNumber =
    annualExpenses * 25;

  const monthlyRate =
    annualReturn / 100 / 12;

  const totalMonths =
    years * 12;

  let futurePortfolio =
    currentInvestments *
    Math.pow(1 + monthlyRate, totalMonths);

  futurePortfolio +=
    monthlyContribution *
    (
      (
        Math.pow(1 + monthlyRate, totalMonths) - 1
      ) / monthlyRate
    );

  const totalContributions =
    currentInvestments +
    monthlyContribution * totalMonths;

  const investmentGrowth =
    futurePortfolio - totalContributions;

  const progressToFire =
    (
      futurePortfolio /
      fireNumber
    ) * 100;

  const annualPassiveIncome =
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
        value: futurePortfolio * 0.08,
      },

      {
        year: "Year 5",
        value: futurePortfolio * 0.29,
      },

      {
        year: "Year 10",
        value: futurePortfolio * 0.54,
      },

      {
        year: "Year 15",
        value: futurePortfolio * 0.79,
      },

      {
        year: "Year 18",
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
      name: "FIRE Portfolio",
      value: futurePortfolio,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-orange-900 to-amber-500 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              FIRE Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate your FIRE number,
              retirement timeline,
              passive income potential,
              and long-term investment growth using this free FIRE calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Current Investments"
                  value={currentInvestments}
                  setValue={setCurrentInvestments}
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
                  label="Years Until Retirement"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-amber-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-orange-900 to-amber-500 rounded-3xl p-6 text-white mb-6">

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
                    FIRE Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="FIRE Number"
                    value={`$${fireNumber.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Investment Growth"
                    value={`$${investmentGrowth.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Progress Toward FIRE"
                    value={`${progressToFire.toFixed(1)}%`}
                  />

                  <SummaryRow
                    label="Estimated Passive Income"
                    value={`$${annualPassiveIncome.toFixed(0)}/yr`}
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

                    <Cell fill="#9a3412" />
                    <Cell fill="#fbbf24" />

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
            FIRE Growth Timeline
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
                  stroke="#9a3412"
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
                  fill="#9a3412"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            FIRE Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A FIRE calculator helps individuals estimate how long it may take to achieve Financial Independence,
              Retire Early through long-term investing,
              disciplined savings,
              and passive income generation.
              FIRE strategies have become increasingly popular among investors seeking greater financial freedom and early retirement opportunities.
            </p>

            <p>
              The FIRE movement focuses on increasing savings rates,
              reducing unnecessary expenses,
              and building investment portfolios capable of generating sustainable long-term income.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is FIRE?
            </h3>

            <p>
              FIRE stands for Financial Independence,
              Retire Early.
              The strategy aims to accumulate sufficient investments and passive income to cover living expenses without relying on traditional employment income.
            </p>

            <p>
              Many FIRE strategies prioritize aggressive savings,
              long-term stock investing,
              diversified portfolios,
              and minimizing lifestyle inflation.
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
              This formula is based on the widely recognized 4% withdrawal rule used in retirement planning.
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Annual Expenses = Estimated yearly spending
              </li>

              <li>
                FIRE Number = Target investment portfolio
              </li>

              <li>
                4% Rule = Estimated sustainable withdrawal rate
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              How the 4% Rule Works
            </h3>

            <p>
              The 4% rule suggests that retirees may sustainably withdraw approximately 4% of their investment portfolio annually while maintaining long-term portfolio longevity.
            </p>

            <p>
              Although market conditions vary,
              the 4% rule remains a commonly used benchmark for estimating retirement portfolio requirements.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example FIRE Scenario
            </h3>

            <p>
              Suppose an individual spends $60,000 annually and wants to retire early.
              Using the FIRE formula,
              the estimated target portfolio would equal approximately $1.5 million.
            </p>

            <p>
              By contributing consistently to diversified investments and allowing compound growth to accumulate over time,
              investors may potentially reach financial independence earlier than traditional retirement timelines.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Growth Matters
            </h3>

            <p>
              Compound growth allows investment earnings to generate additional returns over time.
              As portfolios increase in size,
              future gains apply to larger balances,
              accelerating wealth accumulation and retirement progress.
            </p>

            <p>
              Investors who begin investing early may benefit substantially from decades of compounding effects.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common FIRE Strategies
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Increasing savings rates
              </li>

              <li>
                Investing in diversified stock portfolios
              </li>

              <li>
                Reducing debt obligations
              </li>

              <li>
                Maintaining disciplined spending habits
              </li>

              <li>
                Building passive income streams
              </li>

              <li>
                Optimizing tax-efficient investments
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks and Retirement Planning
            </h3>

            <p>
              FIRE portfolios may still experience market volatility,
              inflation risk,
              economic downturns,
              and changing investment conditions.
              Diversification and long-term investing strategies may help reduce portfolio risk.
            </p>

            <p>
              Investors commonly diversify across ETFs,
              stocks,
              mutual funds,
              bonds,
              real estate,
              and retirement accounts.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Lean FIRE vs Fat FIRE
            </h3>

            <p>
              Lean FIRE focuses on minimal spending and lower retirement costs,
              while Fat FIRE emphasizes higher lifestyle spending and larger investment portfolios.
            </p>

            <p>
              Individuals may choose different FIRE approaches depending on lifestyle goals,
              family needs,
              and long-term financial priorities.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What does FIRE mean?"
                answer="FIRE stands for Financial Independence, Retire Early, a strategy focused on long-term investing and aggressive saving."
              />

              <FaqItem
                question="What is the 4% rule?"
                answer="The 4% rule estimates sustainable retirement withdrawals at approximately 4% of total portfolio value annually."
              />

              <FaqItem
                question="How is the FIRE number calculated?"
                answer="The FIRE number is commonly estimated by multiplying annual living expenses by 25."
              />

              <FaqItem
                question="How can I reach FIRE faster?"
                answer="Increasing savings rates, reducing debt, investing consistently, and maintaining diversified portfolios may accelerate FIRE progress."
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
                title: "Financial Independence Calculator",
                link: "/financial-independence-calculator",
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