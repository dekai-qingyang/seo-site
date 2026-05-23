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

export default function OvertimeCalculatorPage() {

  const [hourlyRate, setHourlyRate] =
    useState(30);

  const [regularHours, setRegularHours] =
    useState(40);

  const [overtimeHours, setOvertimeHours] =
    useState(10);

  const [overtimeMultiplier, setOvertimeMultiplier] =
    useState(1.5);

  const [taxRate, setTaxRate] =
    useState(20);

  const regularWeeklyPay =
    hourlyRate *
    regularHours;

  const overtimePay =
    hourlyRate *
    overtimeMultiplier *
    overtimeHours;

  const totalWeeklyPay =
    regularWeeklyPay +
    overtimePay;

  const annualIncome =
    Math.round(
      totalWeeklyPay * 52
    );

  const estimatedTaxes =
    Math.round(
      annualIncome *
      (taxRate / 100)
    );

  const netIncome =
    annualIncome -
    estimatedTaxes;

  const monthlyIncome =
    Math.round(
      netIncome / 12
    );

  const pieData = [
    {
      name: "Regular Pay",
      value:
        regularWeeklyPay * 52,
    },
    {
      name: "Overtime Pay",
      value:
        overtimePay * 52,
    },
    {
      name: "Taxes",
      value:
        estimatedTaxes,
    },
  ];

  const comparisonData = [
    {
      name: "Gross Income",
      amount:
        annualIncome,
    },
    {
      name: "Net Income",
      amount:
        netIncome,
    },
  ];

  const monthlyData = [];

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    monthlyData.push({
      month: `M${month}`,
      income:
        monthlyIncome,
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

            Overtime Pay Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Overtime Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate overtime wages,
            extra work hours,
            weekly earnings,
            taxes,
            and annual take-home income projections.

          </p>

        </div>

        {/* MAIN GRID */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-[400px_1fr]
          gap-8
        ">

          {/* LEFT PANEL */}

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

              Overtime Inputs

            </h2>

            <InputField
              label="Hourly Wage"
              value={hourlyRate}
              onChange={setHourlyRate}
            />

            <InputField
              label="Regular Weekly Hours"
              value={regularHours}
              onChange={setRegularHours}
              prefix=""
            />

            <InputField
              label="Overtime Hours"
              value={overtimeHours}
              onChange={setOvertimeHours}
              prefix=""
            />

            <InputField
              label="Overtime Multiplier"
              value={overtimeMultiplier}
              onChange={setOvertimeMultiplier}
              prefix=""
            />

            <InputField
              label="Estimated Tax Rate (%)"
              value={taxRate}
              onChange={setTaxRate}
              prefix=""
            />

          </div>

          {/* RIGHT PANEL */}

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
                title="Weekly Overtime Pay"
                value={`$${Math.round(overtimePay).toLocaleString()}`}
                color="from-indigo-600 to-blue-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Annual Income"
                value={`$${annualIncome.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Monthly Income"
                value={`$${monthlyIncome.toLocaleString()}`}
                color="from-orange-500 to-amber-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Net Income"
                value={`$${netIncome.toLocaleString()}`}
                color="from-violet-500 to-purple-500"
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

              <ChartCard title="Income Breakdown">

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

                        <Cell fill="#22c55e" />

                        <Cell fill="#ef4444" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Monthly Income Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={monthlyData}
                    >

                      <defs>

                        <linearGradient
                          id="colorIncome"
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

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Net Income Growth">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={monthlyData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#4f46e5"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Gross vs Net Income">

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

              What Is an Overtime Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                An overtime calculator is a financial planning tool used to estimate overtime wages, extra hourly income, annual earnings, taxes, and overall take-home pay. Overtime calculations help employees understand how additional work hours may increase income and affect long-term financial planning.
              </p>

              <p>
                Many employers pay overtime wages when employees work beyond standard weekly hour limits. Overtime pay rates are commonly calculated using multipliers such as 1.5x or 2x regular hourly wages depending on labor regulations, employment agreements, and company policies.
              </p>

              <p>
                An overtime calculator estimates weekly overtime earnings, annual income growth, payroll taxes, and take-home pay projections. These calculations may help workers improve budgeting, debt repayment planning, retirement contributions, and overall financial management.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Overtime Formula

              </h3>

              <p>
                Overtime Pay =
                Hourly Wage ×
                Overtime Multiplier ×
                Overtime Hours
              </p>

              <p>
                Total Weekly Pay =
                Regular Weekly Income +
                Overtime Pay
              </p>

              <p>
                Example:
                If an employee earns $30 hourly and works 10 overtime hours weekly at 1.5x pay, overtime income may significantly increase total annual earnings.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Overtime Planning Matters

              </h3>

              <p>
                Overtime planning helps workers estimate income growth, evaluate work schedules, and improve financial stability through higher earnings potential.
              </p>

              <p>
                Additional overtime income may help employees accelerate debt repayment, increase emergency savings, improve retirement contributions, or achieve financial goals more quickly.
              </p>

              <p>
                Understanding overtime taxes is also important because additional earnings may increase total annual taxable income and payroll deductions.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Overtime Income Planning

              </h3>

              <p>
                Suppose an employee consistently works overtime throughout the year while earning additional wages at a higher overtime multiplier. This supplemental income may substantially improve annual take-home pay and long-term financial flexibility.
              </p>

              <p>
                Overtime income may be used for investing, mortgage payments, travel savings, retirement planning, or building emergency funds depending on financial priorities.
              </p>

              <p>
                Long-term financial planning often combines salary growth, investment contributions, tax planning, and disciplined spending strategies to improve financial independence over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using an Overtime Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate overtime income growth.
                </li>

                <li>
                  Compare regular pay vs overtime pay.
                </li>

                <li>
                  Calculate taxes and net income.
                </li>

                <li>
                  Improve budgeting and financial planning.
                </li>

                <li>
                  Understand annual income projections.
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
                question="What is an overtime calculator?"
                answer="An overtime calculator estimates overtime wages, taxes, and annual take-home income."
              />

              <FaqItem
                question="How is overtime pay calculated?"
                answer="Overtime pay is commonly calculated using a higher pay multiplier applied to hourly wages."
              />

              <FaqItem
                question="What is an overtime multiplier?"
                answer="An overtime multiplier increases hourly wages for overtime hours worked, commonly 1.5x or 2x."
              />

              <FaqItem
                question="Why is overtime planning important?"
                answer="Overtime planning helps workers estimate additional income and improve financial decision-making."
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
                  name="Hourly Wage Calculator"
                />

                <RelatedTool
                  name="Salary Calculator"
                />

                <RelatedTool
                  name="Take Home Pay Calculator"
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