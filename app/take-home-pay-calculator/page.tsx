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

export default function TakeHomePayCalculatorPage() {

  const [annualSalary, setAnnualSalary] =
    useState(85000);

  const [federalTaxRate, setFederalTaxRate] =
    useState(22);

  const [stateTaxRate, setStateTaxRate] =
    useState(5);

  const [retirementContribution, setRetirementContribution] =
    useState(6000);

  const [healthInsurance, setHealthInsurance] =
    useState(250);

  const federalTaxes =
    Math.round(
      annualSalary *
      (federalTaxRate / 100)
    );

  const stateTaxes =
    Math.round(
      annualSalary *
      (stateTaxRate / 100)
    );

  const insuranceAnnual =
    healthInsurance * 12;

  const totalDeductions =
    federalTaxes +
    stateTaxes +
    retirementContribution +
    insuranceAnnual;

  const netAnnualIncome =
    annualSalary -
    totalDeductions;

  const monthlyTakeHome =
    Math.round(
      netAnnualIncome / 12
    );

  const biweeklyPaycheck =
    Math.round(
      netAnnualIncome / 26
    );

  const pieData = [
    {
      name: "Take Home Pay",
      value:
        netAnnualIncome,
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
    {
      name: "Retirement & Insurance",
      value:
        retirementContribution +
        insuranceAnnual,
    },
  ];

  const comparisonData = [
    {
      name: "Gross Income",
      amount:
        annualSalary,
    },
    {
      name: "Net Income",
      amount:
        netAnnualIncome,
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
            bg-emerald-100
            text-emerald-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Net Income Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Take Home Pay Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate net salary,
            taxes,
            paycheck deductions,
            retirement contributions,
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

              Paycheck Inputs

            </h2>

            <InputField
              label="Annual Salary"
              value={annualSalary}
              onChange={setAnnualSalary}
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
              label="Annual Retirement Contribution"
              value={retirementContribution}
              onChange={setRetirementContribution}
            />

            <InputField
              label="Monthly Health Insurance"
              value={healthInsurance}
              onChange={setHealthInsurance}
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
                title="Net Annual Income"
                value={`$${netAnnualIncome.toLocaleString()}`}
                color="from-emerald-600 to-green-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Monthly Take Home"
                value={`$${monthlyTakeHome.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Biweekly Paycheck"
                value={`$${biweeklyPaycheck.toLocaleString()}`}
                color="from-violet-500 to-purple-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Total Deductions"
                value={`$${totalDeductions.toLocaleString()}`}
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

                        <Cell fill="#10b981" />

                        <Cell fill="#ef4444" />

                        <Cell fill="#f97316" />

                        <Cell fill="#8b5cf6" />

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

            <ChartCard title="Take Home Income Over Time">

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
                      fill="#10b981"
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

              What Is a Take Home Pay Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A take home pay calculator is a financial planning tool used to estimate net income after taxes, retirement contributions, payroll deductions, and insurance expenses. Take-home pay calculations help employees understand how much money is actually available after deductions are removed from gross salary.
              </p>

              <p>
                Gross salary represents total earnings before taxes and payroll deductions. However, employees typically receive lower net income because federal taxes, state taxes, retirement contributions, healthcare premiums, and payroll deductions reduce actual paycheck amounts.
              </p>

              <p>
                A take home pay calculator estimates monthly income, biweekly paychecks, annual net income, and deduction breakdowns. These estimates may help individuals improve budgeting, debt management, savings planning, and financial decision-making.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Take Home Pay Formula

              </h3>

              <p>
                Net Income =
                Gross Salary -
                Taxes -
                Payroll Deductions -
                Insurance Costs -
                Retirement Contributions
              </p>

              <p>
                Example:
                If an employee earns $85,000 annually with federal taxes, state taxes, retirement contributions, and insurance deductions, actual take-home pay may be substantially lower than gross annual salary.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Take Home Pay Matters

              </h3>

              <p>
                Understanding take-home pay is important because actual monthly income determines budgeting capacity, savings potential, housing affordability, and overall financial stability.
              </p>

              <p>
                Employees often focus on gross salary when evaluating job offers, but net paycheck income may provide a more accurate representation of spending and saving power.
              </p>

              <p>
                Payroll deductions may vary significantly depending on tax rates, healthcare plans, retirement contributions, and employer benefits packages.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Take Home Pay Planning

              </h3>

              <p>
                Suppose an employee earns $85,000 annually and contributes to retirement savings while paying federal taxes, state taxes, and monthly health insurance premiums. After deductions, actual monthly take-home pay may be significantly lower than gross salary projections.
              </p>

              <p>
                Understanding paycheck deductions may help improve budgeting decisions, debt repayment planning, retirement investing, and emergency savings strategies.
              </p>

              <p>
                Long-term financial planning often combines salary growth, retirement contributions, investing, and cash flow management to improve financial independence over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Take Home Pay Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate net paycheck income.
                </li>

                <li>
                  Understand tax deductions.
                </li>

                <li>
                  Compare gross vs net salary.
                </li>

                <li>
                  Improve budgeting and cash flow planning.
                </li>

                <li>
                  Estimate retirement contribution impact.
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
                question="What is take-home pay?"
                answer="Take-home pay is the net income remaining after taxes and payroll deductions."
              />

              <FaqItem
                question="Why is net income lower than gross salary?"
                answer="Taxes, retirement contributions, insurance premiums, and payroll deductions reduce gross salary."
              />

              <FaqItem
                question="What deductions affect paychecks?"
                answer="Common paycheck deductions include taxes, retirement contributions, healthcare premiums, and insurance expenses."
              />

              <FaqItem
                question="Why is take-home pay important?"
                answer="Take-home pay determines actual spending, saving, and budgeting capacity."
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
                  name="Hourly Wage Calculator"
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
            focus:border-emerald-500
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