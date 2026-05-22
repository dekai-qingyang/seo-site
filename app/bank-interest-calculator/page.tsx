"use client";

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
  Legend,
  AreaChart,
  Area,
} from "recharts";

export default function BankInterestCalculator() {

  const [initialDeposit, setInitialDeposit] = useState(10000);

  const [monthlyContribution, setMonthlyContribution] = useState(300);

  const [interestRate, setInterestRate] = useState(4.2);

  const [years, setYears] = useState(10);

  const [compoundFrequency, setCompoundFrequency] = useState(12);

  const monthlyRate =
    interestRate / 100 / 12;

  const totalMonths =
    years * 12;

  const futureValue =
    initialDeposit *
      Math.pow(
        1 + monthlyRate,
        totalMonths
      ) +
    monthlyContribution *
      (
        (
          Math.pow(
            1 + monthlyRate,
            totalMonths
          ) - 1
        ) / monthlyRate
      );

  const totalContributions =
    initialDeposit +
    monthlyContribution * totalMonths;

  const totalInterest =
    futureValue -
    totalContributions;

  const apy =
    (
      Math.pow(
        1 +
          (
            interestRate /
            100 /
            compoundFrequency
          ),
        compoundFrequency
      ) - 1
    ) * 100;

  const growthData = useMemo(() => {

    const data = [];

    for (
      let year = 1;
      year <= years;
      year++
    ) {

      const currentMonths =
        year * 12;

      const value =
        initialDeposit *
          Math.pow(
            1 + monthlyRate,
            currentMonths
          ) +
        monthlyContribution *
          (
            (
              Math.pow(
                1 + monthlyRate,
                currentMonths
              ) - 1
            ) / monthlyRate
          );

      data.push({
        year: `Year ${year}`,
        balance: Number(
          value.toFixed(0)
        ),
      });

    }

    return data;

  }, [
    initialDeposit,
    monthlyContribution,
    monthlyRate,
    years,
  ]);

  const pieData = [
    {
      name: "Deposits",
      value: totalContributions,
    },

    {
      name: "Interest Earned",
      value: totalInterest,
    },
  ];

  const compareData = [
    {
      name: "Deposits",
      value: totalContributions,
    },

    {
      name: "Interest",
      value: totalInterest,
    },

    {
      name: "Future Balance",
      value: futureValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-indigo-900 to-blue-500 px-6 py-8 text-white">

            <div className="flex flex-wrap gap-3 mb-5">

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Updated 2026
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Compound Interest Tool
              </div>

            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Bank Interest Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-4xl leading-8">
              Estimate bank savings growth,
              compound interest earnings,
              APY returns,
              and future account balances using this advanced bank interest calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Initial Deposit"
                  value={initialDeposit}
                  setValue={setInitialDeposit}
                  prefix="$"
                />

                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  setValue={setMonthlyContribution}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Savings Period"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Compound Frequency
                  </label>

                  <select
                    value={compoundFrequency}
                    onChange={(e) =>
                      setCompoundFrequency(
                        Number(e.target.value)
                      )
                    }
                    className="w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white text-black font-bold text-lg"
                  >

                    <option value={1}>
                      Annually
                    </option>

                    <option value={4}>
                      Quarterly
                    </option>

                    <option value={12}>
                      Monthly
                    </option>

                    <option value={365}>
                      Daily
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-900 to-blue-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Future Balance
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Interest Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Deposits"
                    value={`$${totalContributions.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Earned"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated APY"
                    value={`${apy.toFixed(2)}%`}
                  />

                  <SummaryRow
                    label="Future Balance"
                    value={`$${futureValue.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <SummaryCard
            title="Initial Deposit"
            value={`$${initialDeposit.toFixed(0)}`}
          />

          <SummaryCard
            title="Total Deposits"
            value={`$${totalContributions.toFixed(0)}`}
          />

          <SummaryCard
            title="Interest Earned"
            value={`$${totalInterest.toFixed(0)}`}
          />

          <SummaryCard
            title="APY"
            value={`${apy.toFixed(2)}%`}
          />

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Deposit vs Interest Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#1e3a8a" />
                    <Cell fill="#3b82f6" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Total Deposits"
                value={`$${totalContributions.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Earnings"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Projected Balance"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Interest Growth Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AREA CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Compound Interest Accumulation
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <AreaChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  fill="#93c5fd"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Savings Comparison
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <BarChart data={compareData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Bank Interest Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A bank interest calculator helps estimate future savings balances,
              compound interest earnings,
              APY growth,
              and long-term account performance.
              Banks and financial institutions commonly offer savings products that generate interest income over time.
            </p>

            <p>
              Savers use interest-bearing accounts for emergency funds,
              retirement preparation,
              education savings,
              short-term investing,
              and general financial planning.
              Compound interest can significantly increase total account value over long periods.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Bank Interest?
            </h3>

            <p>
              Bank interest refers to money earned on deposited funds held within savings accounts,
              money market accounts,
              certificates of deposit,
              or other interest-bearing financial products.
            </p>

            <p>
              Financial institutions pay interest as compensation for holding deposited funds,
              while depositors benefit from gradual account growth over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Compound Interest Works
            </h3>

            <p>
              Compound interest allows interest earnings to generate additional interest over time.
              This creates accelerating account growth because future returns are earned on both original deposits and previous interest.
            </p>

            <p>
              More frequent compounding schedules generally produce larger long-term balances.
              Daily compounding,
              monthly compounding,
              and quarterly compounding are common structures used by banks.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Bank Interest Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                FV = P(1+r)^n + PMT × [((1+r)^n - 1) / r]
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                FV = Future Value
              </li>

              <li>
                P = Initial Deposit
              </li>

              <li>
                r = Interest Rate
              </li>

              <li>
                n = Number of Periods
              </li>

              <li>
                PMT = Monthly Contributions
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              APY vs Interest Rate
            </h3>

            <p>
              APY,
              or Annual Percentage Yield,
              measures the effective annual return after accounting for compound interest.
              APY provides a more accurate estimate of savings growth compared to nominal interest rates alone.
            </p>

            <p>
              Savers commonly compare APYs across savings accounts,
              CDs,
              money market accounts,
              and online banking platforms when selecting financial products.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Interest-Bearing Accounts
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Stable long-term savings growth
              </li>

              <li>
                Lower investment risk
              </li>

              <li>
                Daily liquidity and cash access
              </li>

              <li>
                Compound interest accumulation
              </li>

              <li>
                Predictable account growth
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks and Limitations
            </h3>

            <p>
              Although bank savings products are generally considered safe,
              inflation may reduce real purchasing power over time.
              Interest rates may also fluctuate depending on economic conditions and central bank policy.
            </p>

            <p>
              Low-interest environments can reduce long-term growth potential,
              especially when inflation rates exceed savings yields.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Savings Strategies
            </h3>

            <p>
              Many savers maximize long-term growth by combining regular monthly contributions with high APY savings accounts.
              Automatic deposits and consistent savings habits can significantly increase wealth accumulation over time.
            </p>

            <p>
              Online banks frequently offer more competitive interest rates than traditional brick-and-mortar institutions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenarios
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Emergency Savings
                </h4>

                <p>
                  A saver deposits $10,000 into a high-interest account while contributing $300 monthly at 4.2% annual interest.
                  Compound interest steadily increases total account growth over time.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — Long-Term Wealth Building
                </h4>

                <p>
                  Long-term savers frequently combine monthly deposits and compound interest to gradually build financial security and cash reserves.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is compound interest?"
                answer="Compound interest allows earned interest to generate additional interest over time, increasing long-term account growth."
              />

              <FaqItem
                question="What does APY mean?"
                answer="APY stands for Annual Percentage Yield and reflects the effective yearly return after compounding."
              />

              <FaqItem
                question="Are bank savings accounts safe?"
                answer="Savings accounts are generally considered low-risk financial products designed for capital preservation and liquidity."
              />

              <FaqItem
                question="How often do banks compound interest?"
                answer="Banks may compound interest daily, monthly, quarterly, or annually depending on the account structure."
              />

              <FaqItem
                question="Can interest rates change?"
                answer="Yes. Savings account interest rates may fluctuate depending on economic conditions and bank policies."
              />

            </div>

          </div>

        </section>

        {/* RELATED TOOLS */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Related Calculators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              {
                title: "High Yield Savings Calculator",
                link: "/high-yield-savings-calculator",
              },

              {
                title: "CD Calculator",
                link: "/cd-calculator",
              },

              {
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
              },

              {
                title: "Savings Calculator",
                link: "/savings-calculator",
              },

              {
                title: "Future Value Calculator",
                link: "/future-value-calculator",
              },

              {
                title: "Emergency Fund Calculator",
                link: "/emergency-fund-calculator",
              },

            ].map((item) => (

              <a
                key={item.link}
                href={item.link}
                className="border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition"
              >

                <div className="font-bold text-lg text-slate-900">
                  {item.title}
                </div>

              </a>

            ))}

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
  prefix,
  suffix,
}: any) {

  return (

    <div>

      <label className="block text-sm font-bold mb-2 text-slate-800">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className={`w-full border border-slate-200 rounded-2xl py-3 bg-white text-black font-bold text-lg ${
            prefix ? "pl-10" : "pl-4"
          } ${suffix ? "pr-20" : "pr-4"}`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold text-sm">
            {suffix}
          </span>
        )}

      </div>

    </div>

  );

}

function SummaryRow({
  label,
  value,
}: any) {

  return (

    <div className="px-6 py-4">

      <div className="flex items-center justify-between">

        <span className="text-slate-600 font-semibold">
          {label}
        </span>

        <span className="font-black text-slate-900">
          {value}
        </span>

      </div>

    </div>

  );

}

function SummaryCard({
  title,
  value,
}: any) {

  return (

    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">

      <div className="text-slate-600 mb-2 font-semibold">
        {title}
      </div>

      <div className="text-3xl font-black tracking-tight text-slate-900">
        {value}
      </div>

    </div>

  );

}

function FaqItem({
  question,
  answer,
}: any) {

  return (

    <div className="border rounded-2xl p-6">

      <h3 className="font-black text-xl mb-3 text-slate-900">
        {question}
      </h3>

      <p className="text-slate-700 leading-8">
        {answer}
      </p>

    </div>

  );

}