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

export default function Retirement401kCalculatorPage() {

  /* =========================
     STATE
  ========================= */

  const [currentAge, setCurrentAge] =
    useState(30);

  const [retirementAge, setRetirementAge] =
    useState(65);

  const [currentBalance, setCurrentBalance] =
    useState(35000);

  const [annualContribution, setAnnualContribution] =
    useState(12000);

  const [employerMatch, setEmployerMatch] =
    useState(4000);

  const [annualReturn, setAnnualReturn] =
    useState(7);

  /* =========================
     CALCULATIONS
  ========================= */

  const yearsToRetirement =
    retirementAge - currentAge;

  const totalAnnualContribution =
    annualContribution + employerMatch;

  const futureValue = useMemo(() => {

    let balance = currentBalance;

    for (let i = 0; i < yearsToRetirement; i++) {

      balance =
        (balance + totalAnnualContribution) *
        (1 + annualReturn / 100);

    }

    return Math.round(balance);

  }, [
    currentBalance,
    totalAnnualContribution,
    annualReturn,
    yearsToRetirement,
  ]);

  const totalContributions =
    totalAnnualContribution *
    yearsToRetirement;

  const investmentGrowth =
    futureValue -
    currentBalance -
    totalContributions;

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
        totalAnnualContribution) *
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
      name: "Employee",
      amount: annualContribution,
    },
    {
      name: "Employer Match",
      amount: employerMatch,
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

            Retirement Planning Tool

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

            401(k) Calculator

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

            Estimate your future retirement
            savings with annual contributions,
            employer matching,
            compound investment growth,
            and long-term retirement planning.

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
              label="Current 401(k) Balance"
              value={currentBalance}
              onChange={setCurrentBalance}
            />

            <InputField
              label="Annual Contribution"
              value={annualContribution}
              onChange={setAnnualContribution}
            />

            <InputField
              label="Employer Match"
              value={employerMatch}
              onChange={setEmployerMatch}
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
                color="from-indigo-600 to-indigo-500"
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
                title="Years to Retirement"
                value={`${yearsToRetirement} Years`}
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

              <ChartCard title="401(k) Growth Projection">

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

            <ChartCard title="Retirement Growth Trend">

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

            <ChartCard title="Annual Contribution Breakdown">

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

              What Is a 401(k) Calculator?

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
                A 401(k) calculator is a retirement planning tool used to estimate how much money may accumulate in a retirement account over time. It calculates future retirement savings based on annual contributions, employer matching contributions, investment returns, and years remaining until retirement.
              </p>

              <p>
                Retirement planning is one of the most important aspects of long-term financial security. A 401(k) plan allows employees to contribute pre-tax income into retirement investments, helping savings grow through compound interest and long-term market appreciation.
              </p>

              <p>
                Many employers also provide matching contributions, which significantly increase retirement savings potential over time. By using a 401(k) calculator, individuals can better understand how contribution amounts, investment performance, and retirement timelines affect future wealth.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                401(k) Formula

              </h3>

              <p>
                Future Value =
                Current Balance × (1 + Rate)^Years +
                Annual Contributions × Compound Growth
              </p>

              <p>
                Example:
                If you currently have $35,000 invested, contribute $12,000 annually, receive a $4,000 employer match, and earn an average annual return of 7%, your retirement savings could grow substantially over several decades.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Why 401(k) Contributions Matter

              </h3>

              <p>
                Contributing consistently to a retirement account allows compound investment growth to work over time. Starting early provides one of the greatest financial advantages because investments have more years to compound.
              </p>

              <p>
                Employer matching contributions can dramatically increase total retirement savings. Many employers match a percentage of employee contributions, essentially providing additional compensation toward retirement.
              </p>

              <p>
                Increasing annual contributions by even small amounts can result in significant long-term differences in retirement wealth due to compounding investment returns.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Example of Retirement Growth

              </h3>

              <p>
                Suppose an employee begins investing at age 30 with a current balance of $35,000. If the employee contributes $12,000 annually and receives a $4,000 employer match, the total annual contribution equals $16,000.
              </p>

              <p>
                Assuming a 7% annual investment return and retirement at age 65, the retirement account may potentially exceed several million dollars depending on long-term market performance.
              </p>

              <p>
                This demonstrates the power of compound growth and long-term investing discipline.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
                pt-4
              ">

                Benefits of Using a 401(k) Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate retirement savings growth.
                </li>

                <li>
                  Understand the impact of employer matching.
                </li>

                <li>
                  Compare contribution strategies.
                </li>

                <li>
                  Improve retirement planning decisions.
                </li>

                <li>
                  Visualize long-term compound growth.
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
                question="What is a 401(k)?"
                answer="A 401(k) is a tax-advantaged retirement savings plan offered by employers."
              />

              <FaqItem
                question="Why is employer matching important?"
                answer="Employer matching increases retirement contributions and accelerates long-term growth."
              />

              <FaqItem
                question="What annual return should I assume?"
                answer="Many long-term retirement projections use historical market averages between 6% and 8%."
              />

              <FaqItem
                question="When should I start contributing?"
                answer="Starting early allows investments more time to compound and grow."
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
                  name="Retirement Calculator"
                />

                <RelatedTool
                  name="Compound Interest Calculator"
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