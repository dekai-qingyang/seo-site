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

export default function BreakEvenCalculatorPage() {

  const [fixedCosts, setFixedCosts] =
    useState(50000);

  const [sellingPrice, setSellingPrice] =
    useState(120);

  const [variableCost, setVariableCost] =
    useState(70);

  const [monthlySales, setMonthlySales] =
    useState(1500);

  const contributionMargin =
    sellingPrice -
    variableCost;

  const breakEvenUnits =
    Math.ceil(
      fixedCosts /
      contributionMargin
    );

  const breakEvenRevenue =
    Math.round(
      breakEvenUnits *
      sellingPrice
    );

  const estimatedProfit =
    Math.round(
      (monthlySales *
        contributionMargin) -
      fixedCosts
    );

  const monthlyRevenue =
    Math.round(
      monthlySales *
      sellingPrice
    );

  const pieData = [
    {
      name: "Profit",
      value:
        estimatedProfit > 0
          ? estimatedProfit
          : 0,
    },
    {
      name: "Fixed Costs",
      value:
        fixedCosts,
    },
    {
      name: "Variable Costs",
      value:
        variableCost *
        monthlySales,
    },
  ];

  const comparisonData = [
    {
      name: "Break Even Revenue",
      amount:
        breakEvenRevenue,
    },
    {
      name: "Monthly Revenue",
      amount:
        monthlyRevenue,
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
      revenue:
        monthlyRevenue,
      profit:
        estimatedProfit,
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

            Business Financial Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Break Even Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate break-even points,
            fixed costs,
            contribution margins,
            profitability,
            and business revenue projections.

          </p>

        </div>

        {/* GRID */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-[400px_1fr]
          gap-8
        ">

          {/* LEFT PANEL */}

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

              Break Even Inputs

            </h2>

            <InputField
              label="Fixed Costs"
              value={fixedCosts}
              onChange={setFixedCosts}
            />

            <InputField
              label="Selling Price Per Unit"
              value={sellingPrice}
              onChange={setSellingPrice}
            />

            <InputField
              label="Variable Cost Per Unit"
              value={variableCost}
              onChange={setVariableCost}
            />

            <InputField
              label="Monthly Sales Volume"
              value={monthlySales}
              onChange={setMonthlySales}
              prefix=""
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
                title="Break Even Units"
                value={breakEvenUnits.toLocaleString()}
                color="from-orange-500 to-amber-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Break Even Revenue"
                value={`$${breakEvenRevenue.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Estimated Profit"
                value={`$${estimatedProfit.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Monthly Revenue"
                value={`$${monthlyRevenue.toLocaleString()}`}
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

              <ChartCard title="Business Cost Breakdown">

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
                        <Cell fill="#f97316" />
                        <Cell fill="#3b82f6" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Monthly Revenue Projection">

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

            <ChartCard title="Profit Projection">

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

            <ChartCard title="Revenue Comparison">

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

              What Is a Break Even Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A break even calculator is a business finance tool used to estimate the point at which total revenue equals total costs. The break-even point represents the sales level required for a business to cover fixed costs and variable expenses before generating profit.
              </p>

              <p>
                Break-even analysis is widely used in business planning, pricing strategies, financial forecasting, startup planning, and operational decision-making. Understanding break-even thresholds may help businesses improve profitability and reduce financial risk.
              </p>

              <p>
                A break even calculator estimates contribution margins, break-even revenue targets, profit projections, and sales requirements. These calculations may help entrepreneurs, investors, and business owners make more informed financial decisions.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Break Even Formula

              </h3>

              <p>
                Contribution Margin =
                Selling Price -
                Variable Cost
              </p>

              <p>
                Break Even Units =
                Fixed Costs ÷
                Contribution Margin
              </p>

              <p>
                Break Even Revenue =
                Break Even Units ×
                Selling Price
              </p>

              <p>
                Example:
                If a business has $50,000 in fixed costs and earns a contribution margin of $50 per unit sold, approximately 1,000 units may need to be sold to reach the break-even point.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Break Even Analysis Matters

              </h3>

              <p>
                Break-even analysis helps businesses estimate profitability thresholds and understand how sales volume affects financial performance. Companies may use break-even calculations when launching products, evaluating pricing strategies, or planning operational growth.
              </p>

              <p>
                Understanding fixed costs and variable expenses may help businesses identify opportunities to improve efficiency, reduce unnecessary spending, and increase profit margins.
              </p>

              <p>
                Investors and lenders may also evaluate break-even projections when assessing business sustainability and long-term growth potential.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Break Even Planning

              </h3>

              <p>
                Suppose a startup business introduces a new product while managing manufacturing costs and operational expenses. Break-even analysis may help determine how many products must be sold before the company begins generating profit.
              </p>

              <p>
                Businesses frequently use break-even projections for budgeting, hiring decisions, expansion planning, inventory management, and financial forecasting.
              </p>

              <p>
                Long-term business success often combines operational efficiency, disciplined financial management, strategic pricing, and revenue diversification.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Break Even Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate break-even sales targets.
                </li>

                <li>
                  Understand contribution margins.
                </li>

                <li>
                  Improve pricing strategies and forecasting.
                </li>

                <li>
                  Compare revenue vs operating costs.
                </li>

                <li>
                  Improve long-term profitability planning.
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
                question="What is a break even calculator?"
                answer="A break even calculator estimates the sales level required to cover business costs before generating profit."
              />

              <FaqItem
                question="What is contribution margin?"
                answer="Contribution margin is the difference between selling price and variable cost per unit."
              />

              <FaqItem
                question="Why is break-even analysis important?"
                answer="Break-even analysis helps businesses understand profitability thresholds and financial sustainability."
              />

              <FaqItem
                question="What affects the break-even point?"
                answer="Fixed costs, selling prices, variable expenses, and sales volume may affect break-even projections."
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
                  name="ROI Calculator"
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