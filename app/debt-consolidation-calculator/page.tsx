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

export default function DebtConsolidationCalculator() {

  const [totalDebt, setTotalDebt] = useState(35000);

  const [currentAPR, setCurrentAPR] = useState(24.9);

  const [newAPR, setNewAPR] = useState(11.5);

  const [loanTerm, setLoanTerm] = useState(5);

  const currentMonthlyRate =
    currentAPR / 100 / 12;

  const consolidationRate =
    newAPR / 100 / 12;

  const totalMonths =
    loanTerm * 12;

  const currentMonthlyPayment =
    (totalDebt *
      currentMonthlyRate *
      Math.pow(1 + currentMonthlyRate, totalMonths)) /
    (Math.pow(1 + currentMonthlyRate, totalMonths) - 1);

  const consolidationPayment =
    (totalDebt *
      consolidationRate *
      Math.pow(1 + consolidationRate, totalMonths)) /
    (Math.pow(1 + consolidationRate, totalMonths) - 1);

  const currentTotalCost =
    currentMonthlyPayment * totalMonths;

  const consolidationTotalCost =
    consolidationPayment * totalMonths;

  const currentInterest =
    currentTotalCost - totalDebt;

  const consolidationInterest =
    consolidationTotalCost - totalDebt;

  const totalSavings =
    currentInterest - consolidationInterest;

  const pieData = [
    {
      name: "Debt Balance",
      value: totalDebt,
    },

    {
      name: "Interest Savings",
      value: totalSavings > 0
        ? totalSavings
        : 0,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        current: totalDebt * 0.88,
        consolidation: totalDebt * 0.77,
      },

      {
        year: "Year 2",
        current: totalDebt * 0.69,
        consolidation: totalDebt * 0.52,
      },

      {
        year: "Year 3",
        current: totalDebt * 0.48,
        consolidation: totalDebt * 0.28,
      },

      {
        year: "Year 4",
        current: totalDebt * 0.23,
        consolidation: totalDebt * 0.11,
      },

      {
        year: "Paid Off",
        current: 0,
        consolidation: 0,
      },
    ];

  }, [totalDebt]);

  const compareData = [
    {
      name: "Current Interest",
      value: currentInterest,
    },

    {
      name: "Consolidated Interest",
      value: consolidationInterest,
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
              Debt Consolidation Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate debt consolidation savings,
              lower monthly payments,
              interest reduction,
              and faster debt payoff strategies using this free calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Total Debt Balance"
                  value={totalDebt}
                  setValue={setTotalDebt}
                  prefix="$"
                />

                <InputField
                  label="Current APR"
                  value={currentAPR}
                  setValue={setCurrentAPR}
                  suffix="%"
                />

                <InputField
                  label="Consolidation APR"
                  value={newAPR}
                  setValue={setNewAPR}
                  suffix="%"
                />

                <InputField
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-indigo-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Interest Savings
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${totalSavings.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Consolidation Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Current Monthly Payment"
                    value={`$${currentMonthlyPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Consolidated Payment"
                    value={`$${consolidationPayment.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Current Interest"
                    value={`$${currentInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Savings"
                    value={`$${totalSavings.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Debt Consolidation Breakdown
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
                title="Total Debt"
                value={`$${totalDebt.toFixed(0)}`}
              />

              <SummaryCard
                title="Current Interest"
                value={`$${currentInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Potential Savings"
                value={`$${totalSavings.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Debt Payoff Timeline Comparison
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
                  dataKey="consolidation"
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
            Interest Cost Comparison
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
            Debt Consolidation Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A debt consolidation calculator helps borrowers estimate whether combining multiple debts into a single loan may reduce interest costs,
              simplify repayment,
              and improve long-term financial management.
              Debt consolidation is commonly used for credit card balances,
              personal loans,
              medical debt,
              and other high-interest obligations.
            </p>

            <p>
              By consolidating debt into one lower-interest loan,
              borrowers may reduce monthly payments,
              lower total interest expenses,
              and create a more predictable repayment schedule.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Debt Consolidation Works
            </h3>

            <p>
              Debt consolidation combines multiple outstanding balances into a single new loan or repayment structure.
              Instead of managing several payments with different due dates and interest rates,
              borrowers make one monthly payment toward the consolidated balance.
            </p>

            <p>
              Many borrowers use debt consolidation loans,
              balance transfer credit cards,
              or home equity products to refinance higher-interest debt obligations.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Debt Consolidation Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Monthly Payment =
                P × [r(1+r)^n] ÷ [(1+r)^n − 1]
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                P = Total consolidated debt balance
              </li>

              <li>
                r = Monthly interest rate
              </li>

              <li>
                n = Total repayment months
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Debt Consolidation
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Simplify multiple monthly payments
              </li>

              <li>
                Reduce high-interest borrowing costs
              </li>

              <li>
                Improve debt management organization
              </li>

              <li>
                Potentially lower monthly payments
              </li>

              <li>
                Create predictable repayment schedules
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks of Debt Consolidation
            </h3>

            <p>
              Debt consolidation does not eliminate debt balances.
              Borrowers who continue accumulating new debt after consolidation may experience even larger financial burdens over time.
            </p>

            <p>
              Some consolidation loans may also include fees,
              longer repayment terms,
              or collateral requirements depending on the financing structure.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Debt Consolidation Scenario
            </h3>

            <p>
              Suppose a borrower owes $35,000 across several credit cards with average APRs near 25%.
              Refinancing those balances into a consolidation loan at 11.5% APR may significantly reduce long-term interest costs.
            </p>

            <p>
              Lower rates combined with consistent payments may help borrowers eliminate debt faster and improve overall financial stability.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Debt Consolidation vs Debt Settlement
            </h3>

            <p>
              Debt consolidation differs from debt settlement.
              Consolidation restructures repayment,
              while settlement attempts to negotiate reduced balances with creditors.
              Settlement programs may negatively affect credit scores and carry additional financial risks.
            </p>

            <p>
              Many borrowers prefer consolidation because it preserves repayment history while potentially lowering interest expenses.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Tips to Maximize Debt Consolidation Savings
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Compare multiple lender offers
              </li>

              <li>
                Avoid new revolving debt balances
              </li>

              <li>
                Select affordable repayment terms
              </li>

              <li>
                Pay more than minimum amounts when possible
              </li>

              <li>
                Monitor credit utilization carefully
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Does debt consolidation hurt credit scores?"
                answer="Temporary credit inquiries may slightly affect scores, but consistent repayment may improve long-term credit health."
              />

              <FaqItem
                question="Can debt consolidation lower monthly payments?"
                answer="Yes. Lower interest rates or longer repayment terms may reduce monthly payment obligations."
              />

              <FaqItem
                question="Is debt consolidation the same as refinancing?"
                answer="Debt consolidation is a type of refinancing that combines multiple debts into one repayment structure."
              />

              <FaqItem
                question="Should I consolidate high-interest credit cards?"
                answer="Many borrowers consolidate high-interest credit card debt to reduce interest expenses and simplify repayment."
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
                title: "Debt Payoff Calculator",
                link: "/debt-payoff-calculator",
              },

              {
                title: "Balance Transfer Calculator",
                link: "/balance-transfer-calculator",
              },

              {
                title: "Loan Payoff Calculator",
                link: "/loan-payoff-calculator",
              },

              {
                title: "Interest Payoff Calculator",
                link: "/interest-payoff-calculator",
              },

              {
                title: "Credit Utilization Calculator",
                link: "/credit-utilization-calculator",
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