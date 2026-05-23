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

export default function RothIRACalculatorPage() {

  const [currentAge, setCurrentAge] =
    useState(28);

  const [retirementAge, setRetirementAge] =
    useState(65);

  const [currentBalance, setCurrentBalance] =
    useState(15000);

  const [annualContribution, setAnnualContribution] =
    useState(7000);

  const [annualReturn, setAnnualReturn] =
    useState(7);

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

  const estimatedIncome =
    Math.round(futureValue * 0.04);

  const pieData = [
    {
      name: "Contributions",
      value:
        totalContributions + currentBalance,
    },
    {
      name: "Growth",
      value: investmentGrowth,
    },
  ];

  const growthData = [];

  let runningBalance = currentBalance;

  for (
    let year = 1;
    year <= yearsToRetirement;
    year++
  ) {

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

  const barData = [
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
    <main className="min-h-screen bg-[#f5f7fb]">

      <section className="max-w-7xl mx-auto px-4 py-12">

        {/* HERO */}

        <div className="text-center mb-14">

          <div className="
            inline-flex
            items-center
            gap-2
            bg-purple-100
            text-purple-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Tax-Free Retirement Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Roth IRA Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate Roth IRA retirement
            savings,
            tax-free growth,
            annual contributions,
            and future retirement income
            projections.

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
              label="Current Roth IRA Balance"
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
                title="Future Value"
                value={`$${futureValue.toLocaleString()}`}
                color="from-purple-600 to-indigo-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Contributions"
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
                title="Estimated Income"
                value={`$${estimatedIncome.toLocaleString()}/yr`}
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

                        <Cell fill="#8b5cf6" />

                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Roth IRA Growth Projection">

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
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
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
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Long-Term Growth">

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
                      stroke="#8b5cf6"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Contribution Breakdown">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={barData}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="amount"
                      fill="#8b5cf6"
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

              What Is a Roth IRA Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A Roth IRA calculator helps estimate
                long-term retirement savings growth
                using annual contributions,
                compound interest,
                and retirement investment returns.
              </p>

              <p>
                Roth IRAs are retirement accounts
                funded with after-tax income,
                allowing qualified withdrawals
                during retirement to be tax-free.
              </p>

              <p>
                Long-term investing through a Roth IRA
                may significantly increase retirement
                wealth because investment gains
                compound over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Roth IRA Formula

              </h3>

              <p>
                Future Value =
                Current Balance ×
                (1 + Rate)^Years +
                Annual Contributions ×
                Compound Growth
              </p>

              <p>
                Example:
                Contributing $7,000 annually
                while earning a 7% annual return
                over several decades may result
                in substantial retirement savings.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Roth IRAs

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Tax-free qualified withdrawals.
                </li>

                <li>
                  Long-term compound investment growth.
                </li>

                <li>
                  Flexible retirement planning.
                </li>

                <li>
                  Potential long-term wealth building.
                </li>

                <li>
                  Retirement income diversification.
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
                question="What is a Roth IRA?"
                answer="A Roth IRA is a retirement account that allows qualified tax-free withdrawals."
              />

              <FaqItem
                question="Are Roth IRA withdrawals taxable?"
                answer="Qualified Roth IRA withdrawals are generally tax-free."
              />

              <FaqItem
                question="Why is compound growth important?"
                answer="Compound growth allows investment earnings to generate additional earnings over time."
              />

              <FaqItem
                question="When should I start investing?"
                answer="Starting earlier gives investments more time to compound."
              />

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
            focus:border-purple-500
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