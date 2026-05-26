"use client";

import Link from "next/link";

import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

export default function NetWorthCalculatorPage() {

  const [cashSavings, setCashSavings] = useState(25000);

  const [investments, setInvestments] = useState(120000);

  const [realEstate, setRealEstate] = useState(350000);

  const [retirementAccounts, setRetirementAccounts] = useState(85000);

  const [otherAssets, setOtherAssets] = useState(15000);

  const [mortgageDebt, setMortgageDebt] = useState(220000);

  const [creditCardDebt, setCreditCardDebt] = useState(12000);

  const [studentLoans, setStudentLoans] = useState(18000);

  const [otherDebt, setOtherDebt] = useState(9000);

  const totalAssets =
    cashSavings +
    investments +
    realEstate +
    retirementAccounts +
    otherAssets;

  const totalLiabilities =
    mortgageDebt +
    creditCardDebt +
    studentLoans +
    otherDebt;

  const netWorth =
    totalAssets - totalLiabilities;

  const debtRatio =
    (totalLiabilities / totalAssets) * 100;

  const investmentRatio =
    (
      (
        investments +
        retirementAccounts
      ) / totalAssets
    ) * 100;

  const pieData = [

    {
      name: "Assets",
      value: totalAssets,
    },

    {
      name: "Liabilities",
      value: totalLiabilities,
    },

  ];

  const assetBreakdown = [

    {
      name: "Cash",
      value: cashSavings,
    },

    {
      name: "Investments",
      value: investments,
    },

    {
      name: "Real Estate",
      value: realEstate,
    },

    {
      name: "Retirement",
      value: retirementAccounts,
    },

    {
      name: "Other",
      value: otherAssets,
    },

  ];

  const growthData = useMemo(() => {

    return [

      {
        year: "Year 1",
        value: netWorth * 0.42,
      },

      {
        year: "Year 3",
        value: netWorth * 0.60,
      },

      {
        year: "Year 5",
        value: netWorth * 0.76,
      },

      {
        year: "Year 8",
        value: netWorth * 0.90,
      },

      {
        year: "Today",
        value: netWorth,
      },

    ];

  }, [netWorth]);

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="
          bg-gradient-to-r
          from-violet-900
          via-purple-800
          to-fuchsia-700
          rounded-3xl
          overflow-hidden
          shadow-2xl
          text-white
          mb-6
        ">

          <div className="p-6 lg:p-10">

            <div className="
              inline-flex
              items-center
              rounded-full
              bg-white/10
              px-4
              py-2
              text-sm
              font-semibold
              mb-5
            ">

              Personal Finance & Wealth Tool

            </div>

            <h1 className="
              text-4xl
              lg:text-6xl
              font-black
              mb-5
            ">

              Net Worth Calculator

            </h1>

            <p className="
              text-violet-100
              text-lg
              leading-8
              max-w-3xl
            ">

              Calculate total assets,
              liabilities,
              debt ratios,
              wealth growth,
              and long-term financial health using this free net worth calculator.

            </p>

          </div>

        </div>

        {/* CALCULATOR */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          overflow-hidden
        ">

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-5 lg:p-8 border-r border-slate-200">

              <h2 className="
                text-3xl
                font-black
                mb-8
              ">

                Assets

              </h2>

              <div className="space-y-6">

                <InputField
                  label="Cash & Savings"
                  value={cashSavings}
                  setValue={setCashSavings}
                />

                <InputField
                  label="Investments"
                  value={investments}
                  setValue={setInvestments}
                />

                <InputField
                  label="Real Estate"
                  value={realEstate}
                  setValue={setRealEstate}
                />

                <InputField
                  label="Retirement Accounts"
                  value={retirementAccounts}
                  setValue={setRetirementAccounts}
                />

                <InputField
                  label="Other Assets"
                  value={otherAssets}
                  setValue={setOtherAssets}
                />

              </div>

              <h2 className="
                text-3xl
                font-black
                mt-12
                mb-8
              ">

                Liabilities

              </h2>

              <div className="space-y-6">

                <InputField
                  label="Mortgage Debt"
                  value={mortgageDebt}
                  setValue={setMortgageDebt}
                />

                <InputField
                  label="Credit Card Debt"
                  value={creditCardDebt}
                  setValue={setCreditCardDebt}
                />

                <InputField
                  label="Student Loans"
                  value={studentLoans}
                  setValue={setStudentLoans}
                />

                <InputField
                  label="Other Debt"
                  value={otherDebt}
                  setValue={setOtherDebt}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="
              bg-gradient-to-b
              from-violet-50
              to-white
              p-5
              lg:p-8
            ">

              <div className="
                bg-gradient-to-r
                from-violet-900
                to-fuchsia-700
                rounded-3xl
                p-6
                text-white
                mb-6
              ">

                <div className="text-violet-100 mb-2">
                  Estimated Net Worth
                </div>

                <div className="
                  text-5xl
                  font-black
                ">

                  ${netWorth.toLocaleString()}

                </div>

              </div>

              {/* SUMMARY CARDS */}

              <div className="
                grid
                sm:grid-cols-2
                gap-4
              ">

                <SummaryCard
                  title="Total Assets"
                  value={`$${totalAssets.toLocaleString()}`}
                />

                <SummaryCard
                  title="Total Liabilities"
                  value={`$${totalLiabilities.toLocaleString()}`}
                />

                <SummaryCard
                  title="Debt Ratio"
                  value={`${debtRatio.toFixed(2)}%`}
                />

                <SummaryCard
                  title="Investment Ratio"
                  value={`${investmentRatio.toFixed(2)}%`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            Net Worth Overview

          </h2>

          <div className="
            grid
            lg:grid-cols-2
            gap-10
            items-center
          ">

            <div className="h-[360px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >

                    <Cell fill="#6d28d9" />
                    <Cell fill="#d946ef" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-5">

              <SummaryCard
                title="Assets"
                value={`$${totalAssets.toLocaleString()}`}
              />

              <SummaryCard
                title="Liabilities"
                value={`$${totalLiabilities.toLocaleString()}`}
              />

              <SummaryCard
                title="Net Worth"
                value={`$${netWorth.toLocaleString()}`}
              />

            </div>

          </div>

        </div>

      </div>

    </main>

  );
}

function InputField({
  label,
  value,
  setValue,
}: any) {

  return (

    <div>

      <label className="
        block
        text-sm
        font-semibold
        mb-2
        text-slate-700
      ">

        {label}

      </label>

      <div className="relative">

        <span className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-700
        ">

          $

        </span>

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className="
            w-full
            border
            border-slate-200
            rounded-2xl
            py-4
            pl-10
            pr-4
            bg-white
            text-lg
            font-semibold
          "
        />

      </div>

    </div>

  );

}

function SummaryCard({
  title,
  value,
}: any) {

  return (

    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
    ">

      <div className="
        text-slate-600
        mb-2
      ">

        {title}

      </div>

      <div className="
        text-2xl
        font-black
      ">

        {value}

      </div>

    </div>

  );

}