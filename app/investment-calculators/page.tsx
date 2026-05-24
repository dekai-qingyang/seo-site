import Link from "next/link";

const investmentTools = [

  {
    title: "Compound Interest Calculator",
    link: "/compound-interest-calculator",
    description:
      "Estimate compound growth, reinvestment returns, and long-term investment accumulation.",
  },

  {
    title: "APR Calculator",
    link: "/apr-calculator",
    description:
      "Calculate annual percentage rates and borrowing or investment financing costs.",
  },

  {
    title: "APY Calculator",
    link: "/apy-calculator",
    description:
      "Estimate annual percentage yield and compound savings account growth.",
  },

  {
    title: "Simple Interest Calculator",
    link: "/simple-interest-calculator",
    description:
      "Calculate simple interest earnings and borrowing costs over time.",
  },

  {
    title: "Investment Return Calculator",
    link: "/investment-return-calculator",
    description:
      "Estimate investment performance, annual returns, and portfolio growth projections.",
  },

  {
    title: "Annual Return Calculator",
    link: "/annual-return-calculator",
    description:
      "Calculate annualized investment returns and portfolio performance metrics.",
  },

  {
    title: "Future Value Calculator",
    link: "/future-value-calculator",
    description:
      "Estimate future investment values using growth rates and compounding assumptions.",
  },

  {
    title: "Present Value Calculator",
    link: "/present-value-calculator",
    description:
      "Estimate the current value of future cash flows and investment returns.",
  },

  {
    title: "Inflation Calculator",
    link: "/inflation-calculator",
    description:
      "Analyze inflation impacts on purchasing power and long-term investment value.",
  },

  {
    title: "Real Return Calculator",
    link: "/real-return-calculator",
    description:
      "Estimate inflation-adjusted investment performance and real portfolio returns.",
  },

  {
    title: "Risk Reward Calculator",
    link: "/risk-reward-calculator",
    description:
      "Analyze investment risk-reward ratios and trading performance strategies.",
  },

  {
    title: "Investment Calculator",
    link: "/investment-calculator",
    description:
      "Estimate portfolio growth, recurring contributions, and long-term investment accumulation.",
  },

  {
    title: "Dividend Calculator",
    link: "/dividend-calculator",
    description:
      "Estimate dividend income, reinvestment growth, and passive income projections.",
  },

  {
    title: "Stock Calculator",
    link: "/stock-calculator",
    description:
      "Calculate stock investment performance, gains, losses, and portfolio returns.",
  },

  {
    title: "ETF Calculator",
    link: "/etf-calculator",
    description:
      "Estimate ETF investment growth, diversification, and long-term portfolio performance.",
  },

  {
    title: "Mutual Fund Calculator",
    link: "/mutual-fund-calculator",
    description:
      "Analyze mutual fund growth, returns, fees, and long-term investment projections.",
  },

  {
    title: "Portfolio Calculator",
    link: "/portfolio-calculator",
    description:
      "Estimate diversified portfolio performance and long-term asset allocation growth.",
  },

  {
    title: "Capital Gains Calculator",
    link: "/capital-gains-calculator",
    description:
      "Estimate taxable capital gains and long-term investment profit projections.",
  },

  {
    title: "ROI Calculator",
    link: "/roi-calculator",
    description:
      "Calculate return on investment percentages and profitability analysis.",
  },

  {
    title: "Savings Calculator",
    link: "/savings-calculator",
    description:
      "Estimate savings growth using recurring deposits and compound interest projections.",
  },

];

export default function InvestmentCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-green-700
          via-slate-900
          to-black
          rounded-3xl
          p-10
          md:p-14
          text-white
          shadow-2xl
          mb-10
        ">

          <div className="max-w-4xl">

            <div className="
              inline-flex
              items-center
              rounded-full
              bg-white/10
              border
              border-white/10
              px-4
              py-2
              text-sm
              font-semibold
              mb-6
            ">

              Investment & Wealth Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Investment Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore free investment calculators for compound interest,
              ROI,
              dividend income,
              inflation analysis,
              portfolio growth,
              ETF investing,
              and long-term wealth accumulation.

            </p>

          </div>

        </section>

        {/* TOOL GRID */}

        <section className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-8
          mb-10
        ">

          <div className="mb-10">

            <h2 className="
              text-4xl
              font-black
              text-slate-900
              mb-4
            ">

              Investment & Portfolio Tools

            </h2>

            <p className="
              text-slate-600
              text-lg
              leading-8
              max-w-4xl
            ">

              Browse investment growth calculators,
              savings estimators,
              compound interest tools,
              portfolio analysis resources,
              and wealth accumulation planning calculators.

            </p>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {investmentTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-green-50
                  border
                  border-slate-200
                  hover:border-green-500
                  rounded-3xl
                  p-7
                  transition-all
                  hover:-translate-y-1
                "
              >

                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-black
                  mb-6
                ">

                  📈

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-green-700
                  mb-4
                ">

                  {tool.title}

                </h3>

                <p className="
                  text-slate-600
                  leading-8
                ">

                  {tool.description}

                </p>

              </Link>

            ))}

          </div>

        </section>

        {/* SEO CONTENT */}

        <section className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-xl
          p-8
          md:p-12
        ">

          <div className="max-w-5xl">

            <h2 className="
              text-4xl
              md:text-5xl
              font-black
              text-slate-900
              mb-8
            ">

              Investment & Wealth Growth Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Investment calculators help investors estimate portfolio growth,
                compound interest accumulation,
                dividend income,
                future value projections,
                inflation-adjusted returns,
                and long-term wealth building strategies.

              </p>

              <p>

                These calculators are frequently used for retirement planning,
                stock investing,
                ETF analysis,
                mutual fund growth,
                savings projections,
                and investment portfolio optimization.

              </p>

              <p>

                Understanding long-term investment performance may help investors compare asset allocation strategies,
                estimate recurring contribution growth,
                and improve financial planning decisions.

              </p>

              <p>

                Investment planning often involves multiple variables including annual return assumptions,
                inflation rates,
                dividend reinvestment,
                compounding frequency,
                contribution schedules,
                and portfolio diversification strategies.

              </p>

              <p>

                Whether you are building retirement savings,
                investing in stocks,
                analyzing ETF portfolios,
                or planning long-term wealth accumulation,
                these calculators provide fast and accurate financial estimates for smarter investing decisions.

              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}