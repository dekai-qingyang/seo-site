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

export default function EarlyRetirementCalculatorPage() {

  const [currentAge, setCurrentAge] =
    useState(30);

  const [targetRetirementAge, setTargetRetirementAge] =
    useState(45);

  const [currentSavings, setCurrentSavings] =
    useState(150000);

  const [monthlyContribution, setMonthlyContribution] =
    useState(2500);

  const [annualExpenses, setAnnualExpenses] =
    useState(50000);

  const [annualReturn, setAnnualReturn] =
    useState(7);

  const yearsToRetirement =
    targetRetirementAge - currentAge;

  const fireNumber =
    annualExpenses * 25;

  const projectedPortfolio = useMemo(() => {

    let balance =
      currentSavings;

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

  const monthlyPassiveIncome =
    Math.round(
      (projectedPortfolio * 0.04) / 12
    );

  const totalContributions =
    monthlyContribution *
    12 *
    yearsToRetirement;

  const investmentGrowth =
    projectedPortfolio -
    currentSavings -
    totalContributions;

  const progressPercentage =
    Math.min(
      100,
      Math.round(
        (projectedPortfolio /
          fireNumber) *
        100
      )
    );

  const growthData = [];

  let runningBalance =
    currentSavings;

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

  const pieData = [
    {
      name: "Contributions",
      value:
        totalContributions + currentSavings,
    },
    {
      name: "Growth",
      value:
        investmentGrowth,
    },
  ];

  const comparisonData = [
    {
      name: "FIRE Goal",
      amount:
        fireNumber,
    },
    {
      name: "Projected Portfolio",
      amount:
        projectedPortfolio,
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
            bg-lime-100
            text-lime-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            FIRE Financial Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Early Retirement Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate financial independence goals,
            FIRE retirement targets,
            passive income projections,
            and long-term early retirement investment growth.

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

              FIRE Inputs

            </h2>

            <InputField
              label="Current Age"
              value={currentAge}
              onChange={setCurrentAge}
              prefix=""
            />

            <InputField
              label="Target Retirement Age"
              value={targetRetirementAge}
              onChange={setTargetRetirementAge}
              prefix=""
            />

            <InputField
              label="Current Savings"
              value={currentSavings}
              onChange={setCurrentSavings}
            />

            <InputField
              label="Monthly Investment"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
            />

            <InputField
              label="Annual Expenses"
              value={annualExpenses}
              onChange={setAnnualExpenses}
            />

            <InputField
              label="Expected Annual Return (%)"
              value={annualReturn}
              onChange={setAnnualReturn}
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
                title="FIRE Goal"
                value={`$${fireNumber.toLocaleString()}`}
                color="from-lime-600 to-green-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Projected Portfolio"
                value={`$${projectedPortfolio.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Monthly Passive Income"
                value={`$${monthlyPassiveIncome.toLocaleString()}`}
                color="from-emerald-500 to-teal-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="FIRE Progress"
                value={`${progressPercentage}%`}
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

                        <Cell fill="#84cc16" />

                        <Cell fill="#06b6d4" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="FIRE Portfolio Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={growthData}
                    >

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
                            stopColor="#84cc16"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#84cc16"
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
                        stroke="#84cc16"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Investment Growth Over Time">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={growthData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="year" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#84cc16"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="FIRE Goal Comparison">

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
                      fill="#84cc16"
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

              What Is an Early Retirement Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                An early retirement calculator is a financial independence planning tool used to estimate how quickly investments and savings may support retirement before traditional retirement age. Early retirement planning is commonly associated with the FIRE movement, which stands for Financial Independence, Retire Early.
              </p>

              <p>
                The goal of FIRE planning is to accumulate enough investment assets to generate passive income capable of covering annual living expenses without relying on active employment income. Many FIRE investors focus on aggressive savings rates, disciplined investing, and long-term compound growth.
              </p>

              <p>
                An early retirement calculator estimates future portfolio growth based on current savings, monthly investments, expected annual returns, and target retirement age. These calculations help individuals understand how long it may take to achieve financial independence.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                FIRE Formula

              </h3>

              <p>
                FIRE Number =
                Annual Expenses × 25
              </p>

              <p>
                Example:
                If annual living expenses equal $50,000, the estimated FIRE target may equal approximately $1,250,000 using the 4% withdrawal rule.
              </p>

              <p>
                Many early retirement strategies assume retirees may withdraw approximately 4% annually from investment portfolios while attempting to preserve long-term sustainability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Early Retirement Planning Matters

              </h3>

              <p>
                Early retirement planning may provide financial freedom, lifestyle flexibility, reduced financial stress, and the ability to pursue personal goals outside traditional employment.
              </p>

              <p>
                Many individuals pursuing FIRE prioritize high savings rates and consistent investing over long periods. Compound investment growth may significantly accelerate wealth accumulation when investments are allowed to grow for many years.
              </p>

              <p>
                Reducing annual living expenses may also lower the total FIRE target, potentially shortening the timeline required to achieve financial independence.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of FIRE Investing

              </h3>

              <p>
                Suppose an investor is currently 30 years old with $150,000 already invested and contributes $2,500 monthly while earning a 7% annual return. By maintaining consistent investing habits, retirement assets may potentially grow enough to support early retirement before traditional retirement age.
              </p>

              <p>
                Long-term investing strategies often combine diversified investment portfolios, retirement accounts, passive income generation, and disciplined spending management to accelerate financial independence goals.
              </p>

              <p>
                This demonstrates why long-term investment planning and high savings rates are important for achieving early retirement objectives.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using an Early Retirement Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate financial independence timelines.
                </li>

                <li>
                  Visualize compound investment growth.
                </li>

                <li>
                  Compare FIRE savings strategies.
                </li>

                <li>
                  Estimate passive retirement income.
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
                question="What is FIRE?"
                answer="FIRE stands for Financial Independence, Retire Early."
              />

              <FaqItem
                question="What is the FIRE number?"
                answer="The FIRE number is the estimated investment amount needed to support retirement expenses."
              />

              <FaqItem
                question="What is the 4% rule?"
                answer="The 4% rule is a retirement withdrawal guideline commonly used in financial independence planning."
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
                  name="Retirement Calculator"
                />

                <RelatedTool
                  name="Retirement Savings Calculator"
                />

                <RelatedTool
                  name="Retirement Withdrawal Calculator"
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
            focus:border-lime-500
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