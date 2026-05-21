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

export default function FutureValueCalculator() {

  const [initialInvestment, setInitialInvestment] = useState(25000);

  const [monthlyContribution, setMonthlyContribution] = useState(1000);

  const [annualReturn, setAnnualReturn] = useState(7);

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

  const totalInterest =
    futureValue - totalContributions;

  const estimatedAnnualIncome =
    futureValue * 0.04;

  const pieData = [
    {
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Compound Growth",
      value: totalInterest,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: futureValue * 0.08,
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
        value: futureValue * 0.77,
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
      value: totalInterest,
    },

    {
      name: "Future Value",
      value: futureValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-indigo-900 to-blue-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Future Value Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate compound investment growth,
              future savings balances,
              long-term investment returns,
              and retirement portfolio value using this free future value calculator.
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
                  label="Investment Period"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-900 to-blue-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Future Value
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Future Value Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
                    value={`$${totalContributions.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Compound Growth"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Future Portfolio Value"
                    value={`$${futureValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Passive Income"
                    value={`$${estimatedAnnualIncome.toFixed(0)}/yr`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Future Value Breakdown
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
                    <Cell fill="#60a5fa" />

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
                title="Compound Interest"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Future Value"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Investment Growth Timeline
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
                  fill="#312e81"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Future Value Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A future value calculator helps investors estimate how much an investment or savings account may grow over time using compound interest and regular contributions.
              Future value calculations are widely used in retirement planning,
              investment analysis,
              wealth building,
              and long-term financial forecasting.
            </p>

            <p>
              Investors commonly use future value projections to estimate retirement savings targets,
              investment portfolio growth,
              education savings goals,
              and long-term wealth accumulation strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Future Value?
            </h3>

            <p>
              Future value represents the estimated value of an investment or savings balance at a specific date in the future after accounting for compound interest and investment growth.
            </p>

            <p>
              Future value calculations help individuals estimate how current savings and investments may grow over time under different return assumptions and contribution strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Future Value Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                FV = PV × (1 + r)^n
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                FV = Future Value
              </li>

              <li>
                PV = Present Value or initial investment
              </li>

              <li>
                r = Interest or investment return rate
              </li>

              <li>
                n = Number of compounding periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Interest Matters
            </h3>

            <p>
              Compound interest allows investment returns to generate additional returns over time.
              As investment balances grow,
              future earnings compound on larger amounts,
              accelerating long-term portfolio growth.
            </p>

            <p>
              Investors who start investing earlier often benefit more from compound growth because investments have additional time to accumulate returns.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Future Value Scenario
            </h3>

            <p>
              Suppose an investor begins with $25,000,
              contributes $1,000 monthly,
              and earns an average annual return of 7%.
              Over 20 years,
              compound growth may significantly increase the future investment balance.
            </p>

            <p>
              Long-term contributions combined with consistent investment returns may dramatically increase retirement savings and wealth accumulation potential.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Factors Affecting Future Value
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Initial investment amount
              </li>

              <li>
                Contribution frequency
              </li>

              <li>
                Expected annual returns
              </li>

              <li>
                Investment duration
              </li>

              <li>
                Market volatility
              </li>

              <li>
                Inflation and purchasing power
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Future Value and Retirement Planning
            </h3>

            <p>
              Future value calculations are commonly used in retirement planning because retirement savings goals depend heavily on long-term investment growth assumptions.
            </p>

            <p>
              Investors often estimate future portfolio balances to evaluate retirement readiness,
              passive income potential,
              and financial independence goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Investment Risk and Diversification
            </h3>

            <p>
              Investment returns may vary significantly depending on market conditions and portfolio allocation strategies.
              Diversified portfolios may help reduce volatility and improve long-term investment stability.
            </p>

            <p>
              Many investors diversify across stocks,
              ETFs,
              mutual funds,
              bonds,
              and real estate investments to balance growth potential and risk management.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Inflation and Purchasing Power
            </h3>

            <p>
              Inflation reduces future purchasing power over time,
              meaning future investment balances may buy fewer goods and services than expected.
            </p>

            <p>
              Long-term investment strategies often target returns above inflation to preserve and increase real wealth accumulation.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Future Value vs Present Value
            </h3>

            <p>
              Future value estimates how much money may grow over time,
              while present value estimates the current worth of future cash flows.
              Both calculations are widely used in investing,
              financial planning,
              and business analysis.
            </p>

            <p>
              Understanding both concepts may help investors make more informed long-term financial decisions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is future value?"
                answer="Future value estimates how much an investment or savings balance may grow over time after accounting for compound interest."
              />

              <FaqItem
                question="Why is compound interest important?"
                answer="Compound interest allows investment returns to generate additional returns over time, accelerating long-term growth."
              />

              <FaqItem
                question="Does future value include monthly contributions?"
                answer="Yes. Many future value calculations include recurring contributions alongside initial investments."
              />

              <FaqItem
                question="How accurate are future value projections?"
                answer="Future value calculations are estimates based on assumed return rates and investment conditions. Actual market performance may vary."
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
                title: "Present Value Calculator",
                link: "/present-value-calculator",
              },

              {
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
              },

              {
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "Retirement Calculator",
                link: "/retirement-calculator",
              },

              {
                title: "Wealth Calculator",
                link: "/wealth-calculator",
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