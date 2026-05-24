import Link from "next/link";

const incomeTaxTools = [

  {
    title: "Salary Calculator",
    link: "/salary-calculator",
    description:
      "Estimate annual salary income, monthly earnings, and compensation projections.",
  },

  {
    title: "Hourly Wage Calculator",
    link: "/hourly-wage-calculator",
    description:
      "Convert hourly wages into weekly, monthly, and annual income estimates.",
  },

  {
    title: "Take Home Pay Calculator",
    link: "/take-home-pay-calculator",
    description:
      "Estimate net pay after taxes, deductions, and payroll withholdings.",
  },

  {
    title: "Tax Calculator",
    link: "/tax-calculator",
    description:
      "Estimate federal and state taxes, deductions, and taxable income projections.",
  },

  {
    title: "Income Tax Calculator",
    link: "/income-tax-calculator",
    description:
      "Calculate income taxes, effective tax rates, and annual tax obligations.",
  },

  {
    title: "Bonus Tax Calculator",
    link: "/bonus-tax-calculator",
    description:
      "Estimate bonus taxes, withholding rates, and net bonus income amounts.",
  },

  {
    title: "Overtime Calculator",
    link: "/overtime-calculator",
    description:
      "Estimate overtime earnings, hourly pay increases, and extra compensation.",
  },

  {
    title: "Commission Calculator",
    link: "/commission-calculator",
    description:
      "Calculate sales commissions, earnings projections, and compensation structures.",
  },

  {
    title: "Freelance Tax Calculator",
    link: "/freelance-tax-calculator",
    description:
      "Estimate freelance taxes, deductions, and self-employed income obligations.",
  },

  {
    title: "Self Employment Tax Calculator",
    link: "/self-employment-tax-calculator",
    description:
      "Calculate self-employment taxes, Medicare, and Social Security obligations.",
  },

  {
    title: "Paycheck Calculator",
    link: "/paycheck-calculator",
    description:
      "Estimate paycheck deductions, payroll taxes, and net take-home income.",
  },

  {
    title: "Sales Tax Calculator",
    link: "/sales-tax-calculator",
    description:
      "Estimate sales taxes, final purchase totals, and tax-inclusive pricing.",
  },

  {
    title: "APR Calculator",
    link: "/apr-calculator",
    description:
      "Estimate annual percentage rates and borrowing cost projections.",
  },

  {
    title: "APY Calculator",
    link: "/apy-calculator",
    description:
      "Estimate annual percentage yield and compound savings account growth.",
  },

  {
    title: "Inflation Calculator",
    link: "/inflation-calculator",
    description:
      "Estimate inflation impacts on purchasing power and long-term income value.",
  },

  {
    title: "Real Return Calculator",
    link: "/real-return-calculator",
    description:
      "Analyze inflation-adjusted income growth and investment returns.",
  },

  {
    title: "Budget Calculator",
    link: "/budget-calculator",
    description:
      "Estimate monthly budgets, expenses, and long-term financial planning strategies.",
  },

  {
    title: "Expense Calculator",
    link: "/expense-calculator",
    description:
      "Analyze household expenses, recurring spending, and cash flow management.",
  },

  {
    title: "Cash Flow Calculator",
    link: "/cash-flow-calculator",
    description:
      "Estimate income versus expenses and long-term financial stability.",
  },

];

export default function IncomeTaxCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-amber-600
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

              Income & Tax Planning Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Income & Tax Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore free income and tax calculators for salary estimates,
              paycheck deductions,
              self-employment taxes,
              overtime pay,
              freelance income,
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

              Income, Payroll & Tax Tools

            </h2>

            <p className="
              text-slate-600
              text-lg
              leading-8
              max-w-4xl
            ">

              Browse salary calculators,
              payroll estimators,
              income tax tools,
              self-employment tax calculators,
              budgeting resources,
              and financial planning utilities.

            </p>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {incomeTaxTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-amber-50
                  border
                  border-slate-200
                  hover:border-amber-500
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
                  from-amber-500
                  to-orange-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-black
                  mb-6
                ">

                  🧾

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-amber-700
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

              Income, Payroll & Tax Planning Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Income and tax calculators help individuals estimate salaries,
                paycheck deductions,
                payroll taxes,
                freelance earnings,
                self-employment obligations,
                overtime income,
                and long-term financial planning needs.

              </p>

              <p>

                These calculators are frequently used for payroll analysis,
                tax preparation,
                budgeting,
                compensation planning,
                freelance income management,
                and long-term financial forecasting.

              </p>

              <p>

                Understanding tax obligations and net income may help individuals improve budgeting decisions,
                optimize financial planning strategies,
                and estimate accurate take-home pay projections.

              </p>

              <p>

                Income and payroll planning often involve multiple variables including federal taxes,
                state taxes,
                deductions,
                bonuses,
                commissions,
                overtime wages,
                self-employment taxes,
                and recurring household expenses.

              </p>

              <p>

                Whether you are analyzing paycheck deductions,
                estimating freelance taxes,
                planning overtime income,
                or building long-term budgeting strategies,
                these calculators provide fast and accurate financial estimates for smarter income management.

              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}