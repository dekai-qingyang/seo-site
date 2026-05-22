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

export default function BudgetCalculator() {

  const [income, setIncome] = useState(6500);

  const [housing, setHousing] = useState(1800);

  const [food, setFood] = useState(700);

  const [transportation, setTransportation] = useState(450);

  const [utilities, setUtilities] = useState(300);

  const [insurance, setInsurance] = useState(350);

  const [entertainment, setEntertainment] = useState(400);

  const [debtPayments, setDebtPayments] = useState(500);

  const [savingsGoal, setSavingsGoal] = useState(1000);

  const [otherExpenses, setOtherExpenses] = useState(350);

  const totalExpenses =
    housing +
    food +
    transportation +
    utilities +
    insurance +
    entertainment +
    debtPayments +
    savingsGoal +
    otherExpenses;

  const remainingBalance =
    income - totalExpenses;

  const savingsRate =
    income > 0
      ? (savingsGoal / income) * 100
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
      name: "Entertainment",
      value: entertainment,
    },

    {
      name: "Debt",
      value: debtPayments,
    },

    {
      name: "Savings",
      value: savingsGoal,
    },

    {
      name: "Other",
      value: otherExpenses,
    },
  ];

  const lineData = useMemo(() => {

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
        balance:
          cumulativeSavings,
      });

    }

    return data;

  }, [remainingBalance]);

  const barData = [
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
      category: "Utilities",
      amount: utilities,
    },

    {
      category: "Insurance",
      amount: insurance,
    },

    {
      category: "Entertainment",
      amount: entertainment,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-900 to-teal-500 px-6 py-10 text-white">

            <div className="flex flex-wrap gap-3 mb-6">

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Updated 2026
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Personal Finance Tool
              </div>

            </div>

            <h1 className="text-4xl lg:text-6xl font-black mb-5">
              Budget Calculator
            </h1>

            <p className="text-lg lg:text-xl text-white/90 max-w-5xl leading-9">
              Estimate monthly expenses,
              savings goals,
              cash flow,
              debt payments,
              and long-term financial health using this advanced budget calculator.
              Analyze spending habits and improve financial planning with visual charts and budgeting insights.
            </p>

          </div>

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
                  label="Entertainment"
                  value={entertainment}
                  setValue={setEntertainment}
                  prefix="$"
                />

                <InputField
                  label="Debt Payments"
                  value={debtPayments}
                  setValue={setDebtPayments}
                  prefix="$"
                />

                <InputField
                  label="Savings Goal"
                  value={savingsGoal}
                  setValue={setSavingsGoal}
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

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-teal-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-900 to-teal-500 rounded-3xl p-6 text-white mb-6">

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
                    Budget Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Income"
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

              {/* EXTRA CARDS */}

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
                    (debtPayments /
                      income) *
                    100
                  ).toFixed(1)}%`}
                />

                <MiniCard
                  title="Entertainment"
                  value={`${(
                    (entertainment /
                      income) *
                    100
                  ).toFixed(1)}%`}
                />

                <MiniCard
                  title="Monthly Savings"
                  value={`$${savingsGoal.toFixed(0)}`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 mt-8">

          <SummaryCard
            title="Monthly Income"
            value={`$${income.toFixed(0)}`}
          />

          <SummaryCard
            title="Monthly Expenses"
            value={`$${totalExpenses.toFixed(0)}`}
          />

          <SummaryCard
            title="Monthly Savings"
            value={`$${savingsGoal.toFixed(0)}`}
          />

          <SummaryCard
            title="Remaining Balance"
            value={`$${remainingBalance.toFixed(0)}`}
          />

          <SummaryCard
            title="Savings Rate"
            value={`${savingsRate.toFixed(1)}%`}
          />

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Monthly Expense Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div className="h-[420px]">

              <ResponsiveContainer width="100%" height={420}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={150}
                    label
                  >

                    <Cell fill="#14532d" />
                    <Cell fill="#16a34a" />
                    <Cell fill="#0f766e" />
                    <Cell fill="#14b8a6" />
                    <Cell fill="#0ea5e9" />
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#ec4899" />
                    <Cell fill="#f97316" />
                    <Cell fill="#64748b" />

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

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Projected Cash Flow Over 12 Months
          </h2>

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height={450}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#0f766e"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AREA CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Savings Accumulation Forecast
          </h2>

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height={450}>

              <AreaChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#14b8a6"
                  fill="#99f6e4"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Income vs Expenses Comparison
          </h2>

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height={450}>

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#0f766e"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RADAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

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
                  stroke="#0f766e"
                  fill="#14b8a6"
                  fillOpacity={0.6}
                />

              </RadarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Budget Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A budget calculator helps individuals estimate monthly expenses,
              savings goals,
              debt obligations,
              and remaining cash flow.
              Budgeting is one of the most important financial planning strategies because it allows individuals to track spending habits and improve long-term financial stability.
            </p>

            <p>
              Budget calculators are commonly used for personal finance management,
              debt reduction planning,
              emergency fund preparation,
              retirement savings,
              and household expense analysis.
              By understanding where money is spent each month,
              individuals can make more informed financial decisions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is a Budget?
            </h3>

            <p>
              A budget is a financial plan that estimates income and allocates spending across different categories such as housing,
              transportation,
              food,
              insurance,
              utilities,
              entertainment,
              debt payments,
              and savings.
            </p>

            <p>
              Effective budgeting helps individuals control unnecessary spending,
              reduce financial stress,
              and improve long-term wealth accumulation.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Budget Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Remaining Balance = Income - Total Expenses
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Income = Total monthly earnings
              </li>

              <li>
                Expenses = Total monthly spending
              </li>

              <li>
                Remaining Balance = Cash available after expenses
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Budgeting Matters
            </h3>

            <p>
              Budgeting provides visibility into personal financial behavior and helps individuals align spending with long-term goals.
              Without a structured budget,
              many people overspend,
              accumulate unnecessary debt,
              and struggle to maintain savings consistency.
            </p>

            <p>
              Budget planning also improves financial discipline and creates better awareness of spending priorities.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Popular Budgeting Strategies
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                50/30/20 budgeting method
              </li>

              <li>
                Zero-based budgeting
              </li>

              <li>
                Envelope budgeting
              </li>

              <li>
                Pay-yourself-first strategy
              </li>

              <li>
                Cash flow budgeting
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              50/30/20 Rule
            </h3>

            <p>
              The 50/30/20 budgeting strategy allocates:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                50% for essential needs
              </li>

              <li>
                30% for lifestyle and discretionary spending
              </li>

              <li>
                20% for savings and debt repayment
              </li>

            </ul>

            <p>
              This budgeting framework is commonly recommended because it balances financial responsibility with lifestyle flexibility.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common Expense Categories
            </h3>

            <p>
              Budget calculators typically include housing,
              food,
              transportation,
              insurance,
              utilities,
              healthcare,
              entertainment,
              debt payments,
              subscriptions,
              and savings goals.
            </p>

            <p>
              Tracking categories separately helps identify areas where spending may be excessive or inefficient.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Budget Planning
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Better financial awareness
              </li>

              <li>
                Improved savings discipline
              </li>

              <li>
                Reduced unnecessary spending
              </li>

              <li>
                Lower financial stress
              </li>

              <li>
                Faster debt reduction
              </li>

              <li>
                Stronger long-term financial stability
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Budgeting Mistakes to Avoid
            </h3>

            <p>
              One of the most common budgeting mistakes is underestimating irregular expenses such as maintenance,
              healthcare,
              insurance renewals,
              and annual subscriptions.
            </p>

            <p>
              Another common mistake is failing to prioritize emergency savings and debt reduction.
              Budgets should remain flexible and adapt to changing financial situations.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Financial Planning Tips
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Automate savings contributions
              </li>

              <li>
                Track spending weekly
              </li>

              <li>
                Reduce unnecessary subscriptions
              </li>

              <li>
                Build emergency savings
              </li>

              <li>
                Prioritize high-interest debt repayment
              </li>

              <li>
                Review budget performance monthly
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenarios
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Family Budget
                </h4>

                <p>
                  A household earning $6,500 monthly allocates income toward housing,
                  utilities,
                  transportation,
                  savings,
                  and entertainment.
                  By reducing discretionary spending,
                  the family increases monthly savings and improves long-term financial stability.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — Debt Reduction
                </h4>

                <p>
                  An individual uses a budget calculator to identify unnecessary expenses and redirect cash flow toward paying down high-interest debt more aggressively.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a budget calculator?"
                answer="A budget calculator estimates monthly income, expenses, savings, and cash flow to improve financial planning."
              />

              <FaqItem
                question="Why is budgeting important?"
                answer="Budgeting helps control spending, improve savings, reduce debt, and support long-term financial stability."
              />

              <FaqItem
                question="What is the 50/30/20 rule?"
                answer="The 50/30/20 budgeting rule allocates income between needs, wants, and savings or debt repayment."
              />

              <FaqItem
                question="How much should I save each month?"
                answer="Many financial experts recommend saving at least 15% to 20% of monthly income whenever possible."
              />

              <FaqItem
                question="How often should budgets be reviewed?"
                answer="Budgets should generally be reviewed monthly and adjusted based on changing income or expenses."
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
                title: "Expense Calculator",
                link: "/expense-calculator",
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