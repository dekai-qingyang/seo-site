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
  Wallet,
  DollarSign,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

export default function MonthlyBudgetCalculatorPage() {

  /* =========================
     STATE
  ========================= */

  const [salary, setSalary] =
    useState(7000);

  const [sideIncome, setSideIncome] =
    useState(1200);

  const [housing, setHousing] =
    useState(1800);

  const [food, setFood] =
    useState(650);

  const [transport, setTransport] =
    useState(450);

  const [utilities, setUtilities] =
    useState(300);

  const [entertainment, setEntertainment] =
    useState(400);

  const [shopping, setShopping] =
    useState(550);

  /* =========================
     CALCULATIONS
  ========================= */

  const totalIncome =
    salary + sideIncome;

  const totalExpenses =
    housing +
    food +
    transport +
    utilities +
    entertainment +
    shopping;

  const remainingBudget =
    totalIncome - totalExpenses;

  const savingsRate = useMemo(() => {

    if (totalIncome <= 0) {
      return 0;
    }

    return (
      (remainingBudget / totalIncome) * 100
    ).toFixed(1);

  }, [totalIncome, remainingBudget]);

  /* =========================
     CHART DATA
  ========================= */

  const pieData = [
    {
      name: "Expenses",
      value: totalExpenses,
    },
    {
      name: "Remaining",
      value: remainingBudget,
    },
  ];

  const expenseData = [
    {
      name: "Housing",
      amount: housing,
    },
    {
      name: "Food",
      amount: food,
    },
    {
      name: "Transport",
      amount: transport,
    },
    {
      name: "Utilities",
      amount: utilities,
    },
    {
      name: "Entertainment",
      amount: entertainment,
    },
    {
      name: "Shopping",
      amount: shopping,
    },
  ];

  const trendData = [
    {
      month: "Jan",
      income: 7600,
      expenses: 4800,
      savings: 2800,
    },
    {
      month: "Feb",
      income: 7900,
      expenses: 5000,
      savings: 2900,
    },
    {
      month: "Mar",
      income: 8200,
      expenses: 5200,
      savings: 3000,
    },
    {
      month: "Apr",
      income: 8500,
      expenses: 5500,
      savings: 3000,
    },
    {
      month: "May",
      income: 8700,
      expenses: 5800,
      savings: 2900,
    },
    {
      month: "Jun",
      income: totalIncome,
      expenses: totalExpenses,
      savings: remainingBudget,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fb] overflow-hidden">

      <section className="max-w-7xl mx-auto px-4 md:px-5 pt-12 md:pt-16 pb-12">

        {/* HERO */}

        <div className="text-center mb-12 md:mb-14">

          <div className="
            inline-flex
            items-center
            gap-2
            bg-emerald-100
            text-emerald-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Smart Monthly Budgeting

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

            Monthly Budget Calculator

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

            Track your income,
            expenses,
            savings,
            and monthly financial goals
            using advanced budgeting tools
            and interactive visual charts.

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

              Monthly Income

            </h2>

            <InputField
              label="Salary Income"
              value={salary}
              onChange={setSalary}
            />

            <InputField
              label="Side Income"
              value={sideIncome}
              onChange={setSideIncome}
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

              Monthly Expenses

            </h2>

            <InputField
              label="Housing / Rent"
              value={housing}
              onChange={setHousing}
            />

            <InputField
              label="Food & Groceries"
              value={food}
              onChange={setFood}
            />

            <InputField
              label="Transportation"
              value={transport}
              onChange={setTransport}
            />

            <InputField
              label="Utilities"
              value={utilities}
              onChange={setUtilities}
            />

            <InputField
              label="Entertainment"
              value={entertainment}
              onChange={setEntertainment}
            />

            <InputField
              label="Shopping"
              value={shopping}
              onChange={setShopping}
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
                title="Total Income"
                value={`$${totalIncome.toLocaleString()}`}
                color="from-indigo-600 to-indigo-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Total Expenses"
                value={`$${totalExpenses.toLocaleString()}`}
                color="from-rose-500 to-pink-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Remaining Budget"
                value={`$${remainingBudget.toLocaleString()}`}
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

              <ChartCard title="Expenses vs Remaining Budget">

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

              <ChartCard title="Monthly Savings Growth">

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

                      <XAxis dataKey="month" />

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

            <ChartCard title="Monthly Budget Trend">

              <div className="w-full h-[340px] md:h-[380px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart data={trendData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

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
                      fill="#6366f1"
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

              What Is a Monthly Budget Calculator?

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
                A monthly budget calculator is
                a financial planning tool that
                helps individuals and families
                manage income, expenses,
                savings, and spending habits.
                It provides a structured way
                to understand how money is
                allocated every month and
                helps users maintain better
                financial control.
              </p>

              <p>
                Budgeting is one of the most
                important parts of personal
                finance because it allows
                people to identify unnecessary
                expenses, increase savings,
                reduce debt, and achieve
                financial goals more
                efficiently.
              </p>

              <p>
                By entering monthly income
                and different expense
                categories such as housing,
                food, transportation,
                utilities, entertainment,
                and shopping, users can
                calculate their remaining
                budget and savings rate.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Monthly Budget Formula

              </h3>

              <p>
                Remaining Budget =
                Total Monthly Income −
                Total Monthly Expenses
              </p>

              <p>
                Example:
                If your monthly income is
                $8,000 and your expenses
                total $5,500, your remaining
                monthly budget would be
                $2,500.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Why Monthly Budgeting Matters

              </h3>

              <p>
                A monthly budget helps people
                avoid overspending and gain
                greater awareness of their
                financial behavior.
                Without a clear budget,
                it becomes difficult to track
                spending patterns or identify
                areas where money can be saved.
              </p>

              <p>
                Budgeting also improves
                financial security.
                Maintaining a positive monthly
                balance allows individuals to
                build emergency savings,
                invest for retirement,
                pay off debt faster,
                and prepare for unexpected
                expenses.
              </p>

              <p>
                Businesses and freelancers
                also rely heavily on budgeting
                tools to manage operational
                costs and forecast future
                financial performance.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Example of Budget Planning

              </h3>

              <p>
                Suppose your salary income is
                $7,000 per month and your
                side income is $1,200.
                Your total monthly income
                would be $8,200.
              </p>

              <p>
                If your rent is $1,800,
                food expenses are $650,
                transportation costs are
                $450, utilities total $300,
                entertainment expenses are
                $400, and shopping costs
                are $550, your total monthly
                expenses would equal $4,150.
              </p>

              <p>
                Your remaining budget would
                be:
                $8,200 − $4,150 = $4,050.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Benefits of Budget Tracking

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
                  Build emergency savings
                  faster.
                </li>

                <li>
                  Reduce unnecessary expenses
                  and subscriptions.
                </li>

                <li>
                  Achieve long-term financial
                  goals more efficiently.
                </li>

                <li>
                  Improve debt management and
                  investment planning.
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
                question="Why should I use a monthly budget calculator?"
                answer="A budget calculator helps track spending, improve savings, and maintain financial stability."
              />

              <FaqItem
                question="How often should I update my budget?"
                answer="Most financial experts recommend reviewing and updating budgets monthly."
              />

              <FaqItem
                question="What is a good savings rate?"
                answer="Many experts recommend saving at least 20% of monthly income whenever possible."
              />

              <FaqItem
                question="Can businesses use budget calculators?"
                answer="Yes. Businesses frequently use budgeting tools for operational planning and financial forecasting."
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
                  name="Cash Flow Calculator"
                />

                <RelatedTool
                  name="Loan Calculator"
                />

                <RelatedTool
                  name="Savings Calculator"
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
            focus:border-emerald-500
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