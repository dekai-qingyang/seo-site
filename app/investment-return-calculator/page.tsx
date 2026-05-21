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

export default function InvestmentReturnCalculator() {

  const [initialInvestment, setInitialInvestment] = useState(25000);

  const [monthlyContribution, setMonthlyContribution] = useState(500);

  const [annualReturn, setAnnualReturn] = useState(9);

  const [years, setYears] = useState(15);

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
      name: "Investment Growth",
      value: totalGrowth,
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
        value: futureValue * 0.31,
      },

      {
        year: "Year 10",
        value: futureValue * 0.59,
      },

      {
        year: "Year 12",
        value: futureValue * 0.76,
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

          <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Investment Return Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate long-term investment growth,
              compound returns,
              portfolio performance,
              and wealth accumulation using this free investment return calculator.
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

            <div className="bg-gradient-to-b from-emerald-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-800 to-teal-700 rounded-3xl p-6 text-white mb-6">

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

                    <Cell fill="#065f46" />
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
                title="Investment Growth"
                value={`$${totalGrowth.toFixed(0)}`}
              />

              <SummaryCard
                title="Future Portfolio"
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
                  stroke="#065f46"
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
                  fill="#065f46"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Investment Return Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An investment return calculator helps investors estimate long-term portfolio growth,
              annual investment performance,
              compound returns,
              and wealth accumulation over time.
              Investment return calculations are commonly used for retirement planning,
              financial independence goals,
              portfolio management,
              and passive investing strategies.
            </p>

            <p>
              Investors often use return calculators to estimate how consistent investing,
              recurring contributions,
              and compound growth may affect future account balances.
              Long-term investing remains one of the most effective ways to build wealth and protect purchasing power against inflation.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Investment Return?
            </h3>

            <p>
              Investment return refers to the gain or loss generated from an investment over a specific period.
              Returns may come from capital appreciation,
              dividends,
              interest income,
              or reinvested earnings.
            </p>

            <p>
              Total investment performance depends on multiple factors including market conditions,
              contribution amounts,
              asset allocation,
              fees,
              and investment duration.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Investment Return Formula
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
                r = Annual return rate
              </li>

              <li>
                n = Number of compounding periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Returns Matter
            </h3>

            <p>
              Compound growth allows investment earnings to generate additional earnings over time.
              As portfolio balances increase,
              future returns apply to larger amounts,
              accelerating long-term wealth accumulation.
            </p>

            <p>
              Investors who begin investing early often benefit significantly from long investment horizons and recurring contributions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Investment Scenario
            </h3>

            <p>
              Suppose an investor starts with $25,000 and contributes $500 monthly into a diversified portfolio earning an average annual return of 9%.
              Over 15 years,
              recurring contributions and compound growth may substantially increase overall portfolio value.
            </p>

            <p>
              Long-term investment strategies commonly rely on disciplined contributions and consistent asset allocation rather than short-term market timing.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Factors Affecting Investment Returns
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Market performance
              </li>

              <li>
                Investment fees and expenses
              </li>

              <li>
                Asset allocation
              </li>

              <li>
                Portfolio diversification
              </li>

              <li>
                Contribution frequency
              </li>

              <li>
                Inflation and interest rates
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Importance of Diversification
            </h3>

            <p>
              Diversification spreads investments across multiple asset classes and industries to reduce overall portfolio risk.
              Diversified portfolios may experience smoother long-term performance compared to concentrated investments.
            </p>

            <p>
              Investors commonly diversify through ETFs,
              mutual funds,
              index funds,
              bonds,
              and international investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Long-Term Investing Strategies
            </h3>

            <p>
              Long-term investors often focus on consistent investing,
              recurring contributions,
              dividend reinvestment,
              and maintaining diversified portfolios through changing market conditions.
            </p>

            <p>
              Short-term market volatility is common,
              but disciplined long-term investing strategies may improve the probability of achieving financial goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common Investment Risks
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Market volatility
              </li>

              <li>
                Economic recessions
              </li>

              <li>
                Inflation risk
              </li>

              <li>
                Interest rate changes
              </li>

              <li>
                Company-specific investment risk
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a good annual investment return?"
                answer="Long-term diversified portfolios historically average around 7% to 10% annual returns depending on asset allocation and market conditions."
              />

              <FaqItem
                question="Why are monthly contributions important?"
                answer="Recurring investments may significantly increase portfolio growth through compound returns over long periods."
              />

              <FaqItem
                question="Can investment returns vary every year?"
                answer="Yes. Investment returns fluctuate depending on market conditions, economic trends, and portfolio allocation."
              />

              <FaqItem
                question="Does diversification reduce risk?"
                answer="Diversification may reduce company-specific and sector-specific risk by spreading investments across multiple assets."
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