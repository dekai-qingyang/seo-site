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
} from "recharts";

export default function CDCalculator() {

  const [deposit, setDeposit] = useState(15000);

  const [interestRate, setInterestRate] = useState(4.8);

  const [years, setYears] = useState(5);

  const [compoundFrequency, setCompoundFrequency] = useState(12);

  const futureValue =
    deposit *
    Math.pow(
      1 +
        (
          interestRate / 100 /
          compoundFrequency
        ),
      compoundFrequency * years
    );

  const totalInterest =
    futureValue - deposit;

  const apy =
    (
      Math.pow(
        1 +
          (
            interestRate / 100 /
            compoundFrequency
          ),
        compoundFrequency
      ) - 1
    ) * 100;

  const yearlyGrowth =
    totalInterest / years;

  const pieData = [
    {
      name: "Deposit",
      value: deposit,
    },

    {
      name: "Interest Earned",
      value: totalInterest,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value:
          deposit *
          Math.pow(
            1 +
              (
                interestRate / 100 /
                compoundFrequency
              ),
            compoundFrequency * 1
          ),
      },

      {
        year: "Year 3",
        value:
          deposit *
          Math.pow(
            1 +
              (
                interestRate / 100 /
                compoundFrequency
              ),
            compoundFrequency * 3
          ),
      },

      {
        year: "Year 5",
        value:
          deposit *
          Math.pow(
            1 +
              (
                interestRate / 100 /
                compoundFrequency
              ),
            compoundFrequency * 5
          ),
      },

      {
        year: "Year 7",
        value:
          deposit *
          Math.pow(
            1 +
              (
                interestRate / 100 /
                compoundFrequency
              ),
            compoundFrequency * 7
          ),
      },

      {
        year: "Year 10",
        value:
          deposit *
          Math.pow(
            1 +
              (
                interestRate / 100 /
                compoundFrequency
              ),
            compoundFrequency * 10
          ),
      },

    ];

  }, [
    deposit,
    interestRate,
    compoundFrequency,
  ]);

  const compareData = [
    {
      name: "Deposit",
      value: deposit,
    },

    {
      name: "Interest",
      value: totalInterest,
    },

    {
      name: "Final Balance",
      value: futureValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-900 to-green-500 px-6 py-8 text-white">

            <div className="flex flex-wrap gap-3 mb-5">

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Updated 2026
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Professional Finance Tool
              </div>

            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              CD Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-4xl leading-8">
              Estimate certificate of deposit returns,
              APY earnings,
              compound interest growth,
              and future savings balances using this advanced CD calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Initial Deposit"
                  value={deposit}
                  setValue={setDeposit}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="CD Term"
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

                    <option value={2}>
                      Semi-Annually
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

            <div className="bg-gradient-to-b from-green-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-900 to-green-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated CD Maturity Value
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${futureValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    CD Investment Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Initial Deposit"
                    value={`$${deposit.toFixed(0)}`}
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
                    label="Average Annual Growth"
                    value={`$${yearlyGrowth.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <SummaryCard
            title="Deposit Amount"
            value={`$${deposit.toFixed(0)}`}
          />

          <SummaryCard
            title="Interest Earned"
            value={`$${totalInterest.toFixed(0)}`}
          />

          <SummaryCard
            title="Future Value"
            value={`$${futureValue.toFixed(0)}`}
          />

          <SummaryCard
            title="APY"
            value={`${apy.toFixed(2)}%`}
          />

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            CD Interest Breakdown
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

                    <Cell fill="#14532d" />
                    <Cell fill="#22c55e" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Principal Deposit"
                value={`$${deposit.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Interest"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Final CD Balance"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            CD Growth Timeline
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
                  dataKey="value"
                  stroke="#14532d"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            CD Comparison Overview
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
                  fill="#14532d"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            CD Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A CD calculator helps estimate certificate of deposit growth using fixed interest rates,
              APY projections,
              and compound interest calculations.
              Certificates of deposit,
              commonly known as CDs,
              are fixed-term savings products offered by banks and financial institutions.
            </p>

            <p>
              CDs are popular among conservative investors because they provide predictable interest earnings and lower risk compared to many market-based investments.
              Investors commonly use CDs for retirement savings,
              emergency funds,
              short-term investing,
              and stable fixed-income growth.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is a CD?
            </h3>

            <p>
              A certificate of deposit is a savings account where funds remain deposited for a specified maturity period.
              In exchange for keeping money invested during the term,
              financial institutions typically provide higher interest rates than traditional savings accounts.
            </p>

            <p>
              CD terms may range from several months to multiple years depending on the bank and investment strategy.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Compound Interest Works
            </h3>

            <p>
              Compound interest allows earned interest to generate additional interest over time.
              More frequent compounding schedules generally produce higher long-term returns because earnings continue accumulating on previous growth.
            </p>

            <p>
              Investors frequently compare annual,
              quarterly,
              monthly,
              and daily compounding structures when evaluating CD products.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              CD Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Future Value = Principal × (1 + r / n)^(n × t)
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Principal = Initial deposit amount
              </li>

              <li>
                r = Interest rate
              </li>

              <li>
                n = Compound frequency
              </li>

              <li>
                t = Number of years
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              APY vs Interest Rate
            </h3>

            <p>
              APY,
              or Annual Percentage Yield,
              measures the effective yearly return after accounting for compound interest.
              APY provides a more accurate estimate of real investment growth than nominal interest rates alone.
            </p>

            <p>
              Investors often compare APYs across CDs,
              savings accounts,
              money market accounts,
              and treasury investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of CDs
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Predictable fixed returns
              </li>

              <li>
                Lower investment risk
              </li>

              <li>
                Stable compound growth
              </li>

              <li>
                Potential deposit insurance protection
              </li>

              <li>
                Reduced exposure to stock market volatility
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks and Limitations
            </h3>

            <p>
              Although CDs are generally considered conservative investments,
              investors should consider inflation risk,
              opportunity cost,
              and early withdrawal penalties.
            </p>

            <p>
              Inflation may reduce the real purchasing power of fixed-income investments over time,
              especially during periods of rising consumer prices.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              CD Laddering Strategy
            </h3>

            <p>
              CD laddering involves dividing investments into multiple certificates of deposit with different maturity dates.
              This strategy may improve liquidity while maintaining long-term interest exposure.
            </p>

            <p>
              Many investors use CD ladders to reduce reinvestment risk and create more flexible cash flow management.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenarios
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Long-Term Saver
                </h4>

                <p>
                  A saver deposits $15,000 into a 5-year CD earning 4.8% compounded monthly.
                  Over time,
                  compound interest significantly increases total account value while maintaining predictable fixed-income growth.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — Retirement Income Planning
                </h4>

                <p>
                  Retirees frequently use CDs to preserve principal and generate stable interest income while reducing stock market exposure.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a CD?"
                answer="A certificate of deposit is a fixed-term savings account that earns guaranteed interest over a specified period."
              />

              <FaqItem
                question="What is APY?"
                answer="APY stands for Annual Percentage Yield and reflects the effective yearly return after compound interest."
              />

              <FaqItem
                question="Are CDs safe investments?"
                answer="Certificates of deposit are generally considered conservative investments because returns are fixed and principal is usually protected."
              />

              <FaqItem
                question="Can I withdraw money early?"
                answer="Most CDs charge early withdrawal penalties if funds are removed before maturity."
              />

              <FaqItem
                question="What is CD laddering?"
                answer="CD laddering spreads deposits across multiple maturity dates to improve liquidity and reduce reinvestment risk."
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
                title: "Retirement Calculator",
                link: "/retirement-calculator",
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