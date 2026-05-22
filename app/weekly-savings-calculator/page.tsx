"use client";

import React, { useMemo, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
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

import {
  DollarSign,
  Wallet,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

export default function WeeklySavingsCalculatorPage() {

  /* =========================
     STATE
  ========================= */

  const [weeklyIncome, setWeeklyIncome] =
    useState(1800);

  const [foodExpense, setFoodExpense] =
    useState(180);

  const [transportExpense, setTransportExpense] =
    useState(90);

  const [shoppingExpense, setShoppingExpense] =
    useState(140);

  const [entertainmentExpense, setEntertainmentExpense] =
    useState(120);

  const [otherExpense, setOtherExpense] =
    useState(70);

  /* =========================
     CALCULATIONS
  ========================= */

  const totalExpenses =
    foodExpense +
    transportExpense +
    shoppingExpense +
    entertainmentExpense +
    otherExpense;

  const weeklySavings =
    weeklyIncome - totalExpenses;

  const savingsRate = useMemo(() => {

    if (weeklyIncome <= 0) {
      return 0;
    }

    return (
      (weeklySavings / weeklyIncome) * 100
    ).toFixed(1);

  }, [weeklyIncome, weeklySavings]);

  /* =========================
     CHART DATA
  ========================= */

  const pieData = [
    {
      name: "Expenses",
      value: totalExpenses,
    },
    {
      name: "Savings",
      value: weeklySavings,
    },
  ];

  const expenseData = [
    {
      name: "Food",
      amount: foodExpense,
    },
    {
      name: "Transport",
      amount: transportExpense,
    },
    {
      name: "Shopping",
      amount: shoppingExpense,
    },
    {
      name: "Entertainment",
      amount: entertainmentExpense,
    },
    {
      name: "Other",
      amount: otherExpense,
    },
  ];

  const trendData = [
    {
      week: "Week 1",
      savings: 700,
      expenses: 500,
      income: 1200,
    },
    {
      week: "Week 2",
      savings: 750,
      expenses: 520,
      income: 1270,
    },
    {
      week: "Week 3",
      savings: 820,
      expenses: 560,
      income: 1380,
    },
    {
      week: "Week 4",
      savings: weeklySavings,
      expenses: totalExpenses,
      income: weeklyIncome,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7fb] overflow-hidden">

      <section className="max-w-7xl mx-auto px-4 md:px-5 pt-12 md:pt-16 pb-12">

        {/* HERO */}

        <div className="text-center mb-12 md:mb-14">

          <div className="
            inline-flex
            items-center
            gap-2
            bg-blue-100
            text-blue-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Smart Weekly Savings Planning

          </div>

          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-7xl
            font-black
            text-gray-900
            mb-6
            leading-tight
          ">

            Weekly Savings Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-base
            md:text-lg
            text-gray-500
            leading-8
            md:leading-9
          ">

            Calculate your weekly savings,
            track expenses,
            monitor spending habits,
            and improve financial planning
            using interactive charts and
            advanced budgeting tools.

          </p>

        </div>

        {/* GRID */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-[420px_1fr]
          gap-8
        ">

          {/* LEFT */}

          <div className="
            bg-white
            rounded-[28px]
            md:rounded-[34px]
            p-6
            md:p-8
            shadow-sm
            border
            border-gray-100
            h-fit
            lg:sticky
            lg:top-5
          ">

            <h2 className="
              text-2xl
              md:text-3xl
              font-black
              mb-8
            ">

              Weekly Income

            </h2>

            <InputField
              label="Weekly Income"
              value={weeklyIncome}
              onChange={setWeeklyIncome}
            />

            <div className="
              border-t
              border-dashed
              my-8
            "></div>

            <h2 className="
              text-2xl
              md:text-3xl
              font-black
              mb-8
            ">

              Weekly Expenses

            </h2>

            <InputField
              label="Food & Groceries"
              value={foodExpense}
              onChange={setFoodExpense}
            />

            <InputField
              label="Transportation"
              value={transportExpense}
              onChange={setTransportExpense}
            />

            <InputField
              label="Shopping"
              value={shoppingExpense}
              onChange={setShoppingExpense}
            />

            <InputField
              label="Entertainment"
              value={entertainmentExpense}
              onChange={setEntertainmentExpense}
            />

            <InputField
              label="Other Expenses"
              value={otherExpense}
              onChange={setOtherExpense}
            />

          </div>

          {/* RIGHT */}

          <div>

            {/* SUMMARY */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-5
              mb-7
            ">

              <SummaryCard
                icon={<DollarSign />}
                title="Weekly Income"
                value={`$${weeklyIncome.toLocaleString()}`}
                color="from-indigo-600 to-indigo-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Weekly Expenses"
                value={`$${totalExpenses.toLocaleString()}`}
                color="from-rose-500 to-pink-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Weekly Savings"
                value={`$${weeklySavings.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Savings Rate"
                value={`${savingsRate}%`}
                color="from-orange-500 to-amber-500"
              />

            </div>

            {/* TOP CHARTS */}

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
              mb-6
            ">

              {/* PIE */}

              <ChartCard title="Savings vs Expenses">

                <div className="w-full h-[320px] md:h-[350px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={pieData}
                        dataKey="value"
                        outerRadius={90}
                        label
                      >

                        <Cell fill="#ef4444" />

                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Weekly Savings Growth">

                <div className="w-full h-[320px] md:h-[350px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart data={trendData}>

                      <defs>

                        <linearGradient
                          id="colorSavings"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />

                        </linearGradient>

                      </defs>

                      <CartesianGrid stroke="#eee" />

                      <XAxis dataKey="week" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="savings"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorSavings)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Weekly Savings Trend">

              <div className="w-full h-[340px] md:h-[380px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart data={trendData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="week" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#4f46e5"
                      strokeWidth={4}
                    />

                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#ef4444"
                      strokeWidth={4}
                    />

                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="#10b981"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Expense Breakdown">

              <div className="w-full h-[340px] md:h-[380px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={expenseData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="amount"
                      fill="#3b82f6"
                      radius={[10, 10, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

          </div>

        </div>

        {/* SEO CONTENT */}

        <section className="
          bg-white
          rounded-[28px]
          md:rounded-[34px]
          shadow-sm
          border
          border-gray-100
          p-6
          md:p-10
          mt-10
        ">

          <div className="max-w-5xl">

            <h2 className="
              text-3xl
              md:text-4xl
              font-black
              text-gray-900
              mb-8
            ">

              What Is a Weekly Savings Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              text-[16px]
              md:text-[17px]
              leading-8
              md:leading-9
            ">

              <p>
                A weekly savings calculator is
                a financial planning tool used
                to estimate how much money can
                be saved every week after
                subtracting expenses from
                income.
              </p>

              <p>
                Weekly savings tracking helps
                individuals maintain better
                financial discipline by
                monitoring short-term spending
                habits and improving budgeting
                decisions.
              </p>

              <p>
                Unlike monthly budgeting,
                weekly savings management
                provides faster feedback on
                financial behavior, allowing
                users to identify unnecessary
                spending before it becomes a
                long-term problem.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Weekly Savings Formula

              </h3>

              <p>
                Weekly Savings =
                Weekly Income − Weekly Expenses
              </p>

              <p>
                Example:
                If your weekly income is
                $1,800 and your weekly expenses
                total $600, your weekly
                savings would equal $1,200.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Why Weekly Savings Matter

              </h3>

              <p>
                Building weekly savings is an
                important step toward long-term
                financial security.
              </p>

              <p>
                Consistent savings habits can
                help individuals create
                emergency funds, reduce debt,
                prepare for future investments,
                and achieve financial goals
                faster.
              </p>

              <p>
                Weekly tracking is especially
                useful for freelancers,
                gig workers, small business
                owners, and people with
                variable income because it
                allows for more flexible
                budgeting and cash flow
                management.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Example of Weekly Savings Planning

              </h3>

              <p>
                Suppose your weekly income is
                $1,800.
                Your food expenses total $180,
                transportation costs are $90,
                shopping expenses equal $140,
                entertainment spending is
                $120, and other miscellaneous
                expenses total $70.
              </p>

              <p>
                Your total weekly expenses
                would be:
                $180 + $90 + $140 + $120 + $70
                = $600.
              </p>

              <p>
                Your weekly savings would be:
                $1,800 − $600 = $1,200.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Benefits of Weekly Budget Tracking

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Improve spending awareness
                  and financial discipline.
                </li>

                <li>
                  Detect overspending more
                  quickly than monthly reviews.
                </li>

                <li>
                  Increase consistency in
                  saving habits.
                </li>

                <li>
                  Reduce unnecessary purchases
                  and recurring expenses.
                </li>

                <li>
                  Build emergency funds faster
                  and improve financial
                  confidence.
                </li>

              </ul>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Frequently Asked Questions

              </h3>

              <FaqItem
                question="Why should I track weekly savings?"
                answer="Weekly tracking helps identify spending habits faster and improves budgeting accuracy."
              />

              <FaqItem
                question="What is a good weekly savings rate?"
                answer="Many financial experts recommend saving at least 20% of income whenever possible."
              />

              <FaqItem
                question="Can freelancers use weekly savings calculators?"
                answer="Yes. Weekly budgeting is especially useful for people with variable income."
              />

              <FaqItem
                question="How often should I review my savings?"
                answer="Reviewing savings weekly can improve consistency and financial awareness."
              />

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Related Tools

              </h3>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
                pt-3
              ">

                <RelatedTool
                  name="Monthly Budget Calculator"
                />

                <RelatedTool
                  name="Cash Flow Calculator"
                />

                <RelatedTool
                  name="Savings Goal Calculator"
                />

              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}

/* =========================
   COMPONENTS
========================= */

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {

  return (
    <div className="mb-6">

      <label className="
        block
        mb-3
        font-semibold
        text-gray-700
      ">

        {label}

      </label>

      <div className="relative">

        <span className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-gray-400
          font-bold
        ">

          $

        </span>

        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          className="
            w-full
            h-[58px]
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            pl-10
            pr-5
            text-lg
            outline-none
            focus:border-blue-500
            focus:bg-white
            transition
          "
        />

      </div>

    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {

  return (
    <div className={`
      bg-gradient-to-br ${color}
      rounded-[28px]
      p-7
      text-white
      shadow-lg
    `}>

      <div className="
        flex
        justify-between
        items-start
        mb-8
      ">

        <div className="
          w-14
          h-14
          rounded-2xl
          bg-white/20
          flex
          items-center
          justify-center
        ">

          {icon}

        </div>

      </div>

      <p className="text-white/80 mb-2">
        {title}
      </p>

      <h3 className="
        text-3xl
        md:text-4xl
        font-black
      ">

        {value}

      </h3>

    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {

  return (
    <div className="
      bg-white
      rounded-[28px]
      md:rounded-[34px]
      p-6
      md:p-8
      shadow-sm
      border
      border-gray-100
      mb-6
      overflow-hidden
    ">

      <h3 className="
        text-xl
        md:text-2xl
        font-black
        mb-5
      ">

        {title}

      </h3>

      {children}

    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {

  return (
    <div className="
      border
      border-gray-200
      rounded-2xl
      p-6
      bg-gray-50
    ">

      <h4 className="
        text-lg
        font-bold
        text-gray-900
        mb-3
      ">

        {question}

      </h4>

      <p className="
        text-gray-600
        leading-8
      ">

        {answer}

      </p>

    </div>
  );
}

function RelatedTool({
  name,
}: {
  name: string;
}) {

  return (
    <div className="
      border
      border-gray-200
      rounded-3xl
      p-7
      bg-gray-50
      hover:bg-white
      hover:shadow-lg
      transition
      cursor-pointer
    ">

      <h4 className="
        text-xl
        font-bold
        text-gray-900
      ">

        {name}

      </h4>

    </div>
  );
}