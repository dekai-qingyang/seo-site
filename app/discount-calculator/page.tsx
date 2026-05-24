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

export default function DiscountCalculatorPage() {

  const [originalPrice, setOriginalPrice] =
    useState(250);

  const [discountPercent, setDiscountPercent] =
    useState(25);

  const [quantity, setQuantity] =
    useState(10);

  const [taxRate, setTaxRate] =
    useState(8);

  const savings =
    Math.round(
      originalPrice *
      (discountPercent / 100)
    );

  const discountedPrice =
    originalPrice -
    savings;

  const subtotal =
    discountedPrice *
    quantity;

  const taxes =
    Math.round(
      subtotal *
      (taxRate / 100)
    );

  const finalPrice =
    subtotal +
    taxes;

  const yearlySavings =
    savings * quantity * 12;

  const pieData = [
    {
      name: "Discounted Price",
      value:
        discountedPrice,
    },
    {
      name: "Savings",
      value:
        savings,
    },
  ];

  const comparisonData = [
    {
      name: "Original Total",
      amount:
        originalPrice * quantity,
    },
    {
      name: "Discounted Total",
      amount:
        subtotal,
    },
  ];

  const projectionData = [];

  let projected =
    subtotal;

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    projected =
      projected * 1.02;

    projectionData.push({
      month: `M${month}`,
      spending:
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
            bg-pink-100
            text-pink-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Smart Shopping Savings

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Discount Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate sale prices,
            discount percentages,
            savings amounts,
            taxes,
            and long-term shopping cost projections.

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

              Discount Inputs

            </h2>

            <InputField
              label="Original Price"
              value={originalPrice}
              onChange={setOriginalPrice}
            />

            <InputField
              label="Discount Percentage (%)"
              value={discountPercent}
              onChange={setDiscountPercent}
              prefix=""
            />

            <InputField
              label="Quantity"
              value={quantity}
              onChange={setQuantity}
              prefix=""
            />

            <InputField
              label="Sales Tax Rate (%)"
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
                title="Savings Per Item"
                value={`$${savings.toLocaleString()}`}
                color="from-pink-500 to-rose-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Discounted Price"
                value={`$${discountedPrice.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Final Total"
                value={`$${finalPrice.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Yearly Savings"
                value={`$${yearlySavings.toLocaleString()}`}
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

              <ChartCard title="Discount Breakdown">

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

                        <Cell fill="#ec4899" />
                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Shopping Cost Projection">

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
                          id="spendingColor"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#ec4899"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#ec4899"
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
                        dataKey="spending"
                        stroke="#ec4899"
                        fillOpacity={1}
                        fill="url(#spendingColor)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Monthly Spending Trend">

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
                      dataKey="spending"
                      stroke="#ec4899"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Original vs Discounted Cost">

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
                      fill="#ec4899"
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

              What Is a Discount Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A discount calculator is a shopping and pricing tool used to estimate sale prices, savings amounts, markdown percentages, and total purchase costs after discounts and taxes. Consumers and businesses frequently use discount calculations to compare deals and improve purchasing decisions.
              </p>

              <p>
                Discount pricing is commonly used in retail stores, e-commerce platforms, wholesale businesses, promotional campaigns, and seasonal sales events. Understanding discounts may help shoppers maximize savings while helping businesses improve sales performance.
              </p>

              <p>
                A discount calculator estimates discounted prices, tax-adjusted totals, savings projections, and long-term spending trends while helping users evaluate pricing efficiency and financial planning strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Discount Formula

              </h3>

              <p>
                Savings =
                Original Price ×
                Discount Percentage
              </p>

              <p>
                Discounted Price =
                Original Price -
                Savings
              </p>

              <p>
                Final Price =
                Discounted Total +
                Taxes
              </p>

              <p>
                Example:
                If a product originally costs $250 and receives a 25% discount, the final discounted price may decrease significantly before taxes are added.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Discount Calculations Matter

              </h3>

              <p>
                Discount analysis helps consumers estimate savings, compare promotional offers, and improve budgeting decisions. Businesses also use discount strategies to increase sales volume, improve customer acquisition, and optimize inventory turnover.
              </p>

              <p>
                Understanding markdown percentages and tax-adjusted totals may help shoppers avoid overspending while identifying better purchasing opportunities.
              </p>

              <p>
                Retailers and e-commerce businesses frequently use discount planning for promotional events, seasonal campaigns, and pricing optimization strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Smart Shopping Planning

              </h3>

              <p>
                Suppose a shopper purchases multiple discounted products during a seasonal promotion. Discount analysis may help estimate long-term savings and evaluate the total value of promotional offers.
              </p>

              <p>
                Businesses often use discount projections for inventory management, sales forecasting, and customer retention strategies.
              </p>

              <p>
                Long-term financial savings frequently combine disciplined budgeting, smart purchasing decisions, strategic promotional timing, and careful price comparison analysis.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Discount Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate savings and sale prices.
                </li>

                <li>
                  Compare discounts and promotional offers.
                </li>

                <li>
                  Understand tax-adjusted purchase totals.
                </li>

                <li>
                  Improve shopping and budgeting decisions.
                </li>

                <li>
                  Evaluate long-term savings opportunities.
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
                question="What is a discount calculator?"
                answer="A discount calculator estimates discounted prices, savings amounts, markdown percentages, and tax-adjusted purchase totals."
              />

              <FaqItem
                question="How are discounts calculated?"
                answer="Discounts are calculated by multiplying the original price by the discount percentage."
              />

              <FaqItem
                question="Why are discounts important?"
                answer="Discounts help consumers save money while helping businesses improve sales and customer acquisition."
              />

              <FaqItem
                question="What affects final discounted prices?"
                answer="Original prices, discount percentages, quantity purchased, and taxes may affect final purchase costs."
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
                  name="Markup Calculator"
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
            focus:border-pink-500
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