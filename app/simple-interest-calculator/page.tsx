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

export default function SimpleInterestCalculator() {

  const [principal, setPrincipal] = useState(15000);

  const [rate, setRate] = useState(6.5);

  const [years, setYears] = useState(5);

  const simpleInterest =
    principal *
    (rate / 100) *
    years;

  const totalAmount =
    principal + simpleInterest;

  const yearlyInterest =
    simpleInterest / years;

  const monthlyEquivalent =
    totalAmount / (years * 12);

  const pieData = [
    {
      name: "Principal",
      value: principal,
    },

    {
      name: "Interest",
      value: simpleInterest,
    },
  ];

  const growthData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value:
          principal +
          yearlyInterest * 1,
      },

      {
        year: "Year 2",
        value:
          principal +
          yearlyInterest * 2,
      },

      {
        year: "Year 3",
        value:
          principal +
          yearlyInterest * 3,
      },

      {
        year: "Year 4",
        value:
          principal +
          yearlyInterest * 4,
      },

      {
        year: "Year 5",
        value: totalAmount,
      },
    ];

  }, [
    principal,
    yearlyInterest,
    totalAmount,
  ]);

  const compareData = [
    {
      name: "Principal",
      value: principal,
    },

    {
      name: "Interest",
      value: simpleInterest,
    },

    {
      name: "Total Amount",
      value: totalAmount,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Simple Interest Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate simple interest,
              investment growth,
              savings earnings,
              and total repayment amounts using this free simple interest calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Principal Amount"
                  value={principal}
                  setValue={setPrincipal}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={rate}
                  setValue={setRate}
                  suffix="%"
                />

                <InputField
                  label="Years"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-orange-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Total Interest Earned
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${simpleInterest.toFixed(0)}
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
                    label="Principal Amount"
                    value={`$${principal.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Earned"
                    value={`$${simpleInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Amount"
                    value={`$${totalAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Monthly Equivalent"
                    value={`$${monthlyEquivalent.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Principal vs Interest Breakdown
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

                    <Cell fill="#ea580c" />
                    <Cell fill="#fdba74" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Principal"
                value={`$${principal.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest"
                value={`$${simpleInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Final Balance"
                value={`$${totalAmount.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Simple Interest Growth Timeline
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
                  stroke="#ea580c"
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
                  fill="#ea580c"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Simple Interest Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A simple interest calculator helps borrowers,
              savers,
              and investors estimate how much interest may accumulate over a fixed period using a straightforward interest formula.
              Simple interest is one of the most basic financial concepts used in lending,
              investing,
              and savings products.
            </p>

            <p>
              Unlike compound interest,
              simple interest does not earn additional interest on previously accumulated interest.
              Instead,
              interest is calculated only on the original principal balance throughout the entire investment or loan period.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Simple Interest?
            </h3>

            <p>
              Simple interest refers to interest calculated solely on the original amount borrowed or invested.
              Because interest does not compound,
              growth remains linear over time.
            </p>

            <p>
              Many short-term loans,
              auto loans,
              and basic savings products may use simple interest calculations.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Simple Interest Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Simple Interest = Principal × Rate × Time
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Principal = Original balance
              </li>

              <li>
                Rate = Annual interest rate
              </li>

              <li>
                Time = Loan or investment duration
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Simple Interest Matters
            </h3>

            <p>
              Understanding simple interest helps borrowers estimate total repayment costs and allows investors to evaluate predictable returns.
              Because calculations remain straightforward,
              simple interest is commonly used for educational financial examples and short-term borrowing structures.
            </p>

            <p>
              Borrowers may compare simple interest loans against compound interest financing products to understand long-term cost differences.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Simple Interest Scenario
            </h3>

            <p>
              Suppose an investor deposits $15,000 into an account earning 6.5% annual simple interest for five years.
              The investment would earn the same amount of interest each year because interest calculations remain based on the original principal balance.
            </p>

            <p>
              Unlike compound interest accounts,
              simple interest growth does not accelerate over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Simple Interest
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Easy to calculate and understand
              </li>

              <li>
                Predictable repayment structures
              </li>

              <li>
                Consistent yearly interest amounts
              </li>

              <li>
                Useful for short-term financing
              </li>

              <li>
                Transparent borrowing costs
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Simple Interest vs Compound Interest
            </h3>

            <p>
              Simple interest calculates earnings only on the original balance,
              while compound interest earns additional returns on accumulated interest over time.
              Compound growth generally produces significantly higher long-term investment returns.
            </p>

            <p>
              However,
              simple interest loans may reduce borrowing complexity and provide easier repayment forecasting.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Factors Affecting Simple Interest
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Principal balance size
              </li>

              <li>
                Interest rate percentage
              </li>

              <li>
                Loan or investment duration
              </li>

              <li>
                Repayment structure
              </li>

              <li>
                Frequency of payments
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Common Uses for Simple Interest
            </h3>

            <p>
              Simple interest calculations are frequently used for personal loans,
              educational examples,
              auto financing,
              treasury products,
              and certain business lending agreements.
            </p>

            <p>
              Investors and borrowers should always review lender agreements carefully to determine whether interest compounds or remains simple throughout repayment periods.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Does simple interest compound?"
                answer="No. Simple interest is calculated only on the original principal balance."
              />

              <FaqItem
                question="Is simple interest better for borrowers?"
                answer="Simple interest may reduce long-term borrowing costs compared to compound interest financing."
              />

              <FaqItem
                question="Can investments use simple interest?"
                answer="Yes. Some savings products and investment agreements use simple interest structures."
              />

              <FaqItem
                question="What is the difference between APR and simple interest?"
                answer="APR includes additional borrowing fees and financing costs, while simple interest focuses only on interest calculations."
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
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
              },

              {
                title: "Interest Calculator",
                link: "/interest-calculator",
              },

              {
                title: "APY Calculator",
                link: "/apy-calculator",
              },

              {
                title: "APR Calculator",
                link: "/apr-calculator",
              },

              {
                title: "Investment Calculator",
                link: "/investment-calculator",
              },

              {
                title: "Savings Calculator",
                link: "/savings-calculator",
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