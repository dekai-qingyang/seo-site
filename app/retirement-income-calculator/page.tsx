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

export default function RetirementIncomeCalculatorPage() {

  const [retirementSavings, setRetirementSavings] =
    useState(1200000);

  const [annualReturn, setAnnualReturn] =
    useState(6);

  const [retirementYears, setRetirementYears] =
    useState(25);

  const [monthlyExpenses, setMonthlyExpenses] =
    useState(5500);

  const [socialSecurityIncome, setSocialSecurityIncome] =
    useState(2500);

  const annualExpenses =
    monthlyExpenses * 12;

  const estimatedAnnualIncome =
    useMemo(() => {

      return Math.round(
        retirementSavings * 0.04
      );

    }, [retirementSavings]);

  const estimatedMonthlyIncome =
    Math.round(
      estimatedAnnualIncome / 12
    );

  const retirementGap =
    annualExpenses -
    estimatedAnnualIncome -
    socialSecurityIncome * 12;

  const projectedPortfolio = useMemo(() => {

    let balance =
      retirementSavings;

    const withdrawals =
      annualExpenses -
      socialSecurityIncome * 12;

    const data = [];

    for (
      let year = 1;
      year <= retirementYears;
      year++
    ) {

      balance =
        balance *
        (1 + annualReturn / 100) -
        withdrawals;

      data.push({
        year,
        balance:
          Math.max(
            0,
            Math.round(balance)
          ),
      });

    }

    return data;

  }, [
    retirementSavings,
    annualReturn,
    retirementYears,
    annualExpenses,
    socialSecurityIncome,
  ]);

  const endingBalance =
    projectedPortfolio[
      projectedPortfolio.length - 1
    ]?.balance || 0;

  const pieData = [
    {
      name: "Investment Income",
      value:
        estimatedAnnualIncome,
    },
    {
      name: "Social Security",
      value:
        socialSecurityIncome * 12,
    },
  ];

  const incomeData = [
    {
      name: "Expenses",
      amount:
        annualExpenses,
    },
    {
      name: "Income",
      amount:
        estimatedAnnualIncome +
        socialSecurityIncome * 12,
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
            bg-orange-100
            text-orange-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Retirement Income Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Retirement Income Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate retirement income,
            withdrawal sustainability,
            future retirement expenses,
            and long-term retirement financial planning projections.

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
              label="Retirement Savings"
              value={retirementSavings}
              onChange={setRetirementSavings}
            />

            <InputField
              label="Expected Annual Return (%)"
              value={annualReturn}
              onChange={setAnnualReturn}
              prefix=""
            />

            <InputField
              label="Retirement Years"
              value={retirementYears}
              onChange={setRetirementYears}
              prefix=""
            />

            <InputField
              label="Monthly Expenses"
              value={monthlyExpenses}
              onChange={setMonthlyExpenses}
            />

            <InputField
              label="Monthly Social Security Income"
              value={socialSecurityIncome}
              onChange={setSocialSecurityIncome}
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
                title="Monthly Income"
                value={`$${estimatedMonthlyIncome.toLocaleString()}`}
                color="from-orange-600 to-amber-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Annual Income"
                value={`$${estimatedAnnualIncome.toLocaleString()}`}
                color="from-blue-500 to-indigo-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Ending Portfolio"
                value={`$${endingBalance.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Income Gap"
                value={`$${retirementGap.toLocaleString()}`}
                color="from-rose-500 to-pink-500"
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

                        <Cell fill="#f97316" />

                        <Cell fill="#3b82f6" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Portfolio Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={projectedPortfolio}
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
                            stopColor="#f97316"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#f97316"
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
                        stroke="#f97316"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Retirement Portfolio Over Time">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={projectedPortfolio}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="year" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#f97316"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Income vs Expenses">

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
                      fill="#f97316"
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

              What Is a Retirement Income Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A retirement income calculator is a financial planning tool used to estimate future retirement income, portfolio withdrawals, retirement expenses, and long-term retirement sustainability. Retirement income planning helps individuals understand whether retirement savings may support future lifestyle and financial needs.
              </p>

              <p>
                Retirement income may come from multiple sources including retirement savings accounts, pensions, Social Security benefits, investment income, annuities, and passive income streams. A retirement income calculator combines these factors to estimate future financial stability during retirement years.
              </p>

              <p>
                Retirement planning is important because retirees may need to fund living expenses for decades after leaving the workforce. Inflation, healthcare expenses, and market volatility may significantly affect long-term retirement sustainability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Retirement Income Formula

              </h3>

              <p>
                Retirement Income =
                Investment Withdrawals +
                Social Security +
                Pension Income +
                Other Income Sources
              </p>

              <p>
                Example:
                If a retiree has $1,200,000 in retirement savings and withdraws 4% annually, estimated annual retirement income from investments may equal approximately $48,000 before additional retirement income sources.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Retirement Income Planning Matters

              </h3>

              <p>
                Retirement income planning helps retirees estimate whether savings and investment income may cover future expenses such as housing, healthcare, transportation, travel, insurance, and everyday living costs.
              </p>

              <p>
                Long-term retirement sustainability depends on balancing investment withdrawals with investment growth and overall portfolio performance. Excessive withdrawals may increase the risk of depleting retirement savings too quickly.
              </p>

              <p>
                Many retirement planning strategies use the 4% withdrawal rule as a general guideline for sustainable retirement income. However, individual retirement situations may vary significantly depending on market conditions, retirement age, inflation, and spending needs.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Retirement Income Planning

              </h3>

              <p>
                Suppose a retiree has accumulated $1,200,000 in retirement savings and expects to spend approximately $5,500 monthly during retirement. Combined with Social Security benefits and investment income, retirement savings may potentially support long-term retirement financial goals depending on market performance and withdrawal strategies.
              </p>

              <p>
                Retirement income projections often help individuals adjust retirement savings contributions, spending goals, and retirement age expectations before leaving the workforce.
              </p>

              <p>
                This demonstrates why retirement income planning and long-term investment management are important for retirement financial security.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Retirement Income Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate retirement income sustainability.
                </li>

                <li>
                  Compare retirement withdrawal strategies.
                </li>

                <li>
                  Visualize portfolio depletion over time.
                </li>

                <li>
                  Estimate future retirement expenses.
                </li>

                <li>
                  Improve long-term retirement planning.
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
                question="What is a retirement income calculator?"
                answer="A retirement income calculator estimates future retirement income and long-term retirement sustainability."
              />

              <FaqItem
                question="What is the 4% withdrawal rule?"
                answer="The 4% rule is a common retirement planning guideline suggesting retirees may withdraw approximately 4% annually from retirement savings."
              />

              <FaqItem
                question="Why is retirement income planning important?"
                answer="Retirement income planning helps estimate whether retirement savings may support future living expenses."
              />

              <FaqItem
                question="What income sources are included in retirement?"
                answer="Retirement income may include Social Security, pensions, retirement savings, investments, and passive income."
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
                  name="Retirement Savings Calculator"
                />

                <RelatedTool
                  name="401(k) Calculator"
                />

                <RelatedTool
                  name="Social Security Calculator"
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
            focus:border-orange-500
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