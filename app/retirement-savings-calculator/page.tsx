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

export default function RetirementSavingsCalculatorPage() {

  const [currentAge, setCurrentAge] =
    useState(35);

  const [retirementAge, setRetirementAge] =
    useState(65);

  const [currentSavings, setCurrentSavings] =
    useState(80000);

  const [monthlyContribution, setMonthlyContribution] =
    useState(1200);

  const [annualReturn, setAnnualReturn] =
    useState(7);

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

  const estimatedAnnualIncome =
    Math.round(futureValue * 0.04);

  const estimatedMonthlyIncome =
    Math.round(
      estimatedAnnualIncome / 12
    );

  const pieData = [
    {
      name: "Contributions",
      value:
        totalContributions + currentSavings,
    },
    {
      name: "Investment Growth",
      value: investmentGrowth,
    },
  ];

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

  const incomeData = [
    {
      name: "Contributions",
      amount:
        totalContributions + currentSavings,
    },
    {
      name: "Growth",
      amount:
        investmentGrowth,
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

            Retirement Wealth Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Retirement Savings Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate future retirement savings,
            compound investment growth,
            retirement income projections,
            and long-term financial independence.

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

              Retirement Inputs

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
                title="Future Savings"
                value={`$${futureValue.toLocaleString()}`}
                color="from-emerald-600 to-green-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Contributions"
                value={`$${totalContributions.toLocaleString()}`}
                color="from-blue-500 to-indigo-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Investment Growth"
                value={`$${investmentGrowth.toLocaleString()}`}
                color="from-rose-500 to-pink-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Monthly Income"
                value={`$${estimatedMonthlyIncome.toLocaleString()}`}
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

                        <Cell fill="#059669" />

                        <Cell fill="#f43f5e" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Retirement Growth Projection">

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
                            stopColor="#059669"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#059669"
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
                        stroke="#059669"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Long-Term Savings Growth">

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
                      stroke="#059669"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Savings Breakdown">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={incomeData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="amount"
                      fill="#059669"
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

              What Is a Retirement Savings Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A retirement savings calculator is a financial planning tool used to estimate future retirement savings growth, retirement income projections, and long-term investment performance. It helps individuals understand how retirement contributions, compound interest, and investment returns may impact future financial security.
              </p>

              <p>
                Retirement planning is one of the most important aspects of personal finance because retirement income needs may last for decades after leaving the workforce. Building sufficient retirement savings may help provide financial stability, lifestyle flexibility, and long-term financial independence.
              </p>

              <p>
                A retirement savings calculator estimates future account balances based on current savings, monthly contributions, expected annual investment returns, and years remaining until retirement. These calculations help individuals compare different retirement strategies and savings goals.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Retirement Savings Formula

              </h3>

              <p>
                Future Retirement Savings =
                Current Savings ×
                (1 + Annual Return)^Years +
                Ongoing Contributions ×
                Compound Growth
              </p>

              <p>
                Example:
                If an individual contributes $1,200 monthly while earning a 7% annual investment return over multiple decades, retirement savings may grow substantially through compound interest and long-term investing.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Retirement Savings Matter

              </h3>

              <p>
                Retirement savings help individuals prepare for future living expenses, healthcare costs, inflation, and financial independence during retirement years. Without sufficient retirement savings, maintaining financial security later in life may become difficult.
              </p>

              <p>
                Compound growth is one of the most powerful long-term investing concepts. Investment earnings generate additional earnings over time, creating exponential growth over multiple decades.
              </p>

              <p>
                Starting retirement savings early provides more time for investments to compound. Even smaller monthly contributions may potentially grow into substantial retirement wealth over long investment periods.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Retirement Growth

              </h3>

              <p>
                Suppose an investor starts at age 35 with $80,000 already saved for retirement. By contributing $1,200 monthly and earning an estimated 7% annual return until retirement at age 65, total retirement savings may potentially exceed several million dollars depending on long-term investment performance.
              </p>

              <p>
                The majority of long-term retirement wealth often comes from investment growth rather than original contributions alone. This demonstrates the importance of starting retirement investing early and contributing consistently over time.
              </p>

              <p>
                Retirement income planning often combines investment savings, retirement accounts, pensions, Social Security benefits, and passive income sources to support long-term financial independence.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Retirement Savings Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate future retirement savings growth.
                </li>

                <li>
                  Visualize compound investment growth.
                </li>

                <li>
                  Compare retirement contribution strategies.
                </li>

                <li>
                  Improve long-term financial planning.
                </li>

                <li>
                  Estimate future retirement income needs.
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
                question="What is a retirement savings calculator?"
                answer="A retirement savings calculator estimates future retirement account growth and long-term retirement income projections."
              />

              <FaqItem
                question="Why is compound interest important?"
                answer="Compound interest allows investment earnings to generate additional earnings over time."
              />

              <FaqItem
                question="How much should I save for retirement?"
                answer="Retirement savings goals vary depending on income, retirement lifestyle, inflation, and expected retirement expenses."
              />

              <FaqItem
                question="Why should I start saving early?"
                answer="Starting early gives investments more time to grow through long-term compound growth."
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