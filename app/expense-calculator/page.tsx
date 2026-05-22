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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function ExpenseCalculator() {

  const [income, setIncome] = useState(7000);

  const [housing, setHousing] = useState(1800);

  const [food, setFood] = useState(700);

  const [transportation, setTransportation] = useState(450);

  const [utilities, setUtilities] = useState(300);

  const [insurance, setInsurance] = useState(400);

  const [healthcare, setHealthcare] = useState(250);

  const [entertainment, setEntertainment] = useState(500);

  const [shopping, setShopping] = useState(350);

  const [debtPayments, setDebtPayments] = useState(600);

  const [subscriptions, setSubscriptions] = useState(100);

  const [otherExpenses, setOtherExpenses] = useState(400);

  const totalExpenses =
    housing +
    food +
    transportation +
    utilities +
    insurance +
    healthcare +
    entertainment +
    shopping +
    debtPayments +
    subscriptions +
    otherExpenses;

  const remainingBalance =
    income - totalExpenses;

  const savingsRate =
    income > 0
      ? (remainingBalance / income) * 100
      : 0;

  const expenseRatio =
    income > 0
      ? (totalExpenses / income) * 100
      : 0;

  const pieData = [
    {
      name: "Housing",
      value: housing,
    },

    {
      name: "Food",
      value: food,
    },

    {
      name: "Transportation",
      value: transportation,
    },

    {
      name: "Utilities",
      value: utilities,
    },

    {
      name: "Insurance",
      value: insurance,
    },

    {
      name: "Healthcare",
      value: healthcare,
    },

    {
      name: "Entertainment",
      value: entertainment,
    },

    {
      name: "Shopping",
      value: shopping,
    },

    {
      name: "Debt",
      value: debtPayments,
    },

    {
      name: "Subscriptions",
      value: subscriptions,
    },

    {
      name: "Other",
      value: otherExpenses,
    },
  ];

  const monthlyProjection = useMemo(() => {

    const data = [];

    let cumulativeSavings = 0;

    for (
      let month = 1;
      month <= 12;
      month++
    ) {

      cumulativeSavings +=
        remainingBalance;

      data.push({
        month: `Month ${month}`,
        savings:
          cumulativeSavings,
      });

    }

    return data;

  }, [remainingBalance]);

  const comparisonData = [
    {
      name: "Income",
      amount: income,
    },

    {
      name: "Expenses",
      amount: totalExpenses,
    },

    {
      name: "Remaining",
      amount: remainingBalance,
    },
  ];

  const radarData = [
    {
      category: "Housing",
      amount: housing,
    },

    {
      category: "Food",
      amount: food,
    },

    {
      category: "Transport",
      amount: transportation,
    },

    {
      category: "Entertainment",
      amount: entertainment,
    },

    {
      category: "Debt",
      amount: debtPayments,
    },

    {
      category: "Shopping",
      amount: shopping,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-cyan-900 to-blue-500 px-6 py-10 text-white">

            <div className="flex flex-wrap gap-3 mb-5">

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Updated 2026
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Personal Finance Tool
              </div>

            </div>

            <h1 className="text-4xl lg:text-6xl font-black mb-5">
              Expense Calculator
            </h1>

            <p className="text-lg lg:text-xl text-white/90 max-w-5xl leading-9">
              Estimate monthly expenses,
              analyze spending categories,
              track personal cash flow,
              and improve budgeting decisions using this advanced expense calculator with interactive financial charts and expense breakdown analysis.
            </p>

          </div>

          {/* CALCULATOR */}

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="grid md:grid-cols-2 gap-5">

                <InputField
                  label="Monthly Income"
                  value={income}
                  setValue={setIncome}
                  prefix="$"
                />

                <InputField
                  label="Housing"
                  value={housing}
                  setValue={setHousing}
                  prefix="$"
                />

                <InputField
                  label="Food"
                  value={food}
                  setValue={setFood}
                  prefix="$"
                />

                <InputField
                  label="Transportation"
                  value={transportation}
                  setValue={setTransportation}
                  prefix="$"
                />

                <InputField
                  label="Utilities"
                  value={utilities}
                  setValue={setUtilities}
                  prefix="$"
                />

                <InputField
                  label="Insurance"
                  value={insurance}
                  setValue={setInsurance}
                  prefix="$"
                />

                <InputField
                  label="Healthcare"
                  value={healthcare}
                  setValue={setHealthcare}
                  prefix="$"
                />

                <InputField
                  label="Entertainment"
                  value={entertainment}
                  setValue={setEntertainment}
                  prefix="$"
                />

                <InputField
                  label="Shopping"
                  value={shopping}
                  setValue={setShopping}
                  prefix="$"
                />

                <InputField
                  label="Debt Payments"
                  value={debtPayments}
                  setValue={setDebtPayments}
                  prefix="$"
                />

                <InputField
                  label="Subscriptions"
                  value={subscriptions}
                  setValue={setSubscriptions}
                  prefix="$"
                />

                <InputField
                  label="Other Expenses"
                  value={otherExpenses}
                  setValue={setOtherExpenses}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS DASHBOARD */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-cyan-900 to-blue-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Remaining Monthly Balance
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${remainingBalance.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Expense Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Monthly Income"
                    value={`$${income.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Expenses"
                    value={`$${totalExpenses.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Remaining Cash Flow"
                    value={`$${remainingBalance.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Savings Rate"
                    value={`${savingsRate.toFixed(1)}%`}
                  />

                  <SummaryRow
                    label="Expense Ratio"
                    value={`${expenseRatio.toFixed(1)}%`}
                  />

                </div>

              </div>

              {/* MINI CARDS */}

              <div className="grid grid-cols-2 gap-4 mt-6">

                <MiniCard
                  title="Housing Ratio"
                  value={`${(
                    (housing / income) *
                    100
                  ).toFixed(1)}%`}
                />

                <MiniCard
                  title="Debt Ratio"
                  value={`${(
                    (debtPayments / income) *
                    100
                  ).toFixed(1)}%`}
                />

                <MiniCard
                  title="Entertainment Ratio"
                  value={`${(
                    (entertainment / income) *
                    100
                  ).toFixed(1)}%`}
                />

                <MiniCard
                  title="Shopping Ratio"
                  value={`${(
                    (shopping / income) *
                    100
                  ).toFixed(1)}%`}
                />

              </div>

            </div>

          </div>

        </section>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 mt-8">

          <SummaryCard
            title="Income"
            value={`$${income.toFixed(0)}`}
          />

          <SummaryCard
            title="Expenses"
            value={`$${totalExpenses.toFixed(0)}`}
          />

          <SummaryCard
            title="Remaining"
            value={`$${remainingBalance.toFixed(0)}`}
          />

          <SummaryCard
            title="Savings Rate"
            value={`${savingsRate.toFixed(1)}%`}
          />

          <SummaryCard
            title="Expense Ratio"
            value={`${expenseRatio.toFixed(1)}%`}
          />

        </div>

        {/* PIE CHART */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Monthly Expense Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div className="h-[450px]">

              <ResponsiveContainer width="100%" height={450}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={160}
                    label
                  >

                    <Cell fill="#155e75" />
                    <Cell fill="#0284c7" />
                    <Cell fill="#0ea5e9" />
                    <Cell fill="#06b6d4" />
                    <Cell fill="#14b8a6" />
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#ec4899" />
                    <Cell fill="#f97316" />
                    <Cell fill="#64748b" />
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              {pieData.map((item) => (

                <div
                  key={item.name}
                  className="flex items-center justify-between border rounded-2xl px-5 py-4"
                >

                  <span className="font-semibold text-slate-700">
                    {item.name}
                  </span>

                  <span className="font-black text-slate-900">
                    ${item.value.toFixed(0)}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* LINE CHART */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            12-Month Cash Flow Projection
          </h2>

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height={450}>

              <LineChart data={monthlyProjection}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#0284c7"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* AREA CHART */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Savings Accumulation Forecast
          </h2>

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height={450}>

              <AreaChart data={monthlyProjection}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#06b6d4"
                  fill="#a5f3fc"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* BAR CHART */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Income vs Expenses Comparison
          </h2>

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height={450}>

              <BarChart data={comparisonData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#0284c7"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* RADAR CHART */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Spending Category Analysis
          </h2>

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height={450}>

              <RadarChart data={radarData}>

                <PolarGrid />

                <PolarAngleAxis dataKey="category" />

                <PolarRadiusAxis />

                <Radar
                  name="Expenses"
                  dataKey="amount"
                  stroke="#0284c7"
                  fill="#06b6d4"
                  fillOpacity={0.6}
                />

              </RadarChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* BREAKDOWN TABLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 overflow-auto">

          <h2 className="text-3xl font-black mb-6">
            Expense Breakdown Table
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-slate-100">

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Amount
                </th>

                <th className="text-left p-4">
                  Percentage
                </th>

              </tr>

            </thead>

            <tbody>

              {pieData.map((item) => (

                <tr
                  key={item.name}
                  className="border-b"
                >

                  <td className="p-4">
                    {item.name}
                  </td>

                  <td className="p-4 font-bold">
                    ${item.value.toFixed(0)}
                  </td>

                  <td className="p-4">
                    {(
                      (item.value /
                        totalExpenses) *
                      100
                    ).toFixed(1)}
                    %
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </section>

        {/* FORMULA */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Expense Calculator Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 overflow-auto mb-6">

            <code className="text-lg">
              Remaining Balance = Monthly Income - Total Expenses
            </code>

          </div>

          <p className="text-slate-700 leading-8">
            Total expenses include all fixed and variable monthly costs such as housing,
            transportation,
            food,
            healthcare,
            entertainment,
            debt payments,
            insurance,
            and subscriptions.
          </p>

        </section>

        {/* LONG EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Expense Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An expense calculator helps individuals estimate monthly spending,
              analyze expense categories,
              manage cash flow,
              and improve personal financial planning.
              Expense tracking is one of the most important aspects of budgeting because it provides visibility into spending behavior and long-term financial habits.
            </p>

            <p>
              Financial experts often recommend tracking expenses consistently to reduce unnecessary spending,
              increase savings rates,
              and improve long-term financial stability.
              Expense calculators simplify this process by organizing costs into categories and visualizing spending patterns through charts and financial summaries.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is an Expense Calculator?
            </h3>

            <p>
              An expense calculator is a financial planning tool designed to estimate total monthly expenses and compare them against income.
              Expense calculators are commonly used for personal budgeting,
              debt reduction planning,
              retirement preparation,
              emergency fund building,
              and household financial management.
            </p>

            <p>
              Expense tracking allows individuals to identify spending inefficiencies and improve long-term financial decision-making.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Fixed vs Variable Expenses
            </h3>

            <p>
              Expenses are generally divided into fixed and variable categories.
              Fixed expenses include recurring monthly obligations such as rent,
              mortgage payments,
              insurance premiums,
              and subscription services.
            </p>

            <p>
              Variable expenses include spending categories such as food,
              entertainment,
              transportation,
              travel,
              shopping,
              and discretionary purchases.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Expense Tracking
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Improves financial awareness
              </li>

              <li>
                Reduces unnecessary spending
              </li>

              <li>
                Helps increase savings rates
              </li>

              <li>
                Supports debt reduction strategies
              </li>

              <li>
                Enhances long-term financial stability
              </li>

              <li>
                Improves budgeting discipline
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Common Spending Categories
            </h3>

            <p>
              Expense calculators commonly include housing,
              food,
              transportation,
              healthcare,
              utilities,
              debt payments,
              insurance,
              subscriptions,
              entertainment,
              travel,
              shopping,
              and miscellaneous spending categories.
            </p>

            <p>
              Organizing expenses into categories helps identify where the majority of income is being allocated each month.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Expense Ratio and Savings Rate
            </h3>

            <p>
              Expense ratio measures the percentage of income spent on monthly expenses,
              while savings rate measures the percentage of income remaining after expenses.
              Higher savings rates generally improve long-term financial resilience and investment potential.
            </p>

            <p>
              Many financial advisors recommend maintaining a savings rate between 15% and 25% whenever possible.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Financial Tips for Better Expense Management
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Review monthly expenses regularly
              </li>

              <li>
                Reduce unnecessary subscriptions
              </li>

              <li>
                Prioritize high-interest debt repayment
              </li>

              <li>
                Build emergency savings reserves
              </li>

              <li>
                Limit discretionary spending
              </li>

              <li>
                Automate savings contributions
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Expense Planning Strategies
            </h3>

            <p>
              Budgeting frameworks such as the 50/30/20 rule are commonly used to balance essential expenses,
              discretionary spending,
              and savings contributions.
              Expense calculators help determine whether current spending aligns with financial goals.
            </p>

            <p>
              Tracking cash flow consistently can also improve investment planning,
              retirement preparation,
              and debt payoff timelines.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common Budgeting Mistakes
            </h3>

            <p>
              One of the most common financial mistakes is underestimating irregular expenses such as maintenance,
              healthcare,
              annual subscriptions,
              and insurance renewals.
            </p>

            <p>
              Another common mistake is failing to monitor small discretionary purchases,
              which can accumulate significantly over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenarios
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Household Budget Planning
                </h4>

                <p>
                  A household earning $7,000 monthly uses an expense calculator to organize spending categories and improve savings discipline.
                  By reducing discretionary shopping and entertainment costs,
                  the family increases monthly savings and improves long-term financial stability.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — Debt Reduction Strategy
                </h4>

                <p>
                  An individual tracks expenses and identifies unnecessary subscription spending,
                  allowing more cash flow to be redirected toward paying down high-interest debt.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is an expense calculator?"
                answer="An expense calculator estimates monthly spending, compares expenses against income, and helps improve budgeting decisions."
              />

              <FaqItem
                question="Why should I track expenses?"
                answer="Tracking expenses improves financial awareness, increases savings potential, and reduces unnecessary spending."
              />

              <FaqItem
                question="What expenses should be included?"
                answer="Common expense categories include housing, transportation, food, healthcare, debt payments, insurance, entertainment, and subscriptions."
              />

              <FaqItem
                question="How often should expenses be reviewed?"
                answer="Financial experts commonly recommend reviewing expenses monthly to maintain budgeting accuracy."
              />

              <FaqItem
                question="What is a good savings rate?"
                answer="Many financial advisors recommend maintaining a savings rate between 15% and 25% whenever possible."
              />

            </div>

          </div>

        </section>

        {/* RELATED TOOLS */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

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
                title: "Cash Flow Calculator",
                link: "/cash-flow-calculator",
              },

              {
                title: "Monthly Budget Calculator",
                link: "/monthly-budget-calculator",
              },

              {
                title: "Emergency Fund Calculator",
                link: "/emergency-fund-calculator",
              },

              {
                title: "Net Worth Calculator",
                link: "/net-worth-calculator",
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

        </section>

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

function MiniCard({
  title,
  value,
}: any) {

  return (

    <div className="bg-white rounded-2xl border border-slate-200 p-4">

      <div className="text-sm text-slate-500 mb-1">
        {title}
      </div>

      <div className="text-xl font-black text-slate-900">
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