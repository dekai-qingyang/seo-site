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

export default function LineOfCreditCalculator() {

  const [creditLimit, setCreditLimit] = useState(50000);

  const [creditUsed, setCreditUsed] = useState(18000);

  const [interestRate, setInterestRate] = useState(8.4);

  const [monthlyPayment, setMonthlyPayment] = useState(700);

  const monthlyRate =
    interestRate / 100 / 12;

  const utilization =
    (creditUsed / creditLimit) * 100;

  const payoffMonths =
    Math.ceil(
      -Math.log(
        1 -
          (creditUsed * monthlyRate) /
            monthlyPayment
      ) / Math.log(1 + monthlyRate)
    );

  const totalPaid =
    payoffMonths * monthlyPayment;

  const totalInterest =
    totalPaid - creditUsed;

  const availableCredit =
    creditLimit - creditUsed;

  const pieData = [
    {
      name: "Used Credit",
      value: creditUsed,
    },

    {
      name: "Available Credit",
      value: availableCredit,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        balance: creditUsed * 0.82,
      },

      {
        year: "Year 2",
        balance: creditUsed * 0.59,
      },

      {
        year: "Year 3",
        balance: creditUsed * 0.34,
      },

      {
        year: "Year 4",
        balance: creditUsed * 0.12,
      },

      {
        year: "Paid Off",
        balance: 0,
      },
    ];

  }, [creditUsed]);

  const compareData = [
    {
      name: "Credit Used",
      value: creditUsed,
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

          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Line of Credit Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate line of credit payments,
              credit utilization,
              repayment schedules,
              interest costs,
              and borrowing flexibility with this free calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Credit Limit"
                  value={creditLimit}
                  setValue={setCreditLimit}
                  prefix="$"
                />

                <InputField
                  label="Credit Used"
                  value={creditUsed}
                  setValue={setCreditUsed}
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

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Credit Utilization
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  {utilization.toFixed(1)}%
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Credit Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Available Credit"
                    value={`$${availableCredit.toFixed(0)}`}
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
            Credit Utilization Breakdown
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
                title="Credit Limit"
                value={`$${creditLimit.toFixed(0)}`}
              />

              <SummaryCard
                title="Used Credit"
                value={`$${creditUsed.toFixed(0)}`}
              />

              <SummaryCard
                title="Available Credit"
                value={`$${availableCredit.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Credit Balance Payoff Timeline
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
            Line of Credit Cost Comparison
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
            Line of Credit Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A line of credit calculator helps borrowers estimate monthly payments,
              repayment timelines,
              credit utilization,
              and total borrowing costs.
              Lines of credit provide flexible access to funds that borrowers may use repeatedly up to an approved limit.
            </p>

            <p>
              Unlike traditional installment loans,
              lines of credit allow borrowers to draw funds as needed.
              Interest is typically charged only on the amount currently borrowed rather than the total approved limit.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How a Line of Credit Works
            </h3>

            <p>
              A line of credit functions as revolving debt.
              Borrowers may withdraw funds,
              repay balances,
              and borrow again as long as they remain within the approved credit limit.
            </p>

            <p>
              Common examples include personal lines of credit,
              business lines of credit,
              and home equity lines of credit (HELOCs).
              These financing products are often used for emergencies,
              home improvements,
              business cash flow,
              or flexible ongoing expenses.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Credit Utilization Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Utilization = (Used Credit ÷ Credit Limit) × 100
              </code>

            </div>

            <p>
              Credit utilization measures how much available credit is currently being used.
              Lower utilization ratios are generally considered healthier for credit scores.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Credit Utilization Matters
            </h3>

            <p>
              High credit utilization may negatively impact credit scores and borrowing eligibility.
              Many financial experts recommend keeping utilization below 30% whenever possible.
            </p>

            <p>
              Borrowers with lower utilization ratios often qualify for better interest rates,
              improved financing options,
              and stronger credit profiles.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of a Line of Credit
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Flexible borrowing access
              </li>

              <li>
                Interest charged only on used balances
              </li>

              <li>
                Reusable revolving credit structure
              </li>

              <li>
                Helpful for emergency expenses
              </li>

              <li>
                Potentially lower rates than credit cards
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks of Using a Line of Credit
            </h3>

            <p>
              Because lines of credit provide continuous access to borrowing,
              some borrowers may accumulate debt balances over time.
              Variable interest rates may also increase repayment costs if market rates rise.
            </p>

            <p>
              Borrowers should monitor balances carefully and avoid excessive utilization that may weaken credit health.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Line of Credit Scenario
            </h3>

            <p>
              For example,
              a borrower with a $50,000 line of credit using $18,000 at an 8.4% interest rate may repay the balance over several years depending on monthly payment amounts.
            </p>

            <p>
              Increasing monthly payments may reduce interest costs significantly and shorten payoff timelines.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Strategies to Manage Credit Lines
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Keep utilization ratios low
              </li>

              <li>
                Avoid unnecessary borrowing
              </li>

              <li>
                Pay balances consistently
              </li>

              <li>
                Monitor variable interest rates
              </li>

              <li>
                Maintain emergency savings when possible
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a good credit utilization ratio?"
                answer="Many lenders prefer utilization ratios below 30% for healthier credit profiles."
              />

              <FaqItem
                question="Do lines of credit affect credit scores?"
                answer="Yes. Credit utilization, payment history, and outstanding balances may affect credit scores."
              />

              <FaqItem
                question="Can I reuse available credit?"
                answer="Yes. Revolving credit structures allow borrowers to reuse available credit after repayment."
              />

              <FaqItem
                question="Are line of credit rates fixed or variable?"
                answer="Many lines of credit use variable interest rates that may change based on market conditions."
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
                title: "HELOC Calculator",
                link: "/home-equity-line-of-credit-calculator",
              },

              {
                title: "Credit Utilization Calculator",
                link: "/credit-utilization-calculator",
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