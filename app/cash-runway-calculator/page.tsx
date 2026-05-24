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

export default function CashRunwayCalculatorPage() {

  const [cashBalance, setCashBalance] =
    useState(500000);

  const [monthlyBurn, setMonthlyBurn] =
    useState(45000);

  const [monthlyRevenue, setMonthlyRevenue] =
    useState(15000);

  const [growthRate, setGrowthRate] =
    useState(8);

  const netBurn =
    monthlyBurn -
    monthlyRevenue;

  const runwayMonths =
    Math.floor(
      cashBalance /
      netBurn
    );

  const runwayYears =
    (
      runwayMonths / 12
    ).toFixed(1);

  const yearlyBurn =
    netBurn * 12;

  const estimatedCashLeft =
    cashBalance -
    yearlyBurn;

  const pieData = [
    {
      name: "Cash Reserve",
      value:
        cashBalance,
    },
    {
      name: "Annual Burn",
      value:
        yearlyBurn,
    },
  ];

  const comparisonData = [
    {
      name: "Cash Balance",
      amount:
        cashBalance,
    },
    {
      name: "Annual Burn",
      amount:
        yearlyBurn,
    },
  ];

  const runwayData = [];

  let remainingCash =
    cashBalance;

  for (
    let month = 1;
    month <= runwayMonths &&
    month <= 24;
    month++
  ) {

    remainingCash -=
      netBurn;

    runwayData.push({
      month: `M${month}`,
      cash:
        remainingCash > 0
          ? remainingCash
          : 0,
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

            Startup Cash Flow Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Cash Runway Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate startup runway,
            monthly burn rate,
            operating expenses,
            funding duration,
            and long-term business survival projections.

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

              Runway Inputs

            </h2>

            <InputField
              label="Current Cash Balance"
              value={cashBalance}
              onChange={setCashBalance}
            />

            <InputField
              label="Monthly Operating Expenses"
              value={monthlyBurn}
              onChange={setMonthlyBurn}
            />

            <InputField
              label="Monthly Revenue"
              value={monthlyRevenue}
              onChange={setMonthlyRevenue}
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
                title="Runway Months"
                value={`${runwayMonths}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Net Burn Rate"
                value={`$${netBurn.toLocaleString()}`}
                color="from-red-500 to-rose-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Runway Years"
                value={`${runwayYears}`}
                color="from-violet-500 to-purple-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Estimated Cash Left"
                value={`$${estimatedCashLeft.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
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

              <ChartCard title="Cash Allocation Breakdown">

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

              <ChartCard title="Cash Runway Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={runwayData}
                    >

                      <defs>

                        <linearGradient
                          id="cashColor"
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
                        dataKey="cash"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#cashColor)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Cash Balance Decline">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={runwayData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="cash"
                      stroke="#10b981"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Cash vs Burn Rate">

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

              What Is a Cash Runway Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A cash runway calculator is a business finance tool used to estimate how long a company can continue operating before running out of cash reserves. Startups, small businesses, and growing companies frequently use runway calculations to manage financial sustainability and funding timelines.
              </p>

              <p>
                Cash runway analysis is especially important for startups and high-growth businesses that rely on investor funding, operational financing, or recurring revenue growth to maintain long-term operations.
              </p>

              <p>
                A cash runway calculator estimates burn rates, operating expenses, monthly losses, and projected funding duration while helping businesses understand financial risk and operational stability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Cash Runway Formula

              </h3>

              <p>
                Net Burn Rate =
                Monthly Expenses -
                Monthly Revenue
              </p>

              <p>
                Cash Runway =
                Current Cash Balance ÷
                Net Burn Rate
              </p>

              <p>
                Example:
                If a startup has $500,000 in cash reserves and burns $30,000 monthly after revenue, the business may have approximately 16 months of runway remaining.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Cash Runway Matters

              </h3>

              <p>
                Cash runway planning helps businesses estimate survival timelines, fundraising urgency, and financial sustainability. Companies with longer runway periods may have more flexibility for hiring, expansion, product development, and operational growth.
              </p>

              <p>
                Understanding burn rates may help startups reduce unnecessary expenses, improve operational efficiency, and optimize revenue growth strategies.
              </p>

              <p>
                Investors frequently analyze runway projections when evaluating startup stability, funding requirements, and long-term growth potential.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Startup Runway Planning

              </h3>

              <p>
                Suppose a startup company receives seed funding while generating recurring revenue growth. Cash runway analysis may help determine how long operations can continue before requiring additional funding or achieving profitability.
              </p>

              <p>
                Businesses frequently use runway projections for hiring decisions, budgeting strategies, fundraising planning, and operational forecasting.
              </p>

              <p>
                Long-term startup success often combines disciplined financial management, controlled burn rates, scalable revenue growth, and strategic investment planning.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Cash Runway Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate startup survival timelines.
                </li>

                <li>
                  Understand burn rates and expenses.
                </li>

                <li>
                  Improve budgeting and forecasting.
                </li>

                <li>
                  Evaluate fundraising requirements.
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
                question="What is a cash runway calculator?"
                answer="A cash runway calculator estimates how long a business can operate before cash reserves are depleted."
              />

              <FaqItem
                question="What is burn rate?"
                answer="Burn rate refers to the amount of cash a business loses monthly after accounting for revenue."
              />

              <FaqItem
                question="Why is runway planning important?"
                answer="Runway planning helps businesses estimate funding needs, operational sustainability, and financial risk."
              />

              <FaqItem
                question="How can businesses extend runway?"
                answer="Companies may extend runway by reducing expenses, increasing revenue, improving efficiency, or securing additional funding."
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
                  name="Cash Flow Calculator"
                />

                <RelatedTool
                  name="Business Loan Calculator"
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