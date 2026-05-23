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

export default function TaxCalculatorPage() {

  const [annualIncome, setAnnualIncome] =
    useState(95000);

  const [federalTaxRate, setFederalTaxRate] =
    useState(22);

  const [stateTaxRate, setStateTaxRate] =
    useState(5);

  const [deductions, setDeductions] =
    useState(12000);

  const [taxCredits, setTaxCredits] =
    useState(2000);

  const taxableIncome =
    Math.max(
      0,
      annualIncome - deductions
    );

  const federalTaxes =
    Math.round(
      taxableIncome *
      (federalTaxRate / 100)
    );

  const stateTaxes =
    Math.round(
      taxableIncome *
      (stateTaxRate / 100)
    );

  const totalTaxes =
    Math.max(
      0,
      federalTaxes +
      stateTaxes -
      taxCredits
    );

  const effectiveTaxRate =
    (
      (totalTaxes /
        annualIncome) *
      100
    ).toFixed(1);

  const netIncome =
    annualIncome -
    totalTaxes;

  const monthlyTakeHome =
    Math.round(
      netIncome / 12
    );

  const pieData = [
    {
      name: "Take Home Income",
      value:
        netIncome,
    },
    {
      name: "Federal Taxes",
      value:
        federalTaxes,
    },
    {
      name: "State Taxes",
      value:
        stateTaxes,
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
        monthlyTakeHome,
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
            bg-rose-100
            text-rose-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Income Tax Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Tax Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate federal taxes,
            state taxes,
            deductions,
            tax credits,
            refunds,
            and take-home income projections.

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

              Tax Inputs

            </h2>

            <InputField
              label="Annual Income"
              value={annualIncome}
              onChange={setAnnualIncome}
            />

            <InputField
              label="Federal Tax Rate (%)"
              value={federalTaxRate}
              onChange={setFederalTaxRate}
              prefix=""
            />

            <InputField
              label="State Tax Rate (%)"
              value={stateTaxRate}
              onChange={setStateTaxRate}
              prefix=""
            />

            <InputField
              label="Tax Deductions"
              value={deductions}
              onChange={setDeductions}
            />

            <InputField
              label="Tax Credits"
              value={taxCredits}
              onChange={setTaxCredits}
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
                title="Total Taxes"
                value={`$${totalTaxes.toLocaleString()}`}
                color="from-rose-600 to-red-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Net Income"
                value={`$${netIncome.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Monthly Take Home"
                value={`$${monthlyTakeHome.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Effective Tax Rate"
                value={`${effectiveTaxRate}%`}
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

              <ChartCard title="Tax Breakdown">

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

                        <Cell fill="#10b981" />

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
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#10b981"
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
                        stroke="#10b981"
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
                      stroke="#10b981"
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
                      fill="#ef4444"
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

              What Is a Tax Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A tax calculator is a financial planning tool used to estimate federal taxes, state taxes, deductions, tax credits, and overall take-home income. Tax calculations help individuals understand how much of their income may be owed in taxes and how deductions may affect overall tax liability.
              </p>

              <p>
                Income taxes are one of the largest financial expenses for many individuals and households. Federal income taxes, state income taxes, payroll taxes, and other deductions may significantly reduce net income available for spending and saving.
              </p>

              <p>
                A tax calculator estimates taxable income, tax obligations, deductions, credits, and net annual income based on salary and financial inputs. These estimates may help individuals improve budgeting, retirement planning, and financial decision-making.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Tax Formula

              </h3>

              <p>
                Taxable Income =
                Gross Income -
                Tax Deductions
              </p>

              <p>
                Total Taxes =
                Federal Taxes +
                State Taxes -
                Tax Credits
              </p>

              <p>
                Net Income =
                Gross Income -
                Total Taxes
              </p>

              <p>
                Example:
                If an employee earns $95,000 annually with deductions and tax credits, actual tax liability may be significantly lower than taxes calculated from gross salary alone.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Tax Planning Matters

              </h3>

              <p>
                Tax planning helps individuals estimate annual tax obligations, optimize deductions, improve retirement savings strategies, and increase overall financial efficiency.
              </p>

              <p>
                Tax deductions may reduce taxable income, while tax credits may directly reduce taxes owed. Retirement account contributions, mortgage interest, healthcare expenses, and education costs may potentially affect overall tax liability.
              </p>

              <p>
                Understanding effective tax rates may also help individuals improve investment planning, salary negotiations, and long-term wealth-building strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Tax Planning

              </h3>

              <p>
                Suppose an employee earns $95,000 annually while contributing to retirement savings and qualifying for deductions and tax credits. These financial strategies may potentially reduce taxable income and improve overall take-home pay.
              </p>

              <p>
                Tax planning may also help improve budgeting, investment contributions, emergency savings goals, and long-term financial independence strategies.
              </p>

              <p>
                Long-term financial planning often combines income growth, retirement investing, tax optimization, and cash flow management to improve financial stability over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Tax Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate annual tax liability.
                </li>

                <li>
                  Calculate effective tax rates.
                </li>

                <li>
                  Compare gross vs net income.
                </li>

                <li>
                  Understand deductions and credits.
                </li>

                <li>
                  Improve budgeting and tax planning.
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
                question="What is a tax calculator?"
                answer="A tax calculator estimates taxes owed, deductions, tax credits, and take-home income."
              />

              <FaqItem
                question="What is taxable income?"
                answer="Taxable income is income remaining after eligible deductions are subtracted from gross income."
              />

              <FaqItem
                question="What is an effective tax rate?"
                answer="An effective tax rate is the percentage of total income paid in taxes."
              />

              <FaqItem
                question="Why are tax deductions important?"
                answer="Tax deductions may reduce taxable income and lower overall tax liability."
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
                  name="Take Home Pay Calculator"
                />

                <RelatedTool
                  name="Salary Calculator"
                />

                <RelatedTool
                  name="Budget Calculator"
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
            focus:border-rose-500
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