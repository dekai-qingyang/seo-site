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

export default function SocialSecurityCalculatorPage() {

  const [currentAge, setCurrentAge] =
    useState(40);

  const [retirementAge, setRetirementAge] =
    useState(67);

  const [annualIncome, setAnnualIncome] =
    useState(85000);

  const [currentSavings, setCurrentSavings] =
    useState(150000);

  const [annualReturn, setAnnualReturn] =
    useState(6);

  const yearsToRetirement =
    retirementAge - currentAge;

  const estimatedMonthlyBenefit =
    useMemo(() => {

      const estimate =
        annualIncome * 0.4 / 12;

      return Math.round(estimate);

    }, [annualIncome]);

  const estimatedLifetimeBenefits =
    estimatedMonthlyBenefit *
    12 *
    20;

  const projectedSavings = useMemo(() => {

    let balance = currentSavings;

    for (
      let i = 0;
      i < yearsToRetirement;
      i++
    ) {

      balance =
        balance *
        (1 + annualReturn / 100);

    }

    return Math.round(balance);

  }, [
    currentSavings,
    annualReturn,
    yearsToRetirement,
  ]);

  const totalRetirementIncome =
    projectedSavings +
    estimatedLifetimeBenefits;

  const pieData = [
    {
      name: "Social Security",
      value: estimatedLifetimeBenefits,
    },
    {
      name: "Personal Savings",
      value: projectedSavings,
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
      runningBalance *
      (1 + annualReturn / 100);

    growthData.push({
      year:
        currentAge + year,
      savings:
        Math.round(runningBalance),
    });

  }

  const incomeData = [
    {
      name: "Social Security",
      amount:
        estimatedLifetimeBenefits,
    },
    {
      name: "Savings",
      amount:
        projectedSavings,
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

            Retirement Benefit Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Social Security Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate Social Security retirement
            benefits,
            monthly retirement income,
            lifetime retirement payouts,
            and long-term retirement planning projections.

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
              label="Annual Income"
              value={annualIncome}
              onChange={setAnnualIncome}
            />

            <InputField
              label="Current Savings"
              value={currentSavings}
              onChange={setCurrentSavings}
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
                title="Monthly Benefit"
                value={`$${estimatedMonthlyBenefit.toLocaleString()}`}
                color="from-indigo-600 to-blue-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Lifetime Benefits"
                value={`$${estimatedLifetimeBenefits.toLocaleString()}`}
                color="from-rose-500 to-pink-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Projected Savings"
                value={`$${projectedSavings.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Retirement Income"
                value={`$${totalRetirementIncome.toLocaleString()}`}
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

              <ChartCard title="Retirement Income Sources">

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

                        <Cell fill="#4f46e5" />

                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Retirement Savings Growth">

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
                            stopColor="#4f46e5"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#4f46e5"
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
                        dataKey="savings"
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Long-Term Retirement Projection">

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
                      dataKey="savings"
                      stroke="#4f46e5"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Income Breakdown">

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
                      fill="#4f46e5"
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

              What Is a Social Security Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A Social Security calculator is a retirement planning tool used to estimate future Social Security benefits, monthly retirement income, and lifetime retirement payouts. Social Security retirement benefits are an important source of retirement income for millions of retirees.
              </p>

              <p>
                Social Security benefits are typically based on lifetime earnings history, retirement age, and payroll tax contributions made during working years. The age at which retirement benefits begin may significantly affect monthly payout amounts.
              </p>

              <p>
                Using a Social Security calculator helps estimate retirement income and allows individuals to better plan for long-term financial security during retirement years.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Social Security Formula

              </h3>

              <p>
                Estimated Monthly Benefit =
                Average Earnings ×
                Replacement Percentage
              </p>

              <p>
                Example:
                If annual earnings average $85,000 and retirement benefits replace approximately 40% of income, estimated monthly Social Security retirement income may exceed several thousand dollars per month depending on retirement age and earnings history.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Social Security Matters

              </h3>

              <p>
                Social Security retirement income provides financial support during retirement years after employment income ends. Many retirees rely on Social Security benefits to help cover housing costs, healthcare expenses, utilities, food, and other living expenses.
              </p>

              <p>
                Retirement planning often combines Social Security benefits with personal savings, retirement accounts, pensions, and investment income to create long-term financial stability.
              </p>

              <p>
                Delaying retirement benefits may increase monthly Social Security income, while claiming benefits earlier may reduce monthly payouts over retirement years.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Retirement Income Planning

              </h3>

              <p>
                Suppose an individual earns $85,000 annually and plans to retire at age 67. By combining Social Security retirement benefits with long-term retirement savings growth, overall retirement income may potentially support long-term financial independence.
              </p>

              <p>
                Retirement planning strategies often focus on balancing guaranteed retirement income sources with personal retirement savings and investment growth.
              </p>

              <p>
                This demonstrates why long-term retirement planning and savings accumulation are important for retirement security.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Social Security Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate monthly retirement benefits.
                </li>

                <li>
                  Compare retirement age strategies.
                </li>

                <li>
                  Visualize retirement income sources.
                </li>

                <li>
                  Improve retirement planning decisions.
                </li>

                <li>
                  Estimate lifetime retirement payouts.
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
                question="What is Social Security?"
                answer="Social Security is a government retirement income program funded through payroll taxes."
              />

              <FaqItem
                question="How are Social Security benefits calculated?"
                answer="Benefits are generally based on lifetime earnings history and retirement age."
              />

              <FaqItem
                question="Does retirement age affect benefits?"
                answer="Yes. Delaying retirement may increase monthly benefit amounts."
              />

              <FaqItem
                question="Can Social Security replace all retirement income?"
                answer="Many retirees combine Social Security with savings, pensions, and investments."
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
                  name="Pension Calculator"
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
            focus:border-indigo-500
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