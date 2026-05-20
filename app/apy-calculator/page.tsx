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

export default function APYCalculator() {

  const [initialDeposit, setInitialDeposit] = useState(10000);

  const [monthlyContribution, setMonthlyContribution] = useState(300);

  const [interestRate, setInterestRate] = useState(4.5);

  const [years, setYears] = useState(10);

  const monthlyRate =
    interestRate / 100 / 12;

  const totalMonths =
    years * 12;

  let futureValue =
    initialDeposit *
    Math.pow(1 + monthlyRate, totalMonths);

  futureValue +=
    monthlyContribution *
    (
      (
        Math.pow(1 + monthlyRate, totalMonths) - 1
      ) / monthlyRate
    );

  const totalContributions =
    initialDeposit +
    monthlyContribution * totalMonths;

  const totalInterest =
    futureValue - totalContributions;

  const apy =
    (
      Math.pow(
        1 + interestRate / 100 / 12,
        12
      ) - 1
    ) * 100;

  const pieData = [
    {
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Interest Earned",
      value: totalInterest,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value: futureValue * 0.18,
      },

      {
        year: "Year 3",
        value: futureValue * 0.39,
      },

      {
        year: "Year 5",
        value: futureValue * 0.58,
      },

      {
        year: "Year 7",
        value: futureValue * 0.77,
      },

      {
        year: "Year 10",
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
      name: "Interest",
      value: totalInterest,
    },

    {
      name: "Final Balance",
      value: futureValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              APY Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate annual percentage yield,
              compound interest growth,
              savings earnings,
              and long-term investment returns using this free APY calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Initial Deposit"
                  value={initialDeposit}
                  setValue={setInitialDeposit}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
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

              <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated APY
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  {apy.toFixed(2)}%
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Savings Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Final Balance"
                    value={`$${futureValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Contributions"
                    value={`$${totalContributions.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Earned"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Annual Yield"
                    value={`${apy.toFixed(2)}%`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Savings Growth Breakdown
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

                    <Cell fill="#059669" />
                    <Cell fill="#6ee7b7" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Initial + Monthly Deposits"
                value={`$${totalContributions.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Interest"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Projected Balance"
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
                  stroke="#059669"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            APY Comparison Overview
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
                  fill="#059669"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            APY Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An APY calculator helps savers and investors estimate how much money may grow over time through compound interest.
              APY stands for annual percentage yield and represents the effective yearly return earned on savings accounts,
              certificates of deposit,
              money market accounts,
              and investment products.
            </p>

            <p>
              Unlike basic interest rates,
              APY includes the effects of compounding.
              This means earnings generate additional earnings over time,
              helping balances grow faster.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is APY?
            </h3>

            <p>
              APY measures the real annual return earned on deposits after accounting for compound interest.
              Financial institutions often advertise APY because it provides a more accurate representation of account growth than simple interest rates.
            </p>

            <p>
              The more frequently interest compounds,
              the higher the APY becomes.
              Daily compounding generally produces slightly higher returns than monthly or annual compounding.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              APY Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                APY = (1 + r/n)^n − 1
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                r = Annual interest rate
              </li>

              <li>
                n = Number of compounding periods per year
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why APY Matters
            </h3>

            <p>
              APY helps consumers compare savings products more accurately.
              Two accounts with identical interest rates may generate different earnings depending on compounding frequency.
            </p>

            <p>
              Understanding APY may help savers maximize long-term investment growth and identify higher-yield opportunities.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Compound Interest Benefits
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Faster long-term savings growth
              </li>

              <li>
                Interest earned on previous interest
              </li>

              <li>
                Increased retirement savings potential
              </li>

              <li>
                Better investment accumulation
              </li>

              <li>
                Improved passive income opportunities
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example APY Scenario
            </h3>

            <p>
              Suppose a saver deposits $10,000 into a high-yield savings account earning 4.5% interest compounded monthly.
              Over time,
              monthly contributions and compound growth may significantly increase the final account balance.
            </p>

            <p>
              Investors who consistently contribute funds may benefit from exponential long-term growth patterns.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              APY vs Interest Rate
            </h3>

            <p>
              Interest rates measure the base return paid on deposits,
              while APY reflects the total effective yield after compounding.
              APY is generally slightly higher than the stated interest rate because it includes compound growth effects.
            </p>

            <p>
              Savers should compare APY values rather than interest rates alone when selecting savings products.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Ways to Increase Savings Growth
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Increase monthly contributions
              </li>

              <li>
                Select higher APY accounts
              </li>

              <li>
                Reinvest earned interest
              </li>

              <li>
                Avoid unnecessary withdrawals
              </li>

              <li>
                Extend investment timelines
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a good APY?"
                answer="Competitive high-yield savings accounts often offer APYs significantly higher than traditional savings accounts."
              />

              <FaqItem
                question="Does APY include compound interest?"
                answer="Yes. APY reflects the impact of compounding on annual earnings."
              />

              <FaqItem
                question="Is APY higher than interest rate?"
                answer="Usually yes, because APY includes compound growth while interest rate alone does not."
              />

              <FaqItem
                question="Can monthly deposits improve returns?"
                answer="Yes. Consistent contributions may significantly increase long-term investment growth."
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
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
              },

              {
                title: "Interest Calculator",
                link: "/interest-calculator",
              },

              {
                title: "APR Calculator",
                link: "/apr-calculator",
              },

              {
                title: "Savings Calculator",
                link: "/savings-calculator",
              },

              {
                title: "Investment Calculator",
                link: "/investment-calculator",
              },

              {
                title: "Retirement Calculator",
                link: "/retirement-calculator",
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
          } ${suffix ? "pr-16" : "pr-4"}`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
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