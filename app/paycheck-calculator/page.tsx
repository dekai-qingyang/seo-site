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

export default function PaycheckCalculatorPage() {

  const [hourlyRate, setHourlyRate] =
    useState(35);

  const [hoursWorked, setHoursWorked] =
    useState(80);

  const [overtimeHours, setOvertimeHours] =
    useState(10);

  const [taxRate, setTaxRate] =
    useState(22);

  const [otherDeductions, setOtherDeductions] =
    useState(300);

  const overtimePay =
    overtimeHours *
    hourlyRate *
    1.5;

  const grossPay =
    (hourlyRate *
      hoursWorked) +
    overtimePay;

  const taxes =
    Math.round(
      grossPay *
      (taxRate / 100)
    );

  const totalDeductions =
    taxes +
    otherDeductions;

  const netPay =
    grossPay -
    totalDeductions;

  const annualIncome =
    Math.round(
      netPay * 26
    );

  const monthlyIncome =
    Math.round(
      annualIncome / 12
    );

  const pieData = [
    {
      name: "Net Pay",
      value:
        netPay,
    },
    {
      name: "Taxes",
      value:
        taxes,
    },
    {
      name: "Other Deductions",
      value:
        otherDeductions,
    },
  ];

  const comparisonData = [
    {
      name: "Gross Pay",
      amount:
        grossPay,
    },
    {
      name: "Net Pay",
      amount:
        netPay,
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

            Paycheck & Salary Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Paycheck Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate paycheck taxes,
            gross pay,
            overtime income,
            deductions,
            and take-home salary projections.

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

              Paycheck Inputs

            </h2>

            <InputField
              label="Hourly Wage"
              value={hourlyRate}
              onChange={setHourlyRate}
            />

            <InputField
              label="Hours Worked Per Pay Period"
              value={hoursWorked}
              onChange={setHoursWorked}
              prefix=""
            />

            <InputField
              label="Overtime Hours"
              value={overtimeHours}
              onChange={setOvertimeHours}
              prefix=""
            />

            <InputField
              label="Estimated Tax Rate (%)"
              value={taxRate}
              onChange={setTaxRate}
              prefix=""
            />

            <InputField
              label="Other Deductions"
              value={otherDeductions}
              onChange={setOtherDeductions}
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
                title="Gross Pay"
                value={`$${grossPay.toLocaleString()}`}
                color="from-blue-600 to-cyan-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Net Pay"
                value={`$${netPay.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Annual Income"
                value={`$${annualIncome.toLocaleString()}`}
                color="from-violet-500 to-purple-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Monthly Income"
                value={`$${monthlyIncome.toLocaleString()}`}
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

              <ChartCard title="Paycheck Breakdown">

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

                        <Cell fill="#3b82f6" />

                        <Cell fill="#ef4444" />

                        <Cell fill="#f97316" />

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
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
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
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Income Growth Projection">

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
                      stroke="#3b82f6"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Gross vs Net Pay">

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
                      fill="#3b82f6"
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

              What Is a Paycheck Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A paycheck calculator is a financial planning tool used to estimate gross pay, paycheck taxes, payroll deductions, overtime earnings, and net take-home income. Employees may use paycheck calculations to better understand how much money is received after taxes and deductions are applied.
              </p>

              <p>
                Paychecks are typically affected by federal taxes, state taxes, Social Security taxes, Medicare taxes, retirement contributions, insurance deductions, and overtime income. Understanding paycheck deductions may help employees improve budgeting and long-term financial planning.
              </p>

              <p>
                A paycheck calculator estimates take-home pay based on hourly wages, hours worked, overtime income, and estimated payroll taxes. These projections may help workers better understand annual earnings, monthly cash flow, and overall financial stability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Paycheck Formula

              </h3>

              <p>
                Gross Pay =
                Regular Income +
                Overtime Pay
              </p>

              <p>
                Net Pay =
                Gross Pay -
                Taxes -
                Payroll Deductions
              </p>

              <p>
                Annual Income =
                Net Pay ×
                Number of Pay Periods
              </p>

              <p>
                Example:
                If an employee earns overtime income while paying taxes and payroll deductions, actual take-home pay may differ significantly from gross wages.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Paycheck Planning Matters

              </h3>

              <p>
                Paycheck planning helps employees estimate take-home income, improve budgeting strategies, and better manage monthly expenses and financial goals.
              </p>

              <p>
                Understanding payroll deductions may help workers improve retirement planning, debt repayment strategies, emergency savings, and investment decisions.
              </p>

              <p>
                Overtime earnings, bonuses, retirement contributions, and tax withholding adjustments may significantly affect overall paycheck income and long-term financial flexibility.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Paycheck Planning

              </h3>

              <p>
                Suppose an employee works overtime hours while receiving hourly wages and paying payroll taxes. Understanding net paycheck income may help improve monthly budgeting, housing decisions, savings goals, and financial stability.
              </p>

              <p>
                Employees often use paycheck planning to estimate future income growth, retirement contributions, and long-term wealth-building strategies.
              </p>

              <p>
                Long-term financial planning frequently combines income growth, tax optimization, disciplined budgeting, and investment contributions to improve financial independence over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Paycheck Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate take-home paycheck income.
                </li>

                <li>
                  Understand payroll taxes and deductions.
                </li>

                <li>
                  Calculate overtime earnings.
                </li>

                <li>
                  Improve budgeting and financial planning.
                </li>

                <li>
                  Estimate annual and monthly income.
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
                question="What is a paycheck calculator?"
                answer="A paycheck calculator estimates gross pay, payroll taxes, deductions, and take-home income."
              />

              <FaqItem
                question="Why is net pay lower than gross pay?"
                answer="Taxes and payroll deductions reduce the final paycheck amount received."
              />

              <FaqItem
                question="What affects paycheck income?"
                answer="Hourly wages, overtime pay, taxes, deductions, and retirement contributions may affect paycheck income."
              />

              <FaqItem
                question="Why is paycheck planning important?"
                answer="Paycheck planning helps employees improve budgeting, savings goals, and financial management."
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
                  name="Salary Calculator"
                />

                <RelatedTool
                  name="Take Home Pay Calculator"
                />

                <RelatedTool
                  name="Overtime Calculator"
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