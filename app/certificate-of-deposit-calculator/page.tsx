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

export default function CertificateOfDepositCalculator() {

  const [depositAmount, setDepositAmount] = useState(10000);

  const [interestRate, setInterestRate] = useState(4.5);

  const [years, setYears] = useState(5);

  const [compoundFrequency, setCompoundFrequency] = useState(12);

  const futureValue =
    depositAmount *
    Math.pow(
      1 +
        (
          interestRate / 100 /
          compoundFrequency
        ),
      compoundFrequency * years
    );

  const totalInterest =
    futureValue - depositAmount;

  const yearlyInterest =
    totalInterest / years;

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

  const pieData = [
    {
      name: "Initial Deposit",
      value: depositAmount,
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
          depositAmount *
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
          depositAmount *
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
          depositAmount *
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
          depositAmount *
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
          depositAmount *
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
    depositAmount,
    interestRate,
    compoundFrequency,
  ]);

  const compareData = [
    {
      name: "Deposit",
      value: depositAmount,
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

          <div className="bg-gradient-to-r from-emerald-900 to-green-500 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Certificate of Deposit Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate CD interest earnings,
              compound growth,
              APY returns,
              future savings value,
              and long-term deposit performance using this professional certificate of deposit calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Initial Deposit Amount"
                  value={depositAmount}
                  setValue={setDepositAmount}
                  prefix="$"
                />

                <InputField
                  label="Annual Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="CD Term Length"
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
                  Estimated Future Value
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
                    value={`$${depositAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Earned"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Average Annual Interest"
                    value={`$${yearlyInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated APY"
                    value={`${apy.toFixed(2)}%`}
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
            value={`$${depositAmount.toFixed(0)}`}
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
            title="APY Return"
            value={`${apy.toFixed(2)}%`}
          />

        </div>

        {/* PIE */}

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

                    <Cell fill="#064e3b" />
                    <Cell fill="#22c55e" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Original Deposit"
                value={`$${depositAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Interest"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Estimated Final Balance"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

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
                  stroke="#064e3b"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

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
                  fill="#064e3b"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Certificate of Deposit Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A certificate of deposit calculator helps estimate future savings growth using fixed interest rates,
              compound interest,
              and term-based deposit structures.
              Certificates of deposit,
              commonly known as CDs,
              are fixed-term savings accounts offered by banks and financial institutions.
            </p>

            <p>
              CD accounts generally provide guaranteed interest rates for a specific period of time,
              making them popular among conservative savers and long-term investors seeking predictable returns.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is a Certificate of Deposit?
            </h3>

            <p>
              A certificate of deposit is a savings product where money remains deposited for a fixed period while earning guaranteed interest.
              In exchange for keeping funds locked during the term,
              banks typically offer higher interest rates compared to traditional savings accounts.
            </p>

            <p>
              CD terms may range from several months to multiple years depending on the financial institution and investment strategy.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Compound Interest Formula
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
                r = Annual interest rate
              </li>

              <li>
                n = Compound frequency
              </li>

              <li>
                t = Number of years
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Compound Interest Matters
            </h3>

            <p>
              Compound interest allows savings to grow faster because earned interest continues generating additional interest over time.
              Higher compounding frequencies may increase long-term returns and future account balances.
            </p>

            <p>
              Long-term investors frequently use compound growth strategies to maximize wealth accumulation and retirement savings.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              APY vs Interest Rate
            </h3>

            <p>
              Annual Percentage Yield,
              commonly called APY,
              reflects the actual yearly return after accounting for compound interest.
              APY generally provides a more accurate representation of real investment growth than simple interest rates alone.
            </p>

            <p>
              Investors commonly compare APYs when evaluating CDs,
              savings accounts,
              and fixed-income investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              CD Laddering Strategy
            </h3>

            <p>
              CD laddering involves dividing savings across multiple CDs with different maturity dates.
              This strategy may improve liquidity while still benefiting from higher long-term interest rates.
            </p>

            <p>
              Many conservative investors use CD ladders to reduce reinvestment risk and improve cash flow flexibility.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Early Withdrawal Penalties
            </h3>

            <p>
              Most CDs charge penalties if funds are withdrawn before maturity.
              Penalties may reduce earned interest or partially reduce principal depending on account terms.
            </p>

            <p>
              Investors should carefully compare liquidity needs before selecting long-term CD investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              CD Investment Examples
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Conservative Savings
                </h4>

                <p>
                  An investor deposits $10,000 into a 5-year CD earning 4.5% compounded monthly.
                  Over time,
                  compound growth increases total savings while maintaining relatively low investment risk.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — Retirement Savings
                </h4>

                <p>
                  Retirees commonly use CDs to generate predictable income while protecting capital from market volatility and investment uncertainty.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Risk and Stability
            </h3>

            <p>
              CDs are generally considered lower-risk investments compared to stocks or cryptocurrencies because interest rates remain fixed and principal values are typically protected.
            </p>

            <p>
              Many bank CDs are insured by government-backed deposit insurance programs,
              helping reduce default risk for depositors.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Inflation Considerations
            </h3>

            <p>
              Inflation may reduce the real purchasing power of fixed-income investments over time.
              Investors commonly compare CD returns against inflation-adjusted real returns when evaluating long-term savings strategies.
            </p>

            <p>
              Higher inflation environments may reduce the effectiveness of low-interest fixed-income investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a certificate of deposit?"
                answer="A certificate of deposit is a fixed-term savings account that earns guaranteed interest for a specified period."
              />

              <FaqItem
                question="What is APY?"
                answer="APY represents annual percentage yield and includes the effects of compound interest."
              />

              <FaqItem
                question="Can I withdraw money early?"
                answer="Most CDs charge early withdrawal penalties if funds are accessed before maturity."
              />

              <FaqItem
                question="Are CDs safe investments?"
                answer="CDs are generally considered conservative investments because interest rates are fixed and principal is typically protected."
              />

            </div>

          </div>

        </section>

        {/* RELATED */}

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
                title: "Present Value Calculator",
                link: "/present-value-calculator",
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