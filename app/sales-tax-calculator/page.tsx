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

export default function SalesTaxCalculatorPage() {

  const [purchasePrice, setPurchasePrice] =
    useState(500);

  const [salesTaxRate, setSalesTaxRate] =
    useState(8.25);

  const [quantity, setQuantity] =
    useState(3);

  const [discountPercent, setDiscountPercent] =
    useState(10);

  const subtotal =
    purchasePrice *
    quantity;

  const discountAmount =
    subtotal *
    (discountPercent / 100);

  const discountedSubtotal =
    subtotal -
    discountAmount;

  const salesTax =
    discountedSubtotal *
    (salesTaxRate / 100);

  const finalTotal =
    discountedSubtotal +
    salesTax;

  const yearlyTaxProjection =
    salesTax * 12;

  const pieData = [
    {
      name: "Subtotal",
      value:
        discountedSubtotal,
    },
    {
      name: "Sales Tax",
      value:
        salesTax,
    },
  ];

  const comparisonData = [
    {
      name: "Before Tax",
      amount:
        discountedSubtotal,
    },
    {
      name: "Final Total",
      amount:
        finalTotal,
    },
  ];

  const spendingData = [];

  let projected =
    finalTotal;

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    projected =
      projected * 1.015;

    spendingData.push({
      month: `M${month}`,
      total:
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

            Tax & Purchase Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Sales Tax Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate sales taxes,
            final purchase totals,
            discounts,
            tax-inclusive pricing,
            and long-term spending projections.

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

              Tax Inputs

            </h2>

            <InputField
              label="Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
            />

            <InputField
              label="Sales Tax Rate (%)"
              value={salesTaxRate}
              onChange={setSalesTaxRate}
              prefix=""
            />

            <InputField
              label="Quantity"
              value={quantity}
              onChange={setQuantity}
              prefix=""
            />

            <InputField
              label="Discount Percentage (%)"
              value={discountPercent}
              onChange={setDiscountPercent}
              prefix=""
            />

          </div>

          {/* RIGHT PANEL */}

          <div>

            {/* SUMMARY CARDS */}

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
                title="Sales Tax"
                value={`$${salesTax.toFixed(2)}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Final Total"
                value={`$${finalTotal.toFixed(2)}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Discount Savings"
                value={`$${discountAmount.toFixed(2)}`}
                color="from-pink-500 to-rose-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Yearly Tax Projection"
                value={`$${yearlyTaxProjection.toFixed(2)}`}
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

              {/* PIE CHART */}

              <ChartCard title="Purchase Breakdown">

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

                        <Cell fill="#3b82f6" />
                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA CHART */}

              <ChartCard title="Spending Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={spendingData}
                    >

                      <defs>

                        <linearGradient
                          id="taxColor"
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
                        dataKey="total"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#taxColor)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE CHART */}

            <ChartCard title="Monthly Spending Trend">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={spendingData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR CHART */}

            <ChartCard title="Subtotal vs Final Total">

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

              What Is a Sales Tax Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A sales tax calculator is a financial tool used to estimate taxes added to purchases, total checkout costs, discounts, and tax-inclusive prices. Consumers, retailers, and businesses frequently use sales tax calculations to improve budgeting, pricing analysis, and purchasing decisions.
              </p>

              <p>
                Sales tax rates vary depending on local, state, and regional tax laws. Understanding tax-inclusive pricing may help consumers estimate final purchase costs more accurately before completing transactions.
              </p>

              <p>
                A sales tax calculator estimates subtotal pricing, tax obligations, discount-adjusted totals, and projected spending trends while helping users evaluate long-term shopping expenses and financial planning strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Sales Tax Formula

              </h3>

              <p>
                Sales Tax =
                Purchase Amount ×
                Tax Rate
              </p>

              <p>
                Final Total =
                Subtotal +
                Sales Tax
              </p>

              <p>
                Discounted Subtotal =
                Original Total -
                Discount Savings
              </p>

              <p>
                Example:
                If a customer purchases products totaling $500 with an 8.25% sales tax rate, the final payment amount may increase significantly depending on taxes and discounts applied during checkout.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Sales Tax Calculations Matter

              </h3>

              <p>
                Sales tax analysis helps consumers estimate final purchase costs, compare shopping options, and improve budgeting decisions. Businesses also use tax calculations to maintain pricing transparency and comply with local tax regulations.
              </p>

              <p>
                Understanding tax-inclusive pricing may help shoppers avoid overspending while improving long-term financial planning and spending awareness.
              </p>

              <p>
                Retail stores, e-commerce platforms, wholesalers, and service providers frequently use sales tax calculations for invoicing, financial reporting, and pricing optimization.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Purchase Planning

              </h3>

              <p>
                Suppose a shopper purchases several discounted products during a promotional sale event. Sales tax analysis may help estimate the final total after discounts, taxes, and quantity adjustments are applied.
              </p>

              <p>
                Businesses often use tax-inclusive pricing projections for budgeting, accounting, inventory management, and sales forecasting strategies.
              </p>

              <p>
                Long-term financial planning frequently combines disciplined budgeting, smart purchasing decisions, strategic discount analysis, and tax-aware spending management.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Sales Tax Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate final purchase totals accurately.
                </li>

                <li>
                  Understand tax-inclusive pricing.
                </li>

                <li>
                  Compare discounts and savings opportunities.
                </li>

                <li>
                  Improve budgeting and shopping decisions.
                </li>

                <li>
                  Analyze long-term spending projections.
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
                question="What is a sales tax calculator?"
                answer="A sales tax calculator estimates taxes, final purchase totals, discounts, and tax-inclusive prices."
              />

              <FaqItem
                question="How is sales tax calculated?"
                answer="Sales tax is calculated by multiplying the taxable purchase amount by the applicable tax rate."
              />

              <FaqItem
                question="Why are sales tax calculations important?"
                answer="Sales tax calculations help consumers estimate accurate purchase totals and improve budgeting decisions."
              />

              <FaqItem
                question="What affects final purchase costs?"
                answer="Product prices, quantity purchased, discounts, and local tax rates may affect total purchase costs."
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
                  name="Discount Calculator"
                />

                <RelatedTool
                  name="Markup Calculator"
                />

                <RelatedTool
                  name="Profit Margin Calculator"
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