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

export default function NetProfitCalculatorPage() {

  const [revenue, setRevenue] =
    useState(750000);

  const [businessCosts, setBusinessCosts] =
    useState(320000);

  const [operatingExpenses, setOperatingExpenses] =
    useState(180000);

  const [taxRate, setTaxRate] =
    useState(22);

  const grossProfit =
    revenue -
    businessCosts;

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

  const netMargin =
    (
      (netProfit /
        revenue) *
      100
    ).toFixed(1);

  const yearlyProjection =
    Math.round(
      netProfit * 1.12
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
        businessCosts,
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

  const projectionData = [];

  let projected =
    netProfit;

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    projected =
      projected * 1.01;

    projectionData.push({
      month: `M${month}`,
      profit:
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

            Business Profit Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Net Profit Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate net income,
            operating expenses,
            taxes,
            profit margins,
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

              Net Profit Inputs

            </h2>

            <InputField
              label="Annual Revenue"
              value={revenue}
              onChange={setRevenue}
            />

            <InputField
              label="Business Costs"
              value={businessCosts}
              onChange={setBusinessCosts}
            />

            <InputField
              label="Operating Expenses"
              value={operatingExpenses}
              onChange={setOperatingExpenses}
            />

            <InputField
              label="Tax Rate (%)"
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
                title="Net Margin"
                value={`${netMargin}%`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Taxes"
                value={`$${taxes.toLocaleString()}`}
                color="from-red-500 to-rose-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Yearly Projection"
                value={`$${yearlyProjection.toLocaleString()}`}
                color="from-violet-500 to-purple-500"
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

              <ChartCard title="Net Profit Breakdown">

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

              <ChartCard title="Profit Projection">

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

            <ChartCard title="Monthly Profit Trend">

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
                      dataKey="profit"
                      stroke="#10b981"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Revenue vs Net Profit">

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

              What Is a Net Profit Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A net profit calculator is a business finance tool used to estimate net income after deducting business costs, operating expenses, and taxes from total revenue. Net profit is one of the most important indicators of long-term business profitability and financial sustainability.
              </p>

              <p>
                Businesses frequently use net profit analysis to evaluate operational efficiency, pricing strategies, expense management, and long-term growth opportunities. Higher net profit margins may indicate stronger business performance and improved financial stability.
              </p>

              <p>
                A net profit calculator estimates operating profitability, taxes, margins, and future financial projections while helping companies improve budgeting and strategic planning decisions.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Net Profit Formula

              </h3>

              <p>
                Gross Profit =
                Revenue -
                Business Costs
              </p>

              <p>
                Operating Profit =
                Gross Profit -
                Operating Expenses
              </p>

              <p>
                Net Profit =
                Operating Profit -
                Taxes
              </p>

              <p>
                Net Margin =
                Net Profit ÷
                Revenue × 100
              </p>

              <p>
                Example:
                If a company generates $750,000 in annual revenue while managing expenses efficiently, long-term net profitability may improve significantly over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Net Profit Matters

              </h3>

              <p>
                Net profit analysis helps businesses evaluate financial performance, operational efficiency, and long-term sustainability. Companies with stronger net margins may have greater flexibility for expansion, hiring, investment, and innovation.
              </p>

              <p>
                Understanding expense structures and tax obligations may help businesses optimize pricing strategies, reduce unnecessary spending, and improve operational efficiency.
              </p>

              <p>
                Investors and lenders frequently analyze net profit trends when evaluating business growth potential and financial stability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Net Profit Planning

              </h3>

              <p>
                Suppose a business increases revenue while improving operational efficiency and reducing unnecessary expenses. Net profit analysis may help management evaluate expansion opportunities and long-term financial sustainability.
              </p>

              <p>
                Businesses often use profitability projections for hiring decisions, budgeting strategies, inventory management, and investment planning.
              </p>

              <p>
                Long-term financial success frequently combines operational efficiency, scalable revenue growth, disciplined expense management, and strategic pricing optimization.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Net Profit Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate net income and profitability.
                </li>

                <li>
                  Understand operating expenses and taxes.
                </li>

                <li>
                  Improve pricing and budgeting strategies.
                </li>

                <li>
                  Analyze long-term business performance.
                </li>

                <li>
                  Improve financial forecasting and planning.
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
                question="What is a net profit calculator?"
                answer="A net profit calculator estimates net income after business costs, operating expenses, and taxes."
              />

              <FaqItem
                question="Why is net profit important?"
                answer="Net profit helps businesses evaluate long-term profitability, efficiency, and financial sustainability."
              />

              <FaqItem
                question="What affects net profit?"
                answer="Revenue growth, operating costs, taxes, and pricing strategies may affect net profitability."
              />

              <FaqItem
                question="Why are net margins important?"
                answer="Net margins help businesses understand overall financial performance and operational efficiency."
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
                  name="Gross Profit Calculator"
                />

                <RelatedTool
                  name="Profit Margin Calculator"
                />

                <RelatedTool
                  name="Revenue Calculator"
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