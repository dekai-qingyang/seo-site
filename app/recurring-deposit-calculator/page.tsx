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
  Legend,
  AreaChart,
  Area,
} from "recharts";

export default function RecurringDepositCalculator() {

  const [monthlyDeposit, setMonthlyDeposit] = useState(500);

  const [interestRate, setInterestRate] = useState(6.5);

  const [years, setYears] = useState(5);

  const [compoundFrequency, setCompoundFrequency] = useState(4);

  const totalMonths =
    years * 12;

  const monthlyRate =
    interestRate / 100 / 12;

  const maturityValue =
    monthlyDeposit *
    (
      (
        Math.pow(
          1 + monthlyRate,
          totalMonths
        ) - 1
      ) / monthlyRate
    ) *
    (1 + monthlyRate);

  const totalDeposits =
    monthlyDeposit *
    totalMonths;

  const totalInterest =
    maturityValue -
    totalDeposits;

  const apy =
    (
      Math.pow(
        1 +
          (
            interestRate /
            100 /
            compoundFrequency
          ),
        compoundFrequency
      ) - 1
    ) * 100;

  const growthData = useMemo(() => {

    const data = [];

    for (
      let year = 1;
      year <= years;
      year++
    ) {

      const months =
        year * 12;

      const value =
        monthlyDeposit *
        (
          (
            Math.pow(
              1 + monthlyRate,
              months
            ) - 1
          ) / monthlyRate
        ) *
        (1 + monthlyRate);

      data.push({
        year: `Year ${year}`,
        balance: Number(
          value.toFixed(0)
        ),
      });

    }

    return data;

  }, [
    monthlyDeposit,
    monthlyRate,
    years,
  ]);

  const pieData = [
    {
      name: "Deposits",
      value: totalDeposits,
    },

    {
      name: "Interest Earned",
      value: totalInterest,
    },
  ];

  const compareData = [
    {
      name: "Deposits",
      value: totalDeposits,
    },

    {
      name: "Interest",
      value: totalInterest,
    },

    {
      name: "Maturity Value",
      value: maturityValue,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-violet-900 to-purple-500 px-6 py-8 text-white">

            <div className="flex flex-wrap gap-3 mb-5">

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Updated 2026
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Fixed Savings Tool
              </div>

            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Recurring Deposit Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-4xl leading-8">
              Estimate recurring deposit maturity value,
              compound interest earnings,
              monthly savings growth,
              and long-term fixed deposit returns using this advanced RD calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Monthly Deposit"
                  value={monthlyDeposit}
                  setValue={setMonthlyDeposit}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Deposit Term"
                  value={years}
                  setValue={setYears}
                  suffix="Years"
                />

                <div>

                  <label className="block text-sm font-bold mb-2 text-slate-800">
                    Compound Frequency
                  </label>

                  <select
                    value={compoundFrequency}
                    onChange={(e) =>
                      setCompoundFrequency(
                        Number(e.target.value)
                      )
                    }
                    className="w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white text-black font-bold text-lg"
                  >

                    <option value={1}>
                      Annually
                    </option>

                    <option value={2}>
                      Semi-Annually
                    </option>

                    <option value={4}>
                      Quarterly
                    </option>

                    <option value={12}>
                      Monthly
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-purple-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-violet-900 to-purple-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Estimated Maturity Value
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${maturityValue.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Recurring Deposit Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Deposits"
                    value={`$${totalDeposits.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Interest Earned"
                    value={`$${totalInterest.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated APY"
                    value={`${apy.toFixed(2)}%`}
                  />

                  <SummaryRow
                    label="Maturity Amount"
                    value={`$${maturityValue.toFixed(0)}`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <SummaryCard
            title="Monthly Deposit"
            value={`$${monthlyDeposit.toFixed(0)}`}
          />

          <SummaryCard
            title="Total Deposits"
            value={`$${totalDeposits.toFixed(0)}`}
          />

          <SummaryCard
            title="Interest Earned"
            value={`$${totalInterest.toFixed(0)}`}
          />

          <SummaryCard
            title="Maturity Value"
            value={`$${maturityValue.toFixed(0)}`}
          />

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Deposit vs Interest Breakdown
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

                    <Cell fill="#4c1d95" />
                    <Cell fill="#8b5cf6" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Total Deposits"
                value={`$${totalDeposits.toFixed(0)}`}
              />

              <SummaryCard
                title="Compound Interest"
                value={`$${totalInterest.toFixed(0)}`}
              />

              <SummaryCard
                title="Future Maturity Value"
                value={`$${maturityValue.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Recurring Deposit Growth Timeline
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#7c3aed"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AREA CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Compound Interest Accumulation
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <AreaChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#7c3aed"
                  fill="#c4b5fd"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Deposit Comparison
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
                  fill="#7c3aed"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Recurring Deposit Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A recurring deposit calculator helps estimate maturity value,
              compound interest earnings,
              total deposits,
              and long-term savings growth for recurring deposit accounts.
              Recurring deposits,
              commonly known as RDs,
              are fixed savings products offered by banks and financial institutions.
            </p>

            <p>
              Investors and savers use recurring deposits to build disciplined savings habits through regular monthly contributions.
              RDs are popular because they offer predictable returns,
              lower risk,
              and stable compound interest growth over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is a Recurring Deposit?
            </h3>

            <p>
              A recurring deposit is a financial savings product where individuals deposit a fixed amount every month for a selected term.
              The deposited amount earns interest until maturity,
              helping savers gradually accumulate wealth.
            </p>

            <p>
              Recurring deposits are commonly used for medium-term financial goals such as education savings,
              travel funds,
              emergency reserves,
              vehicle purchases,
              or home improvements.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              How Recurring Deposits Work
            </h3>

            <p>
              In a recurring deposit account,
              investors contribute fixed monthly deposits while the bank compounds interest over time.
              At maturity,
              the saver receives the total deposits plus accumulated interest earnings.
            </p>

            <p>
              Interest rates are typically fixed at the beginning of the deposit term,
              which provides predictable returns and stable financial planning.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Compound Interest Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                M = P × [((1+r)^n - 1) / r] × (1+r)
              </code>

            </div>

            <p>
              In this formula:
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                M = Maturity Value
              </li>

              <li>
                P = Monthly Deposit
              </li>

              <li>
                r = Monthly Interest Rate
              </li>

              <li>
                n = Total Number of Deposits
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Benefits of Recurring Deposits
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Encourages disciplined savings habits
              </li>

              <li>
                Predictable fixed returns
              </li>

              <li>
                Lower investment risk
              </li>

              <li>
                Stable compound interest growth
              </li>

              <li>
                Suitable for medium-term financial goals
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              RD vs Fixed Deposit
            </h3>

            <p>
              Fixed deposits generally require a large one-time lump sum investment,
              while recurring deposits allow gradual monthly contributions.
              Recurring deposits are often preferred by salaried workers and individuals who want to save smaller amounts consistently.
            </p>

            <p>
              Both RDs and fixed deposits provide relatively stable interest earnings compared to market-based investments.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              APY and Interest Rates
            </h3>

            <p>
              APY,
              or Annual Percentage Yield,
              reflects the effective yearly return after compound interest.
              More frequent compounding schedules generally increase total maturity value.
            </p>

            <p>
              Investors commonly compare APYs across recurring deposits,
              savings accounts,
              certificates of deposit,
              and money market accounts before selecting savings products.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Risks and Limitations
            </h3>

            <p>
              Although recurring deposits are considered conservative savings products,
              inflation may reduce the real purchasing power of future maturity amounts over time.
            </p>

            <p>
              Some recurring deposit accounts may also charge penalties for missed payments or early withdrawals before maturity.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Savings Strategies
            </h3>

            <p>
              Many savers use recurring deposits alongside emergency funds,
              retirement accounts,
              and investment portfolios to balance safety and long-term financial growth.
            </p>

            <p>
              Automatic monthly transfers can help maintain consistent savings discipline and reduce missed contributions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Scenarios
            </h3>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 1 — Education Savings
                </h4>

                <p>
                  A parent deposits $500 monthly into a recurring deposit account earning 6.5% annual interest for five years.
                  Compound interest steadily increases the maturity amount while maintaining stable savings growth.
                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <h4 className="text-xl font-black mb-3 text-slate-900">
                  Example 2 — Vacation Planning
                </h4>

                <p>
                  Individuals frequently use recurring deposits to save gradually for future vacations,
                  weddings,
                  vehicle purchases,
                  and other planned financial goals.
                </p>

              </div>

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a recurring deposit?"
                answer="A recurring deposit is a savings product that allows individuals to make fixed monthly deposits while earning compound interest."
              />

              <FaqItem
                question="How is recurring deposit interest calculated?"
                answer="Interest is typically compounded periodically based on the selected deposit term and bank policy."
              />

              <FaqItem
                question="Are recurring deposits safe?"
                answer="Recurring deposits are generally considered conservative low-risk savings products offered by banks and financial institutions."
              />

              <FaqItem
                question="Can I withdraw funds early?"
                answer="Some recurring deposit accounts allow early withdrawals but may apply penalties or reduced interest rates."
              />

              <FaqItem
                question="What is the difference between RD and FD?"
                answer="Recurring deposits use monthly contributions while fixed deposits typically require a single lump sum investment."
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
                title: "CD Calculator",
                link: "/cd-calculator",
              },

              {
                title: "Certificate of Deposit Calculator",
                link: "/certificate-of-deposit-calculator",
              },

              {
                title: "High Yield Savings Calculator",
                link: "/high-yield-savings-calculator",
              },

              {
                title: "Bank Interest Calculator",
                link: "/bank-interest-calculator",
              },

              {
                title: "Savings Calculator",
                link: "/savings-calculator",
              },

              {
                title: "Compound Interest Calculator",
                link: "/compound-interest-calculator",
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

    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">

      <div className="text-slate-600 mb-2 font-semibold">
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