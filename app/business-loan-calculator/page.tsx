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

export default function BusinessLoanCalculatorPage() {

  const [loanAmount, setLoanAmount] =
    useState(250000);

  const [interestRate, setInterestRate] =
    useState(7.5);

  const [loanTerm, setLoanTerm] =
    useState(10);

  const [monthlyRevenue, setMonthlyRevenue] =
    useState(45000);

  const monthlyRate =
    interestRate / 100 / 12;

  const totalPayments =
    loanTerm * 12;

  const monthlyPayment =
    Math.round(
      (
        loanAmount *
        monthlyRate *
        Math.pow(
          1 + monthlyRate,
          totalPayments
        )
      ) /
      (
        Math.pow(
          1 + monthlyRate,
          totalPayments
        ) - 1
      )
    );

  const totalRepayment =
    monthlyPayment *
    totalPayments;

  const totalInterest =
    totalRepayment -
    loanAmount;

  const debtToRevenue =
    (
      (monthlyPayment /
        monthlyRevenue) *
      100
    ).toFixed(1);

  const pieData = [
    {
      name: "Principal",
      value:
        loanAmount,
    },
    {
      name: "Interest",
      value:
        totalInterest,
    },
  ];

  const comparisonData = [
    {
      name: "Loan Amount",
      amount:
        loanAmount,
    },
    {
      name: "Total Repayment",
      amount:
        totalRepayment,
    },
  ];

  const yearlyData = [];

  for (
    let year = 1;
    year <= loanTerm;
    year++
  ) {

    yearlyData.push({
      year: `Y${year}`,
      payment:
        monthlyPayment * 12,
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

            Business Financing Planning

          </div>

          <h1 className="
            text-4xl
            md:text-6xl
            font-black
            text-gray-900
            mb-6
          ">

            Business Loan Calculator

          </h1>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-500
            text-lg
            leading-8
          ">

            Estimate business loan payments,
            interest costs,
            amortization schedules,
            financing expenses,
            and long-term repayment projections.

          </p>

        </div>

        {/* GRID */}

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

              Loan Inputs

            </h2>

            <InputField
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
            />

            <InputField
              label="Interest Rate (%)"
              value={interestRate}
              onChange={setInterestRate}
              prefix=""
            />

            <InputField
              label="Loan Term (Years)"
              value={loanTerm}
              onChange={setLoanTerm}
              prefix=""
            />

            <InputField
              label="Monthly Business Revenue"
              value={monthlyRevenue}
              onChange={setMonthlyRevenue}
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
                title="Monthly Payment"
                value={`$${monthlyPayment.toLocaleString()}`}
                color="from-blue-500 to-cyan-500"
              />

              <SummaryCard
                icon={<Wallet />}
                title="Total Interest"
                value={`$${totalInterest.toLocaleString()}`}
                color="from-red-500 to-rose-500"
              />

              <SummaryCard
                icon={<PiggyBank />}
                title="Total Repayment"
                value={`$${totalRepayment.toLocaleString()}`}
                color="from-violet-500 to-purple-500"
              />

              <SummaryCard
                icon={<TrendingUp />}
                title="Debt Ratio"
                value={`${debtToRevenue}%`}
                color="from-emerald-500 to-green-500"
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

              <ChartCard title="Loan Cost Breakdown">

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

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

              {/* AREA */}

              <ChartCard title="Annual Payment Projection">

                <div className="w-full h-[320px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={yearlyData}
                    >

                      <defs>

                        <linearGradient
                          id="paymentColor"
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

                      <XAxis dataKey="year" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="payment"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#paymentColor)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </ChartCard>

            </div>

            {/* LINE */}

            <ChartCard title="Loan Payment Schedule">

              <div className="w-full h-[360px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={yearlyData}
                  >

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="year" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="payment"
                      stroke="#3b82f6"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>

            {/* BAR */}

            <ChartCard title="Loan vs Total Repayment">

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

              What Is a Business Loan Calculator?

            </h2>

            <div className="
              space-y-7
              text-gray-600
              leading-8
              text-[17px]
            ">

              <p>
                A business loan calculator is a financial planning tool used to estimate monthly loan payments, interest costs, total repayment expenses, and long-term financing obligations for businesses and entrepreneurs.
              </p>

              <p>
                Businesses frequently use loans to finance expansion, equipment purchases, inventory management, operational growth, marketing campaigns, commercial property investments, and working capital needs.
              </p>

              <p>
                A business loan calculator estimates amortization schedules, repayment timelines, and borrowing costs while helping companies evaluate affordability and financial sustainability before taking on debt obligations.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Business Loan Formula

              </h3>

              <p>
                Monthly Payment calculations typically depend on:
              </p>

              <p>
                Loan Amount,
                Interest Rate,
                and Loan Term
              </p>

              <p>
                Total Repayment =
                Monthly Payment ×
                Number of Payments
              </p>

              <p>
                Total Interest =
                Total Repayment -
                Original Loan Amount
              </p>

              <p>
                Example:
                A business borrowing $250,000 over 10 years at a fixed interest rate may pay significant interest costs depending on repayment structure and financing terms.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Why Business Loan Planning Matters

              </h3>

              <p>
                Business loan planning helps companies estimate financing affordability, manage cash flow, and understand long-term debt obligations before committing to major financial decisions.
              </p>

              <p>
                Understanding repayment schedules may help businesses improve budgeting strategies, evaluate profitability targets, and avoid excessive debt burdens.
              </p>

              <p>
                Loan analysis may also help business owners compare lenders, evaluate fixed versus variable interest rates, and improve financial forecasting.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Example of Business Financing Planning

              </h3>

              <p>
                Suppose a company secures financing to expand operations or purchase equipment. Understanding monthly payment obligations and total financing costs may help improve long-term business sustainability and profitability.
              </p>

              <p>
                Businesses often use financing projections for expansion planning, staffing decisions, inventory management, and operational forecasting.
              </p>

              <p>
                Long-term financial success frequently combines disciplined debt management, operational efficiency, strategic growth planning, and strong cash flow management.
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-gray-900
              ">

                Benefits of Using a Business Loan Calculator

              </h3>

              <ul className="
                list-disc
                pl-6
                space-y-3
              ">

                <li>
                  Estimate monthly business loan payments.
                </li>

                <li>
                  Understand total financing costs.
                </li>

                <li>
                  Compare loan repayment scenarios.
                </li>

                <li>
                  Improve business cash flow planning.
                </li>

                <li>
                  Evaluate long-term borrowing affordability.
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
                question="What is a business loan calculator?"
                answer="A business loan calculator estimates monthly loan payments, interest costs, and repayment schedules for commercial financing."
              />

              <FaqItem
                question="Why are business loans important?"
                answer="Business loans may help companies finance expansion, equipment, inventory, operations, and growth initiatives."
              />

              <FaqItem
                question="What affects loan payments?"
                answer="Loan amount, interest rates, repayment terms, and financing structures may affect business loan payments."
              />

              <FaqItem
                question="Why is financing planning important?"
                answer="Financing planning helps businesses improve cash flow management and avoid excessive debt obligations."
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
                  name="Loan Calculator"
                />

                <RelatedTool
                  name="Profit Margin Calculator"
                />

                <RelatedTool
                  name="Break Even Calculator"
                />

              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}

/* COMPONENTS */

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

      <label className="
        block
        mb-3
        font-semibold
        text-gray-700
      ">

        {label}

      </label>

      <div className="relative">

        {prefix && (

          <span className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            font-bold
          ">

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
    <div className={`
      bg-gradient-to-br ${color}
      rounded-3xl
      p-7
      text-white
      shadow-lg
    `}>

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