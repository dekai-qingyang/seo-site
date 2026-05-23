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

export default function RetirementWithdrawalCalculatorPage() {

  const [retirementSavings, setRetirementSavings] =
    useState(1500000);

  const [annualWithdrawal, setAnnualWithdrawal] =
    useState(60000);

  const [annualReturn, setAnnualReturn] =
    useState(6);

  const [retirementYears, setRetirementYears] =
    useState(30);

  const [inflationRate, setInflationRate] =
    useState(2.5);

  const safeWithdrawalRate =
    (
      (annualWithdrawal /
        retirementSavings) *
      100
    ).toFixed(2);

  const projectedData = useMemo(() => {

    const data = [];

    let balance =
      retirementSavings;

    let withdrawal =
      annualWithdrawal;

    for (
      let year = 1;
      year <= retirementYears;
      year++
    ) {

      balance =
        balance *
        (1 + annualReturn / 100) -
        withdrawal;

      data.push({
        year,
        balance:
          Math.max(
            0,
            Math.round(balance)
          ),
        withdrawal:
          Math.round(withdrawal),
      });

      withdrawal =
        withdrawal *
        (1 + inflationRate / 100);

    }

    return data;

  }, [
    retirementSavings,
    annualWithdrawal,
    annualReturn,
    retirementYears,
    inflationRate,
  ]);

  const endingBalance =
    projectedData[
      projectedData.length - 1
    ]?.balance || 0;

  const totalWithdrawals =
    projectedData.reduce(
      (sum, item) =>
        sum + item.withdrawal,
      0
    );

  const pieData = [
    {
      name: "Withdrawals",
      value:
        totalWithdrawals,
    },
    {
      name: "Remaining Portfolio",
      value:
        endingBalance,
    },
  ];

  const comparisonData = [
    {
      name: "Withdrawals",
      amount:
        totalWithdrawals,
    },
    {
      name: "Ending Balance",
      amount:
        endingBalance,
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
            bg-cyan-100
            text-cyan-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Retirement Withdrawal Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Retirement Withdrawal Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate retirement withdrawals,
            portfolio sustainability,
            safe withdrawal rates,
            inflation-adjusted income,
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

              Withdrawal Inputs

            </h2>

            <InputField
              label="Retirement Savings"
              value={retirementSavings}
              onChange={setRetirementSavings}
            />

            <InputField
              label="Annual Withdrawal"
              value={annualWithdrawal}
              onChange={setAnnualWithdrawal}
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
              label="Inflation Rate (%)"
              value={inflationRate}
              onChange={setInflationRate}
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
                title="Safe Withdrawal Rate"
                value={`${safeWithdrawalRate}%`}
                color="from-cyan-600 to-blue-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Total Withdrawals"
                value={`$${totalWithdrawals.toLocaleString()}`}
                color="from-rose-500 to-pink-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Ending Portfolio"
                value={`$${endingBalance.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Annual Income"
                value={`$${annualWithdrawal.toLocaleString()}`}
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

              <ChartCard title="Withdrawals vs Remaining Portfolio">

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

                        <Cell fill="#06b6d4" />

                        <Cell fill="#10b981" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Portfolio Withdrawal Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={projectedData}
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
                            stopColor="#06b6d4"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#06b6d4"
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
                        stroke="#06b6d4"
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
                    data={projectedData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="year" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#06b6d4"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Withdrawal Comparison">

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
                      fill="#06b6d4"
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

              What Is a Retirement Withdrawal Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A retirement withdrawal calculator is a retirement planning tool used to estimate sustainable retirement withdrawals, portfolio longevity, and long-term retirement income strategies. Retirement withdrawals are one of the most important aspects of retirement planning because retirees often rely on investment portfolios to fund living expenses for decades.
              </p>

              <p>
                Retirement withdrawal planning helps individuals estimate how much money may safely be withdrawn from retirement savings each year without depleting retirement assets too quickly. Factors such as investment returns, inflation, retirement expenses, and market volatility may significantly affect long-term portfolio sustainability.
              </p>

              <p>
                A retirement withdrawal calculator estimates future portfolio balances over retirement years while accounting for annual withdrawals, investment growth, and inflation-adjusted spending. These projections help retirees better understand long-term retirement financial stability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Retirement Withdrawal Formula

              </h3>

              <p>
                Portfolio Balance =
                Previous Balance ×
                (1 + Investment Return) -
                Annual Withdrawals
              </p>

              <p>
                Example:
                If a retiree withdraws $60,000 annually from a $1,500,000 retirement portfolio while earning a 6% annual return, retirement savings may potentially support decades of retirement income depending on inflation and market performance.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                What Is the 4% Rule?

              </h3>

              <p>
                The 4% withdrawal rule is a commonly used retirement planning guideline suggesting retirees may withdraw approximately 4% of retirement savings annually while attempting to preserve portfolio sustainability over long retirement periods.
              </p>

              <p>
                For example, a retirement portfolio worth $1,000,000 may potentially support approximately $40,000 in annual withdrawals under the 4% guideline. However, actual retirement withdrawal strategies may vary depending on market conditions, retirement age, inflation, healthcare expenses, and personal financial goals.
              </p>

              <p>
                Some retirees may choose lower withdrawal rates to reduce portfolio depletion risk, while others may increase withdrawals based on additional retirement income sources or shorter retirement horizons.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Inflation Matters

              </h3>

              <p>
                Inflation may significantly affect retirement purchasing power over time. As living expenses increase, retirees may need larger annual withdrawals to maintain the same retirement lifestyle.
              </p>

              <p>
                Retirement withdrawal calculators often include inflation assumptions to estimate future withdrawal increases and retirement income sustainability more accurately.
              </p>

              <p>
                Long retirement periods may increase the importance of inflation-adjusted withdrawal planning and diversified investment strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Retirement Withdrawal Planning

              </h3>

              <p>
                Suppose a retiree has accumulated $1,500,000 in retirement savings and expects to withdraw approximately $60,000 annually during retirement. By earning a 6% annual portfolio return and managing withdrawals carefully, retirement assets may potentially support multiple decades of retirement income.
              </p>

              <p>
                Retirement withdrawal planning often helps retirees balance lifestyle spending with long-term financial sustainability and portfolio preservation.
              </p>

              <p>
                This demonstrates why retirement withdrawal strategies are essential for retirement financial security and long-term income planning.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Retirement Withdrawal Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate sustainable retirement withdrawals.
                </li>

                <li>
                  Visualize portfolio depletion over time.
                </li>

                <li>
                  Compare withdrawal rate strategies.
                </li>

                <li>
                  Account for inflation-adjusted spending.
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
                question="What is a retirement withdrawal calculator?"
                answer="A retirement withdrawal calculator estimates sustainable retirement withdrawals and long-term portfolio sustainability."
              />

              <FaqItem
                question="What is a safe withdrawal rate?"
                answer="A safe withdrawal rate is the estimated percentage of retirement savings that may be withdrawn annually while attempting to preserve long-term portfolio sustainability."
              />

              <FaqItem
                question="Why is inflation important in retirement?"
                answer="Inflation increases future living expenses and may reduce long-term purchasing power."
              />

              <FaqItem
                question="Can retirement portfolios run out of money?"
                answer="Yes. Excessive withdrawals, poor investment returns, and inflation may increase portfolio depletion risk."
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
                  name="Retirement Income Calculator"
                />

                <RelatedTool
                  name="Retirement Savings Calculator"
                />

                <RelatedTool
                  name="401(k) Calculator"
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
            focus:border-cyan-500
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