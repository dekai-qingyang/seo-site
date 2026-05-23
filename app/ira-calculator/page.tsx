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

export default function IRACalculatorPage() {

  /* =========================
     STATE
  ========================= */

  const [currentAge, setCurrentAge] =
    useState(30);

  const [retirementAge, setRetirementAge] =
    useState(65);

  const [currentBalance, setCurrentBalance] =
    useState(25000);

  const [annualContribution, setAnnualContribution] =
    useState(7000);

  const [annualReturn, setAnnualReturn] =
    useState(7);

  /* =========================
     CALCULATIONS
  ========================= */

  const yearsToRetirement =
    retirementAge - currentAge;

  const futureValue = useMemo(() => {

    let balance = currentBalance;

    for (let i = 0; i < yearsToRetirement; i++) {

      balance =
        (balance + annualContribution) *
        (1 + annualReturn / 100);

    }

    return Math.round(balance);

  }, [
    currentBalance,
    annualContribution,
    annualReturn,
    yearsToRetirement,
  ]);

  const totalContributions =
    annualContribution *
    yearsToRetirement;

  const investmentGrowth =
    futureValue -
    currentBalance -
    totalContributions;

  const estimatedRetirementIncome =
    Math.round(futureValue * 0.04);

  /* =========================
     CHART DATA
  ========================= */

  const pieData = [
    {
      name: "Contributions",
      value:
        totalContributions + currentBalance,
    },
    {
      name: "Investment Growth",
      value: investmentGrowth,
    },
  ];

  const growthData = [];

  let runningBalance = currentBalance;

  for (let year = 1; year <= yearsToRetirement; year++) {

    runningBalance =
      (runningBalance +
        annualContribution) *
      (1 + annualReturn / 100);

    growthData.push({
      year:
        currentAge + year,
      balance:
        Math.round(runningBalance),
    });

  }

  const contributionData = [
    {
      name: "Contributions",
      amount:
        totalContributions + currentBalance,
    },
    {
      name: "Growth",
      amount: investmentGrowth,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fb] overflow-hidden">

      <section className="max-w-7xl mx-auto px-4 md:px-5 pt-12 md:pt-16 pb-12">

        {/* HERO */}

        <div className="text-center mb-12 md:mb-14">

          <div className="
            inline-flex
            items-center
            gap-2
            bg-indigo-100
            text-indigo-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Retirement Investment Planning

          </div>

          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-7xl
            font-black
            text-gray-900
            mb-6
            leading-tight
          ">

            IRA Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-base
            md:text-lg
            text-gray-500
            leading-8
            md:leading-9
          ">

            Estimate your future IRA retirement
            savings using annual contributions,
            compound investment growth,
            retirement timelines,
            and long-term income projections.

          </p>

        </div>

        {/* GRID */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-[420px_1fr]
          gap-8
        ">

          {/* LEFT */}

          <div className="
            bg-white
            rounded-[28px]
            md:rounded-[34px]
            p-6
            md:p-8
            shadow-sm
            border
            border-gray-100
            h-fit
            lg:sticky
            lg:top-5
          ">

            <h2 className="
              text-2xl
              md:text-3xl
              font-black
              mb-8
            ">

              Retirement Inputs

            </h2>

            <InputField
              label="Current Age"
              value={currentAge}
              onChange={setCurrentAge}
            />

            <InputField
              label="Retirement Age"
              value={retirementAge}
              onChange={setRetirementAge}
            />

            <InputField
              label="Current IRA Balance"
              value={currentBalance}
              onChange={setCurrentBalance}
            />

            <InputField
              label="Annual Contribution"
              value={annualContribution}
              onChange={setAnnualContribution}
            />

            <InputField
              label="Expected Annual Return (%)"
              value={annualReturn}
              onChange={setAnnualReturn}
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
                title="Future Value"
                value={`$${futureValue.toLocaleString()}`}
                color="from-indigo-600 to-purple-600"
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
                title="Retirement Income"
                value={`$${estimatedRetirementIncome.toLocaleString()}/yr`}
                color="from-orange-500 to-amber-500"
              />

            </div>

            {/* TOP CHARTS */}

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
              mb-6
            ">

              {/* PIE */}

              <ChartCard title="Contributions vs Growth">

                <div className="w-full h-[320px] md:h-[350px]">

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

                        <Cell fill="#6366f1" />

                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="IRA Growth Projection">

                <div className="w-full h-[320px] md:h-[350px]">

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
                            stopColor="#6366f1"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#6366f1"
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
                        stroke="#6366f1"
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

              <div className="w-full h-[340px] md:h-[380px]">

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
                      stroke="#6366f1"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Contribution Breakdown">

              <div className="w-full h-[340px] md:h-[380px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={contributionData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="amount"
                      fill="#6366f1"
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
          rounded-[28px]
          md:rounded-[34px]
          shadow-sm
          border
          border-gray-100
          p-6
          md:p-10
          mt-10
        ">

          <div className="max-w-5xl">

            <h2 className="
              text-3xl
              md:text-4xl
              font-black
              text-gray-900
              mb-8
            ">

              What Is an IRA Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              text-[16px]
              md:text-[17px]
              leading-8
              md:leading-9
            ">

              <p>
                An IRA calculator is a retirement planning tool used to estimate future retirement savings growth based on annual contributions, investment returns, and compound interest over time. IRA stands for Individual Retirement Account and is commonly used for long-term retirement investing.
              </p>

              <p>
                Retirement planning is an important part of personal finance because it helps individuals prepare for future living expenses after leaving the workforce. IRA accounts allow investments to grow over time through long-term market appreciation and compound investment returns.
              </p>

              <p>
                Using an IRA calculator helps investors understand how consistent annual contributions and investment growth may impact future retirement wealth. The calculator can also demonstrate how starting earlier may significantly increase retirement savings due to compounding.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                IRA Formula

              </h3>

              <p>
                Future Value =
                Current Balance × (1 + Rate)^Years +
                Annual Contributions × Compound Growth
              </p>

              <p>
                Example:
                If an investor contributes $7,000 annually into an IRA while earning a 7% average annual return over several decades, retirement savings may grow substantially through long-term compound interest.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Why IRAs Matter

              </h3>

              <p>
                Individual Retirement Accounts help people save for retirement while benefiting from long-term investment growth. Depending on the account type, IRAs may provide tax advantages that improve retirement planning efficiency.
              </p>

              <p>
                One of the largest benefits of retirement investing is compound growth. Investment earnings may generate additional earnings over time, creating exponential growth over multiple decades.
              </p>

              <p>
                Starting retirement contributions earlier allows investments more time to compound. Even smaller contributions may potentially grow into significant retirement savings when invested consistently over long periods.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Example of IRA Growth

              </h3>

              <p>
                Suppose an investor starts investing at age 30 with an initial IRA balance of $25,000. The investor contributes $7,000 annually and earns an estimated 7% annual investment return until retirement at age 65.
              </p>

              <p>
                Over time, compound growth may substantially increase retirement wealth. A large percentage of final account value often comes from investment growth rather than original contributions.
              </p>

              <p>
                This demonstrates why long-term retirement investing and consistent contributions are important for financial independence.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Benefits of Using an IRA Calculator

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
                  Visualize compound interest over time.
                </li>

                <li>
                  Compare contribution strategies.
                </li>

                <li>
                  Improve retirement planning decisions.
                </li>

                <li>
                  Understand long-term investment growth potential.
                </li>

              </ul>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Frequently Asked Questions

              </h3>

              <FaqItem
                question="What is an IRA?"
                answer="An IRA is an Individual Retirement Account designed to help people save for retirement."
              />

              <FaqItem
                question="Why is compound growth important?"
                answer="Compound growth allows investment earnings to generate additional earnings over time."
              />

              <FaqItem
                question="How much can I contribute to an IRA?"
                answer="Contribution limits may change annually depending on IRS regulations."
              />

              <FaqItem
                question="When should I start saving for retirement?"
                answer="Starting early gives investments more time to grow through compounding."
              />

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
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
                  name="Roth IRA Calculator"
                />

                <RelatedTool
                  name="401(k) Calculator"
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
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
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

        <span className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-gray-400
          font-bold
        ">

          $

        </span>

        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          className="
            w-full
            h-[58px]
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            pl-10
            pr-5
            text-lg
            outline-none
            focus:border-indigo-500
            focus:bg-white
            transition
          "
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
      rounded-[28px]
      p-7
      text-white
      shadow-lg
    `}>

      <div className="
        flex
        justify-between
        items-start
        mb-8
      ">

        <div className="
          w-14
          h-14
          rounded-2xl
          bg-white/20
          flex
          items-center
          justify-center
        ">

          {icon}

        </div>

      </div>

      <p className="text-white/80 mb-2">
        {title}
      </p>

      <h3 className="
        text-3xl
        md:text-4xl
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
      rounded-[28px]
      md:rounded-[34px]
      p-6
      md:p-8
      shadow-sm
      border
      border-gray-100
      mb-6
      overflow-hidden
    ">

      <h3 className="
        text-xl
        md:text-2xl
        font-black
        mb-5
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