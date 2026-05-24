"use client";

import React, { useState } from "react";

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

export default function RevenueCalculatorPage() {

  const [customers, setCustomers] =
    useState(2500);

  const [averageOrderValue, setAverageOrderValue] =
    useState(120);

  const [monthlyGrowthRate, setMonthlyGrowthRate] =
    useState(8);

  const [operatingCosts, setOperatingCosts] =
    useState(85000);

  const monthlyRevenue =
    customers *
    averageOrderValue;

  const annualRevenue =
    monthlyRevenue * 12;

  const yearlyGrowthRevenue =
    Math.round(
      annualRevenue *
      (
        1 +
        monthlyGrowthRate / 100
      )
    );

  const estimatedProfit =
    yearlyGrowthRevenue -
    (operatingCosts * 12);

  const profitMargin =
    (
      (estimatedProfit /
        yearlyGrowthRevenue) *
      100
    ).toFixed(1);

  const pieData = [
    {
      name: "Estimated Profit",
      value:
        estimatedProfit > 0
          ? estimatedProfit
          : 0,
    },
    {
      name: "Operating Costs",
      value:
        operatingCosts * 12,
    },
  ];

  const comparisonData = [
    {
      name: "Current Revenue",
      amount:
        annualRevenue,
    },
    {
      name: "Projected Revenue",
      amount:
        yearlyGrowthRevenue,
    },
  ];

  const revenueData = [];

  let currentRevenue =
    monthlyRevenue;

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    currentRevenue =
      currentRevenue *
      (
        1 +
        monthlyGrowthRate / 100
      );

    revenueData.push({
      month: `M${month}`,
      revenue:
        Math.round(currentRevenue),
    });

  }

  return (
    <main className="min-h-screen bg-[#f7f8fc]">

      <section className="max-w-7xl mx-auto px-4 py-12">

        {/* HERO */}

        <div className="text-center mb-14">

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

            Business Revenue Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Revenue Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate sales revenue,
            business growth,
            customer value,
            operating profit,
            and long-term financial projections.

          </p>

        </div>

        {/* GRID */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-[400px_1fr]
          gap-8
        ">

          {/* LEFT */}

          <div className="
            bg-white
            rounded-3xl
            p-7
            border
            border-gray-100
            shadow-sm
            h-fit
          ">

            <h2 className="
              text-2xl
              font-black
              mb-8
            ">

              Revenue Inputs

            </h2>

            <InputField
              label="Monthly Customers"
              value={customers}
              onChange={setCustomers}
              prefix=""
            />

            <InputField
              label="Average Order Value"
              value={averageOrderValue}
              onChange={setAverageOrderValue}
            />

            <InputField
              label="Monthly Growth Rate (%)"
              value={monthlyGrowthRate}
              onChange={setMonthlyGrowthRate}
              prefix=""
            />

            <InputField
              label="Monthly Operating Costs"
              value={operatingCosts}
              onChange={setOperatingCosts}
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
                title="Monthly Revenue"
                value={`$${monthlyRevenue.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Annual Revenue"
                value={`$${annualRevenue.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Estimated Profit"
                value={`$${estimatedProfit.toLocaleString()}`}
                color="from-violet-500 to-purple-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Profit Margin"
                value={`${profitMargin}%`}
                color="from-orange-500 to-amber-500"
              />

            </div>

            {/* CHARTS */}

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
              mb-6
            ">

              {/* PIE */}

              <ChartCard title="Revenue Allocation Breakdown">

                <div className="w-full h-[320px]">

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

                        <Cell fill="#10b981" />
                        <Cell fill="#ef4444" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Revenue Growth Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={revenueData}
                    >

                      <defs>

                        <linearGradient
                          id="revenueColor"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
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
                        dataKey="revenue"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#revenueColor)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Projected Revenue Trend">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={revenueData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Current vs Projected Revenue">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={comparisonData}
                  >

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
          rounded-3xl
          p-8
          md:p-10
          border
          border-gray-100
          shadow-sm
          mt-10
        ">

          <div className="max-w-5xl">

            <h2 className="
              text-3xl
              md:text-4xl
              font-black
              mb-8
              text-gray-900
            ">

              What Is a Revenue Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A revenue calculator is a business finance tool used to estimate sales revenue, customer value, revenue growth, operating income, and long-term business profitability. Companies frequently use revenue projections to evaluate growth strategies, financial planning, and operational performance.
              </p>

              <p>
                Revenue is one of the most important financial metrics for startups, e-commerce companies, SaaS businesses, retail stores, and service providers. Understanding revenue growth may help businesses improve profitability and long-term sustainability.
              </p>

              <p>
                A revenue calculator estimates monthly revenue, annual revenue, projected growth, and operating profit while helping companies evaluate financial performance and future expansion opportunities.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Revenue Formula

              </h3>

              <p>
                Revenue =
                Customers ×
                Average Order Value
              </p>

              <p>
                Profit =
                Revenue -
                Operating Expenses
              </p>

              <p>
                Profit Margin =
                Profit ÷
                Revenue × 100
              </p>

              <p>
                Example:
                If a business serves 2,500 monthly customers with an average order value of $120, projected annual revenue may exceed several million dollars depending on growth rates and customer retention.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Revenue Planning Matters

              </h3>

              <p>
                Revenue planning helps businesses estimate future growth, evaluate profitability targets, and improve operational forecasting. Companies may use revenue projections for budgeting, hiring decisions, expansion planning, and investment analysis.
              </p>

              <p>
                Understanding customer acquisition and average transaction value may help businesses optimize pricing strategies, marketing campaigns, and long-term profitability.
              </p>

              <p>
                Investors and lenders frequently analyze revenue growth trends when evaluating business scalability and financial stability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Revenue Growth Planning

              </h3>

              <p>
                Suppose a startup business increases customer acquisition while improving average transaction value. Revenue growth analysis may help management estimate future profitability and determine operational expansion opportunities.
              </p>

              <p>
                Businesses often use revenue forecasting for inventory management, staffing decisions, advertising budgets, and financial planning.
              </p>

              <p>
                Long-term business success frequently combines scalable revenue growth, operational efficiency, strategic pricing, and disciplined financial management.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Revenue Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate monthly and annual revenue.
                </li>

                <li>
                  Understand customer value and growth.
                </li>

                <li>
                  Improve financial forecasting.
                </li>

                <li>
                  Analyze operating profitability.
                </li>

                <li>
                  Improve long-term business planning.
                </li>

              </ul>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Frequently Asked Questions

              </h3>

              <FaqItem
                question="What is a revenue calculator?"
                answer="A revenue calculator estimates sales revenue, business growth, operating income, and profitability projections."
              />

              <FaqItem
                question="Why is revenue important?"
                answer="Revenue measures business sales performance and helps companies evaluate growth and profitability."
              />

              <FaqItem
                question="What affects revenue growth?"
                answer="Customer acquisition, pricing, retention, market demand, and sales strategies may affect revenue growth."
              />

              <FaqItem
                question="Why is revenue forecasting important?"
                answer="Revenue forecasting helps businesses improve budgeting, operational planning, and financial decision-making."
              />

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
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
                  name="Profit Margin Calculator"
                />

                <RelatedTool
                  name="Cash Flow Calculator"
                />

                <RelatedTool
                  name="Break Even Calculator"
                />

              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}

/* COMPONENTS */

function InputField({
  label,
  value,
  onChange,
  prefix = "$",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
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

        {prefix && (

          <span className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            font-bold
          ">

            {prefix}

          </span>

        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          className={`
            w-full
            h-[58px]
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            pr-5
            text-lg
            outline-none
            transition
            focus:border-blue-500
            focus:bg-white
            ${prefix ? "pl-10" : "pl-5"}
          `}
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
      rounded-3xl
      p-7
      text-white
      shadow-lg
    `}>

      <div className="
        w-14
        h-14
        rounded-2xl
        bg-white/20
        flex
        items-center
        justify-center
        mb-8
      ">

        {icon}

      </div>

      <p className="text-white/80 mb-2">
        {title}
      </p>

      <h3 className="
        text-3xl
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
      rounded-3xl
      p-6
      md:p-8
      border
      border-gray-100
      shadow-sm
      mb-6
      overflow-hidden
    ">

      <h3 className="
        text-2xl
        font-black
        mb-6
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