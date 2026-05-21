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

export default function CapitalGainsCalculator() {

  const [purchasePrice, setPurchasePrice] = useState(25000);

  const [salePrice, setSalePrice] = useState(60000);

  const [taxRate, setTaxRate] = useState(15);

  const [holdingYears, setHoldingYears] = useState(8);

  const capitalGain =
    salePrice - purchasePrice;

  const estimatedTax =
    capitalGain * (taxRate / 100);

  const afterTaxProfit =
    capitalGain - estimatedTax;

  const annualizedReturn =
    (
      Math.pow(
        salePrice / purchasePrice,
        1 / holdingYears
      ) - 1
    ) * 100;

  const pieData = [
    {
      name: "Original Investment",
      value: purchasePrice,
    },

    {
      name: "After-Tax Profit",
      value: afterTaxProfit,
    },

    {
      name: "Estimated Tax",
      value: estimatedTax,
    },
  ];

  const lineData = useMemo(() => {

    return [
      {
        year: "Year 1",
        value:
          purchasePrice +
          capitalGain * 0.10,
      },

      {
        year: "Year 3",
        value:
          purchasePrice +
          capitalGain * 0.35,
      },

      {
        year: "Year 5",
        value:
          purchasePrice +
          capitalGain * 0.60,
      },

      {
        year: "Year 7",
        value:
          purchasePrice +
          capitalGain * 0.85,
      },

      {
        year: "Year 8",
        value: salePrice,
      },
    ];

  }, [
    purchasePrice,
    capitalGain,
    salePrice,
  ]);

  const compareData = [
    {
      name: "Investment",
      value: purchasePrice,
    },

    {
      name: "Capital Gain",
      value: capitalGain,
    },

    {
      name: "After Tax",
      value: afterTaxProfit,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-rose-800 to-orange-600 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Capital Gains Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Estimate investment profits,
              capital gains taxes,
              annualized returns,
              and after-tax investment performance using this free capital gains calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Purchase Price"
                  value={purchasePrice}
                  setValue={setPurchasePrice}
                  prefix="$"
                />

                <InputField
                  label="Sale Price"
                  value={salePrice}
                  setValue={setSalePrice}
                  prefix="$"
                />

                <InputField
                  label="Capital Gains Tax Rate"
                  value={taxRate}
                  setValue={setTaxRate}
                  suffix="%"
                />

                <InputField
                  label="Holding Period"
                  value={holdingYears}
                  setValue={setHoldingYears}
                  suffix="Years"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-orange-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-rose-800 to-orange-600 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  After-Tax Capital Gain
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  ${afterTaxProfit.toFixed(0)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Capital Gains Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Capital Gain"
                    value={`$${capitalGain.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Estimated Tax"
                    value={`$${estimatedTax.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="After-Tax Profit"
                    value={`$${afterTaxProfit.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Annualized Return"
                    value={`${annualizedReturn.toFixed(2)}%`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Capital Gains Breakdown
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

                    <Cell fill="#9f1239" />
                    <Cell fill="#fb923c" />
                    <Cell fill="#fcd34d" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Original Investment"
                value={`$${purchasePrice.toFixed(0)}`}
              />

              <SummaryCard
                title="Taxable Gain"
                value={`$${capitalGain.toFixed(0)}`}
              />

              <SummaryCard
                title="After-Tax Profit"
                value={`$${afterTaxProfit.toFixed(0)}`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Investment Growth Timeline
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
                  dataKey="value"
                  stroke="#9f1239"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Capital Gain Comparison
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
                  fill="#9f1239"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Capital Gains Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A capital gains calculator helps investors estimate taxable investment profits,
              annualized returns,
              and after-tax portfolio performance.
              Capital gains calculations are commonly used for stocks,
              ETFs,
              mutual funds,
              real estate investments,
              cryptocurrency,
              and other appreciating assets.
            </p>

            <p>
              Investors often use capital gains calculators to estimate tax liabilities before selling investments.
              Understanding potential taxes may help investors plan portfolio withdrawals,
              optimize holding periods,
              and improve long-term investment efficiency.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Are Capital Gains?
            </h3>

            <p>
              Capital gains represent profits earned when an investment or asset is sold for a higher price than its original purchase cost.
              The difference between the sale price and purchase price determines the taxable gain amount.
            </p>

            <p>
              Capital gains may apply to stocks,
              ETFs,
              mutual funds,
              bonds,
              investment properties,
              and digital assets such as cryptocurrency.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Capital Gains Formula
            </h3>

            <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

              <code className="text-lg">
                Capital Gain = Sale Price - Purchase Price
              </code>

            </div>

            <p>
              After calculating total gains,
              estimated taxes may be subtracted to estimate after-tax investment profits.
            </p>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Purchase Price = Original investment cost
              </li>

              <li>
                Sale Price = Final selling value
              </li>

              <li>
                Tax Rate = Estimated capital gains tax percentage
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Short-Term vs Long-Term Capital Gains
            </h3>

            <p>
              Many countries distinguish between short-term and long-term capital gains.
              Long-term gains generally receive more favorable tax treatment when investments are held beyond minimum holding periods.
            </p>

            <p>
              Short-term gains may be taxed at higher ordinary income tax rates depending on local tax laws and investor income brackets.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Example Capital Gain Scenario
            </h3>

            <p>
              Suppose an investor purchases stocks for $25,000 and later sells the investment for $60,000 after eight years.
              The total capital gain equals $35,000 before taxes.
            </p>

            <p>
              If the estimated long-term capital gains tax rate is 15%,
              taxes may reduce net profits,
              affecting overall after-tax investment performance.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why After-Tax Returns Matter
            </h3>

            <p>
              Taxes may significantly reduce long-term investment profits.
              Investors commonly analyze after-tax returns when comparing investment strategies,
              retirement withdrawals,
              and asset allocation decisions.
            </p>

            <p>
              Tax-efficient investing strategies may improve long-term portfolio performance and wealth accumulation.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Factors Affecting Capital Gains Taxes
            </h3>

            <ul className="list-disc pl-6 space-y-3">

              <li>
                Holding period duration
              </li>

              <li>
                Investor income level
              </li>

              <li>
                Asset type
              </li>

              <li>
                Local tax regulations
              </li>

              <li>
                Available tax deductions
              </li>

              <li>
                Tax-loss harvesting strategies
              </li>

            </ul>

            <h3 className="text-2xl font-black text-slate-900">
              Tax-Efficient Investing Strategies
            </h3>

            <p>
              Investors may reduce taxable gains using strategies such as long-term investing,
              tax-loss harvesting,
              retirement account contributions,
              and diversified portfolio management.
            </p>

            <p>
              Many retirement accounts offer tax advantages that may reduce or defer capital gains taxes over long investment periods.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Annualized Return and Capital Gains
            </h3>

            <p>
              Annualized return calculations help investors compare performance across different investments and holding periods.
              Even moderate annualized returns may produce substantial capital gains over long investment horizons due to compound growth.
            </p>

            <p>
              Long-term investing strategies commonly prioritize steady growth,
              diversification,
              and disciplined portfolio management rather than short-term speculation.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a capital gain?"
                answer="A capital gain is the profit earned when an investment or asset is sold for more than its original purchase price."
              />

              <FaqItem
                question="Are long-term capital gains taxed differently?"
                answer="In many countries, long-term capital gains receive lower tax rates compared to short-term gains."
              />

              <FaqItem
                question="Why are after-tax returns important?"
                answer="Taxes may significantly affect net investment profits and long-term portfolio performance."
              />

              <FaqItem
                question="Can capital losses reduce taxes?"
                answer="Many investors use tax-loss harvesting strategies to offset taxable capital gains with investment losses."
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
                title: "Investment Return Calculator",
                link: "/investment-return-calculator",
              },

              {
                title: "Annual Return Calculator",
                link: "/annual-return-calculator",
              },

              {
                title: "Stock Calculator",
                link: "/stock-calculator",
              },

              {
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "ETF Calculator",
                link: "/etf-calculator",
              },

              {
                title: "Net Worth Calculator",
                link: "/net-worth-calculator",
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