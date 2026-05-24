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

export default function ProfitMarginCalculatorPage() {

  const [revenue, setRevenue] =
    useState(250000);

  const [costs, setCosts] =
    useState(140000);

  const [operatingExpenses, setOperatingExpenses] =
    useState(40000);

  const [taxRate, setTaxRate] =
    useState(20);

  const grossProfit =
    revenue - costs;

  const operatingProfit =
    grossProfit -
    operatingExpenses;

  const taxes =
    Math.round(
      operatingProfit *
      (taxRate / 100)
    );

  const netProfit =
    operatingProfit -
    taxes;

  const grossMargin =
    (
      (grossProfit /
        revenue) *
      100
    ).toFixed(1);

  const netMargin =
    (
      (netProfit /
        revenue) *
      100
    ).toFixed(1);

  const monthlyProfit =
    Math.round(
      netProfit / 12
    );

  const pieData = [
    {
      name: "Net Profit",
      value:
        netProfit,
    },
    {
      name: "Business Costs",
      value:
        costs,
    },
    {
      name: "Operating Expenses",
      value:
        operatingExpenses,
    },
    {
      name: "Taxes",
      value:
        taxes,
    },
  ];

  const comparisonData = [
    {
      name: "Revenue",
      amount:
        revenue,
    },
    {
      name: "Net Profit",
      amount:
        netProfit,
    },
  ];

  const monthlyData = [];

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    monthlyData.push({
      month: `M${month}`,
      profit:
        monthlyProfit,
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

            Profit Margin Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate gross profit,
            net profit margins,
            business expenses,
            operating income,
            and long-term profitability projections.

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

              Business Inputs

            </h2>

            <InputField
              label="Annual Revenue"
              value={revenue}
              onChange={setRevenue}
            />

            <InputField
              label="Cost of Goods Sold"
              value={costs}
              onChange={setCosts}
            />

            <InputField
              label="Operating Expenses"
              value={operatingExpenses}
              onChange={setOperatingExpenses}
            />

            <InputField
              label="Business Tax Rate (%)"
              value={taxRate}
              onChange={setTaxRate}
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
                title="Net Profit"
                value={`$${netProfit.toLocaleString()}`}
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
                title="Monthly Profit"
                value={`$${monthlyProfit.toLocaleString()}`}
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

              <ChartCard title="Business Profit Breakdown">

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
                        <Cell fill="#3b82f6" />
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#ef4444" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Monthly Profit Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={monthlyData}
                    >

                      <defs>

                        <linearGradient
                          id="profitColor"
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
                        dataKey="profit"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#profitColor)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Profit Growth Projection">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={monthlyData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#10b981"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Revenue vs Profit">

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

              What Is a Profit Margin Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A profit margin calculator is a business finance tool used to estimate gross profit, operating profit, net income, and overall business profitability. Profit margin calculations help business owners understand how efficiently revenue converts into profit after accounting for costs, expenses, and taxes.
              </p>

              <p>
                Profit margins are one of the most important financial performance indicators for businesses. Higher profit margins may indicate stronger operational efficiency, better pricing strategies, and improved financial stability.
              </p>

              <p>
                A profit margin calculator estimates gross margins, net margins, taxes, and monthly profitability projections. These calculations may help business owners improve pricing decisions, budgeting, investment planning, and long-term growth strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Profit Margin Formula

              </h3>

              <p>
                Gross Profit =
                Revenue -
                Cost of Goods Sold
              </p>

              <p>
                Net Profit =
                Revenue -
                Costs -
                Operating Expenses -
                Taxes
              </p>

              <p>
                Profit Margin =
                Net Profit ÷
                Revenue × 100
              </p>

              <p>
                Example:
                If a business generates $250,000 in annual revenue while maintaining lower costs and operating expenses, profit margins may improve significantly over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Profit Margins Matter

              </h3>

              <p>
                Profit margins help businesses evaluate operational efficiency, sustainability, and overall financial health. Companies with stronger profit margins may have greater flexibility for expansion, hiring, product development, and investment opportunities.
              </p>

              <p>
                Monitoring gross margins and net margins may help identify opportunities to reduce unnecessary expenses, improve operational efficiency, and optimize pricing strategies.
              </p>

              <p>
                Investors, lenders, and financial analysts frequently use profit margin metrics to evaluate long-term business performance and profitability trends.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Business Profit Planning

              </h3>

              <p>
                Suppose a business increases annual revenue while reducing operating costs and maintaining efficient expense management. Higher profit margins may significantly improve cash flow, business valuation, and long-term growth potential.
              </p>

              <p>
                Businesses often use profitability analysis for budgeting, forecasting, investment planning, staffing decisions, and expansion strategies.
              </p>

              <p>
                Long-term business growth frequently combines operational efficiency, disciplined financial management, revenue diversification, and strategic investment planning.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Profit Margin Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate gross and net profit margins.
                </li>

                <li>
                  Improve pricing strategies and budgeting.
                </li>

                <li>
                  Understand operational profitability.
                </li>

                <li>
                  Compare revenue vs business expenses.
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
                question="What is a profit margin calculator?"
                answer="A profit margin calculator estimates business profitability, gross margins, net margins, and operating income."
              />

              <FaqItem
                question="What is a good profit margin?"
                answer="Profit margins vary by industry, but higher margins generally indicate stronger operational efficiency."
              />

              <FaqItem
                question="Why are profit margins important?"
                answer="Profit margins help businesses evaluate profitability, efficiency, and long-term financial stability."
              />

              <FaqItem
                question="What affects profit margins?"
                answer="Revenue, production costs, operating expenses, taxes, and pricing strategies may affect profitability."
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
                  name="ROI Calculator"
                />

                <RelatedTool
                  name="Investment Calculator"
                />

                <RelatedTool
                  name="Commission Calculator"
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