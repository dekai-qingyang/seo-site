import ScientificCalculator from "@/components/ScientificCalculator";
import Link from "next/link";

export default function HomePage() {

  const categories = [

    {
      title: "Mortgage Calculators",
      link: "/mortgage-calculators",
      icon: "🏠",
      description:
        "Mortgage, refinance, affordability, HELOC, amortization, and home loan calculators.",
    },

    {
      title: "Debt Calculators",
      link: "/debt-calculators",
      icon: "💳",
      description:
        "Debt payoff, avalanche, snowball, credit card, and repayment strategy calculators.",
    },

    {
      title: "Investment Calculators",
      link: "/investment-calculators",
      icon: "📈",
      description:
        "Compound interest, ROI, dividend, savings, and investment growth calculators.",
    },

    {
      title: "Retirement Calculators",
      link: "/retirement-calculators",
      icon: "🏖️",
      description:
        "Retirement planning, savings, future income, and FIRE calculators.",
    },

    {
      title: "Savings Calculators",
      link: "/savings-calculators",
      icon: "💰",
      description:
        "CD, budget, emergency fund, bank interest, and savings growth calculators.",
    },

    {
      title: "Income & Tax Calculators",
      link: "/income-tax-calculators",
      icon: "🧾",
      description:
        "Salary, paycheck, freelance tax, overtime, and income tax calculators.",
    },

    {
      title: "Business Calculators",
      link: "/business-calculators",
      icon: "📊",
      description:
        "Revenue, profit margin, markup, break-even, and business finance calculators.",
    },

    {
      title: "Auto Loan Calculators",
      link: "/auto-calculators",
      icon: "🚗",
      description:
        "Auto loan, lease, car affordability, gas cost, and vehicle finance calculators.",
    },

  ];

  const popularTools = [

    {
      title: "Mortgage Calculator",
      link: "/mortgage-calculator",
    },

    {
      title: "Loan Calculator",
      link: "/loan-calculator",
    },

    {
      title: "401k Calculator",
      link: "/401k-calculator",
    },

    {
      title: "Retirement Calculator",
      link: "/retirement-calculator",
    },

    {
      title: "Compound Interest Calculator",
      link: "/compound-interest-calculator",
    },

    {
      title: "Investment Calculator",
      link: "/investment-calculator",
    },

    {
      title: "CD Calculator",
      link: "/cd-calculator",
    },

    {
      title: "Tax Calculator",
      link: "/tax-calculator",
    },

    {
      title: "Profit Margin Calculator",
      link: "/profit-margin-calculator",
    },

  ];

  return (

    <main className="min-h-screen bg-slate-100">

      {/* TOP CALCULATOR */}

      <ScientificCalculator />

      {/* CATEGORY SECTION */}

      <section className="max-w-7xl mx-auto px-4 py-14">

        <div className="mb-10">

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-5">

            Financial Calculator Categories

          </h2>

          <p className="text-slate-600 text-lg leading-8 max-w-4xl">

            Browse free online financial calculators for mortgages,
            loans,
            investing,
            retirement planning,
            taxes,
            savings,
            and business finance.

          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

          {categories.map((category) => (

            <Link
              key={category.title}
              href={category.link}
              className="
                bg-white
                rounded-3xl
                border
                border-slate-200
                shadow-lg
                p-7
                hover:-translate-y-1
                hover:border-blue-500
                transition-all
              "
            >

              <div className="text-5xl mb-5">

                {category.icon}

              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4">

                {category.title}

              </h3>

              <p className="text-slate-600 leading-8">

                {category.description}

              </p>

            </Link>

          ))}

        </div>

      </section>

      {/* POPULAR TOOLS */}

      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3">

              Popular Calculators

            </h2>

            <p className="text-slate-600 text-lg">

              Most frequently used financial calculators.

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {popularTools.map((tool) => (

            <Link
              key={tool.title}
              href={tool.link}
              className="
                bg-white
                rounded-3xl
                border
                border-slate-200
                shadow-lg
                p-7
                hover:-translate-y-1
                hover:border-blue-500
                transition-all
              "
            >

              <div className="
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                flex
                items-center
                justify-center
                text-white
                text-3xl
                font-black
                mb-6
              ">

                $

              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3">

                {tool.title}

              </h3>

              <p className="text-slate-600 leading-8">

                Free online calculator with instant results and mobile-friendly design.

              </p>

            </Link>

          ))}

        </div>

      </section>

      {/* SEO CONTENT */}

      <section className="bg-white border-t border-slate-200">

        <div className="max-w-5xl mx-auto px-4 py-16">

          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8">

            Free Online Financial Calculators

          </h2>

          <div className="space-y-8 text-slate-700 text-lg leading-9">

            <p>

              Financial calculators help users estimate loan payments,
              mortgage costs,
              investment returns,
              retirement savings,
              budgeting goals,
              and business profitability.

            </p>

            <p>

              Our online calculator platform includes mortgage calculators,
              retirement tools,
              tax estimators,
              savings planners,
              business finance tools,
              and investment growth calculators designed for fast and accurate financial planning.

            </p>

            <p>

              Every calculator is optimized for desktop and mobile devices,
              providing clean layouts,
              instant calculations,
              and simple financial analysis tools for everyday use.

            </p>

          </div>

        </div>

      </section>

    </main>

  );

}