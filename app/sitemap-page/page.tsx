import Link from "next/link";

const categories = [

  {
    title: "Mortgage Calculators",
    items: [

      {
        title: "Mortgage Calculator",
        link: "/mortgage-calculator",
      },

      {
        title: "Refinance Calculator",
        link: "/refinance-calculator",
      },

      {
        title: "Affordability Calculator",
        link: "/affordability-calculator",
      },

      {
        title: "Down Payment Calculator",
        link: "/down-payment-calculator",
      },

      {
        title: "Rent vs Buy Calculator",
        link: "/rent-vs-buy-calculator",
      },

      {
        title: "Mortgage Payoff Calculator",
        link: "/mortgage-payoff-calculator",
      },

      {
        title: "HELOC Calculator",
        link: "/heloc-calculator",
      },

      {
        title: "Closing Cost Calculator",
        link: "/closing-cost-calculator",
      },

    ],

  },

  {
    title: "Loan Calculators",

    items: [

      {
        title: "Loan Calculator",
        link: "/loan-calculator",
      },

      {
        title: "Personal Loan Calculator",
        link: "/personal-loan-calculator",
      },

      {
        title: "Student Loan Calculator",
        link: "/student-loan-calculator",
      },

      {
        title: "Debt Consolidation Calculator",
        link: "/debt-consolidation-calculator",
      },

      {
        title: "Credit Card Payoff Calculator",
        link: "/credit-card-payoff-calculator",
      },

      {
        title: "Debt Snowball Calculator",
        link: "/debt-snowball-calculator",
      },

      {
        title: "Debt Avalanche Calculator",
        link: "/debt-avalanche-calculator",
      },

    ],

  },

  {
    title: "Retirement Calculators",

    items: [

      {
        title: "401k Calculator",
        link: "/401k-calculator",
      },

      {
        title: "Roth IRA Calculator",
        link: "/roth-ira-calculator",
      },

      {
        title: "IRA Calculator",
        link: "/ira-calculator",
      },

      {
        title: "Pension Calculator",
        link: "/pension-calculator",
      },

      {
        title: "Social Security Calculator",
        link: "/social-security-calculator",
      },

      {
        title: "Retirement Savings Calculator",
        link: "/retirement-savings-calculator",
      },

      {
        title: "Early Retirement Calculator",
        link: "/early-retirement-calculator",
      },

    ],

  },

  {
    title: "Savings Calculators",

    items: [

      {
        title: "CD Calculator",
        link: "/cd-calculator",
      },

      {
        title: "High Yield Savings Calculator",
        link: "/high-yield-savings-calculator",
      },

      {
        title: "Emergency Fund Calculator",
        link: "/emergency-fund-calculator",
      },

      {
        title: "Bank Interest Calculator",
        link: "/bank-interest-calculator",
      },

      {
        title: "Budget Calculator",
        link: "/budget-calculator",
      },

      {
        title: "Expense Calculator",
        link: "/expense-calculator",
      },

      {
        title: "Cash Flow Calculator",
        link: "/cash-flow-calculator",
      },

    ],

  },

  {
    title: "Income & Tax Calculators",

    items: [

      {
        title: "Salary Calculator",
        link: "/salary-calculator",
      },

      {
        title: "Hourly Wage Calculator",
        link: "/hourly-wage-calculator",
      },

      {
        title: "Take Home Pay Calculator",
        link: "/take-home-pay-calculator",
      },

      {
        title: "Tax Calculator",
        link: "/tax-calculator",
      },

      {
        title: "Income Tax Calculator",
        link: "/income-tax-calculator",
      },

      {
        title: "Bonus Tax Calculator",
        link: "/bonus-tax-calculator",
      },

      {
        title: "Paycheck Calculator",
        link: "/paycheck-calculator",
      },

    ],

  },

  {
    title: "Business Calculators",

    items: [

      {
        title: "Profit Margin Calculator",
        link: "/profit-margin-calculator",
      },

      {
        title: "Break Even Calculator",
        link: "/break-even-calculator",
      },

      {
        title: "Business Loan Calculator",
        link: "/business-loan-calculator",
      },

      {
        title: "Cash Runway Calculator",
        link: "/cash-runway-calculator",
      },

      {
        title: "Revenue Calculator",
        link: "/revenue-calculator",
      },

      {
        title: "Gross Profit Calculator",
        link: "/gross-profit-calculator",
      },

      {
        title: "Net Profit Calculator",
        link: "/net-profit-calculator",
      },

      {
        title: "Markup Calculator",
        link: "/markup-calculator",
      },

      {
        title: "Discount Calculator",
        link: "/discount-calculator",
      },

      {
        title: "Sales Tax Calculator",
        link: "/sales-tax-calculator",
      },

    ],

  },

];

export default function SitemapPage() {

  return (

    <main className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-black text-slate-900 mb-5">

          Financial Calculator Sitemap

        </h1>

        <p className="text-slate-600 text-lg leading-8 mb-12 max-w-4xl">

          Browse all financial calculators including mortgage,
          retirement,
          tax,
          loan,
          business,
          and investment calculators.

        </p>

        <div className="space-y-10">

          {categories.map((category) => (

            <section
              key={category.title}
              className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
            >

              <h2 className="text-3xl font-black text-slate-900 mb-8">

                {category.title}

              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                {category.items.map((item) => (

                  <Link
                    key={item.link}
                    href={item.link}
                    className="
                      group
                      bg-slate-50
                      hover:bg-blue-50
                      border
                      border-slate-200
                      hover:border-blue-300
                      rounded-2xl
                      p-5
                      transition
                    "
                  >

                    <div className="flex items-center justify-between">

                      <span className="
                        text-lg
                        font-semibold
                        text-slate-800
                        group-hover:text-blue-700
                      ">

                        {item.title}

                      </span>

                      <span className="
                        text-slate-400
                        group-hover:text-blue-500
                      ">

                        →

                      </span>

                    </div>

                  </Link>

                ))}

              </div>

            </section>

          ))}

        </div>

      </div>

    </main>

  );

}