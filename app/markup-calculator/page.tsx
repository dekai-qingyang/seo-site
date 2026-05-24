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

export default function MarkupCalculatorPage() {

  const [cost, setCost] =
    useState(80);

  const [markupPercent, setMarkupPercent] =
    useState(40);

  const [monthlySales, setMonthlySales] =
    useState(1200);

  const [operatingExpenses, setOperatingExpenses] =
    useState(25000);

  const sellingPrice =
    Math.round(
      cost *
      (
        1 +
        markupPercent / 100
      )
    );

  const profitPerUnit =
    sellingPrice -
    cost;

  const monthlyRevenue =
    sellingPrice *
    monthlySales;

  const monthlyProfit =
    (profitPerUnit *
      monthlySales) -
    operatingExpenses;

  const profitMargin =
    (
      (profitPerUnit /
        sellingPrice) *
      100
    ).toFixed(1);

  const yearlyProfit =
    monthlyProfit * 12;

  const pieData = [
    {
      name: "Product Cost",
      value:
        cost,
    },
    {
      name: "Profit",
      value:
        profitPerUnit,
    },
  ];

  const comparisonData = [
    {
      name: "Monthly Revenue",
      amount:
        monthlyRevenue,
    },
    {
      name: "Yearly Profit",
      amount:
        yearlyProfit,
    },
  ];

  const projectionData = [];

  let projectedRevenue =
    monthlyRevenue;

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    projectedRevenue =
      projectedRevenue * 1.03;

    projectionData.push({
      month: `M${month}`,
      revenue:
        Math.round(projectedRevenue),
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
            bg-orange-100
            text-orange-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Product Pricing Optimization

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Markup Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate selling prices,
            markup percentages,
            profit margins,
            product profitability,
            and long-term revenue projections.

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

              Pricing Inputs

            </h2>

            <InputField
              label="Product Cost"
              value={cost}
              onChange={setCost}
            />

            <InputField
              label="Markup Percentage (%)"
              value={markupPercent}
              onChange={setMarkupPercent}
              prefix=""
            />

            <InputField
              label="Monthly Sales Volume"
              value={monthlySales}
              onChange={setMonthlySales}
              prefix=""
            />

            <InputField
              label="Monthly Operating Expenses"
              value={operatingExpenses}
              onChange={setOperatingExpenses}
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
                title="Selling Price"
                value={`$${sellingPrice.toLocaleString()}`}
                color="from-orange-500 to-amber-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Profit Per Unit"
                value={`$${profitPerUnit.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Profit Margin"
                value={`${profitMargin}%`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Yearly Profit"
                value={`$${yearlyProfit.toLocaleString()}`}
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

              <ChartCard title="Pricing Breakdown">

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

                        <Cell fill="#f97316" />
                        <Cell fill="#10b981" />

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
                            stopColor="#f97316"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#f97316"
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
                        stroke="#f97316"
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
                      stroke="#f97316"
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
                      fill="#f97316"
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

              What Is a Markup Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A markup calculator is a pricing tool used to estimate selling prices, markup percentages, product profitability, and business revenue projections. Businesses frequently use markup analysis to determine how much to charge for products or services while maintaining healthy profit margins.
              </p>

              <p>
                Markup calculations are commonly used in retail, e-commerce, manufacturing, wholesale distribution, and service industries. Understanding markup strategies may help companies improve profitability and optimize pricing decisions.
              </p>

              <p>
                A markup calculator estimates product pricing, profit margins, revenue growth, and operating profitability while helping businesses improve financial planning and long-term sustainability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Markup Formula

              </h3>

              <p>
                Selling Price =
                Product Cost ×
                (1 + Markup Percentage)
              </p>

              <p>
                Profit Per Unit =
                Selling Price -
                Product Cost
              </p>

              <p>
                Profit Margin =
                Profit ÷
                Selling Price × 100
              </p>

              <p>
                Example:
                If a product costs $80 and a company applies a 40% markup, the estimated selling price may increase significantly while improving gross profitability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

              Why Markup Pricing Matters

              </h3>

              <p>
                Markup analysis helps businesses estimate profitability, evaluate pricing strategies, and maintain sustainable operations. Companies with optimized pricing structures may improve cash flow, operational efficiency, and long-term financial performance.
              </p>

              <p>
                Understanding product costs and profit margins may help businesses avoid underpricing products while maintaining competitive pricing in the marketplace.
              </p>

              <p>
                Retailers, manufacturers, and e-commerce businesses frequently use markup analysis for budgeting, inventory planning, supplier negotiations, and profitability forecasting.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Pricing Optimization

              </h3>

              <p>
                Suppose an e-commerce business increases markup percentages while improving supplier efficiency and customer demand. Pricing analysis may help management estimate future profitability and operational growth opportunities.
              </p>

              <p>
                Businesses often use pricing projections for inventory management, advertising budgets, sales forecasting, and expansion planning.
              </p>

              <p>
                Long-term business success frequently combines strategic pricing optimization, operational efficiency, scalable revenue growth, and disciplined financial management.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Markup Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate selling prices and profit margins.
                </li>

                <li>
                  Improve pricing and profitability analysis.
                </li>

                <li>
                  Understand product cost structures.
                </li>

                <li>
                  Improve financial forecasting and planning.
                </li>

                <li>
                  Optimize long-term business profitability.
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
                question="What is a markup calculator?"
                answer="A markup calculator estimates selling prices, markup percentages, product profitability, and business revenue projections."
              />

              <FaqItem
                question="What is markup pricing?"
                answer="Markup pricing refers to increasing a product’s selling price above its original cost to generate profit."
              />

              <FaqItem
                question="Why are markup calculations important?"
                answer="Markup analysis helps businesses optimize pricing strategies and improve profitability."
              />

              <FaqItem
                question="What affects markup percentages?"
                answer="Product costs, operating expenses, market demand, competition, and profitability goals may affect markup strategies."
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
                  name="Gross Profit Calculator"
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
            focus:border-orange-500
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