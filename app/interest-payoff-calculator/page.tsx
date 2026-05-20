// app/interest-payoff-calculator/page.tsx

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

export default function InterestPayoffCalculator() {

  const [loanBalance, setLoanBalance] = useState(25000);

  const [interestRate, setInterestRate] = useState(8.5);

  const [monthlyPayment, setMonthlyPayment] = useState(650);

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
        balance: loanBalance * 0.84,
      },

      {
        year: "Year 3",
        balance: loanBalance * 0.61,
      },

      {
        year: "Year 5",
        balance: loanBalance * 0.37,
      },

      {
        year: "Year 7",
        balance: loanBalance * 0.15,
      },

      {
        year: "Paid Off",
        balance: 0,
      },
    ];

  }, [loanBalance]);

  const compareData = [
    {
      name: "Principal",
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
              Interest Payoff Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate total interest costs,
              repayment timelines,
              payoff strategies,
              and monthly debt repayment plans with this free interest payoff calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Loan Balance"
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
                  Estimated Interest Cost
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${totalInterest.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Interest Payoff Summary
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
                    label="Total Paid"
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
            Interest Cost Breakdown
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
                value={`$${loanBalance.toFixed(0)}`}
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

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Loan Balance Payoff Timeline
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
            Repayment Comparison
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
            Interest Payoff Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              An interest payoff calculator helps borrowers estimate how much interest may accumulate during loan repayment.
              Interest charges can significantly increase the total cost of borrowing over time,
              especially for long repayment periods or high-interest debt accounts.
            </p>

            <p>
              This calculator estimates repayment timelines,
              total interest costs,
              and total repayment amounts based on the current loan balance,
              interest rate,
              and monthly payment amount.
              Understanding these numbers can help borrowers reduce financial stress and create more effective repayment strategies.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Interest Payoff Works
            </h3>

            <p>
              Interest is the cost of borrowing money.
              Lenders charge interest based on the remaining principal balance and the annual percentage rate.
              During repayment,
              a portion of each monthly payment goes toward interest while the remainder reduces the principal balance.
            </p>

            <p>
              In many loans,
              interest charges are highest at the beginning of repayment because the outstanding balance is largest.
              As the balance decreases,
              interest expenses gradually decline over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Interest Payoff Formula
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
                P = Principal loan balance
              </li>

              <li>
                M = Monthly payment amount
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Why Interest Matters
            </h3>

            <p>
              Interest costs can dramatically increase the total price of loans,
              credit cards,
              and financing products.
              Even small interest rate differences may create substantial long-term savings.
            </p>

            <p>
              Borrowers who understand how interest accumulates are often better prepared to reduce debt,
              improve financial stability,
              and avoid unnecessary borrowing expenses.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Ways to Reduce Interest Costs
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Increase monthly payment amounts
              </li>

              <li>
                Refinance to lower interest rates
              </li>

              <li>
                Make biweekly payments
              </li>

              <li>
                Avoid missed or late payments
              </li>

              <li>
                Reduce outstanding balances faster
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Example Interest Payoff Scenario
            </h3>

            <p>
              For example,
              a borrower with a $25,000 loan balance at 8.5% interest making monthly payments of $650 may repay the loan over several years while paying thousands in additional interest charges.
            </p>

            <p>
              Increasing monthly payments by even small amounts may shorten payoff timelines significantly and reduce overall borrowing costs.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Fixed vs Variable Interest Rates
            </h3>

            <p>
              Fixed-rate loans maintain the same interest rate throughout repayment,
              while variable-rate loans may change over time based on market conditions.
              Variable rates may create lower initial payments but may also increase repayment uncertainty.
            </p>

            <p>
              Borrowers should carefully compare loan structures,
              repayment flexibility,
              and long-term affordability before selecting financing products.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="How can I reduce interest charges?"
                answer="Increasing monthly payments and reducing balances faster may lower total interest costs significantly."
              />

              <FaqItem
                question="Why is most of my payment going toward interest?"
                answer="Early loan payments often contain higher interest portions because the outstanding balance is largest at the beginning."
              />

              <FaqItem
                question="Does refinancing lower interest costs?"
                answer="Refinancing may reduce interest expenses if borrowers qualify for lower rates."
              />

              <FaqItem
                question="Can extra payments shorten repayment timelines?"
                answer="Yes. Additional payments may reduce principal balances faster and shorten payoff schedules."
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
                title: "Loan Payoff Calculator",
                link: "/loan-payoff-calculator",
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
                title: "Simple Interest Calculator",
                link: "/simple-interest-calculator",
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