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

export default function SalaryCalculatorPage() {

  const [hourlyRate, setHourlyRate] =
    useState(35);

  const [hoursPerWeek, setHoursPerWeek] =
    useState(40);

  const [weeksPerYear, setWeeksPerYear] =
    useState(52);

  const [taxRate, setTaxRate] =
    useState(22);

  const [otherDeductions, setOtherDeductions] =
    useState(500);

  const annualSalary = useMemo(() => {

    return Math.round(
      hourlyRate *
      hoursPerWeek *
      weeksPerYear
    );

  }, [
    hourlyRate,
    hoursPerWeek,
    weeksPerYear,
  ]);

  const monthlySalary =
    Math.round(
      annualSalary / 12
    );

  const estimatedTaxes =
    Math.round(
      annualSalary *
      (taxRate / 100)
    );

  const annualDeductions =
    otherDeductions * 12;

  const netAnnualIncome =
    annualSalary -
    estimatedTaxes -
    annualDeductions;

  const netMonthlyIncome =
    Math.round(
      netAnnualIncome / 12
    );

  const pieData = [
    {
      name: "Take Home Pay",
      value:
        netAnnualIncome,
    },
    {
      name: "Taxes",
      value:
        estimatedTaxes,
    },
    {
      name: "Deductions",
      value:
        annualDeductions,
    },
  ];

  const paycheckData = [
    {
      name: "Gross Salary",
      amount:
        annualSalary,
    },
    {
      name: "Net Income",
      amount:
        netAnnualIncome,
    },
  ];

  const monthlyProjection = [];

  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    monthlyProjection.push({
      month: `M${month}`,
      income:
        netMonthlyIncome,
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
            bg-sky-100
            text-sky-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Income & Paycheck Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Salary Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate annual salary,
            monthly income,
            hourly wages,
            tax deductions,
            and take-home pay projections.

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

              Salary Inputs

            </h2>

            <InputField
              label="Hourly Rate"
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

            <InputField
              label="Monthly Deductions"
              value={otherDeductions}
              onChange={setOtherDeductions}
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
                title="Annual Salary"
                value={`$${annualSalary.toLocaleString()}`}
                color="from-sky-600 to-blue-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Monthly Income"
                value={`$${monthlySalary.toLocaleString()}`}
                color="from-indigo-500 to-violet-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Net Annual Income"
                value={`$${netAnnualIncome.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Take Home Pay"
                value={`$${netMonthlyIncome.toLocaleString()}`}
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

                        <Cell fill="#0ea5e9" />

                        <Cell fill="#ef4444" />

                        <Cell fill="#f59e0b" />

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
                      data={monthlyProjection}
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
                            stopColor="#0ea5e9"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#0ea5e9"
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
                        stroke="#0ea5e9"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Income Over Time">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={monthlyProjection}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#0ea5e9"
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
                    data={paycheckData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="amount"
                      fill="#0ea5e9"
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

              What Is a Salary Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A salary calculator is a financial planning tool used to estimate annual salary, monthly income, hourly wages, taxes, deductions, and net take-home pay. Salary calculations help employees, freelancers, and business professionals better understand their overall income and financial situation.
              </p>

              <p>
                Salary calculators commonly convert hourly wages into annual salary projections while accounting for work hours, weeks worked per year, taxes, insurance deductions, and other payroll expenses. These estimates may help individuals compare job offers, budget expenses, and plan financial goals more effectively.
              </p>

              <p>
                Income planning is important because gross salary does not always reflect actual take-home pay. Taxes and deductions may significantly reduce net monthly income available for living expenses, savings, and investments.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Salary Formula

              </h3>

              <p>
                Annual Salary =
                Hourly Rate ×
                Hours Per Week ×
                Weeks Per Year
              </p>

              <p>
                Net Income =
                Gross Salary -
                Taxes -
                Payroll Deductions
              </p>

              <p>
                Example:
                If an employee earns $35 per hour, works 40 hours weekly, and works 52 weeks annually, estimated gross annual salary may exceed $70,000 before taxes and deductions.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Salary Planning Matters

              </h3>

              <p>
                Salary planning helps individuals understand cash flow, budgeting capacity, debt affordability, retirement savings potential, and long-term financial goals.
              </p>

              <p>
                Net income calculations may help employees determine how much money remains available after payroll taxes, retirement contributions, healthcare deductions, and insurance expenses.
              </p>

              <p>
                Comparing gross salary with take-home pay also helps individuals evaluate job opportunities and negotiate compensation packages more effectively.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Salary Planning

              </h3>

              <p>
                Suppose an employee earns $35 hourly while working full-time throughout the year. After taxes and payroll deductions, actual take-home pay may be significantly lower than gross salary estimates.
              </p>

              <p>
                Understanding salary breakdowns may help improve budgeting, emergency savings planning, retirement investing, and debt management decisions.
              </p>

              <p>
                Long-term financial planning often combines salary growth, investment income, retirement savings, and passive income strategies to improve financial stability over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Salary Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate annual salary projections.
                </li>

                <li>
                  Calculate monthly take-home income.
                </li>

                <li>
                  Compare gross vs net income.
                </li>

                <li>
                  Understand payroll deductions.
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
                question="What is a salary calculator?"
                answer="A salary calculator estimates annual income, taxes, deductions, and take-home pay."
              />

              <FaqItem
                question="What is gross salary?"
                answer="Gross salary is total earnings before taxes and payroll deductions."
              />

              <FaqItem
                question="What is net income?"
                answer="Net income is take-home pay remaining after taxes and deductions."
              />

              <FaqItem
                question="Why are taxes important in salary calculations?"
                answer="Taxes may significantly reduce actual take-home income available for spending and saving."
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
                  name="Budget Calculator"
                />

                <RelatedTool
                  name="Cash Flow Calculator"
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
            focus:border-sky-500
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