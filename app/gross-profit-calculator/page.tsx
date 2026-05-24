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

export default function GrossProfitCalculatorPage() {

  const [revenue, setRevenue] =
    useState(500000);

  const [costOfGoods, setCostOfGoods] =
    useState(280000);

  const [operatingExpenses, setOperatingExpenses] =
    useState(90000);

  const [growthRate, setGrowthRate] =
    useState(10);

  const grossProfit =
    revenue -
    costOfGoods;

  const netOperatingProfit =
    grossProfit -
    operatingExpenses;

  const grossMargin =
    (
      (grossProfit /
        revenue) *
      100
    ).toFixed(1);

  const netMargin =
    (
      (netOperatingProfit /
        revenue) *
      100
    ).toFixed(1);

  const projectedRevenue =
    Math.round(
      revenue *
      (
        1 +
        growthRate / 100
      )
    );

  const pieData = [
    {
      name: "Gross Profit",
      value:
        grossProfit,
    },
    {
      name: "COGS",
      value:
        costOfGoods,
    },
    {
      name: "Operating Expenses",
      value:
        operatingExpenses,
    },
  ];

  const comparisonData = [
    {
      name: "Revenue",
      amount:
        revenue,
    },
    {
      name: "Gross Profit",
      amount:
        grossProfit,
    },
  ];

  const projectionData = [];

  let projected =
    revenue;

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    projected =
      projected *
      (
        1 +
        growthRate / 100
      );

    projectionData.push({
      month: `M${month}`,
      revenue:
        Math.round(projected),
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

            Business Profitability Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Gross Profit Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate gross profit,
            gross margins,
            operating expenses,
            revenue growth,
            and long-term business profitability projections.

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

              Profit Inputs

            </h2>

            <InputField
              label="Annual Revenue"
              value={revenue}
              onChange={setRevenue}
            />

            <InputField
              label="Cost of Goods Sold"
              value={costOfGoods}
              onChange={setCostOfGoods}
            />

            <InputField
              label="Operating Expenses"
              value={operatingExpenses}
              onChange={setOperatingExpenses}
            />

            <InputField
              label="Revenue Growth Rate (%)"
              value={growthRate}
              onChange={setGrowthRate}
              prefix=""
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
                title="Gross Profit"
                value={`$${grossProfit.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Gross Margin"
                value={`${grossMargin}%`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Net Margin"
                value={`${netMargin}%`}
                color="from-violet-500 to-purple-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Projected Revenue"
                value={`$${projectedRevenue.toLocaleString()}`}
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

              <ChartCard title="Profit Breakdown">

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
                        <Cell fill="#3b82f6" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Revenue Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={projectionData}
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
                        dataKey="revenue"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#revenueColor)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Revenue Growth Trend">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={projectionData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Revenue vs Gross Profit">

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
                      fill="#10b981"
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

              What Is a Gross Profit Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A gross profit calculator is a business finance tool used to estimate gross profit, gross margins, operating profitability, and overall financial performance. Companies frequently use gross profit analysis to evaluate operational efficiency, pricing strategies, and long-term business sustainability.
              </p>

              <p>
                Gross profit measures the difference between revenue and the direct costs associated with producing goods or services. Businesses often monitor gross margins to evaluate product profitability and operational performance.
              </p>

              <p>
                A gross profit calculator estimates revenue growth, business costs, operating expenses, and profit margins while helping companies improve financial planning and profitability analysis.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Gross Profit Formula

              </h3>

              <p>
                Gross Profit =
                Revenue -
                Cost of Goods Sold
              </p>

              <p>
                Gross Margin =
                Gross Profit ÷
                Revenue × 100
              </p>

              <p>
                Net Operating Profit =
                Gross Profit -
                Operating Expenses
              </p>

              <p>
                Example:
                If a business generates $500,000 in annual revenue while spending $280,000 on production costs, gross profitability may remain strong depending on operational expenses and pricing strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Gross Profit Matters

              </h3>

              <p>
                Gross profit analysis helps businesses understand production efficiency, pricing performance, and long-term profitability potential. Higher gross margins may indicate stronger operational performance and better cost management.
              </p>

              <p>
                Monitoring production costs and revenue trends may help companies improve pricing strategies, supplier negotiations, and operational efficiency.
              </p>

              <p>
                Investors and lenders frequently evaluate gross profit metrics when analyzing business scalability and financial sustainability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Gross Profit Planning

              </h3>

              <p>
                Suppose a retail business improves supplier costs while increasing product pricing efficiency. Gross profit analysis may help management evaluate long-term profitability and operational growth opportunities.
              </p>

              <p>
                Businesses often use gross margin projections for budgeting, inventory management, expansion planning, and financial forecasting.
              </p>

              <p>
                Long-term business success frequently combines operational efficiency, scalable revenue growth, disciplined financial management, and strategic pricing optimization.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Gross Profit Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate gross profit and margins.
                </li>

                <li>
                  Understand business profitability.
                </li>

                <li>
                  Improve pricing and cost management.
                </li>

                <li>
                  Analyze operating efficiency.
                </li>

                <li>
                  Improve long-term financial planning.
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
                question="What is a gross profit calculator?"
                answer="A gross profit calculator estimates gross profit, margins, operating profitability, and business performance."
              />

              <FaqItem
                question="What is gross profit?"
                answer="Gross profit is the difference between revenue and direct production costs."
              />

              <FaqItem
                question="Why are gross margins important?"
                answer="Gross margins help businesses evaluate pricing efficiency, production costs, and profitability."
              />

              <FaqItem
                question="What affects gross profit?"
                answer="Revenue growth, pricing strategies, production costs, and operational efficiency may affect gross profitability."
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
                  name="Revenue Calculator"
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
            focus:border-emerald-500
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