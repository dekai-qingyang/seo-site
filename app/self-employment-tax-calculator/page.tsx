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

export default function SelfEmploymentTaxCalculatorPage() {

  const [annualIncome, setAnnualIncome] =
    useState(140000);

  const [businessExpenses, setBusinessExpenses] =
    useState(25000);

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

  const socialSecurityTaxes =
    Math.round(
      taxableIncome *
      0.124
    );

  const medicareTaxes =
    Math.round(
      taxableIncome *
      0.029
    );

  const totalTaxes =
    federalTaxes +
    stateTaxes +
    selfEmploymentTaxes;

  const quarterlyTaxes =
    Math.round(
      totalTaxes / 4
    );

  const netIncome =
    taxableIncome -
    totalTaxes;

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
      name: "Self Employment Taxes",
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

            Self Employment Tax Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Self Employment Tax Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate self-employment taxes,
            Social Security taxes,
            Medicare taxes,
            deductions,
            quarterly tax payments,
            and take-home income projections.

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

              Self Employment Inputs

            </h2>

            <InputField
              label="Annual Self Employment Income"
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
              label="Self Employment Tax Rate (%)"
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
                color="from-violet-600 to-purple-600"
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

              <ChartCard title="Self Employment Tax Breakdown">

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
                      stroke="#8b5cf6"
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

              What Is a Self Employment Tax Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A self employment tax calculator is a financial planning tool used to estimate self-employment taxes, Social Security taxes, Medicare taxes, quarterly tax payments, and take-home income for freelancers, contractors, consultants, creators, and independent business owners.
              </p>

              <p>
                Self-employed individuals are responsible for paying both the employee and employer portions of Social Security and Medicare taxes. Unlike traditional employees, self-employed workers may not have taxes automatically withheld from income, making tax planning especially important.
              </p>

              <p>
                A self employment tax calculator estimates taxable income after business deductions while helping freelancers and contractors understand annual taxes, quarterly payments, and net earnings projections. These calculations may improve budgeting, retirement planning, investment decisions, and long-term financial management.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Self Employment Tax Formula

              </h3>

              <p>
                Taxable Income =
                Self Employment Income -
                Business Expenses
              </p>

              <p>
                Self Employment Taxes =
                Social Security Taxes +
                Medicare Taxes
              </p>

              <p>
                Net Income =
                Taxable Income -
                Total Taxes
              </p>

              <p>
                Example:
                If a freelancer earns $140,000 annually while deducting business expenses, self-employment taxes and federal taxes may substantially reduce net income available for spending and investing.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Self Employment Tax Planning Matters

              </h3>

              <p>
                Self employment tax planning helps independent workers estimate quarterly tax obligations, improve cash flow management, and avoid unexpected tax liabilities throughout the year.
              </p>

              <p>
                Business deductions such as software subscriptions, office equipment, internet costs, travel expenses, advertising costs, and professional services may potentially reduce taxable income.
              </p>

              <p>
                Understanding Social Security taxes and Medicare taxes may also help freelancers improve retirement planning and long-term financial independence strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Self Employment Tax Planning

              </h3>

              <p>
                Suppose a self-employed consultant earns $140,000 annually while deducting legitimate business expenses. Quarterly tax planning may help improve financial stability while reducing the risk of underpayment penalties.
              </p>

              <p>
                Self-employed workers often use tax planning strategies to improve retirement savings, investment growth, debt repayment planning, and emergency fund contributions.
              </p>

              <p>
                Long-term financial planning frequently combines tax optimization, disciplined budgeting, diversified income streams, and investment contributions to improve wealth accumulation over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Self Employment Tax Calculator

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
                  Understand Social Security and Medicare taxes.
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
                question="What is a self employment tax calculator?"
                answer="A self employment tax calculator estimates self-employment taxes, deductions, and take-home income projections."
              />

              <FaqItem
                question="What are self-employment taxes?"
                answer="Self-employment taxes generally include Social Security and Medicare taxes paid by independent workers."
              />

              <FaqItem
                question="Why are quarterly taxes important?"
                answer="Self-employed workers often make quarterly estimated tax payments because taxes may not be automatically withheld."
              />

              <FaqItem
                question="Can business expenses reduce taxable income?"
                answer="Yes. Eligible business deductions may reduce taxable income and overall tax liability."
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
                  name="Freelance Tax Calculator"
                />

                <RelatedTool
                  name="Income Tax Calculator"
                />

                <RelatedTool
                  name="Tax Calculator"
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