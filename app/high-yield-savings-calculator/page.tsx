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

export default function HighYieldSavingsCalculator() {

  const [initialDeposit, setInitialDeposit] = useState(10000);

  const [monthlyContribution, setMonthlyContribution] = useState(500);

  const [interestRate, setInterestRate] = useState(4.75);

  const [years, setYears] = useState(10);

  const [compoundFrequency, setCompoundFrequency] = useState(12);

  const monthlyRate =
    interestRate / 100 / 12;

  const months =
    years * 12;

  const futureValue =
    initialDeposit *
      Math.pow(
        1 + monthlyRate,
        months
      ) +
    monthlyContribution *
      (
        (
          Math.pow(
            1 + monthlyRate,
            months
          ) - 1
        ) / monthlyRate
      );

  const totalContributions =
    initialDeposit +
    monthlyContribution * months;

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
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Interest Earned",
      value: totalInterest,
    },
  ];

  const compareData = [
    {
      name: "Contributions",
      value: totalContributions,
    },

    {
      name: "Interest",
      value: totalInterest,
    },

    {
      name: "Future Value",
      value: futureValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-cyan-900 to-blue-500 px-6 py-8 text-white">

            <div className="flex flex-wrap gap-3 mb-5">

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Updated 2026
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                APY Growth Tool
              </div>

            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              High Yield Savings Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-4xl leading-8">
              Estimate high yield savings account growth,
              APY returns,
              monthly compound interest,
              and future balances using this advanced HYSA calculator.
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

            <div className="bg-gradient-to-b from-cyan-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-cyan-900 to-blue-500 rounded-3xl p-6 text-white mb-6">

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
                    Savings Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Contributions"
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
                    label="Future Value"
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
            title="Total Contributions"
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
            Savings vs Interest Breakdown
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

                    <Cell fill="#0f172a" />
                    <Cell fill="#0ea5e9" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Contributions"
                value={`$${totalContributions.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Interest"
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
            High Yield Savings Growth
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
                  stroke="#0ea5e9"
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
                  stroke="#0284c7"
                  fill="#7dd3fc"
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
                  fill="#0284c7"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            High Yield Savings Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A high yield savings calculator helps estimate future account balances,
              APY earnings,
              compound interest growth,
              and long-term savings accumulation.
              High yield savings accounts,
              commonly called HYSAs,
              typically offer significantly higher interest rates than traditional savings accounts.
            </p>

            <p>
              Investors and savers use high yield savings accounts for emergency funds,
              short-term savings goals,
              vacation savings,
              house down payments,
              and conservative cash management strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is a High Yield Savings Account?
            </h3>

            <p>
              A high yield savings account is a deposit account that pays a higher annual percentage yield compared to standard savings accounts.
              Online banks and digital financial institutions frequently provide competitive APYs because they operate with lower overhead costs.
            </p>

            <p>
              Unlike many investment products,
              high yield savings accounts are generally considered low-risk savings vehicles designed for capital preservation and liquidity.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Compound Interest Works
            </h3>

            <p>
              Compound interest allows savers to earn interest on both their original deposits and previously earned interest.
              More frequent compounding schedules can increase total long-term returns.
            </p>

            <p>
              Many high yield savings accounts compound interest daily or monthly,
              which may accelerate account growth over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Savings Formula
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
                PMT = Monthly Contribution
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              APY vs Interest Rate
            </h3>

            <p>
              APY stands for Annual Percentage Yield and reflects the real yearly return after accounting for compound interest.
              APY provides a more accurate measure of growth potential than nominal interest rates alone.
            </p>

            <p>
              Investors often compare APYs across banks,
              savings accounts,
              money market accounts,
              and certificates of deposit when evaluating low-risk savings strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of High Yield Savings Accounts
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Higher interest rates than traditional savings accounts
              </li>

              <li>
                Daily or monthly compound interest
              </li>

              <li>
                Easy access to funds
              </li>

              <li>
                Lower investment risk
              </li>

              <li>
                Strong liquidity for emergency savings
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Potential Risks and Limitations
            </h3>

            <p>
              Although high yield savings accounts are generally considered safe,
              investors should consider inflation risk and changing interest rates.
              APYs may fluctuate over time depending on economic conditions and central bank policy.
            </p>

            <p>
              Inflation can reduce real purchasing power,
              especially during periods of elevated consumer price growth.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenarios
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Emergency Fund
                </h4>

                <p>
                  A saver deposits $10,000 into a high yield savings account with monthly contributions of $500 and a 4.75% APY.
                  Over time,
                  compound interest accelerates savings growth while maintaining liquidity.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — House Down Payment Savings
                </h4>

                <p>
                  Future homeowners frequently use HYSAs to preserve capital while accumulating savings for a down payment.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a high yield savings account?"
                answer="A high yield savings account is a savings product that pays a higher APY than traditional savings accounts."
              />

              <FaqItem
                question="What does APY mean?"
                answer="APY stands for Annual Percentage Yield and measures the effective yearly return after compounding."
              />

              <FaqItem
                question="Are high yield savings accounts safe?"
                answer="High yield savings accounts are generally considered low-risk savings vehicles designed for liquidity and capital preservation."
              />

              <FaqItem
                question="How often is interest compounded?"
                answer="Many HYSAs compound interest daily or monthly depending on the financial institution."
              />

              <FaqItem
                question="Can APYs change?"
                answer="Yes. High yield savings account interest rates may fluctuate depending on economic conditions and bank policies."
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
                title: "Savings Calculator",
                link: "/savings-calculator",
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
                title: "Investment Calculator",
                link: "/investment-calculator",
              },

              {
                title: "Future Value Calculator",
                link: "/future-value-calculator",
              },

              {
                title: "Inflation Calculator",
                link: "/inflation-calculator",
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