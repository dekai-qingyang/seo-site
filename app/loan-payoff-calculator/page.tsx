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

export default function LoanPayoffCalculator() {

  const [loanAmount, setLoanAmount] = useState(45000);

  const [interestRate, setInterestRate] = useState(6.9);

  const [monthlyPayment, setMonthlyPayment] = useState(850);

  const monthlyRate =
    interestRate / 100 / 12;

  const payoffMonths =
    Math.ceil(
      -Math.log(
        1 -
          (loanAmount * monthlyRate) /
            monthlyPayment
      ) / Math.log(1 + monthlyRate)
    );

  const payoffYears =
    payoffMonths / 12;

  const totalPaid =
    payoffMonths * monthlyPayment;

  const totalInterest =
    totalPaid - loanAmount;

  const pieData = [
    {
      name: "Principal",
      value: loanAmount,
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
        balance: loanAmount * 0.82,
      },

      {
        year: "Year 3",
        balance: loanAmount * 0.58,
      },

      {
        year: "Year 5",
        balance: loanAmount * 0.33,
      },

      {
        year: "Year 7",
        balance: loanAmount * 0.12,
      },

      {
        year: "Paid Off",
        balance: 0,
      },
    ];

  }, [loanAmount]);

  const compareData = [
    {
      name: "Loan Amount",
      value: loanAmount,
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
              Loan Payoff Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate loan repayment timelines,
              monthly payment schedules,
              interest costs,
              and early payoff savings using this free loan payoff calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

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
                  Estimated Total Interest
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${totalInterest.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Loan Payoff Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={`$${loanAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Cost"
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

                    <Cell fill="#2563eb" />
                    <Cell fill="#93c5fd" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Principal Balance"
                value={`$${loanAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Charges"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Total Repayment"
                value={`$${totalPaid.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Balance Reduction Timeline
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

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Repayment Comparison
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
            Loan Payoff Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A loan payoff calculator helps borrowers estimate how long it may take to repay a loan based on the current balance,
              interest rate,
              and monthly payment amount.
              It also calculates total repayment costs and overall interest charges over the life of the loan.
            </p>

            <p>
              Understanding repayment timelines is important for financial planning,
              debt management,
              and reducing unnecessary interest expenses.
              Many borrowers use payoff calculators to explore strategies that may shorten repayment periods and lower total borrowing costs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Loan Payoff Calculations Work
            </h3>

            <p>
              Loan repayment schedules are based on amortization formulas that determine how much of each payment goes toward interest and principal.
              Early payments typically contain larger interest portions because the remaining balance is higher at the beginning of repayment.
            </p>

            <p>
              Over time,
              interest charges decrease as the principal balance declines.
              Increasing monthly payments may accelerate this process and reduce total interest costs significantly.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Loan Payoff Formula
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
                P = Loan balance
              </li>

              <li>
                M = Monthly payment amount
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Loan Payoff Planning Matters
            </h3>

            <p>
              Loan payoff planning helps borrowers understand the long-term impact of debt obligations.
              Without a repayment strategy,
              borrowers may spend years paying unnecessary interest costs that delay savings goals and financial independence.
            </p>

            <p>
              A payoff calculator provides better visibility into repayment schedules,
              allowing borrowers to evaluate whether higher payments,
              refinancing,
              or shorter loan terms may improve financial outcomes.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Paying Off Loans Early
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Reduce total interest expenses
              </li>

              <li>
                Improve monthly cash flow
              </li>

              <li>
                Lower debt-to-income ratios
              </li>

              <li>
                Increase financial flexibility
              </li>

              <li>
                Improve long-term savings potential
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example Loan Payoff Scenario
            </h3>

            <p>
              For example,
              a borrower with a $45,000 loan balance at 6.9% interest making monthly payments of $850 may repay the loan in several years while paying thousands in additional interest charges.
            </p>

            <p>
              Increasing monthly payments by even small amounts may shorten repayment timelines dramatically and lower total repayment costs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Strategies to Pay Off Loans Faster
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Make extra monthly payments
              </li>

              <li>
                Refinance to lower interest rates
              </li>

              <li>
                Use biweekly payment schedules
              </li>

              <li>
                Apply bonuses or tax refunds toward debt
              </li>

              <li>
                Avoid extending repayment terms unnecessarily
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Fixed vs Variable Interest Loans
            </h3>

            <p>
              Fixed-rate loans maintain consistent interest rates throughout repayment,
              while variable-rate loans may fluctuate based on market conditions.
              Borrowers should evaluate repayment stability,
              affordability,
              and risk tolerance when selecting financing options.
            </p>

            <p>
              Understanding interest structures may help borrowers avoid repayment surprises and improve long-term budgeting accuracy.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="How can I pay off my loan faster?"
                answer="Increasing monthly payments and making extra principal payments may reduce repayment timelines significantly."
              />

              <FaqItem
                question="Does refinancing reduce loan payoff costs?"
                answer="Refinancing may reduce interest expenses if borrowers qualify for lower rates."
              />

              <FaqItem
                question="Why do early payments contain more interest?"
                answer="Interest is calculated using the remaining loan balance, which is highest at the beginning of repayment."
              />

              <FaqItem
                question="Can biweekly payments help?"
                answer="Yes. Biweekly payment schedules may reduce loan balances faster and lower interest costs."
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
                title: "Interest Payoff Calculator",
                link: "/interest-payoff-calculator",
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
                title: "Personal Loan Calculator",
                link: "/personal-loan-calculator",
              },

              {
                title: "Student Loan Calculator",
                link: "/student-loan-calculator",
              },

              {
                title: "Balance Transfer Calculator",
                link: "/balance-transfer-calculator",
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