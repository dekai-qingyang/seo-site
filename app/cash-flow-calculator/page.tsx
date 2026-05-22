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
  TrendingUp,
  Wallet,
  PiggyBank,
} from "lucide-react";

export default function CashFlowCalculatorPage() {

  /* =========================
     STATE
  ========================= */

  const [salaryIncome, setSalaryIncome] =
    useState(8500);

  const [businessIncome, setBusinessIncome] =
    useState(2400);

  const [investmentIncome, setInvestmentIncome] =
    useState(900);

  const [housingExpense, setHousingExpense] =
    useState(2200);

  const [foodExpense, setFoodExpense] =
    useState(800);

  const [transportExpense, setTransportExpense] =
    useState(500);

  const [entertainmentExpense, setEntertainmentExpense] =
    useState(350);

  const [otherExpense, setOtherExpense] =
    useState(450);

  /* =========================
     CALCULATIONS
  ========================= */

  const totalIncome =
    salaryIncome +
    businessIncome +
    investmentIncome;

  const totalExpenses =
    housingExpense +
    foodExpense +
    transportExpense +
    entertainmentExpense +
    otherExpense;

  const netCashFlow =
    totalIncome - totalExpenses;

  const savingsRate = useMemo(() => {

    if (totalIncome <= 0) {
      return 0;
    }

    return (
      (netCashFlow / totalIncome) * 100
    ).toFixed(1);

  }, [totalIncome, netCashFlow]);

  /* =========================
     CHART DATA
  ========================= */

  const pieData = [
    {
      name: "Income",
      value: totalIncome,
    },
    {
      name: "Expenses",
      value: totalExpenses,
    },
  ];

  const expenseData = [
    {
      name: "Housing",
      amount: housingExpense,
    },
    {
      name: "Food",
      amount: foodExpense,
    },
    {
      name: "Transport",
      amount: transportExpense,
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

  const monthlyTrend = [
    {
      month: "Jan",
      income: 9000,
      expenses: 5200,
      savings: 3800,
    },
    {
      month: "Feb",
      income: 9800,
      expenses: 5600,
      savings: 4200,
    },
    {
      month: "Mar",
      income: 10200,
      expenses: 6000,
      savings: 4200,
    },
    {
      month: "Apr",
      income: 10800,
      expenses: 5900,
      savings: 4900,
    },
    {
      month: "May",
      income: 11200,
      expenses: 6200,
      savings: 5000,
    },
    {
      month: "Jun",
      income: totalIncome,
      expenses: totalExpenses,
      savings: netCashFlow,
    },
  ];

  /* =========================
     PAGE
  ========================= */

  return (
    <main className="min-h-screen bg-[#f4f7fb] overflow-hidden">

      <section className="max-w-7xl mx-auto px-4 md:px-5 pt-12 md:pt-16 pb-12">

        {/* HERO */}

        <div className="text-center mb-12 md:mb-14">

          <div className="
            inline-flex
            items-center
            gap-2
            bg-indigo-100
            text-indigo-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Smart Financial Planning

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

            Cash Flow Calculator

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

            Analyze your monthly income,
            expenses, savings rate,
            and long-term financial
            performance using interactive
            charts and professional
            financial projections.

          </p>

        </div>

        {/* GRID */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-[420px_1fr]
          gap-8
        ">

          {/* LEFT PANEL */}

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
              value={salaryIncome}
              onChange={setSalaryIncome}
            />

            <InputField
              label="Business Income"
              value={businessIncome}
              onChange={setBusinessIncome}
            />

            <InputField
              label="Investment Income"
              value={investmentIncome}
              onChange={setInvestmentIncome}
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
              label="Housing / Mortgage"
              value={housingExpense}
              onChange={setHousingExpense}
            />

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

          {/* RIGHT PANEL */}

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
                title="Net Cash Flow"
                value={`$${netCashFlow.toLocaleString()}`}
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

              <ChartCard title="Income vs Expenses">

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

                        <Cell fill="#4f46e5" />

                        <Cell fill="#ef4444" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Savings Growth">

                <div className="w-full h-[320px] md:h-[350px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart data={monthlyTrend}>

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
                            stopColor="#4f46e5"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#4f46e5"
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
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#colorSavings)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Monthly Cash Flow Trend">

              <div className="w-full h-[340px] md:h-[380px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart data={monthlyTrend}>

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
                      fill="#7c3aed"
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

              What Is a Cash Flow Calculator?

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
                A cash flow calculator is a
                financial planning tool used
                to evaluate how money moves
                in and out over a specific
                period of time.
              </p>

              <p>
                By comparing income and
                expenses, users can determine
                whether they maintain positive
                or negative cash flow.
              </p>

              <p>
                Positive cash flow occurs
                when income exceeds expenses,
                while negative cash flow
                happens when spending is
                greater than earnings.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Cash Flow Formula

              </h3>

              <p>
                Net Cash Flow =
                Total Income − Total Expenses
              </p>

              <p>
                Example:
                If monthly income equals
                $10,000 and expenses total
                $6,000, then net cash flow
                is $4,000.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Why Cash Flow Matters

              </h3>

              <p>
                Cash flow is one of the most
                important indicators of
                financial stability.
              </p>

              <p>
                Even high-income earners can
                face financial stress if
                expenses remain uncontrolled.
              </p>

              <p>
                Monitoring cash flow helps
                improve budgeting,
                investment planning,
                debt reduction,
                and long-term wealth growth.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Frequently Asked Questions

              </h3>

              <FaqItem
                question="What is positive cash flow?"
                answer="Positive cash flow means total income exceeds total expenses."
              />

              <FaqItem
                question="Why is cash flow important?"
                answer="Cash flow helps determine financial stability and spending efficiency."
              />

              <FaqItem
                question="Can businesses use this calculator?"
                answer="Yes. Businesses frequently use cash flow analysis to monitor operations."
              />

              <FaqItem
                question="How often should I track cash flow?"
                answer="Most experts recommend reviewing cash flow monthly."
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
                  name="Budget Calculator"
                />

                <RelatedTool
                  name="Loan Calculator"
                />

                <RelatedTool
                  name="Investment Calculator"
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
            focus:border-indigo-500
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