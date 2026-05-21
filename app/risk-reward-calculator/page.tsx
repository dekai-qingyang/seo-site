// app/risk-reward-calculator/page.tsx

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
} from "recharts";

export default function RiskRewardCalculator() {

  const [entryPrice, setEntryPrice] = useState(100);

  const [stopLoss, setStopLoss] = useState(90);

  const [targetPrice, setTargetPrice] = useState(130);

  const [positionSize, setPositionSize] = useState(10000);

  const riskPerShare =
    entryPrice - stopLoss;

  const rewardPerShare =
    targetPrice - entryPrice;

  const riskRewardRatio =
    rewardPerShare / riskPerShare;

  const shares =
    positionSize / entryPrice;

  const totalRisk =
    shares * riskPerShare;

  const totalReward =
    shares * rewardPerShare;

  const winRateNeeded =
    (
      riskPerShare /
      (
        rewardPerShare +
        riskPerShare
      )
    ) * 100;

  const pieData = [
    {
      name: "Potential Reward",
      value: totalReward,
    },

    {
      name: "Potential Risk",
      value: totalRisk,
    },
  ];

  const growthData = [
    {
      trade: "Trade 1",
      reward: totalReward * 0.2,
      risk: totalRisk * 0.2,
    },

    {
      trade: "Trade 2",
      reward: totalReward * 0.4,
      risk: totalRisk * 0.4,
    },

    {
      trade: "Trade 3",
      reward: totalReward * 0.6,
      risk: totalRisk * 0.6,
    },

    {
      trade: "Trade 4",
      reward: totalReward * 0.8,
      risk: totalRisk * 0.8,
    },

    {
      trade: "Trade 5",
      reward: totalReward,
      risk: totalRisk,
    },
  ];

  const compareData = [
    {
      name: "Risk",
      value: totalRisk,
    },

    {
      name: "Reward",
      value: totalReward,
    },

    {
      name: "Position",
      value: positionSize,
    },
  ];

  return (

    <main className="min-h-screen bg-slate-100 py-6 px-3 lg:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">

          <div className="bg-gradient-to-r from-red-900 to-orange-500 px-6 py-8 text-white">

            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Risk Reward Calculator
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              Calculate trade risk,
              reward potential,
              stop loss exposure,
              win rate probability,
              and portfolio risk management using this professional risk reward calculator.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* INPUTS */}

            <div className="p-6 lg:p-8 border-r border-slate-200">

              <div className="space-y-6">

                <InputField
                  label="Entry Price"
                  value={entryPrice}
                  setValue={setEntryPrice}
                  prefix="$"
                />

                <InputField
                  label="Stop Loss Price"
                  value={stopLoss}
                  setValue={setStopLoss}
                  prefix="$"
                />

                <InputField
                  label="Target Price"
                  value={targetPrice}
                  setValue={setTargetPrice}
                  prefix="$"
                />

                <InputField
                  label="Position Size"
                  value={positionSize}
                  setValue={setPositionSize}
                  prefix="$"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-gradient-to-b from-orange-50 to-white p-6 lg:p-8">

              <div className="bg-gradient-to-r from-red-900 to-orange-500 rounded-3xl p-6 text-white mb-6">

                <p className="text-white/80 mb-2">
                  Risk Reward Ratio
                </p>

                <h2 className="text-5xl font-black tracking-tight">
                  1 : {riskRewardRatio.toFixed(2)}
                </h2>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-200">

                  <h3 className="text-2xl font-black">
                    Trade Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Total Risk"
                    value={`$${totalRisk.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Total Reward"
                    value={`$${totalReward.toFixed(0)}`}
                  />

                  <SummaryRow
                    label="Risk Reward Ratio"
                    value={`1:${riskRewardRatio.toFixed(2)}`}
                  />

                  <SummaryRow
                    label="Break-even Win Rate"
                    value={`${winRateNeeded.toFixed(2)}%`}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <SummaryCard
            title="Risk Per Share"
            value={`$${riskPerShare.toFixed(2)}`}
          />

          <SummaryCard
            title="Reward Per Share"
            value={`$${rewardPerShare.toFixed(2)}`}
          />

          <SummaryCard
            title="Potential Reward"
            value={`$${totalReward.toFixed(0)}`}
          />

          <SummaryCard
            title="Potential Risk"
            value={`$${totalRisk.toFixed(0)}`}
          />

        </div>

        {/* PIE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Risk vs Reward Breakdown
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

                    <Cell fill="#991b1b" />
                    <Cell fill="#fb923c" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-4">

              <SummaryCard
                title="Potential Reward"
                value={`$${totalReward.toFixed(0)}`}
              />

              <SummaryCard
                title="Potential Risk"
                value={`$${totalRisk.toFixed(0)}`}
              />

              <SummaryCard
                title="Win Rate Needed"
                value={`${winRateNeeded.toFixed(2)}%`}
              />

            </div>

          </div>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Risk Reward Growth Analysis
          </h2>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height={420}>

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="trade" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="reward"
                  stroke="#991b1b"
                  strokeWidth={4}
                />

                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#fb923c"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8 mt-8">

          <h2 className="text-3xl font-black mb-6">
            Trade Comparison Overview
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
                  fill="#991b1b"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORMULA */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Risk Reward Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 overflow-auto mb-6">

            <code className="text-lg">
              Risk Reward Ratio = Potential Reward / Potential Risk
            </code>

          </div>

          <p className="text-slate-700 leading-8">
            The risk reward ratio measures how much potential profit a trader expects relative to the potential loss on a trade.
            Professional traders commonly use risk reward ratios to manage trading risk and improve long-term portfolio performance.
          </p>

        </section>

        {/* EXAMPLES */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Risk Reward Examples
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <div className="border rounded-2xl p-6">

              <h3 className="text-2xl font-black mb-3 text-slate-900">
                Example 1 — Conservative Trade
              </h3>

              <p>
                A trader enters a stock at $100,
                places a stop loss at $95,
                and targets $115.
                The total risk equals $5 per share while the potential reward equals $15 per share.
                This creates a 1:3 risk reward ratio.
              </p>

            </div>

            <div className="border rounded-2xl p-6">

              <h3 className="text-2xl font-black mb-3 text-slate-900">
                Example 2 — Aggressive Trade
              </h3>

              <p>
                A trader enters a cryptocurrency position with high volatility and uses wider stop losses.
                Higher volatility may increase both potential reward and total portfolio risk exposure.
              </p>

            </div>

          </div>

        </section>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Risk Reward Calculator Explanation
          </h2>

          <div className="space-y-6 text-slate-700 leading-8">

            <p>
              A risk reward calculator helps traders and investors estimate the relationship between potential profits and possible losses before entering a trade or investment position.
              Risk reward analysis is widely used in stock trading,
              forex,
              cryptocurrency investing,
              options trading,
              and portfolio management.
            </p>

            <p>
              Professional traders commonly evaluate risk reward ratios to improve consistency,
              reduce emotional decision making,
              and optimize long-term trading performance.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              What Is Risk Reward Ratio?
            </h3>

            <p>
              The risk reward ratio compares the amount of money potentially gained on a trade relative to the amount potentially lost.
              Higher reward relative to risk may improve long-term portfolio growth if trading strategies remain consistent.
            </p>

            <p>
              Traders often prefer setups with favorable ratios such as 1:2,
              1:3,
              or higher because profitable trades may outweigh losing trades over time.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Why Risk Management Matters
            </h3>

            <p>
              Risk management helps traders protect portfolio capital during volatile market conditions.
              Even profitable trading systems may fail without disciplined stop losses and proper position sizing strategies.
            </p>

            <p>
              Managing risk effectively may reduce emotional trading,
              improve consistency,
              and support long-term portfolio survival.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Stop Loss Strategies
            </h3>

            <p>
              Stop losses automatically limit downside risk when trades move against expectations.
              Many traders place stop losses below support levels,
              volatility ranges,
              or technical indicators.
            </p>

            <p>
              Proper stop loss placement may help reduce catastrophic losses during unexpected market movements.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Position Sizing
            </h3>

            <p>
              Position sizing determines how much capital is allocated to each trade.
              Conservative traders often risk only a small percentage of portfolio capital on individual positions.
            </p>

            <p>
              Position sizing strategies may help control portfolio volatility and reduce excessive risk concentration.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Win Rate Analysis
            </h3>

            <p>
              Trading profitability depends on both risk reward ratios and win rates.
              Traders with lower win rates may still remain profitable if reward ratios are sufficiently high.
            </p>

            <p>
              For example,
              a strategy with a 1:3 reward ratio may remain profitable even with moderate trade accuracy.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Trading Psychology
            </h3>

            <p>
              Emotional discipline plays a major role in trading performance.
              Fear,
              greed,
              and impulsive decisions may negatively impact long-term profitability.
            </p>

            <p>
              Structured risk reward planning may help traders remain more disciplined during volatile market conditions.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Portfolio Risk Diversification
            </h3>

            <p>
              Diversification helps reduce exposure to individual market events and asset-specific volatility.
              Investors commonly diversify across stocks,
              ETFs,
              commodities,
              forex,
              bonds,
              and cryptocurrencies.
            </p>

            <p>
              Combining diversification with disciplined risk reward analysis may improve long-term portfolio stability.
            </p>

            <h3 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <FaqItem
                question="What is a good risk reward ratio?"
                answer="Many traders prefer risk reward ratios of 1:2 or higher because potential profits outweigh potential losses."
              />

              <FaqItem
                question="Why are stop losses important?"
                answer="Stop losses help limit downside exposure and reduce portfolio damage during unfavorable market conditions."
              />

              <FaqItem
                question="How does position sizing affect trading?"
                answer="Position sizing controls overall portfolio exposure and helps reduce excessive concentration risk."
              />

              <FaqItem
                question="Can low win rates still be profitable?"
                answer="Yes. Strategies with strong reward ratios may remain profitable even with moderate or lower win rates."
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
                title: "Portfolio Calculator",
                link: "/portfolio-calculator",
              },

              {
                title: "Real Return Calculator",
                link: "/real-return-calculator",
              },

              {
                title: "Capital Gains Calculator",
                link: "/capital-gains-calculator",
              },

              {
                title: "Wealth Calculator",
                link: "/wealth-calculator",
              },

              {
                title: "Stock Calculator",
                link: "/stock-calculator",
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