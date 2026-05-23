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

export default function FreelanceTaxCalculatorPage() {

  const [annualIncome, setAnnualIncome] =
    useState(120000);

  const [businessExpenses, setBusinessExpenses] =
    useState(20000);

  const [federalTaxRate, setFederalTaxRate] =
    useState(22);

  const [stateTaxRate, setStateTaxRate] =
    useState(5);

  const [selfEmploymentTaxRate, setSelfEmploymentTaxRate] =
    useState(15.3);

  const taxableIncome =
    Math.max(
      0,
      annualIncome -
      businessExpenses
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

  const selfEmploymentTaxes =
    Math.round(
      taxableIncome *
      (selfEmploymentTaxRate / 100)
    );

  const totalTaxes =
    federalTaxes +
    stateTaxes +
    selfEmploymentTaxes;

  const netIncome =
    taxableIncome -
    totalTaxes;

  const quarterlyTaxes =
    Math.round(
      totalTaxes / 4
    );

  const monthlyIncome =
    Math.round(
      netIncome / 12
    );

  const pieData = [
    {
      name: "Net Income",
      value:
        netIncome,
    },
    {
      name: "Federal Taxes",
      value:
        federalTaxes,
    },
    {
      name: "Self-Employment Tax",
      value:
        selfEmploymentTaxes,
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

            Freelance Tax Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Freelance Tax Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate self-employment taxes,
            freelance deductions,
            quarterly tax payments,
            business expenses,
            and take-home freelance income projections.

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

              Freelance Tax Inputs

            </h2>

            <InputField
              label="Annual Freelance Income"
              value={annualIncome}
              onChange={setAnnualIncome}
            />

            <InputField
              label="Business Expenses"
              value={businessExpenses}
              onChange={setBusinessExpenses}
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
              label="Self-Employment Tax Rate (%)"
              value={selfEmploymentTaxRate}
              onChange={setSelfEmploymentTaxRate}
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
                title="Net Income"
                value={`$${netIncome.toLocaleString()}`}
                color="from-emerald-600 to-green-600"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Total Taxes"
                value={`$${totalTaxes.toLocaleString()}`}
                color="from-red-500 to-rose-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Quarterly Taxes"
                value={`$${quarterlyTaxes.toLocaleString()}`}
                color="from-orange-500 to-amber-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Monthly Income"
                value={`$${monthlyIncome.toLocaleString()}`}
                color="from-cyan-500 to-sky-500"
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

              <ChartCard title="Freelance Income Breakdown">

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

                        <Cell fill="#06b6d4" />

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

              What Is a Freelance Tax Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A freelance tax calculator is a financial planning tool used to estimate self-employment taxes, federal taxes, state taxes, quarterly tax payments, and overall take-home income for freelancers, contractors, consultants, creators, and self-employed professionals.
              </p>

              <p>
                Freelancers are generally responsible for paying both employee and employer portions of payroll taxes through self-employment taxes. Unlike traditional employees, freelancers may not have taxes automatically withheld from income, making tax planning especially important.
              </p>

              <p>
                A freelance tax calculator estimates taxable income after business expense deductions while helping independent workers better understand annual taxes, quarterly payments, and net earnings. These calculations may improve budgeting, retirement planning, savings goals, and long-term financial stability.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Freelance Tax Formula

              </h3>

              <p>
                Taxable Income =
                Freelance Income -
                Business Expenses
              </p>

              <p>
                Total Taxes =
                Federal Taxes +
                State Taxes +
                Self-Employment Taxes
              </p>

              <p>
                Net Income =
                Taxable Income -
                Total Taxes
              </p>

              <p>
                Example:
                If a freelancer earns $120,000 annually while deducting business expenses, taxable income and self-employment taxes may differ significantly from gross freelance revenue.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Freelance Tax Planning Matters

              </h3>

              <p>
                Freelance tax planning helps independent workers avoid unexpected tax liabilities, estimate quarterly tax payments, and improve cash flow management throughout the year.
              </p>

              <p>
                Business deductions such as software subscriptions, office expenses, equipment, internet costs, travel expenses, and professional services may potentially reduce taxable income for freelancers and contractors.
              </p>

              <p>
                Understanding self-employment taxes may also help freelancers improve retirement planning, investment strategies, and long-term wealth accumulation goals.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Freelance Tax Planning

              </h3>

              <p>
                Suppose a freelancer earns $120,000 annually while deducting legitimate business expenses. Federal taxes, state taxes, and self-employment taxes may significantly reduce net income, making quarterly planning essential for financial stability.
              </p>

              <p>
                Freelancers often use tax planning strategies to improve retirement contributions, emergency savings, debt repayment planning, and investment growth over time.
              </p>

              <p>
                Long-term financial planning frequently combines income diversification, tax optimization, disciplined budgeting, and investment contributions to improve financial independence.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Freelance Tax Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate self-employment taxes.
                </li>

                <li>
                  Calculate quarterly tax payments.
                </li>

                <li>
                  Understand business deductions.
                </li>

                <li>
                  Improve budgeting and cash flow planning.
                </li>

                <li>
                  Estimate annual take-home income.
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
                question="What is a freelance tax calculator?"
                answer="A freelance tax calculator estimates self-employment taxes, deductions, and take-home freelance income."
              />

              <FaqItem
                question="What are self-employment taxes?"
                answer="Self-employment taxes generally include Social Security and Medicare taxes paid by freelancers and contractors."
              />

              <FaqItem
                question="Why are quarterly taxes important?"
                answer="Freelancers often make quarterly estimated tax payments because taxes may not be automatically withheld."
              />

              <FaqItem
                question="Can freelancers deduct business expenses?"
                answer="Yes. Eligible business expenses may reduce taxable income and overall tax liability."
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
                  name="Income Tax Calculator"
                />

                <RelatedTool
                  name="Tax Calculator"
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