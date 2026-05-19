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

export default function StudentLoanPayoffCalculator() {

  const [loanBalance, setLoanBalance] = useState(60000);

  const [interestRate, setInterestRate] = useState(6.2);

  const [monthlyPayment, setMonthlyPayment] = useState(750);

  const monthlyRate =
    interestRate / 100 / 12;

  const payoffMonths =
    Math.ceil(
      -Math.log(
        1 -
          (loanBalance * monthlyRate) /
            monthlyPayment
      ) / Math.log(1 + monthlyRate)
    );

  const payoffYears =
    payoffMonths / 12;

  const totalPaid =
    monthlyPayment * payoffMonths;

  const totalInterest =
    totalPaid - loanBalance;

  const pieData = [
    {
      name: "Principal",
      value: loanBalance,
    },

    {
      name: "Interest",
      value: totalInterest,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        balance: loanBalance * 0.88,
      },

      {
        year: "Year 3",
        balance: loanBalance * 0.66,
      },

      {
        year: "Year 5",
        balance: loanBalance * 0.45,
      },

      {
        year: "Year 7",
        balance: loanBalance * 0.18,
      },

      {
        year: "Final",
        balance: 0,
      },
    ];

  }, [loanBalance]);

  const compareData = [
    {
      name: "Balance",
      value: loanBalance,
    },

    {
      name: "Interest",
      value: totalInterest,
    },

    {
      name: "Total Paid",
      value: totalPaid,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Student Loan Payoff Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate your student loan payoff timeline,
              total interest costs,
              monthly repayment strategy,
              and long-term debt reduction plan.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Student Loan Balance"
                  value={loanBalance}
                  setValue={setLoanBalance}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Monthly Payment"
                  value={monthlyPayment}
                  setValue={setMonthlyPayment}
                  prefix="$"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Payoff Time
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  {payoffYears.toFixed(1)} Years
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Student Loan Payoff Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Balance"
                    value={`$${loanBalance.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Repayment"
                    value={`$${totalPaid.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Payoff Timeline"
                    value={`${payoffMonths} Months`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Payoff Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="h-[320px] w-full">

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#2563eb" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Remaining Balance"
                value={`$${loanBalance.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Cost"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Paid"
                value={`$${totalPaid.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Student Loan Balance Timeline
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
                  stroke="#2563eb"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Student Loan Cost Comparison
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

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Student Loan Payoff Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A student loan payoff calculator helps borrowers estimate how long it may take to eliminate education debt based on the current balance,
              interest rate,
              and monthly payment amount.
              Student loans often remain active for many years,
              making repayment planning extremely important for long-term financial health.
            </p>

            <p>
              This calculator estimates the total interest paid over time,
              projected payoff duration,
              and total repayment cost.
              Understanding these numbers can help borrowers reduce debt faster and minimize interest expenses.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Student Loan Payoff Works
            </h3>

            <p>
              Student loan repayment typically follows an amortization schedule.
              Each monthly payment includes both principal and interest.
              Early payments often contain more interest,
              while later payments gradually reduce the principal balance faster.
            </p>

            <p>
              Increasing monthly payments may shorten the repayment timeline significantly and reduce overall interest costs.
              Even small extra payments can save borrowers thousands of dollars over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Student Loan Payoff Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                n = -log(1 - rP/M) ÷ log(1 + r)
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                n = Number of repayment months
              </li>

              <li>
                r = Monthly interest rate
              </li>

              <li>
                P = Remaining loan balance
              </li>

              <li>
                M = Monthly payment amount
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Early Payoff Matters
            </h3>

            <p>
              Student loan interest can accumulate for many years.
              Long repayment terms may increase the total borrowing cost substantially.
              Paying loans off faster may improve cash flow,
              reduce financial stress,
              and increase future savings potential.
            </p>

            <p>
              Many borrowers prioritize student loan payoff to improve debt-to-income ratios before applying for mortgages,
              car loans,
              or other financing products.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Common Student Loan Repayment Strategies
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Paying more than the minimum monthly payment
              </li>

              <li>
                Refinancing to lower interest rates
              </li>

              <li>
                Making biweekly payments
              </li>

              <li>
                Using employer repayment assistance programs
              </li>

              <li>
                Applying tax refunds toward loan balances
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Federal vs Private Student Loans
            </h3>

            <p>
              Federal student loans often provide repayment flexibility,
              deferment options,
              and forgiveness opportunities.
              Private student loans may offer lower rates for qualified borrowers,
              but repayment structures vary depending on the lender.
            </p>

            <p>
              Borrowers should compare interest rates,
              repayment terms,
              and refinancing opportunities carefully before making long-term financial decisions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Student Loan Payoff Scenario
            </h3>

            <p>
              For example,
              a borrower with a $60,000 student loan balance at 6.2% interest paying $750 monthly may repay the loan in several years while paying thousands in accumulated interest.
            </p>

            <p>
              Increasing monthly payments by even $100 may shorten repayment timelines considerably and reduce total borrowing costs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Can student loans be paid off early?"
                answer="Yes. Most student loans allow early repayment without prepayment penalties."
              />

              <FaqItem
                question="Does refinancing reduce payoff costs?"
                answer="Refinancing may lower interest rates and reduce total repayment costs for qualified borrowers."
              />

              <FaqItem
                question="Why does interest accumulate so slowly at first?"
                answer="Early payments contain more interest because the loan balance is highest at the beginning of repayment."
              />

              <FaqItem
                question="Should I pay extra toward student loans?"
                answer="Extra payments may reduce interest expenses and shorten payoff timelines substantially."
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
                title: "Student Loan Calculator",
                link: "/student-loan-calculator",
              },

              {
                title: "Student Loan Refinance Calculator",
                link: "/student-loan-refinance-calculator",
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
                title: "Personal Loan Calculator",
                link: "/personal-loan-calculator",
              },

              {
                title: "APR Calculator",
                link: "/apr-calculator",
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