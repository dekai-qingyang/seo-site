import Link from "next/link";

const savingsTools = [

  {
    title: "CD Calculator",
    link: "/cd-calculator",
    description:
      "Estimate certificate of deposit growth, fixed interest earnings, and maturity values.",
  },

  {
    title: "High Yield Savings Calculator",
    link: "/high-yield-savings-calculator",
    description:
      "Estimate high-yield savings account growth using compound interest projections.",
  },

  {
    title: "Emergency Fund Calculator",
    link: "/emergency-fund-calculator",
    description:
      "Estimate emergency savings goals and monthly contribution requirements.",
  },

  {
    title: "Bank Interest Calculator",
    link: "/bank-interest-calculator",
    description:
      "Calculate bank savings interest earnings and long-term account growth.",
  },

  {
    title: "Recurring Deposit Calculator",
    link: "/recurring-deposit-calculator",
    description:
      "Estimate recurring deposit growth and monthly savings accumulation projections.",
  },

  {
    title: "Budget Calculator",
    link: "/budget-calculator",
    description:
      "Analyze monthly budgets, income allocation, and long-term spending strategies.",
  },

  {
    title: "Expense Calculator",
    link: "/expense-calculator",
    description:
      "Estimate monthly expenses, spending categories, and budgeting projections.",
  },

  {
    title: "Cash Flow Calculator",
    link: "/cash-flow-calculator",
    description:
      "Analyze income, expenses, and long-term personal cash flow management.",
  },

  {
    title: "Monthly Budget Calculator",
    link: "/monthly-budget-calculator",
    description:
      "Estimate monthly savings goals and optimize household budgeting strategies.",
  },

  {
    title: "Weekly Savings Calculator",
    link: "/weekly-savings-calculator",
    description:
      "Estimate weekly savings growth and recurring contribution projections.",
  },

  {
    title: "Savings Calculator",
    link: "/savings-calculator",
    description:
      "Estimate long-term savings accumulation using recurring deposits and interest growth.",
  },

  {
    title: "Compound Interest Calculator",
    link: "/compound-interest-calculator",
    description:
      "Estimate compound savings growth and long-term wealth accumulation strategies.",
  },

  {
    title: "Future Value Calculator",
    link: "/future-value-calculator",
    description:
      "Estimate future savings values based on recurring contributions and investment growth.",
  },

  {
    title: "Present Value Calculator",
    link: "/present-value-calculator",
    description:
      "Calculate the present value of future savings and financial goals.",
  },

  {
    title: "Inflation Calculator",
    link: "/inflation-calculator",
    description:
      "Estimate inflation impacts on savings purchasing power and future expenses.",
  },

  {
    title: "Real Return Calculator",
    link: "/real-return-calculator",
    description:
      "Analyze inflation-adjusted savings growth and real investment returns.",
  },

  {
    title: "Net Worth Calculator",
    link: "/net-worth-calculator",
    description:
      "Estimate total assets, liabilities, and long-term wealth growth.",
  },

  {
    title: "Wealth Calculator",
    link: "/wealth-calculator",
    description:
      "Estimate long-term wealth accumulation and financial growth projections.",
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
      "Analyze Financial Independence Retire Early strategies and savings targets.",
  },

];

export default function SavingsCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-emerald-700
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

              Savings & Budget Planning Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Savings Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore free savings calculators for budgeting,
              emergency funds,
              compound interest,
              recurring deposits,
              wealth growth,
              and long-term financial planning.

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

              Savings & Budgeting Tools

            </h2>

            <p className="
              text-slate-600
              text-lg
              leading-8
              max-w-4xl
            ">

              Browse savings growth calculators,
              emergency fund planners,
              budgeting tools,
              cash flow estimators,
              and long-term financial planning resources.

            </p>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {savingsTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-emerald-50
                  border
                  border-slate-200
                  hover:border-emerald-500
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
                  from-emerald-600
                  to-green-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-black
                  mb-6
                ">

                  💰

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-emerald-700
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

              Savings & Financial Planning Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Savings calculators help individuals estimate long-term savings growth,
                emergency fund targets,
                recurring deposit accumulation,
                compound interest earnings,
                and household budgeting strategies.

              </p>

              <p>

                These calculators are frequently used for personal budgeting,
                emergency savings planning,
                retirement preparation,
                wealth accumulation,
                and financial independence strategies.

              </p>

              <p>

                Understanding cash flow and recurring contribution growth may help users improve savings consistency,
                reduce unnecessary spending,
                and optimize long-term financial planning decisions.

              </p>

              <p>

                Savings planning often involves multiple financial variables including contribution schedules,
                compound growth rates,
                inflation assumptions,
                recurring expenses,
                and income allocation strategies.

              </p>

              <p>

                Whether you are building an emergency fund,
                improving monthly budgeting,
                analyzing compound growth,
                or planning long-term wealth accumulation,
                these calculators provide fast and accurate financial estimates for smarter savings decisions.

              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}