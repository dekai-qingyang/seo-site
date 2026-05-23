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
  DollarSign,
  Wallet,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

export default function HourlyWageCalculatorPage() {

  const [hourlyRate, setHourlyRate] =
    useState(28);

  const [hoursPerWeek, setHoursPerWeek] =
    useState(40);

  const [overtimeHours, setOvertimeHours] =
    useState(5);

  const [weeksPerYear, setWeeksPerYear] =
    useState(52);

  const [taxRate, setTaxRate] =
    useState(20);

  const regularIncome =
    hourlyRate *
    hoursPerWeek *
    weeksPerYear;

  const overtimeIncome =
    hourlyRate *
    1.5 *
    overtimeHours *
    weeksPerYear;

  const grossAnnualIncome =
    Math.round(
      regularIncome +
      overtimeIncome
    );

  const grossMonthlyIncome =
    Math.round(
      grossAnnualIncome / 12
    );

  const estimatedTaxes =
    Math.round(
      grossAnnualIncome *
      (taxRate / 100)
    );

  const takeHomeIncome =
    grossAnnualIncome -
    estimatedTaxes;

  const takeHomeMonthly =
    Math.round(
      takeHomeIncome / 12
    );

  const pieData = [
    {
      name: "Take Home Pay",
      value:
        takeHomeIncome,
    },
    {
      name: "Taxes",
      value:
        estimatedTaxes,
    },
    {
      name: "Overtime Income",
      value:
        Math.round(overtimeIncome),
    },
  ];

  const paycheckData = [
    {
      name: "Gross Income",
      amount:
        grossAnnualIncome,
    },
    {
      name: "Net Income",
      amount:
        takeHomeIncome,
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
        takeHomeMonthly,
    });

  }

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      <section className="max-w-7xl mx-auto px-4 py-12">

        {/* HERO */}

        <div className="text-center mb-14">

          <div className="
            inline-flex
            items-center
            gap-2
            bg-violet-100
            text-violet-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Wage & Paycheck Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Hourly Wage Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate hourly wages,
            overtime pay,
            annual salary,
            tax deductions,
            and monthly take-home income projections.

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

              Wage Inputs

            </h2>

            <InputField
              label="Hourly Wage"
              value={hourlyRate}
              onChange={setHourlyRate}
            />

            <InputField
              label="Hours Per Week"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              prefix=""
            />

            <InputField
              label="Overtime Hours"
              value={overtimeHours}
              onChange={setOvertimeHours}
              prefix=""
            />

            <InputField
              label="Weeks Per Year"
              value={weeksPerYear}
              onChange={setWeeksPerYear}
              prefix=""
            />

            <InputField
              label="Estimated Tax Rate (%)"
              value={taxRate}
              onChange={setTaxRate}
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
                title="Annual Income"
                value={`$${grossAnnualIncome.toLocaleString()}`}
                color="from-violet-600 to-purple-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Monthly Income"
                value={`$${grossMonthlyIncome.toLocaleString()}`}
                color="from-indigo-500 to-blue-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Take Home Pay"
                value={`$${takeHomeIncome.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Overtime Income"
                value={`$${Math.round(overtimeIncome).toLocaleString()}`}
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

                        <Cell fill="#8b5cf6" />

                        <Cell fill="#ef4444" />

                        <Cell fill="#f59e0b" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Monthly Pay Projection">

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

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Take-Home Income Over Time">

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
                      stroke="#8b5cf6"
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
                    data={paycheckData}
                  >

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

              What Is an Hourly Wage Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                An hourly wage calculator is a financial planning tool used to estimate annual salary, overtime income, taxes, and take-home pay based on hourly earnings. Hourly wage calculations are commonly used by employees, freelancers, contractors, and part-time workers to better understand their income potential.
              </p>

              <p>
                Many jobs pay workers by the hour rather than through fixed annual salaries. An hourly wage calculator converts hourly pay rates into monthly and annual income estimates while accounting for overtime hours, taxes, payroll deductions, and work schedules.
              </p>

              <p>
                Income planning is important because gross wages may differ significantly from actual take-home pay after taxes and deductions. Understanding these calculations may help individuals improve budgeting, savings planning, and financial decision-making.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Hourly Wage Formula

              </h3>

              <p>
                Annual Income =
                Hourly Wage ×
                Hours Worked Per Week ×
                Weeks Worked Per Year
              </p>

              <p>
                Overtime Pay =
                Hourly Wage ×
                Overtime Multiplier ×
                Overtime Hours
              </p>

              <p>
                Example:
                If an employee earns $28 hourly and works 40 hours weekly throughout the year, estimated annual income may exceed $58,000 before overtime pay and taxes.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Hourly Wage Planning Matters

              </h3>

              <p>
                Hourly wage planning helps individuals estimate income stability, monthly budgeting capacity, retirement savings potential, and overall financial health.
              </p>

              <p>
                Overtime income may significantly increase total annual earnings depending on industry, work schedule, and overtime compensation rules.
              </p>

              <p>
                Net income calculations may also help workers understand how taxes and deductions affect actual take-home pay available for living expenses, investing, and savings.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Hourly Wage Planning

              </h3>

              <p>
                Suppose a worker earns $28 per hour while regularly working overtime hours each week. Overtime pay may substantially increase annual earnings and improve long-term financial flexibility.
              </p>

              <p>
                Understanding wage breakdowns may help workers compare employment opportunities, negotiate compensation packages, and improve financial planning decisions.
              </p>

              <p>
                Long-term financial planning often combines salary growth, investment contributions, retirement savings, and passive income strategies to improve financial independence over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using an Hourly Wage Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate annual wage projections.
                </li>

                <li>
                  Calculate overtime income.
                </li>

                <li>
                  Compare gross vs net pay.
                </li>

                <li>
                  Understand tax deductions.
                </li>

                <li>
                  Improve budgeting and financial planning.
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
                question="What is an hourly wage calculator?"
                answer="An hourly wage calculator estimates annual earnings, overtime pay, taxes, and take-home income."
              />

              <FaqItem
                question="How is overtime pay calculated?"
                answer="Overtime pay is commonly calculated using a higher hourly rate multiplier for additional hours worked."
              />

              <FaqItem
                question="What is take-home pay?"
                answer="Take-home pay is net income remaining after taxes and payroll deductions."
              />

              <FaqItem
                question="Why are taxes important in wage calculations?"
                answer="Taxes may significantly reduce actual income available for spending and saving."
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
                  name="Budget Calculator"
                />

                <RelatedTool
                  name="Cash Flow Calculator"
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
            focus:border-violet-500
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