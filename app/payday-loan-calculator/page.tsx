"use client";

import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function PaydayLoanCalculator() {

  const [loanAmount, setLoanAmount] = useState(500);

  const [loanFee, setLoanFee] = useState(15);

  const [loanDays, setLoanDays] = useState(14);

  const totalFee =
    (loanAmount * loanFee) / 100;

  const totalRepayment =
    loanAmount + totalFee;

  const apr =
    ((totalFee / loanAmount) *
      (365 / loanDays)) *
    100;

  const lineData = useMemo(() => {

    return [
      {
        day: "Day 1",
        balance: totalRepayment,
      },
      {
        day: "Day 3",
        balance: totalRepayment * 0.9,
      },
      {
        day: "Day 7",
        balance: totalRepayment * 0.7,
      },
      {
        day: "Day 10",
        balance: totalRepayment * 0.45,
      },
      {
        day: "Day 14",
        balance: 0,
      },
    ];

  }, [totalRepayment]);

  const pieData = [
    {
      name: "Loan Amount",
      value: loanAmount,
    },
    {
      name: "Fees",
      value: totalFee,
    },
  ];

  const compareData = [
    {
      name: "Loan",
      value: loanAmount,
    },
    {
      name: "Fees",
      value: totalFee,
    },
    {
      name: "Repayment",
      value: totalRepayment,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-6 py-8">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Payday Loan Calculator
            </h1>

            <p className="text-white/90 text-lg">
              Estimate payday loan costs,
              fees,
              repayment amounts,
              and annual percentage rates instantly.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Loan Amount
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
                      $
                    </span>

                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) =>
                        setLoanAmount(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white text-black font-bold text-lg"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Payday Loan Fee
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      value={loanFee}
                      onChange={(e) =>
                        setLoanFee(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white text-black font-bold text-lg"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
                      %
                    </span>

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Loan Term
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      value={loanDays}
                      onChange={(e) =>
                        setLoanDays(Number(e.target.value))
                      }
                      className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-16 bg-white text-black font-bold text-lg"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
                      Days
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-green-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl text-white p-6 mb-6">

                <p className="text-white/90 mb-2">
                  Total Repayment Amount
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${totalRepayment.toFixed(2)}
                </h2>

              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Loan Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Loan Fees"
                    value={`$${totalFee.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated APR"
                    value={`${apr.toFixed(0)}%`}
                  />

                  <SummaryRow
                    label="Loan Term"
                    value={`${loanDays} Days`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Payday Loan Cost Breakdown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#059669" />
                    <Cell fill="#86efac" />

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
                title="Loan Fees"
                value={`$${totalFee.toFixed(0)}`}
              />

              <SummaryCard
                title="APR"
                value={`${apr.toFixed(0)}%`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Payday Loan Repayment Trend
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#059669"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Payday Loan Comparison
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
                  fill="#059669"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

          <h2 className="text-4xl font-black mb-6">
            Payday Loan Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A payday loan calculator helps borrowers estimate repayment amounts,
              fees, annual percentage rates, and overall borrowing costs associated
              with short-term payday loans. Payday loans are typically designed to
              provide quick cash advances before the borrower's next paycheck.
            </p>

            <p>
              Although payday loans may offer fast approval and convenient access to
              funds, they often include very high fees and extremely high APR values.
              Borrowers should understand the full repayment obligation before taking
              out a short-term loan.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Payday Loans Work
            </h3>

            <p>
              Payday loans are short-term loans commonly due within two to four weeks.
              Borrowers typically repay the full balance plus fees on the next payday.
              Unlike traditional installment loans, payday loans usually require one
              lump-sum repayment.
            </p>

            <p>
              Lenders may charge flat fees based on the loan amount borrowed. Even
              though fees may appear small initially, the annualized APR can become
              extremely high.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Payday Loan Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                APR = (Fees ÷ Loan Amount) × (365 ÷ Loan Days) × 100
              </code>

            </div>

            <p>
              This formula converts short-term loan fees into an annual percentage
              rate to help borrowers compare borrowing costs more accurately.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Advantages of Payday Loans
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Fast approval processes
              </li>

              <li>
                Quick access to emergency cash
              </li>

              <li>
                Limited credit checks in some situations
              </li>

              <li>
                Short repayment periods
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks of Payday Loans
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Extremely high APR rates
              </li>

              <li>
                Expensive rollover fees
              </li>

              <li>
                Short repayment windows
              </li>

              <li>
                Potential debt cycles
              </li>

              <li>
                Financial stress from repeated borrowing
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example Payday Loan Scenario
            </h3>

            <p>
              For example, borrowing $500 with a 15% payday loan fee over 14 days
              may result in a repayment amount significantly higher than the original
              principal. Although the upfront fee may seem manageable, the effective
              APR can exceed several hundred percent annually.
            </p>

            <p>
              Many borrowers underestimate the true cost of short-term lending because
              payday lenders often advertise flat fees rather than annualized interest
              rates.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Alternatives to Payday Loans
            </h3>

            <p>
              Before applying for a payday loan, borrowers may consider alternatives
              such as personal loans, installment loans, employer paycheck advances,
              credit union loans, or emergency assistance programs.
            </p>

            <p>
              Lower-interest borrowing options may significantly reduce long-term
              repayment costs and financial stress.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a payday loan?"
                answer="A payday loan is a short-term loan typically repaid on the borrower's next payday."
              />

              <FaqItem
                question="Why are payday loan APRs so high?"
                answer="Short repayment periods combined with flat fees can create extremely high annualized APR values."
              />

              <FaqItem
                question="Can payday loans affect credit scores?"
                answer="Some lenders may report missed payments or collections activity to credit bureaus."
              />

              <FaqItem
                question="Are payday loans risky?"
                answer="Yes. High fees and short repayment periods may create long-term financial difficulties for some borrowers."
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
                title: "Personal Loan Calculator",
                link: "/personal-loan-calculator",
              },

              {
                title: "Debt Payoff Calculator",
                link: "/debt-payoff-calculator",
              },

              {
                title: "APR Calculator",
                link: "/apr-calculator",
              },

              {
                title: "Balance Transfer Calculator",
                link: "/balance-transfer-calculator",
              },

              {
                title: "Debt Consolidation Calculator",
                link: "/debt-consolidation-calculator",
              },

              {
                title: "Loan Payoff Calculator",
                link: "/loan-payoff-calculator",
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