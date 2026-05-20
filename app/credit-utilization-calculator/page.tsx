// app/credit-utilization-calculator/page.tsx

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

export default function CreditUtilizationCalculator() {

  const [totalLimit, setTotalLimit] = useState(25000);

  const [usedCredit, setUsedCredit] = useState(7200);

  const [monthlyPaydown, setMonthlyPaydown] = useState(400);

  const utilization =
    (usedCredit / totalLimit) * 100;

  const availableCredit =
    totalLimit - usedCredit;

  const projectedMonths =
    Math.ceil(usedCredit / monthlyPaydown);

  const scoreImpact =
    utilization > 75
      ? "High Risk"
      : utilization > 50
      ? "Moderate Risk"
      : utilization > 30
      ? "Average"
      : "Healthy";

  const pieData = [
    {
      name: "Used Credit",
      value: usedCredit,
    },

    {
      name: "Available Credit",
      value: availableCredit,
    },
  ];

  const payoffData = useMemo(() => {

    let balance = usedCredit;

    const arr = [];

    for (let i = 1; i <= 12; i++) {

      balance =
        balance - monthlyPaydown;

      if (balance < 0) balance = 0;

      arr.push({
        month: `M${i}`,
        balance,
      });

    }

    return arr;

  }, [usedCredit, monthlyPaydown]);

  const compareData = [
    {
      name: "Used",
      value: usedCredit,
    },

    {
      name: "Available",
      value: availableCredit,
    },

    {
      name: "Monthly Paydown",
      value: monthlyPaydown,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Credit Utilization Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate your credit utilization ratio,
              available credit,
              debt reduction timeline,
              and understand how utilization impacts your credit score.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Total Credit Limit"
                  value={totalLimit}
                  setValue={setTotalLimit}
                  prefix="$"
                />

                <InputField
                  label="Used Credit"
                  value={usedCredit}
                  setValue={setUsedCredit}
                  prefix="$"
                />

                <InputField
                  label="Monthly Paydown"
                  value={monthlyPaydown}
                  setValue={setMonthlyPaydown}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Credit Utilization Ratio
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  {utilization.toFixed(1)}%
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Credit Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Available Credit"
                    value={`$${availableCredit.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Payoff"
                    value={`${projectedMonths} Months`}
                  />

                  <SummaryRow
                    label="Risk Category"
                    value={scoreImpact}
                  />

                  <SummaryRow
                    label="Credit Used"
                    value={`$${usedCredit.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Credit Usage Breakdown
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

                    <Cell fill="#2563eb" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Credit Limit"
                value={`$${totalLimit.toFixed(0)}`}
              />

              <SummaryCard
                title="Used Credit"
                value={`$${usedCredit.toFixed(0)}`}
              />

              <SummaryCard
                title="Utilization"
                value={`${utilization.toFixed(1)}%`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Debt Reduction Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={payoffData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Credit Comparison Overview
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
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Credit Utilization Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A credit utilization calculator helps borrowers estimate how much of their available revolving credit is currently being used.
              Credit utilization is one of the most important factors affecting credit scores and overall financial health.
            </p>

            <p>
              Lenders and credit scoring models evaluate utilization ratios to determine how responsibly borrowers manage revolving credit accounts.
              Lower utilization ratios are generally viewed as less risky and may help improve borrowing opportunities.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Credit Utilization?
            </h3>

            <p>
              Credit utilization measures the percentage of available credit currently in use.
              It is commonly calculated across credit cards,
              personal credit lines,
              and revolving borrowing accounts.
            </p>

            <p>
              For example,
              if a borrower has a total credit limit of $25,000 and uses $7,500,
              the utilization ratio would equal 30%.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Credit Utilization Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Utilization = (Used Credit ÷ Total Credit Limit) × 100
              </code>

            </div>

            <p>
              This formula allows borrowers to estimate the percentage of available revolving credit currently being used.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Utilization Matters
            </h3>

            <p>
              Credit utilization is a major factor in many credit scoring systems.
              High utilization may signal financial stress or excessive borrowing risk,
              while lower utilization ratios often indicate stronger credit management habits.
            </p>

            <p>
              Borrowers with lower utilization ratios may qualify for better loan terms,
              lower interest rates,
              and improved approval odds.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Recommended Utilization Levels
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Below 10% — Excellent
              </li>

              <li>
                Below 30% — Healthy
              </li>

              <li>
                30% to 50% — Moderate
              </li>

              <li>
                Above 50% — Elevated risk
              </li>

              <li>
                Above 75% — High risk
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              How to Reduce Credit Utilization
            </h3>

            <p>
              Reducing balances is one of the fastest ways to lower utilization ratios.
              Making larger monthly payments,
              avoiding unnecessary purchases,
              and paying balances before statement dates may improve reported utilization percentages.
            </p>

            <p>
              Increasing total available credit while maintaining low balances may also lower overall utilization ratios.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenario
            </h3>

            <p>
              Suppose a borrower has a total credit limit of $25,000 and currently uses $7,200.
              The utilization ratio would equal approximately 28.8%.
            </p>

            <p>
              If the borrower reduces balances by $400 per month,
              the utilization ratio may steadily improve over time,
              potentially strengthening credit health and future borrowing eligibility.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Lower Utilization
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Better credit scores
              </li>

              <li>
                Lower borrowing risk
              </li>

              <li>
                Improved loan approval odds
              </li>

              <li>
                Lower potential interest rates
              </li>

              <li>
                Healthier financial profile
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Common Credit Utilization Mistakes
            </h3>

            <p>
              Some borrowers assume paying minimum balances is enough to improve utilization quickly.
              However,
              high balances relative to available credit may continue affecting credit scores even when payments remain current.
            </p>

            <p>
              Closing unused credit cards may also increase utilization ratios by reducing total available credit.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a good credit utilization ratio?"
                answer="Many financial experts recommend staying below 30%, while lower ratios below 10% are often considered excellent."
              />

              <FaqItem
                question="Does utilization affect credit scores immediately?"
                answer="Credit utilization updates as lenders report balances to credit bureaus, which may affect scores regularly."
              />

              <FaqItem
                question="Can increasing my credit limit improve utilization?"
                answer="Yes. Higher available credit may lower utilization percentages if balances remain stable."
              />

              <FaqItem
                question="Do installment loans count toward utilization?"
                answer="No. Utilization generally applies to revolving credit accounts such as credit cards and credit lines."
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
                title: "Line of Credit Calculator",
                link: "/line-of-credit-calculator",
              },

              {
                title: "Debt Payoff Calculator",
                link: "/debt-payoff-calculator",
              },

              {
                title: "Credit Card Payoff Calculator",
                link: "/credit-card-payoff-calculator",
              },

              {
                title: "Loan Payoff Calculator",
                link: "/loan-payoff-calculator",
              },

              {
                title: "Interest Payoff Calculator",
                link: "/interest-payoff-calculator",
              },

              {
                title: "Personal Loan Calculator",
                link: "/personal-loan-calculator",
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