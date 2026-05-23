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

export default function CommissionCalculatorPage() {

  const [baseSalary, setBaseSalary] =
    useState(50000);

  const [salesAmount, setSalesAmount] =
    useState(120000);

  const [commissionRate, setCommissionRate] =
    useState(8);

  const [bonusAmount, setBonusAmount] =
    useState(5000);

  const [taxRate, setTaxRate] =
    useState(22);

  const commissionIncome =
    Math.round(
      salesAmount *
      (commissionRate / 100)
    );

  const grossIncome =
    baseSalary +
    commissionIncome +
    bonusAmount;

  const estimatedTaxes =
    Math.round(
      grossIncome *
      (taxRate / 100)
    );

  const netIncome =
    grossIncome -
    estimatedTaxes;

  const monthlyIncome =
    Math.round(
      netIncome / 12
    );

  const pieData = [
    {
      name: "Base Salary",
      value:
        baseSalary,
    },
    {
      name: "Commission",
      value:
        commissionIncome,
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
        grossIncome,
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

            Sales & Earnings Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Commission Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate commission earnings,
            sales income,
            bonuses,
            taxes,
            and annual take-home compensation projections.

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

              Commission Inputs

            </h2>

            <InputField
              label="Base Salary"
              value={baseSalary}
              onChange={setBaseSalary}
            />

            <InputField
              label="Total Sales Amount"
              value={salesAmount}
              onChange={setSalesAmount}
            />

            <InputField
              label="Commission Rate (%)"
              value={commissionRate}
              onChange={setCommissionRate}
              prefix=""
            />

            <InputField
              label="Bonus Income"
              value={bonusAmount}
              onChange={setBonusAmount}
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
                title="Commission Income"
                value={`$${commissionIncome.toLocaleString()}`}
                color="from-cyan-600 to-sky-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Gross Income"
                value={`$${grossIncome.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Net Income"
                value={`$${netIncome.toLocaleString()}`}
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

                        <Cell fill="#06b6d4" />

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

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#06b6d4"
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
                      stroke="#06b6d4"
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

              What Is a Commission Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A commission calculator is a financial planning tool used to estimate sales commissions, incentive pay, bonus income, taxes, and overall compensation projections. Commission-based earnings are commonly used in sales, real estate, insurance, recruiting, finance, and other performance-based industries.
              </p>

              <p>
                Many employees receive a combination of base salary and commission income. Commission earnings are typically calculated as a percentage of total sales revenue, contracts closed, or products sold during a specific period.
              </p>

              <p>
                A commission calculator estimates total earnings, gross compensation, taxes, and take-home income projections. These calculations may help employees better understand income potential, budgeting capacity, and long-term financial planning strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Commission Formula

              </h3>

              <p>
                Commission Income =
                Total Sales ×
                Commission Rate
              </p>

              <p>
                Gross Compensation =
                Base Salary +
                Commission Income +
                Bonus Income
              </p>

              <p>
                Net Income =
                Gross Compensation -
                Taxes
              </p>

              <p>
                Example:
                If a sales representative generates $120,000 in sales with an 8% commission rate, commission income may exceed $9,000 before taxes and payroll deductions.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Commission Planning Matters

              </h3>

              <p>
                Commission planning helps employees estimate earnings variability, improve budgeting strategies, and understand how performance-based income affects financial stability.
              </p>

              <p>
                Commission income may significantly increase annual earnings potential compared with fixed salary compensation alone. However, variable income may also create budgeting challenges during slower sales periods.
              </p>

              <p>
                Understanding taxes and deductions on commission income may help improve retirement planning, investment strategies, and long-term financial decision-making.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Commission Income Planning

              </h3>

              <p>
                Suppose a salesperson earns a $50,000 base salary while generating commission income from annual sales performance. Additional commission earnings may substantially improve take-home pay and long-term financial flexibility.
              </p>

              <p>
                Commission income may be used for investing, debt repayment, retirement savings, travel goals, or building emergency savings depending on personal financial priorities.
              </p>

              <p>
                Long-term financial planning often combines salary growth, commission income, investment contributions, tax planning, and disciplined budgeting to improve financial independence over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Commission Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate commission-based earnings.
                </li>

                <li>
                  Compare base salary vs commission income.
                </li>

                <li>
                  Calculate taxes and net compensation.
                </li>

                <li>
                  Improve budgeting and income planning.
                </li>

                <li>
                  Understand long-term earning potential.
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
                question="What is a commission calculator?"
                answer="A commission calculator estimates sales commissions, taxes, bonuses, and total take-home earnings."
              />

              <FaqItem
                question="How is commission income calculated?"
                answer="Commission income is commonly calculated as a percentage of total sales revenue."
              />

              <FaqItem
                question="Why is commission planning important?"
                answer="Commission planning helps employees estimate income variability and improve financial planning."
              />

              <FaqItem
                question="Are commissions taxable?"
                answer="Yes. Commission income is generally taxable and may be subject to payroll deductions."
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
                  name="Bonus Tax Calculator"
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