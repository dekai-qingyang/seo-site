import Link from "next/link";

const businessTools = [

  {
    title: "Profit Margin Calculator",
    link: "/profit-margin-calculator",
    description:
      "Estimate business profit margins, profitability ratios, and pricing performance.",
  },

  {
    title: "Break Even Calculator",
    link: "/break-even-calculator",
    description:
      "Calculate break-even points, fixed costs, and required sales revenue targets.",
  },

  {
    title: "Business Loan Calculator",
    link: "/business-loan-calculator",
    description:
      "Estimate business loan payments, borrowing costs, and repayment schedules.",
  },

  {
    title: "Cash Runway Calculator",
    link: "/cash-runway-calculator",
    description:
      "Estimate startup cash runway, burn rate, and financial sustainability timelines.",
  },

  {
    title: "Revenue Calculator",
    link: "/revenue-calculator",
    description:
      "Estimate business revenue growth, sales projections, and income performance.",
  },

  {
    title: "Gross Profit Calculator",
    link: "/gross-profit-calculator",
    description:
      "Calculate gross profit margins, product profitability, and revenue efficiency.",
  },

  {
    title: "Net Profit Calculator",
    link: "/net-profit-calculator",
    description:
      "Estimate net business profit after expenses, taxes, and operating costs.",
  },

  {
    title: "Markup Calculator",
    link: "/markup-calculator",
    description:
      "Estimate product markup percentages and pricing strategies for profitability.",
  },

  {
    title: "Discount Calculator",
    link: "/discount-calculator",
    description:
      "Calculate discounts, sale pricing, savings amounts, and retail markdowns.",
  },

  {
    title: "Sales Tax Calculator",
    link: "/sales-tax-calculator",
    description:
      "Estimate sales taxes, tax-inclusive pricing, and final transaction totals.",
  },

  {
    title: "ROI Calculator",
    link: "/roi-calculator",
    description:
      "Calculate return on investment percentages and business profitability performance.",
  },

  {
    title: "Investment Calculator",
    link: "/investment-calculator",
    description:
      "Estimate long-term business investment growth and financial return projections.",
  },

  {
    title: "Cash Flow Calculator",
    link: "/cash-flow-calculator",
    description:
      "Analyze business cash inflows, expenses, and financial stability projections.",
  },

  {
    title: "Expense Calculator",
    link: "/expense-calculator",
    description:
      "Estimate operational expenses, recurring costs, and business spending analysis.",
  },

  {
    title: "Budget Calculator",
    link: "/budget-calculator",
    description:
      "Analyze business budgeting strategies and long-term financial planning goals.",
  },

  {
    title: "Commission Calculator",
    link: "/commission-calculator",
    description:
      "Estimate commission-based earnings, sales compensation, and revenue incentives.",
  },

  {
    title: "Overtime Calculator",
    link: "/overtime-calculator",
    description:
      "Estimate overtime labor costs and employee compensation projections.",
  },

  {
    title: "APR Calculator",
    link: "/apr-calculator",
    description:
      "Estimate annual percentage rates and financing cost projections for businesses.",
  },

  {
    title: "APY Calculator",
    link: "/apy-calculator",
    description:
      "Estimate annual percentage yield and business savings account growth.",
  },

];

export default function BusinessCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-indigo-700
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

              Business & Finance Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Business Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore free business calculators for profit margins,
              revenue growth,
              startup cash runway,
              ROI analysis,
              pricing strategies,
              budgeting,
              and financial planning.

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

              Business Finance & Profitability Tools

            </h2>

            <p className="
              text-slate-600
              text-lg
              leading-8
              max-w-4xl
            ">

              Browse calculators for business revenue analysis,
              startup financial planning,
              pricing strategies,
              profit optimization,
              budgeting,
              cash flow management,
              and operational cost estimation.

            </p>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {businessTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-indigo-50
                  border
                  border-slate-200
                  hover:border-indigo-500
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
                  from-indigo-600
                  to-blue-700
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-black
                  mb-6
                ">

                  📊

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-indigo-700
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

              Business Finance & Profitability Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Business calculators help companies,
                entrepreneurs,
                startups,
                and freelancers estimate profitability,
                revenue growth,
                operating expenses,
                cash flow,
                financing costs,
                and long-term financial performance.

              </p>

              <p>

                These calculators are frequently used for pricing analysis,
                startup planning,
                business budgeting,
                break-even analysis,
                investment evaluation,
                and operational profitability optimization.

              </p>

              <p>

                Understanding financial performance metrics may help businesses improve pricing strategies,
                optimize operating margins,
                reduce unnecessary expenses,
                and improve long-term financial planning decisions.

              </p>

              <p>

                Business finance planning often involves multiple variables including operating costs,
                revenue growth assumptions,
                taxes,
                financing expenses,
                profit margins,
                labor costs,
                and long-term investment projections.

              </p>

              <p>

                Whether you are launching a startup,
                analyzing profitability,
                managing cash flow,
                estimating ROI,
                or optimizing pricing strategies,
                these calculators provide fast and accurate financial estimates for smarter business decisions.

              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}