import Link from "next/link";

const mortgageTools = [

  {
    title: "Mortgage Calculator",
    link: "/mortgage-calculator",
    description:
      "Estimate monthly mortgage payments, loan costs, and long-term home financing expenses.",
  },

  {
    title: "Refinance Calculator",
    link: "/refinance-calculator",
    description:
      "Compare refinancing options, lower monthly payments, and estimate interest savings.",
  },

  {
    title: "Affordability Calculator",
    link: "/affordability-calculator",
    description:
      "Estimate how much house you can afford based on income, debt, and down payment.",
  },

  {
    title: "Down Payment Calculator",
    link: "/down-payment-calculator",
    description:
      "Calculate required down payments, loan amounts, and mortgage financing needs.",
  },

  {
    title: "Rent vs Buy Calculator",
    link: "/rent-vs-buy-calculator",
    description:
      "Compare long-term renting and home buying costs to make smarter housing decisions.",
  },

  {
    title: "Extra Payment Calculator",
    link: "/extra-payment-calculator",
    description:
      "Estimate how additional mortgage payments may reduce loan terms and interest costs.",
  },

  {
    title: "Biweekly Mortgage Calculator",
    link: "/biweekly-mortgage-calculator",
    description:
      "Analyze biweekly mortgage payment strategies and long-term loan savings.",
  },

  {
    title: "Mortgage Payoff Calculator",
    link: "/mortgage-payoff-calculator",
    description:
      "Estimate mortgage payoff timelines and interest savings opportunities.",
  },

  {
    title: "Mortgage Interest Calculator",
    link: "/mortgage-interest-calculator",
    description:
      "Calculate mortgage interest costs over the life of a home loan.",
  },

  {
    title: "Mortgage Points Calculator",
    link: "/mortgage-points-calculator",
    description:
      "Estimate savings and costs associated with buying mortgage discount points.",
  },

  {
    title: "Mortgage Insurance Calculator",
    link: "/mortgage-insurance-calculator",
    description:
      "Calculate PMI costs and mortgage insurance requirements for home financing.",
  },

  {
    title: "Property Tax Calculator",
    link: "/property-tax-calculator",
    description:
      "Estimate annual property taxes and housing-related ownership expenses.",
  },

  {
    title: "Home Equity Calculator",
    link: "/home-equity-calculator",
    description:
      "Estimate available home equity based on loan balances and property value.",
  },

  {
    title: "Home Equity Loan Calculator",
    link: "/home-equity-loan-calculator",
    description:
      "Estimate home equity loan payments, interest costs, and borrowing limits.",
  },

  {
    title: "Home Equity Line of Credit Calculator",
    link: "/home-equity-line-of-credit-calculator",
    description:
      "Analyze HELOC borrowing capacity, payments, and revolving credit costs.",
  },

  {
    title: "HELOC Calculator",
    link: "/heloc-calculator",
    description:
      "Estimate HELOC monthly payments, interest expenses, and home equity usage.",
  },

  {
    title: "Closing Cost Calculator",
    link: "/closing-cost-calculator",
    description:
      "Calculate estimated closing costs, lender fees, and home purchase expenses.",
  },

  {
    title: "House Payment Calculator",
    link: "/house-payment-calculator",
    description:
      "Estimate total monthly house payments including taxes and insurance.",
  },

  {
    title: "Home Affordability Calculator",
    link: "/home-affordability-calculator",
    description:
      "Estimate affordable home prices based on income and debt-to-income ratios.",
  },

  {
    title: "Real Estate Calculator",
    link: "/real-estate-calculator",
    description:
      "Analyze real estate financing, investment returns, and property costs.",
  },

  {
    title: "Cash Out Refinance Calculator",
    link: "/cash-out-refinance-calculator",
    description:
      "Estimate cash-out refinance proceeds, payments, and refinancing expenses.",
  },

  {
    title: "Adjustable Rate Mortgage Calculator",
    link: "/adjustable-rate-mortgage-calculator",
    description:
      "Estimate ARM loan payments and future interest rate adjustment scenarios.",
  },

  {
    title: "ARM Calculator",
    link: "/arm-calculator",
    description:
      "Analyze adjustable-rate mortgage costs and changing payment projections.",
  },

  {
    title: "Principal and Interest Calculator",
    link: "/principal-and-interest-calculator",
    description:
      "Estimate principal and interest breakdowns for mortgage loan payments.",
  },

  {
    title: "Escrow Calculator",
    link: "/escrow-calculator",
    description:
      "Calculate escrow costs including property taxes and homeowners insurance.",
  },

  {
    title: "Mortgage Amortization Calculator",
    link: "/mortgage-amortization-calculator",
    description:
      "View mortgage amortization schedules and long-term repayment breakdowns.",
  },

  {
    title: "Amortization Calculator",
    link: "/amortization-calculator",
    description:
      "Estimate amortized loan payments, balances, and repayment schedules.",
  },

];

export default function MortgageCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-blue-900
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

              Home Financing Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Mortgage Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore free mortgage calculators for home loans,
              refinancing,
              amortization,
              affordability,
              home equity,
              property taxes,
              and mortgage payoff planning.

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

          <div className="
            flex
            items-center
            justify-between
            mb-10
          ">

            <div>

              <h2 className="
                text-4xl
                font-black
                text-slate-900
                mb-4
              ">

                Mortgage & Home Loan Tools

              </h2>

              <p className="
                text-slate-600
                text-lg
                leading-8
                max-w-4xl
              ">

                Browse mortgage payment calculators,
                refinance tools,
                affordability estimators,
                amortization schedules,
                and home equity planning resources.

              </p>

            </div>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {mortgageTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-blue-50
                  border
                  border-slate-200
                  hover:border-blue-500
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

                  🏠

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-blue-700
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

              Mortgage & Home Financing Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Mortgage calculators help homebuyers,
                homeowners,
                and real estate investors estimate monthly mortgage payments,
                home affordability,
                refinancing costs,
                amortization schedules,
                property taxes,
                and long-term borrowing expenses.

              </p>

              <p>

                These calculators are frequently used to compare loan options,
                evaluate refinance opportunities,
                estimate total interest costs,
                and improve long-term housing affordability planning.

              </p>

              <p>

                Home financing decisions often involve multiple variables including loan terms,
                mortgage interest rates,
                down payments,
                property taxes,
                homeowners insurance,
                PMI,
                and refinancing costs.

              </p>

              <p>

                Mortgage calculators may help borrowers understand monthly payment obligations,
                evaluate home affordability,
                compare fixed-rate and adjustable-rate mortgages,
                and estimate long-term repayment timelines.

              </p>

              <p>

                Whether you are purchasing a new home,
                refinancing an existing mortgage,
                or analyzing home equity borrowing options,
                these mortgage calculators provide fast and accurate financial estimates for smarter real estate decisions.

              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}