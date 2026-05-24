import Link from "next/link";

const retirementTools = [

  {
    title: "Retirement Calculator",
    link: "/retirement-calculator",
    description:
      "Estimate retirement savings growth, future expenses, and long-term retirement income needs.",
  },

  {
    title: "401k Calculator",
    link: "/401k-calculator",
    description:
      "Estimate 401k contribution growth, employer matching, and retirement account accumulation.",
  },

  {
    title: "Roth IRA Calculator",
    link: "/roth-ira-calculator",
    description:
      "Estimate tax-free Roth IRA growth and long-term retirement savings projections.",
  },

  {
    title: "IRA Calculator",
    link: "/ira-calculator",
    description:
      "Calculate IRA investment growth and retirement savings accumulation over time.",
  },

  {
    title: "Pension Calculator",
    link: "/pension-calculator",
    description:
      "Estimate pension income payments and retirement benefit projections.",
  },

  {
    title: "Social Security Calculator",
    link: "/social-security-calculator",
    description:
      "Estimate Social Security retirement benefits and future income planning needs.",
  },

  {
    title: "Retirement Savings Calculator",
    link: "/retirement-savings-calculator",
    description:
      "Analyze retirement contribution growth and long-term savings projections.",
  },

  {
    title: "Retirement Income Calculator",
    link: "/retirement-income-calculator",
    description:
      "Estimate retirement income sources and long-term financial sustainability.",
  },

  {
    title: "Retirement Withdrawal Calculator",
    link: "/retirement-withdrawal-calculator",
    description:
      "Estimate retirement withdrawal rates and portfolio sustainability projections.",
  },

  {
    title: "Early Retirement Calculator",
    link: "/early-retirement-calculator",
    description:
      "Analyze FIRE strategies and estimate timelines for financial independence.",
  },

  {
    title: "Savings Calculator",
    link: "/savings-calculator",
    description:
      "Estimate long-term savings growth using recurring contributions and compound interest.",
  },

  {
    title: "Compound Interest Calculator",
    link: "/compound-interest-calculator",
    description:
      "Calculate compound growth and long-term retirement investment accumulation.",
  },

  {
    title: "Investment Calculator",
    link: "/investment-calculator",
    description:
      "Estimate portfolio growth and recurring investment contribution performance.",
  },

  {
    title: "Future Value Calculator",
    link: "/future-value-calculator",
    description:
      "Estimate future retirement account values based on investment growth assumptions.",
  },

  {
    title: "Present Value Calculator",
    link: "/present-value-calculator",
    description:
      "Calculate the present value of future retirement income and savings goals.",
  },

  {
    title: "Inflation Calculator",
    link: "/inflation-calculator",
    description:
      "Estimate inflation impacts on retirement purchasing power and future expenses.",
  },

  {
    title: "Real Return Calculator",
    link: "/real-return-calculator",
    description:
      "Analyze inflation-adjusted retirement investment performance and real returns.",
  },

  {
    title: "Net Worth Calculator",
    link: "/net-worth-calculator",
    description:
      "Estimate total assets, liabilities, and long-term wealth accumulation.",
  },

  {
    title: "Wealth Calculator",
    link: "/wealth-calculator",
    description:
      "Estimate long-term wealth growth and retirement portfolio accumulation.",
  },

  {
    title: "Financial Independence Calculator",
    link: "/financial-independence-calculator",
    description:
      "Estimate savings goals and timelines required for financial independence.",
  },

  {
    title: "FIRE Calculator",
    link: "/fire-calculator",
    description:
      "Analyze Financial Independence Retire Early strategies and retirement planning goals.",
  },

  {
    title: "Certificate of Deposit Calculator",
    link: "/certificate-of-deposit-calculator",
    description:
      "Estimate CD investment growth and fixed-income savings returns over time.",
  },

];

export default function RetirementCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-purple-700
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

              Retirement Planning Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Retirement Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore retirement calculators for 401k growth,
              IRA savings,
              retirement income,
              FIRE planning,
              pension estimates,
              Social Security benefits,
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

              Retirement & Financial Independence Tools

            </h2>

            <p className="
              text-slate-600
              text-lg
              leading-8
              max-w-4xl
            ">

              Browse retirement planning calculators,
              investment growth estimators,
              savings tools,
              withdrawal analysis resources,
              and long-term financial independence calculators.

            </p>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {retirementTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-purple-50
                  border
                  border-slate-200
                  hover:border-purple-500
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
                  from-purple-600
                  to-violet-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-black
                  mb-6
                ">

                  🏖️

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-purple-700
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

              Retirement Planning & Wealth Growth Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Retirement calculators help individuals estimate long-term savings growth,
                retirement income needs,
                investment performance,
                pension benefits,
                Social Security income,
                and financial independence timelines.

              </p>

              <p>

                These calculators are frequently used for retirement planning,
                401k contribution analysis,
                IRA investment growth,
                FIRE strategies,
                portfolio withdrawal planning,
                and long-term wealth accumulation.

              </p>

              <p>

                Retirement planning often involves multiple financial variables including contribution schedules,
                investment returns,
                inflation assumptions,
                withdrawal strategies,
                Social Security benefits,
                and pension income projections.

              </p>

              <p>

                Understanding long-term retirement goals may help investors improve savings consistency,
                optimize portfolio allocation,
                and maintain sustainable retirement income throughout future financial planning stages.

              </p>

              <p>

                Whether you are planning early retirement,
                estimating future retirement income,
                analyzing 401k growth,
                or building long-term financial independence,
                these calculators provide fast and accurate retirement planning estimates for smarter financial decisions.

              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}