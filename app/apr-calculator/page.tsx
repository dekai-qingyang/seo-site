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

export default function APRCalculator() {

  const [loanAmount, setLoanAmount] = useState(25000);

  const [interestRate, setInterestRate] = useState(7.5);

  const [loanTerm, setLoanTerm] = useState(5);

  const [fees, setFees] = useState(1200);

  const monthlyRate =
    interestRate / 100 / 12;

  const totalMonths =
    loanTerm * 12;

  const monthlyPayment =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayments =
    monthlyPayment * totalMonths;

  const totalInterest =
    totalPayments - loanAmount;

  const aprCost =
    totalInterest + fees;

  const effectiveAPR =
    ((aprCost / loanAmount) / loanTerm) * 100;

  const pieData = [
    {
      name: "Principal",
      value: loanAmount,
    },

    {
      name: "Interest & Fees",
      value: aprCost,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        balance: loanAmount * 0.82,
      },

      {
        year: "Year 2",
        balance: loanAmount * 0.63,
      },

      {
        year: "Year 3",
        balance: loanAmount * 0.42,
      },

      {
        year: "Year 4",
        balance: loanAmount * 0.21,
      },

      {
        year: "Paid Off",
        balance: 0,
      },
    ];

  }, [loanAmount]);

  const compareData = [
    {
      name: "Principal",
      value: loanAmount,
    },

    {
      name: "Interest",
      value: totalInterest,
    },

    {
      name: "Fees",
      value: fees,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              APR Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate annual percentage rate,
              borrowing costs,
              monthly payments,
              loan fees,
              and total repayment expenses using this free APR calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Loan Amount"
                  value={loanAmount}
                  setValue={setLoanAmount}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="Years"
                />

                <InputField
                  label="Loan Fees"
                  value={fees}
                  setValue={setFees}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-indigo-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Effective APR
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  {effectiveAPR.toFixed(2)}%
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    APR Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Monthly Payment"
                    value={`$${monthlyPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Loan Fees"
                    value={`$${fees.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total APR Cost"
                    value={`$${aprCost.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Cost Breakdown
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

                    <Cell fill="#4f46e5" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Loan Amount"
                value={`$${loanAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Costs"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="APR Fees"
                value={`$${fees.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Balance Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#4f46e5"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            APR Cost Comparison
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
                  fill="#4f46e5"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            APR Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An APR calculator helps borrowers estimate the true cost of borrowing by combining interest rates and loan fees into a single percentage measurement.
              APR stands for annual percentage rate and represents the total yearly borrowing cost associated with loans,
              mortgages,
              auto financing,
              credit cards,
              and personal loans.
            </p>

            <p>
              Many borrowers focus only on interest rates,
              but APR provides a more complete picture because it includes lender fees,
              origination charges,
              closing costs,
              and other financing expenses.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What APR Means
            </h3>

            <p>
              APR measures the total annual borrowing cost expressed as a percentage.
              It allows consumers to compare loan offers more accurately across lenders and financing products.
            </p>

            <p>
              Lower APR values generally indicate cheaper financing,
              although repayment terms and loan structures also affect total costs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              APR Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                APR = [(Interest + Fees) ÷ Loan Amount] ÷ Loan Term × 100
              </code>

            </div>

            <p>
              APR calculations may vary slightly depending on lender fee structures and repayment schedules.
              Federal lending regulations often require lenders to disclose APR information clearly for consumer comparison purposes.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why APR Is Important
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Compare loan offers accurately
              </li>

              <li>
                Identify hidden borrowing costs
              </li>

              <li>
                Understand total repayment expenses
              </li>

              <li>
                Improve long-term financial planning
              </li>

              <li>
                Evaluate refinancing opportunities
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              APR vs Interest Rate
            </h3>

            <p>
              Interest rates measure only the borrowing cost charged on principal balances.
              APR includes both interest and many financing fees,
              creating a broader measurement of loan affordability.
            </p>

            <p>
              Two loans with identical interest rates may have significantly different APR values depending on lender fees and repayment structures.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example APR Scenario
            </h3>

            <p>
              Suppose a borrower receives a $25,000 auto loan with a 7.5% interest rate and $1,200 in loan fees.
              The effective APR becomes higher than the stated interest rate because fees increase overall borrowing costs.
            </p>

            <p>
              Comparing APR values across lenders may help borrowers identify more affordable financing solutions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Factors Affecting APR
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Credit score and credit history
              </li>

              <li>
                Loan amount and repayment term
              </li>

              <li>
                Market interest rates
              </li>

              <li>
                Lender fees and closing costs
              </li>

              <li>
                Type of financing product
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Fixed APR vs Variable APR
            </h3>

            <p>
              Fixed APR loans maintain the same borrowing rate throughout repayment periods.
              Variable APR loans may change over time depending on market conditions and benchmark interest rates.
            </p>

            <p>
              Borrowers should evaluate rate stability,
              refinancing flexibility,
              and long-term affordability before choosing financing structures.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Is lower APR always better?"
                answer="Lower APR values generally reduce borrowing costs, although repayment terms and loan conditions also matter."
              />

              <FaqItem
                question="Does APR include all fees?"
                answer="APR usually includes many financing costs, but some optional fees may not be included."
              />

              <FaqItem
                question="Why is APR higher than the interest rate?"
                answer="APR includes lender fees and financing costs in addition to interest charges."
              />

              <FaqItem
                question="Can APR change after approval?"
                answer="Fixed APR loans remain stable, while variable APR products may change over time."
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
                title: "Loan Calculator",
                link: "/loan-calculator",
              },

              {
                title: "Interest Calculator",
                link: "/interest-calculator",
              },

              {
                title: "Auto Loan Calculator",
                link: "/auto-loan-calculator",
              },

              {
                title: "Mortgage Calculator",
                link: "/mortgage-calculator",
              },

              {
                title: "Debt Consolidation Calculator",
                link: "/debt-consolidation-calculator",
              },

              {
                title: "Personal Loan Calculator",
                link: "/personal-loan-calculator",
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
          } ${suffix ? "pr-16" : "pr-4"}`}
        />

        {suffix && (

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
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