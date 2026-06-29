"use client";

import Link from "next/link";

export default function InvestmentCalculatorsPage() {
  const calculators = [
    {
      title: "Investment Calculator",
      link: "/investment-calculator",
      description: "Estimate future investment growth with recurring contributions and compound returns.",
    },
    {
      title: "Compound Interest Calculator",
      link: "/compound-interest-calculator",
      description: "Calculate compound interest growth over time.",
    },
    {
      title: "Investment Return Calculator",
      link: "/investment-return-calculator",
      description: "Calculate total investment returns including gains and dividends.",
    },
    {
      title: "Annual Return Calculator",
      link: "/annual-return-calculator",
      description: "Estimate annualized investment performance.",
    },
    {
      title: "ROI Calculator",
      link: "/roi-calculator",
      description: "Measure return on investment and overall profitability.",
    },
    {
      title: "Future Value Calculator",
      link: "/future-value-calculator",
      description: "Estimate the future value of your investments.",
    },
    {
      title: "Present Value Calculator",
      link: "/present-value-calculator",
      description: "Determine today's value of future investment cash flows.",
    },
    {
      title: "Inflation Calculator",
      link: "/inflation-calculator",
      description: "Measure inflation's impact on purchasing power.",
    },
    {
      title: "Real Return Calculator",
      link: "/real-return-calculator",
      description: "Calculate inflation-adjusted investment returns.",
    },
    {
      title: "Risk Reward Calculator",
      link: "/risk-reward-calculator",
      description: "Evaluate investment risk relative to expected reward.",
    },
    {
      title: "Stock Calculator",
      link: "/stock-calculator",
      description: "Calculate stock profits, gains, losses and annualized returns.",
    },
    {
      title: "ETF Calculator",
      link: "/etf-calculator",
      description: "Analyze ETF investment growth and portfolio performance.",
    },
    {
      title: "Mutual Fund Calculator",
      link: "/mutual-fund-calculator",
      description: "Estimate mutual fund investment growth with recurring deposits.",
    },
    {
      title: "Portfolio Calculator",
      link: "/portfolio-calculator",
      description: "Evaluate asset allocation and portfolio diversification.",
    },
    {
      title: "Dividend Calculator",
      link: "/dividend-calculator",
      description: "Estimate dividend income and dividend reinvestment growth.",
    },
    {
      title: "Capital Gains Calculator",
      link: "/capital-gains-calculator",
      description: "Calculate capital gains after selling investments.",
    },
    {
      title: "Certificate of Deposit Calculator",
      link: "/certificate-of-deposit-calculator",
      description: "Estimate certificate of deposit interest earnings and maturity value.",
    },
    {
      title: "CD Calculator",
      link: "/cd-calculator",
      description: "Calculate certificate of deposit returns and interest earnings.",
    },
    {
      title: "High Yield Savings Calculator",
      link: "/high-yield-savings-calculator",
      description: "Estimate savings growth using high-yield APY accounts.",
    },
    {
      title: "Net Worth Calculator",
      link: "/net-worth-calculator",
      description: "Calculate your total assets, liabilities and net worth.",
    },
    {
      title: "Wealth Calculator",
      link: "/wealth-calculator",
      description: "Project long-term wealth accumulation using investments and savings.",
    },
    {
      title: "Financial Independence Calculator",
      link: "/financial-independence-calculator",
      description: "Estimate when your investments can support financial independence.",
    },
    {
      title: "FIRE Calculator",
      link: "/fire-calculator",
      description: "Plan for Financial Independence, Retire Early (FIRE).",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* HERO */}
      <section className="mb-10">
        <h1 className="text-4xl font-black">
          Investment Calculators
        </h1>
        <p className="text-gray-600 mt-2">
          Explore tools to calculate investment growth, returns, and wealth planning.
        </p>
      </section>

      {/* GRID */}
      <section className="grid md:grid-cols-3 gap-5">

        {calculators.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            className="border rounded-xl p-5 hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg">
              {item.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              {item.description}
            </p>
          </Link>
        ))}

      </section>

    </main>
  );
}
<section className="mt-20">

<h2 className="text-3xl font-black mb-10">
  Frequently Asked Questions (Investment Calculators)
</h2>

<div className="space-y-6">

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      What is an investment calculator?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      An investment calculator is a financial tool that estimates the future value of your investments based on variables such as initial amount, monthly contributions, expected return rate, and time period.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      How does compound interest work?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      Compound interest means earning returns not only on your initial investment but also on previously earned interest. Over time, this creates exponential growth in your portfolio.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      Which investment calculator should I start with?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      Beginners should start with the Investment Calculator and Compound Interest Calculator to understand basic growth patterns before moving to more advanced tools like portfolio or ROI calculators.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      Are investment calculators accurate?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      Investment calculators provide estimates based on assumptions such as expected return rate and contribution frequency. Real market performance may vary due to volatility.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      Do these calculators include inflation?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      Some calculators include inflation adjustment. You can use the Inflation Calculator and Real Return Calculator to understand how inflation impacts purchasing power.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      What is the difference between ROI and investment return?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      ROI measures total profitability relative to investment cost, while investment return often includes time-based performance such as annualized returns or compounding effects.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      Can I calculate retirement planning with these tools?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      Yes. You can use the Retirement Calculator, Financial Independence Calculator, and FIRE Calculator to estimate when you can retire based on your savings and investments.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      What is FIRE in investing?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      FIRE stands for Financial Independence, Retire Early. It focuses on saving and investing aggressively so that passive income can eventually cover living expenses.
    </p>
  </div>

  <div className="border rounded-2xl p-6">
    <h3 className="text-xl font-bold">
      Do I need to invest monthly or lump sum?
    </h3>
    <p className="mt-3 text-gray-600 leading-7">
      Both strategies work. Monthly investing reduces risk through dollar-cost averaging, while lump sum investing may yield higher returns in rising markets.
    </p>
  </div>

</div>

</section>