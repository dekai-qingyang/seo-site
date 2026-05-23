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

export default function BonusTaxCalculatorPage() {

  const [annualSalary, setAnnualSalary] =
    useState(90000);

  const [bonusAmount, setBonusAmount] =
    useState(15000);

  const [federalTaxRate, setFederalTaxRate] =
    useState(22);

  const [stateTaxRate, setStateTaxRate] =
    useState(5);

  const [retirementContribution, setRetirementContribution] =
    useState(5);

  const federalTaxes =
    Math.round(
      bonusAmount *
      (federalTaxRate / 100)
    );

  const stateTaxes =
    Math.round(
      bonusAmount *
      (stateTaxRate / 100)
    );

  const retirementDeduction =
    Math.round(
      bonusAmount *
      (retirementContribution / 100)
    );

  const totalTaxes =
    federalTaxes +
    stateTaxes +
    retirementDeduction;

  const netBonus =
    bonusAmount -
    totalTaxes;

  const effectiveTaxRate =
    (
      (totalTaxes /
        bonusAmount) *
      100
    ).toFixed(1);

  const updatedAnnualIncome =
    annualSalary + netBonus;

  const monthlyIncome =
    Math.round(
      updatedAnnualIncome / 12
    );

  const pieData = [
    {
      name: "Net Bonus",
      value:
        netBonus,
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
      name: "Retirement",
      value:
        retirementDeduction,
    },
  ];

  const comparisonData = [
    {
      name: "Gross Bonus",
      amount:
        bonusAmount,
    },
    {
      name: "Net Bonus",
      amount:
        netBonus,
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
            bg-yellow-100
            text-yellow-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            mb-5
          ">

            <TrendingUp size={18} />

            Bonus & Tax Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Bonus Tax Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate bonus taxes,
            withholding rates,
            paycheck deductions,
            retirement contributions,
            and net take-home bonus income projections.

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

              Bonus Inputs

            </h2>

            <InputField
              label="Annual Salary"
              value={annualSalary}
              onChange={setAnnualSalary}
            />

            <InputField
              label="Bonus Amount"
              value={bonusAmount}
              onChange={setBonusAmount}
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
              label="Retirement Contribution (%)"
              value={retirementContribution}
              onChange={setRetirementContribution}
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
                title="Net Bonus"
                value={`$${netBonus.toLocaleString()}`}
                color="from-yellow-500 to-amber-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Total Taxes"
                value={`$${totalTaxes.toLocaleString()}`}
                color="from-red-500 to-rose-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Monthly Income"
                value={`$${monthlyIncome.toLocaleString()}`}
                color="from-emerald-500 to-green-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Effective Tax Rate"
                value={`${effectiveTaxRate}%`}
                color="from-blue-500 to-cyan-500"
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

              <ChartCard title="Bonus Tax Breakdown">

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

                        <Cell fill="#facc15" />

                        <Cell fill="#ef4444" />

                        <Cell fill="#f97316" />

                        <Cell fill="#10b981" />

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
                            stopColor="#facc15"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#facc15"
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
                        stroke="#facc15"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Income Growth Over Time">

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
                      stroke="#facc15"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Gross vs Net Bonus">

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
                      fill="#facc15"
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

              What Is a Bonus Tax Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A bonus tax calculator is a financial planning tool used to estimate taxes withheld from employee bonuses, commissions, incentives, and supplemental income payments. Bonus tax calculations help employees understand how much of a bonus payment may actually be received after federal taxes, state taxes, payroll deductions, and retirement contributions.
              </p>

              <p>
                Employers often apply different withholding methods to bonus income compared with regular wages. Supplemental income such as year-end bonuses, signing bonuses, performance incentives, and commissions may be taxed at higher withholding rates depending on payroll methods and tax regulations.
              </p>

              <p>
                A bonus tax calculator estimates net bonus income after deductions while helping employees better understand take-home pay and overall compensation planning. These calculations may help improve budgeting, tax planning, retirement investing, and savings strategies.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Bonus Tax Formula

              </h3>

              <p>
                Net Bonus =
                Bonus Amount -
                Federal Taxes -
                State Taxes -
                Payroll Deductions
              </p>

              <p>
                Total Bonus Taxes =
                Federal Tax Withholding +
                State Tax Withholding +
                Retirement Contributions
              </p>

              <p>
                Example:
                If an employee receives a $15,000 annual bonus while paying federal taxes, state taxes, and retirement deductions, actual take-home bonus income may be significantly lower than the original gross bonus amount.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Bonus Tax Planning Matters

              </h3>

              <p>
                Bonus tax planning helps employees estimate net compensation, avoid unexpected tax liabilities, and improve financial decision-making. Supplemental income may affect overall annual taxes, retirement contributions, and long-term financial goals.
              </p>

              <p>
                Understanding bonus withholding rates may help employees improve budgeting, debt repayment strategies, emergency savings planning, and retirement investing decisions.
              </p>

              <p>
                Employees may also use bonus income for investments, mortgage payments, travel expenses, or long-term wealth-building strategies depending on personal financial priorities.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Bonus Income Planning

              </h3>

              <p>
                Suppose an employee earns a $15,000 annual performance bonus while contributing a percentage toward retirement savings. Federal and state taxes may substantially reduce actual take-home pay, making bonus planning important for accurate budgeting.
              </p>

              <p>
                Understanding bonus taxation may help improve financial flexibility, optimize retirement contributions, and support long-term financial independence goals.
              </p>

              <p>
                Long-term financial planning often combines salary growth, investment contributions, tax optimization, and disciplined spending habits to improve financial stability over time.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Bonus Tax Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate take-home bonus income.
                </li>

                <li>
                  Understand bonus withholding taxes.
                </li>

                <li>
                  Compare gross vs net bonus payments.
                </li>

                <li>
                  Improve budgeting and compensation planning.
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
                question="What is a bonus tax calculator?"
                answer="A bonus tax calculator estimates taxes withheld from bonuses and supplemental income."
              />

              <FaqItem
                question="Why are bonuses taxed differently?"
                answer="Bonuses are often classified as supplemental income and may use different withholding methods."
              />

              <FaqItem
                question="What deductions affect bonus pay?"
                answer="Federal taxes, state taxes, payroll deductions, and retirement contributions may affect net bonus income."
              />

              <FaqItem
                question="Why is net bonus income lower than gross bonus pay?"
                answer="Taxes and payroll deductions reduce the final take-home bonus amount."
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
                  name="Take Home Pay Calculator"
                />

                <RelatedTool
                  name="Salary Calculator"
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
            focus:border-yellow-500
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