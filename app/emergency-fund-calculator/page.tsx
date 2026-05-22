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
  Legend,
  AreaChart,
  Area,
} from "recharts";

export default function EmergencyFundCalculator() {

  const [monthlyExpenses, setMonthlyExpenses] = useState(3500);

  const [monthsCovered, setMonthsCovered] = useState(6);

  const [currentSavings, setCurrentSavings] = useState(5000);

  const [monthlyContribution, setMonthlyContribution] = useState(600);

  const emergencyGoal =
    monthlyExpenses * monthsCovered;

  const remainingAmount =
    Math.max(
      emergencyGoal - currentSavings,
      0
    );

  const monthsNeeded =
    monthlyContribution > 0
      ? Math.ceil(
          remainingAmount /
            monthlyContribution
        )
      : 0;

  const totalContributions =
    monthlyContribution *
    monthsNeeded;

  const pieData = [
    {
      name: "Current Savings",
      value: currentSavings,
    },

    {
      name: "Remaining Goal",
      value: remainingAmount,
    },
  ];

  const growthData = useMemo(() => {

    const data = [];

    let balance =
      currentSavings;

    for (
      let month = 1;
      month <= Math.max(monthsNeeded, 12);
      month++
    ) {

      balance +=
        monthlyContribution;

      data.push({
        month: `M${month}`,
        balance,
      });

    }

    return data;

  }, [
    currentSavings,
    monthlyContribution,
    monthsNeeded,
  ]);

  const compareData = [
    {
      name: "Current Savings",
      value: currentSavings,
    },

    {
      name: "Emergency Goal",
      value: emergencyGoal,
    },

    {
      name: "Remaining Amount",
      value: remainingAmount,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-red-900 to-orange-500 px-6 py-8 text-white">

            <div className="flex flex-wrap gap-3 mb-5">

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Updated 2026
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Financial Safety Tool
              </div>

            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Emergency Fund Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-4xl leading-8">
              Estimate your ideal emergency fund size,
              savings target,
              monthly expense coverage,
              and financial safety reserve using this advanced emergency fund calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Monthly Expenses"
                  value={monthlyExpenses}
                  setValue={setMonthlyExpenses}
                  prefix="$"
                />

                <InputField
                  label="Months Covered"
                  value={monthsCovered}
                  setValue={setMonthsCovered}
                  suffix="Months"
                />

                <InputField
                  label="Current Savings"
                  value={currentSavings}
                  setValue={setCurrentSavings}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-orange-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-red-900 to-orange-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Recommended Emergency Fund
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${emergencyGoal.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Emergency Fund Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Current Savings"
                    value={`$${currentSavings.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Remaining Goal"
                    value={`$${remainingAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Months Needed"
                    value={`${monthsNeeded} Months`}
                  />

                  <SummaryRow
                    label="Monthly Expenses"
                    value={`$${monthlyExpenses.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <SummaryCard
            title="Emergency Goal"
            value={`$${emergencyGoal.toFixed(0)}`}
          />

          <SummaryCard
            title="Current Savings"
            value={`$${currentSavings.toFixed(0)}`}
          />

          <SummaryCard
            title="Remaining Goal"
            value={`$${remainingAmount.toFixed(0)}`}
          />

          <SummaryCard
            title="Months to Goal"
            value={`${monthsNeeded}`}
          />

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Emergency Fund Breakdown
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

                    <Cell fill="#7f1d1d" />
                    <Cell fill="#f97316" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Current Emergency Savings"
                value={`$${currentSavings.toFixed(0)}`}
              />

              <SummaryCard
                title="Remaining Savings Goal"
                value={`$${remainingAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Recommended Reserve"
                value={`$${emergencyGoal.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Emergency Fund Growth Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#ea580c"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AREA CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Emergency Savings Accumulation
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <AreaChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#ea580c"
                  fill="#fdba74"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Emergency Fund Comparison
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
                  fill="#ea580c"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Emergency Fund Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An emergency fund calculator helps estimate how much cash reserve is needed to cover unexpected financial situations such as job loss,
              medical emergencies,
              car repairs,
              or sudden living expenses.
              Emergency savings are considered one of the most important components of long-term financial stability.
            </p>

            <p>
              Financial advisors commonly recommend maintaining three to six months of essential living expenses in a liquid savings account.
              Individuals with variable income,
              dependents,
              or higher financial risk exposure may require larger emergency reserves.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is an Emergency Fund?
            </h3>

            <p>
              An emergency fund is a dedicated savings reserve designed to protect against unexpected financial hardship.
              These funds are typically held in highly liquid accounts such as savings accounts,
              money market accounts,
              or high yield savings accounts.
            </p>

            <p>
              Emergency savings are intended for true emergencies rather than planned purchases or discretionary spending.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Emergency Savings Matter
            </h3>

            <p>
              Without adequate emergency savings,
              unexpected expenses may force individuals to rely on high-interest debt such as credit cards or personal loans.
              Emergency funds help reduce financial stress and improve long-term financial resilience.
            </p>

            <p>
              Emergency reserves also provide flexibility during career transitions,
              economic downturns,
              and periods of reduced income.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Emergency Fund Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Emergency Fund = Monthly Expenses × Months Covered
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Monthly Expenses = Essential monthly living costs
              </li>

              <li>
                Months Covered = Desired financial safety period
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Recommended Emergency Fund Size
            </h3>

            <p>
              Recommended savings targets vary depending on income stability,
              household size,
              debt obligations,
              and career risk.
              Stable salaried workers may target three to six months of expenses,
              while freelancers or business owners often maintain larger reserves.
            </p>

            <p>
              Individuals with children,
              medical obligations,
              or uncertain income streams may prefer more conservative savings targets.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Where to Keep Emergency Savings
            </h3>

            <p>
              Emergency funds are commonly stored in liquid accounts that provide easy access while still earning interest.
              Popular options include:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                High yield savings accounts
              </li>

              <li>
                Money market accounts
              </li>

              <li>
                Certificates of deposit
              </li>

              <li>
                Cash management accounts
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Emergency Funds
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Improved financial stability
              </li>

              <li>
                Reduced dependence on debt
              </li>

              <li>
                Better stress management
              </li>

              <li>
                Greater financial flexibility
              </li>

              <li>
                Increased long-term security
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Common Emergency Fund Mistakes
            </h3>

            <p>
              Many individuals underestimate their true monthly expenses or fail to include irregular costs such as insurance,
              healthcare,
              utilities,
              and transportation.
            </p>

            <p>
              Another common mistake is investing emergency savings in volatile assets that may lose value during economic downturns.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenarios
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Salaried Employee
                </h4>

                <p>
                  An employee with monthly expenses of $3,500 may target six months of emergency coverage,
                  requiring approximately $21,000 in emergency savings.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — Self-Employed Worker
                </h4>

                <p>
                  Freelancers and business owners may choose to maintain nine to twelve months of expenses due to income variability and economic uncertainty.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="How much emergency savings should I have?"
                answer="Many financial experts recommend maintaining three to six months of essential living expenses."
              />

              <FaqItem
                question="Where should emergency funds be stored?"
                answer="Emergency savings are commonly held in liquid accounts such as high yield savings accounts or money market accounts."
              />

              <FaqItem
                question="Should emergency funds be invested?"
                answer="Emergency savings are generally intended to remain stable and liquid rather than exposed to significant market risk."
              />

              <FaqItem
                question="What expenses should be included?"
                answer="Essential living costs such as housing, food, transportation, insurance, utilities, and healthcare are commonly included."
              />

              <FaqItem
                question="How long does it take to build an emergency fund?"
                answer="The timeline depends on monthly savings contributions, income, and the selected emergency fund target."
              />

            </div>

          </div>

        </section>

        {/* RELATED TOOLS */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Related Calculators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              {
                title: "Budget Calculator",
                link: "/budget-calculator",
              },

              {
                title: "Expense Calculator",
                link: "/expense-calculator",
              },

              {
                title: "Cash Flow Calculator",
                link: "/cash-flow-calculator",
              },

              {
                title: "High Yield Savings Calculator",
                link: "/high-yield-savings-calculator",
              },

              {
                title: "Monthly Budget Calculator",
                link: "/monthly-budget-calculator",
              },

              {
                title: "Savings Calculator",
                link: "/savings-calculator",
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
          } ${suffix ? "pr-24" : "pr-4"}`}
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

    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">

      <div className="text-slate-600 mb-2 font-semibold">
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