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
} from "recharts";

export default function PresentValueCalculator() {

  const [futureValue, setFutureValue] = useState(250000);

  const [discountRate, setDiscountRate] = useState(6);

  const [years, setYears] = useState(15);

  const [annualCashFlow, setAnnualCashFlow] = useState(12000);

  const presentValue =
    futureValue /
    Math.pow(
      1 + discountRate / 100,
      years
    );

  const totalCashFlows =
    annualCashFlow * years;

  const discountedDifference =
    futureValue - presentValue;

  const estimatedInvestmentValue =
    presentValue + totalCashFlows;

  const pieData = [
    {
      name: "Present Value",
      value: presentValue,
    },

    {
      name: "Discounted Difference",
      value: discountedDifference,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Today",
        value: presentValue,
      },

      {
        year: "Year 5",
        value: presentValue * 1.25,
      },

      {
        year: "Year 10",
        value: presentValue * 1.55,
      },

      {
        year: "Year 15",
        value: futureValue,
      },
    ];

  }, [futureValue, presentValue]);

  const compareData = [
    {
      name: "Present Value",
      value: presentValue,
    },

    {
      name: "Future Value",
      value: futureValue,
    },

    {
      name: "Cash Flows",
      value: totalCashFlows,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-900 to-teal-500 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Present Value Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate discounted investment value,
              future cash flow worth,
              investment valuation,
              and financial planning projections using this free present value calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Future Value"
                  value={futureValue}
                  setValue={setFutureValue}
                  prefix="$"
                />

                <InputField
                  label="Discount Rate"
                  value={discountRate}
                  setValue={setDiscountRate}
                  suffix="%"
                />

                <InputField
                  label="Investment Years"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

                <InputField
                  label="Annual Cash Flow"
                  value={annualCashFlow}
                  setValue={setAnnualCashFlow}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-teal-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-900 to-teal-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Present Value
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${presentValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Present Value Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Future Value"
                    value={`$${futureValue.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Discounted Difference"
                    value={`$${discountedDifference.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Cash Flows"
                    value={`$${totalCashFlows.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Investment Value"
                    value={`$${estimatedInvestmentValue.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Present Value Breakdown
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
                    <Cell fill="#5eead4" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Present Value"
                value={`$${presentValue.toFixed(0)}`}
              />

              <SummaryCard
                title="Discount Amount"
                value={`$${discountedDifference.toFixed(0)}`}
              />

              <SummaryCard
                title="Future Value"
                value={`$${futureValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Value Growth Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

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
            Investment Comparison Overview
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

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Present Value Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A present value calculator helps estimate the current value of future money,
              investment cash flows,
              retirement income,
              or financial assets after accounting for discount rates and time.
              Present value analysis is widely used in investing,
              corporate finance,
              retirement planning,
              and discounted cash flow analysis.
            </p>

            <p>
              Investors commonly use present value calculations to compare investment opportunities,
              evaluate future income streams,
              estimate business valuations,
              and analyze long-term financial decisions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Present Value?
            </h3>

            <p>
              Present value represents the current worth of future money after considering investment returns,
              inflation,
              opportunity cost,
              and discount rates.
            </p>

            <p>
              Because money available today can potentially earn investment returns,
              future money is generally worth less than money currently available.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Present Value Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                PV = FV / (1 + r)^n
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                PV = Present Value
              </li>

              <li>
                FV = Future Value
              </li>

              <li>
                r = Discount rate
              </li>

              <li>
                n = Number of years or periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Present Value Matters
            </h3>

            <p>
              Present value calculations help investors and businesses evaluate whether future investments,
              projects,
              or cash flows are financially worthwhile today.
            </p>

            <p>
              Present value analysis is commonly used in retirement planning,
              stock valuation,
              bond pricing,
              real estate investing,
              and corporate financial forecasting.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Present Value Scenario
            </h3>

            <p>
              Suppose an investor expects to receive $250,000 in 15 years and uses a 6% annual discount rate.
              A present value calculator estimates the current value of that future money in today's dollars.
            </p>

            <p>
              Investors may use these calculations to compare future investment opportunities and determine whether current investments align with long-term financial goals.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Discount Rates and Investment Returns
            </h3>

            <p>
              Discount rates represent the expected rate of return,
              inflation assumptions,
              investment risk,
              or opportunity cost associated with future money.
            </p>

            <p>
              Higher discount rates reduce present value because future cash becomes less valuable when alternative investment returns are higher.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Present Value and Inflation
            </h3>

            <p>
              Inflation reduces purchasing power over time,
              meaning future money may buy fewer goods and services than expected today.
            </p>

            <p>
              Present value calculations often incorporate inflation expectations through discount rates to estimate realistic future purchasing power.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Present Value vs Future Value
            </h3>

            <p>
              Present value estimates the current worth of future money,
              while future value estimates how much current money may grow over time with investment returns and compounding.
            </p>

            <p>
              Both calculations are fundamental concepts in investing,
              financial planning,
              retirement analysis,
              and business valuation.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Discounted Cash Flow Analysis
            </h3>

            <p>
              Discounted cash flow analysis estimates the present value of future income streams,
              investment returns,
              or business profits.
              DCF analysis is widely used in stock valuation,
              real estate investing,
              and corporate finance decisions.
            </p>

            <p>
              Investors commonly compare discounted cash flow estimates against current market prices when evaluating investment opportunities.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Risk and Investment Valuation
            </h3>

            <p>
              Investment valuations depend heavily on assumptions regarding growth rates,
              future earnings,
              inflation,
              and market risk.
              Small changes in discount rates may significantly affect present value calculations.
            </p>

            <p>
              Diversification and conservative forecasting assumptions may help improve long-term investment planning accuracy.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is present value?"
                answer="Present value estimates the current worth of future money after accounting for discount rates and time."
              />

              <FaqItem
                question="Why are discount rates important?"
                answer="Discount rates help account for investment returns, inflation, opportunity cost, and financial risk when valuing future cash."
              />

              <FaqItem
                question="What is discounted cash flow analysis?"
                answer="DCF analysis estimates the current value of future investment cash flows or business earnings."
              />

              <FaqItem
                question="How is present value used in investing?"
                answer="Investors use present value calculations to compare investment opportunities, estimate valuations, and evaluate future financial returns."
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
                title: "Future Value Calculator",
                link: "/future-value-calculator",
              },

              {
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
              },

              {
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
              },

              {
                title: "Annual Return Calculator",
                link: "/annual-return-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
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

    <div className="bg-slate-100 rounded-2xl p-5">

      <div className="text-slate-600 mb-1 font-semibold">
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