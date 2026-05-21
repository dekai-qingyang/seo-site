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

export default function NetWorthCalculator() {

  const [cashSavings, setCashSavings] = useState(25000);

  const [investments, setInvestments] = useState(120000);

  const [realEstate, setRealEstate] = useState(350000);

  const [otherAssets, setOtherAssets] = useState(15000);

  const [mortgageDebt, setMortgageDebt] = useState(220000);

  const [otherDebt, setOtherDebt] = useState(18000);

  const totalAssets =
    cashSavings +
    investments +
    realEstate +
    otherAssets;

  const totalLiabilities =
    mortgageDebt +
    otherDebt;

  const netWorth =
    totalAssets - totalLiabilities;

  const savingsRatio =
    (
      investments / totalAssets
    ) * 100;

  const pieData = [
    {
      name: "Assets",
      value: totalAssets,
    },

    {
      name: "Liabilities",
      value: totalLiabilities,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: netWorth * 0.30,
      },

      {
        year: "Year 3",
        value: netWorth * 0.50,
      },

      {
        year: "Year 5",
        value: netWorth * 0.68,
      },

      {
        year: "Year 8",
        value: netWorth * 0.85,
      },

      {
        year: "Today",
        value: netWorth,
      },
    ];

  }, [netWorth]);

  const compareData = [
    {
      name: "Assets",
      value: totalAssets,
    },

    {
      name: "Debt",
      value: totalLiabilities,
    },

    {
      name: "Net Worth",
      value: netWorth,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-violet-900 to-fuchsia-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Net Worth Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate total assets,
              liabilities,
              personal wealth,
              and long-term financial health using this free net worth calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Cash & Savings"
                  value={cashSavings}
                  setValue={setCashSavings}
                  prefix="$"
                />

                <InputField
                  label="Investments"
                  value={investments}
                  setValue={setInvestments}
                  prefix="$"
                />

                <InputField
                  label="Real Estate Value"
                  value={realEstate}
                  setValue={setRealEstate}
                  prefix="$"
                />

                <InputField
                  label="Other Assets"
                  value={otherAssets}
                  setValue={setOtherAssets}
                  prefix="$"
                />

                <InputField
                  label="Mortgage Debt"
                  value={mortgageDebt}
                  setValue={setMortgageDebt}
                  prefix="$"
                />

                <InputField
                  label="Other Debt"
                  value={otherDebt}
                  setValue={setOtherDebt}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-violet-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-violet-900 to-fuchsia-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Net Worth
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${netWorth.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Financial Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Assets"
                    value={`$${totalAssets.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Liabilities"
                    value={`$${totalLiabilities.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Net Worth"
                    value={`$${netWorth.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Investment Ratio"
                    value={`${savingsRatio.toFixed(2)}%`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Net Worth Breakdown
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

                    <Cell fill="#5b21b6" />
                    <Cell fill="#f472b6" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Total Assets"
                value={`$${totalAssets.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Debt"
                value={`$${totalLiabilities.toFixed(0)}`}
              />

              <SummaryCard
                title="Net Worth"
                value={`$${netWorth.toFixed(0)}`}
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
                  stroke="#5b21b6"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Asset & Debt Comparison
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
                  fill="#5b21b6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Net Worth Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A net worth calculator helps individuals estimate total personal wealth by subtracting liabilities from total assets.
              Net worth calculations are widely used in financial planning,
              retirement preparation,
              wealth management,
              and long-term financial goal tracking.
            </p>

            <p>
              Monitoring net worth over time may help individuals measure financial progress,
              improve budgeting decisions,
              reduce debt,
              and increase long-term financial stability.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Net Worth?
            </h3>

            <p>
              Net worth represents the difference between everything you own and everything you owe.
              Positive net worth means total assets exceed liabilities,
              while negative net worth means debt exceeds asset value.
            </p>

            <p>
              Assets may include savings accounts,
              investments,
              real estate,
              retirement accounts,
              vehicles,
              and personal property.
              Liabilities may include mortgages,
              student loans,
              credit card debt,
              auto loans,
              and personal loans.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Net Worth Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Net Worth = Total Assets - Total Liabilities
              </code>

            </div>

            <p>
              The formula is simple,
              but accurately tracking assets and debts provides valuable insights into long-term financial health.
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Assets = Savings, investments, property, retirement accounts
              </li>

              <li>
                Liabilities = Mortgages, loans, credit cards, debt obligations
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Net Worth Matters
            </h3>

            <p>
              Net worth is one of the most important indicators of financial health because it measures overall financial position rather than income alone.
              High income does not always guarantee strong financial stability if liabilities remain excessive.
            </p>

            <p>
              Individuals with growing net worth may improve long-term financial security,
              retirement readiness,
              and wealth accumulation potential.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Net Worth Scenario
            </h3>

            <p>
              Suppose an individual owns $510,000 in combined assets including investments,
              savings,
              and real estate.
              If total liabilities equal $238,000,
              estimated net worth equals $272,000.
            </p>

            <p>
              Tracking net worth annually may help individuals evaluate progress toward financial independence and retirement goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Ways to Increase Net Worth
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Increase savings contributions
              </li>

              <li>
                Invest consistently over time
              </li>

              <li>
                Reduce high-interest debt
              </li>

              <li>
                Improve portfolio diversification
              </li>

              <li>
                Build emergency savings
              </li>

              <li>
                Avoid unnecessary liabilities
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Importance of Investments
            </h3>

            <p>
              Investments often play a major role in long-term net worth growth.
              Stocks,
              ETFs,
              mutual funds,
              retirement accounts,
              and real estate investments may generate compound returns over decades.
            </p>

            <p>
              Long-term investing combined with disciplined saving strategies may significantly improve overall financial position.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Debt and Financial Health
            </h3>

            <p>
              Excessive debt may negatively affect net worth and financial flexibility.
              High-interest liabilities such as credit card balances may reduce long-term wealth accumulation potential.
            </p>

            <p>
              Many financial plans prioritize debt reduction alongside consistent investment contributions and emergency savings growth.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Net Worth and Retirement Planning
            </h3>

            <p>
              Net worth tracking is commonly used in retirement planning because retirement readiness depends heavily on accumulated assets and reduced liabilities.
            </p>

            <p>
              Investors approaching retirement often focus on preserving capital,
              increasing passive income,
              and managing debt exposure more conservatively.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is considered a good net worth?"
                answer="Net worth varies depending on age, income, location, and financial goals. Positive and growing net worth is generally considered a healthy financial indicator."
              />

              <FaqItem
                question="Does net worth include retirement accounts?"
                answer="Yes. Retirement accounts such as 401(k)s and IRAs are commonly included as assets in net worth calculations."
              />

              <FaqItem
                question="Should I include my home value?"
                answer="Many individuals include home equity by subtracting mortgage debt from estimated property value."
              />

              <FaqItem
                question="Why is net worth more important than income?"
                answer="Net worth measures total financial position and long-term wealth accumulation rather than annual earnings alone."
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
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
              },

              {
                title: "FIRE Calculator",
                link: "/fire-calculator",
              },

              {
                title: "Passive Income Calculator",
                link: "/passive-income-calculator",
              },

              {
                title: "Financial Independence Calculator",
                link: "/financial-independence-calculator",
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
          } pr-4`}
        />

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