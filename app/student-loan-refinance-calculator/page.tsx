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

export default function StudentLoanRefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(85000);

  const [currentRate, setCurrentRate] = useState(7.2);

  const [newRate, setNewRate] = useState(4.9);

  const [loanTerm, setLoanTerm] = useState(10);

  const currentMonthlyRate = currentRate / 100 / 12;

  const refinanceMonthlyRate = newRate / 100 / 12;

  const totalMonths = loanTerm * 12;

  const currentPayment =
    (currentBalance *
      currentMonthlyRate *
      Math.pow(1 + currentMonthlyRate, totalMonths)) /
    (Math.pow(1 + currentMonthlyRate, totalMonths) - 1);

  const refinancePayment =
    (currentBalance *
      refinanceMonthlyRate *
      Math.pow(1 + refinanceMonthlyRate, totalMonths)) /
    (Math.pow(1 + refinanceMonthlyRate, totalMonths) - 1);

  const currentTotal =
    currentPayment * totalMonths;

  const refinanceTotal =
    refinancePayment * totalMonths;

  const totalSavings =
    currentTotal - refinanceTotal;

  const interestSavings =
    totalSavings;

  const pieData = [
    {
      name: "Loan Balance",
      value: currentBalance,
    },

    {
      name: "Interest Savings",
      value: interestSavings,
    },
  ];

  const lineData = useMemo(() => {
    return [
      {
        year: "Year 1",
        current: currentBalance * 0.91,
        refinance: currentBalance * 0.87,
      },

      {
        year: "Year 3",
        current: currentBalance * 0.71,
        refinance: currentBalance * 0.62,
      },

      {
        year: "Year 5",
        current: currentBalance * 0.49,
        refinance: currentBalance * 0.39,
      },

      {
        year: "Year 7",
        current: currentBalance * 0.24,
        refinance: currentBalance * 0.16,
      },

      {
        year: "Paid Off",
        current: 0,
        refinance: 0,
      },
    ];
  }, [currentBalance]);

  const compareData = [
    {
      name: "Current Loan",
      value: currentTotal,
    },

    {
      name: "Refinanced",
      value: refinanceTotal,
    },

    {
      name: "Savings",
      value: totalSavings,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Student Loan Refinance Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate student loan refinancing savings,
              lower monthly payments,
              interest reduction,
              and long-term repayment improvements.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Current Student Loan Balance"
                  value={currentBalance}
                  setValue={setCurrentBalance}
                  prefix="$"
                />

                <InputField
                  label="Current Interest Rate"
                  value={currentRate}
                  setValue={setCurrentRate}
                  suffix="%"
                />

                <InputField
                  label="New Refinance Rate"
                  value={newRate}
                  setValue={setNewRate}
                  suffix="%"
                />

                <InputField
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-indigo-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Total Savings
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${totalSavings.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Refinance Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Current Monthly Payment"
                    value={`$${currentPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Refinanced Payment"
                    value={`$${refinancePayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Savings"
                    value={`$${interestSavings.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Loan Term"
                    value={`${loanTerm} Years`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Student Loan Refinance Breakdown
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
                title="Current Loan Cost"
                value={`$${currentTotal.toFixed(0)}`}
              />

              <SummaryCard
                title="Refinanced Cost"
                value={`$${refinanceTotal.toFixed(0)}`}
              />

              <SummaryCard
                title="Potential Savings"
                value={`$${totalSavings.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Balance Comparison
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
                  dataKey="current"
                  stroke="#94a3b8"
                  strokeWidth={4}
                />

                <Line
                  type="monotone"
                  dataKey="refinance"
                  stroke="#4f46e5"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Cost Savings Comparison
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
            Student Loan Refinance Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A student loan refinance calculator helps borrowers estimate how refinancing may reduce monthly payments,
              lower total interest costs,
              and improve long-term repayment efficiency.
              Refinancing replaces an existing student loan with a new loan that may offer better interest rates or repayment terms.
            </p>

            <p>
              Many borrowers refinance student loans to simplify repayment,
              reduce borrowing costs,
              or shorten repayment timelines.
              Even a small interest rate reduction may create thousands of dollars in long-term savings.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Student Loan Refinancing Works
            </h3>

            <p>
              Refinancing involves replacing one or more student loans with a new private loan.
              The new loan may provide a lower interest rate,
              reduced monthly payment,
              or shorter repayment period depending on the borrower’s credit profile and financial situation.
            </p>

            <p>
              Borrowers with strong credit scores,
              stable income,
              and low debt-to-income ratios may qualify for more competitive refinance offers.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Refinance Payment Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                M = Monthly payment
              </li>

              <li>
                P = Loan principal balance
              </li>

              <li>
                r = Monthly interest rate
              </li>

              <li>
                n = Total repayment months
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Refinancing Student Loans
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Lower monthly payments
              </li>

              <li>
                Reduced interest expenses
              </li>

              <li>
                Faster debt payoff timelines
              </li>

              <li>
                Consolidation of multiple loans
              </li>

              <li>
                Simplified repayment management
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks of Refinancing
            </h3>

            <p>
              Refinancing federal student loans into private loans may remove federal protections such as income-driven repayment plans,
              deferment options,
              and loan forgiveness opportunities.
              Borrowers should evaluate these tradeoffs carefully before refinancing.
            </p>

            <p>
              Private lenders may also require stronger credit qualifications,
              and variable-rate loans may increase future borrowing costs if interest rates rise.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Refinance Scenario
            </h3>

            <p>
              A borrower with an $85,000 student loan balance at 7.2% interest refinancing to 4.9% may significantly reduce total repayment costs over a 10-year repayment period.
            </p>

            <p>
              Lower rates may also help borrowers free additional cash flow for investing,
              saving,
              or paying off other debt obligations.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Does refinancing lower monthly payments?"
                answer="Yes. Refinancing may reduce monthly payments if borrowers qualify for lower interest rates or longer repayment terms."
              />

              <FaqItem
                question="Can federal student loans be refinanced?"
                answer="Yes. Federal loans can be refinanced into private loans, but federal protections may be lost."
              />

              <FaqItem
                question="Does refinancing hurt credit scores?"
                answer="Temporary credit inquiries may slightly affect scores, but long-term debt management improvements may strengthen credit health."
              />

              <FaqItem
                question="Should I refinance multiple student loans together?"
                answer="Many borrowers refinance multiple loans into one payment to simplify repayment and potentially reduce interest costs."
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
                title: "Student Loan Calculator",
                link: "/student-loan-calculator",
              },

              {
                title: "Student Loan Payoff Calculator",
                link: "/student-loan-payoff-calculator",
              },

              {
                title: "Debt Payoff Calculator",
                link: "/debt-payoff-calculator",
              },

              {
                title: "Loan Payoff Calculator",
                link: "/loan-payoff-calculator",
              },

              {
                title: "APR Calculator",
                link: "/apr-calculator",
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