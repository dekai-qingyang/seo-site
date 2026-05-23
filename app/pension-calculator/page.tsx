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
  PiggyBank,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function PensionCalculatorPage() {

  const [currentAge, setCurrentAge] =
    useState(40);

  const [retirementAge, setRetirementAge] =
    useState(65);

  const [currentSavings, setCurrentSavings] =
    useState(120000);

  const [monthlyContribution, setMonthlyContribution] =
    useState(800);

  const [annualReturn, setAnnualReturn] =
    useState(6);

  const [yearsRetired, setYearsRetired] =
    useState(25);

  const yearsToRetirement =
    retirementAge - currentAge;

  const totalContributions =
    monthlyContribution *
    12 *
    yearsToRetirement;

  const futureValue = useMemo(() => {

    let balance = currentSavings;

    for (
      let i = 0;
      i < yearsToRetirement;
      i++
    ) {

      balance =
        (balance +
          monthlyContribution * 12) *
        (1 + annualReturn / 100);

    }

    return Math.round(balance);

  }, [
    currentSavings,
    monthlyContribution,
    annualReturn,
    yearsToRetirement,
  ]);

  const investmentGrowth =
    futureValue -
    currentSavings -
    totalContributions;

  const estimatedMonthlyPension =
    Math.round(
      futureValue /
      (yearsRetired * 12)
    );

  const pieData = [
    {
      name: "Contributions",
      value:
        totalContributions + currentSavings,
    },
    {
      name: "Growth",
      value: investmentGrowth,
    },
  ];

  const growthData = [];

  let runningBalance = currentSavings;

  for (
    let year = 1;
    year <= yearsToRetirement;
    year++
  ) {

    runningBalance =
      (runningBalance +
        monthlyContribution * 12) *
      (1 + annualReturn / 100);

    growthData.push({
      year:
        currentAge + year,
      balance:
        Math.round(runningBalance),
    });

  }

  const pensionData = [
    {
      name: "Contributions",
      amount:
        totalContributions + currentSavings,
    },
    {
      name: "Investment Growth",
      amount: investmentGrowth,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

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

            Retirement Pension Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Pension Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate retirement pension income,
            future pension savings,
            monthly retirement payouts,
            and long-term retirement growth projections.

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

              Pension Inputs

            </h2>

            <InputField
              label="Current Age"
              value={currentAge}
              onChange={setCurrentAge}
              prefix=""
            />

            <InputField
              label="Retirement Age"
              value={retirementAge}
              onChange={setRetirementAge}
              prefix=""
            />

            <InputField
              label="Current Retirement Savings"
              value={currentSavings}
              onChange={setCurrentSavings}
            />

            <InputField
              label="Monthly Contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
            />

            <InputField
              label="Expected Annual Return (%)"
              value={annualReturn}
              onChange={setAnnualReturn}
              prefix=""
            />

            <InputField
              label="Years in Retirement"
              value={yearsRetired}
              onChange={setYearsRetired}
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
                title="Future Pension Value"
                value={`$${futureValue.toLocaleString()}`}
                color="from-blue-600 to-indigo-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Total Contributions"
                value={`$${totalContributions.toLocaleString()}`}
                color="from-rose-500 to-pink-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Investment Growth"
                value={`$${investmentGrowth.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Monthly Pension"
                value={`$${estimatedMonthlyPension.toLocaleString()}`}
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

              <ChartCard title="Contributions vs Growth">

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

                        <Cell fill="#2563eb" />

                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Pension Growth Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart data={growthData}>

                      <defs>

                        <linearGradient
                          id="colorBalance"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#2563eb"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#2563eb"
                            stopOpacity={0}
                          />

                        </linearGradient>

                      </defs>

                      <CartesianGrid stroke="#eee" />

                      <XAxis dataKey="year" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#2563eb"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Long-Term Retirement Growth">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart data={growthData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="year" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#2563eb"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Pension Breakdown">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={pensionData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="amount"
                      fill="#2563eb"
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

              What Is a Pension Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A pension calculator is a retirement planning tool used to estimate future pension savings, monthly retirement income, and long-term investment growth. It helps individuals understand how retirement contributions, investment returns, and retirement timelines may impact future financial security.
              </p>

              <p>
                Retirement planning is one of the most important aspects of personal finance. Pension savings provide income during retirement years after employment income stops. Using a pension calculator allows individuals to better estimate how much money may be available during retirement.
              </p>

              <p>
                Pension calculators commonly include retirement savings contributions, expected annual investment returns, years remaining until retirement, and projected retirement payout periods. These factors help estimate long-term retirement income potential.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Pension Formula

              </h3>

              <p>
                Future Pension Value =
                Current Savings ×
                (1 + Annual Return)^Years +
                Ongoing Contributions ×
                Compound Growth
              </p>

              <p>
                Example:
                If an individual contributes $800 monthly toward retirement while earning a 6% annual return over multiple decades, retirement pension savings may grow significantly through compound interest and long-term investing.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Pension Planning Matters

              </h3>

              <p>
                Retirement income planning helps individuals prepare for future living expenses, healthcare costs, inflation, and financial independence during retirement years. Without sufficient retirement savings, maintaining financial stability later in life may become difficult.
              </p>

              <p>
                Starting retirement contributions early provides more time for investments to compound. Compound growth allows investment earnings to generate additional earnings over long periods.
              </p>

              <p>
                Increasing retirement contributions gradually over time may substantially improve long-term pension income and retirement security.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Pension Growth

              </h3>

              <p>
                Suppose an investor starts at age 40 with $120,000 already saved for retirement. By contributing $800 monthly and earning a 6% annual return until retirement at age 65, retirement savings may potentially grow into a substantial pension fund.
              </p>

              <p>
                The majority of long-term retirement account growth often comes from compound investment returns rather than original contributions alone.
              </p>

              <p>
                This demonstrates why long-term retirement planning and consistent pension contributions are important for financial independence.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Pension Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate future retirement pension income.
                </li>

                <li>
                  Visualize long-term investment growth.
                </li>

                <li>
                  Compare retirement contribution strategies.
                </li>

                <li>
                  Understand the power of compound interest.
                </li>

                <li>
                  Improve retirement planning decisions.
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
                question="What is a pension calculator?"
                answer="A pension calculator estimates retirement savings growth and future retirement income."
              />

              <FaqItem
                question="Why is retirement planning important?"
                answer="Retirement planning helps prepare for future living expenses and financial independence."
              />

              <FaqItem
                question="What annual return should I assume?"
                answer="Many retirement projections use long-term market return assumptions between 5% and 8%."
              />

              <FaqItem
                question="Why does compound growth matter?"
                answer="Compound growth allows investment earnings to generate additional earnings over time."
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
                  name="401(k) Calculator"
                />

                <RelatedTool
                  name="IRA Calculator"
                />

                <RelatedTool
                  name="Retirement Calculator"
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
  prefix = "$",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
}) {

  return (
    <div className="mb-6">

      <label
        className="
          block
          mb-3
          font-semibold
          text-gray-700
        "
      >

        {label}

      </label>

      <div className="relative">

        {prefix && (

          <span
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-gray-400
              font-bold
            "
          >

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
    <div
      className={`
        bg-gradient-to-br ${color}
        rounded-3xl
        p-7
        text-white
        shadow-lg
      `}
    >

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