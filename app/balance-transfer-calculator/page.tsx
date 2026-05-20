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

export default function BalanceTransferCalculator() {

  const [currentBalance, setCurrentBalance] = useState(12000);

  const [currentAPR, setCurrentAPR] = useState(22.9);

  const [transferAPR, setTransferAPR] = useState(0);

  const [transferFee, setTransferFee] = useState(3);

  const [monthlyPayment, setMonthlyPayment] = useState(450);

  const monthlyCurrentRate =
    currentAPR / 100 / 12;

  const monthlyTransferRate =
    transferAPR / 100 / 12;

  const currentMonths =
    Math.ceil(
      -Math.log(
        1 -
          (currentBalance * monthlyCurrentRate) /
            monthlyPayment
      ) / Math.log(1 + monthlyCurrentRate)
    );

  const currentTotal =
    currentMonths * monthlyPayment;

  const currentInterest =
    currentTotal - currentBalance;

  const transferFeeAmount =
    currentBalance * (transferFee / 100);

  const transferBalance =
    currentBalance + transferFeeAmount;

  const transferMonths =
    Math.ceil(
      transferBalance / monthlyPayment
    );

  const transferTotal =
    transferMonths * monthlyPayment;

  const transferInterest =
    transferTotal - transferBalance;

  const totalSavings =
    currentInterest - transferInterest;

  const pieData = [
    {
      name: "Balance",
      value: currentBalance,
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
        month: "Month 1",
        current: currentBalance * 0.95,
        transfer: transferBalance * 0.90,
      },

      {
        month: "Month 6",
        current: currentBalance * 0.73,
        transfer: transferBalance * 0.55,
      },

      {
        month: "Month 12",
        current: currentBalance * 0.48,
        transfer: transferBalance * 0.22,
      },

      {
        month: "Month 18",
        current: currentBalance * 0.18,
        transfer: 0,
      },

      {
        month: "Paid Off",
        current: 0,
        transfer: 0,
      },
    ];

  }, [currentBalance, transferBalance]);

  const compareData = [
    {
      name: "Current Interest",
      value: currentInterest,
    },

    {
      name: "Transfer Interest",
      value: transferInterest,
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
              Balance Transfer Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate balance transfer savings,
              credit card payoff timelines,
              transfer fees,
              and interest reduction strategies with this free calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Current Credit Card Balance"
                  value={currentBalance}
                  setValue={setCurrentBalance}
                  prefix="$"
                />

                <InputField
                  label="Current APR"
                  value={currentAPR}
                  setValue={setCurrentAPR}
                  suffix="%"
                />

                <InputField
                  label="Balance Transfer APR"
                  value={transferAPR}
                  setValue={setTransferAPR}
                  suffix="%"
                />

                <InputField
                  label="Transfer Fee"
                  value={transferFee}
                  setValue={setTransferFee}
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
                    Transfer Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Transfer Fee Amount"
                    value={`$${transferFeeAmount.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Current Interest Cost"
                    value={`$${currentInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Transfer Interest Cost"
                    value={`$${transferInterest.toFixed(0)}`}
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
            Balance Transfer Breakdown
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
                title="Current Balance"
                value={`$${currentBalance.toFixed(0)}`}
              />

              <SummaryCard
                title="Transfer Fee"
                value={`$${transferFeeAmount.toFixed(0)}`}
              />

              <SummaryCard
                title="Interest Savings"
                value={`$${totalSavings.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Payoff Timeline Comparison
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

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
                  dataKey="transfer"
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
            Balance Transfer Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A balance transfer calculator helps borrowers estimate whether transferring high-interest credit card balances to a lower-rate account may reduce repayment costs.
              Many balance transfer credit cards offer promotional low-interest or 0% APR periods designed to help consumers pay down debt faster.
            </p>

            <p>
              This calculator estimates transfer fees,
              repayment timelines,
              interest savings,
              and total borrowing costs under different repayment scenarios.
              Understanding these costs may help borrowers make better debt management decisions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Balance Transfers Work
            </h3>

            <p>
              A balance transfer moves existing debt from one credit card account to another.
              Borrowers typically seek lower promotional interest rates to reduce interest charges and accelerate debt payoff.
            </p>

            <p>
              Many balance transfer offers include introductory 0% APR periods ranging from several months to over a year.
              However,
              most lenders also charge transfer fees,
              usually between 3% and 5% of the transferred balance.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Balance Transfer Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Transfer Fee = Balance × Transfer Fee %
              </code>

            </div>

            <p>
              Borrowers should compare potential interest savings against transfer fees to determine whether refinancing credit card balances makes financial sense.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Balance Transfers
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Reduce high-interest credit card costs
              </li>

              <li>
                Simplify debt repayment
              </li>

              <li>
                Accelerate payoff timelines
              </li>

              <li>
                Lower monthly interest charges
              </li>

              <li>
                Improve financial flexibility
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Risks of Balance Transfers
            </h3>

            <p>
              Balance transfers may not always save money if repayment is not completed before promotional rates expire.
              After introductory periods end,
              standard APRs may increase borrowing costs significantly.
            </p>

            <p>
              Borrowers should also avoid accumulating new balances on original credit cards while paying down transferred debt.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Balance Transfer Scenario
            </h3>

            <p>
              Suppose a borrower has a $12,000 credit card balance at 22.9% APR.
              Transferring the balance to a promotional 0% APR card with a 3% transfer fee may reduce long-term interest costs substantially if repayment occurs before promotional rates expire.
            </p>

            <p>
              Faster monthly payments may maximize savings and shorten overall debt payoff timelines.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Strategies to Maximize Savings
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Pay balances aggressively during promotional periods
              </li>

              <li>
                Avoid new revolving debt
              </li>

              <li>
                Compare transfer fees carefully
              </li>

              <li>
                Monitor promotional expiration dates
              </li>

              <li>
                Maintain consistent monthly payments
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Balance Transfer vs Personal Loan
            </h3>

            <p>
              Some borrowers compare balance transfer cards with personal debt consolidation loans.
              Personal loans may offer fixed repayment schedules,
              while balance transfers often provide lower temporary promotional rates.
            </p>

            <p>
              Choosing the right repayment strategy depends on repayment speed,
              borrowing discipline,
              and available financing terms.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="Do balance transfers hurt credit scores?"
                answer="Temporary credit inquiries may slightly affect scores, but lower utilization may improve scores over time."
              />

              <FaqItem
                question="What happens after promotional APR periods expire?"
                answer="Remaining balances may begin accruing interest at the standard credit card APR."
              />

              <FaqItem
                question="Are transfer fees always charged?"
                answer="Most balance transfer cards charge transfer fees, typically ranging from 3% to 5%."
              />

              <FaqItem
                question="Can balance transfers reduce total debt costs?"
                answer="Yes. Lower promotional interest rates may significantly reduce repayment costs if balances are repaid quickly."
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
                title: "Credit Utilization Calculator",
                link: "/credit-utilization-calculator",
              },

              {
                title: "Interest Payoff Calculator",
                link: "/interest-payoff-calculator",
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