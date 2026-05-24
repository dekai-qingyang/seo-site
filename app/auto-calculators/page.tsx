import Link from "next/link";

const autoTools = [

  {
    title: "Auto Loan Calculator",
    link: "/auto-loan-calculator",
    description:
      "Estimate monthly auto loan payments, financing costs, and vehicle affordability.",
  },

  {
    title: "Car Payment Calculator",
    link: "/car-payment-calculator",
    description:
      "Calculate monthly car payments including loan terms, rates, and down payments.",
  },

  {
    title: "Car Affordability Calculator",
    link: "/car-affordability-calculator",
    description:
      "Estimate how much car you can afford based on income and budget goals.",
  },

  {
    title: "Lease Calculator",
    link: "/lease-calculator",
    description:
      "Estimate lease payments, residual values, and total leasing costs.",
  },

  {
    title: "Car Lease Calculator",
    link: "/car-lease-calculator",
    description:
      "Analyze vehicle lease costs, monthly payments, and financing options.",
  },

  {
    title: "Used Car Calculator",
    link: "/used-car-calculator",
    description:
      "Estimate financing costs and affordability for used vehicle purchases.",
  },

  {
    title: "Vehicle Loan Calculator",
    link: "/vehicle-loan-calculator",
    description:
      "Estimate vehicle financing payments and total borrowing expenses.",
  },

  {
    title: "Trade In Calculator",
    link: "/trade-in-calculator",
    description:
      "Estimate trade-in vehicle value and reduce financing costs on new purchases.",
  },

  {
    title: "Auto Refinance Calculator",
    link: "/auto-refinance-calculator",
    description:
      "Compare refinancing options and estimate potential auto loan savings.",
  },

  {
    title: "Gas Cost Calculator",
    link: "/gas-cost-calculator",
    description:
      "Estimate fuel expenses based on mileage, fuel efficiency, and gas prices.",
  },

  {
    title: "Fuel Cost Calculator",
    link: "/fuel-cost-calculator",
    description:
      "Calculate fuel consumption costs and long-term driving expenses.",
  },

  {
    title: "EV Savings Calculator",
    link: "/ev-savings-calculator",
    description:
      "Estimate electric vehicle savings compared to traditional gasoline vehicles.",
  },

  {
    title: "Vehicle Depreciation Calculator",
    link: "/vehicle-depreciation-calculator",
    description:
      "Estimate vehicle depreciation rates and long-term resale value projections.",
  },

  {
    title: "Loan Calculator",
    link: "/loan-calculator",
    description:
      "Estimate loan repayment schedules and financing costs for vehicle purchases.",
  },

  {
    title: "APR Calculator",
    link: "/apr-calculator",
    description:
      "Calculate annual percentage rates and financing costs for auto loans.",
  },

  {
    title: "Interest Payoff Calculator",
    link: "/interest-payoff-calculator",
    description:
      "Estimate loan interest costs and repayment savings opportunities.",
  },

  {
    title: "Extra Payment Calculator",
    link: "/extra-payment-calculator",
    description:
      "Estimate how additional payments may reduce vehicle loan balances faster.",
  },

];

export default function AutoCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-sky-700
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

              Vehicle Finance Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Auto Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore free auto finance calculators for car loans,
              lease payments,
              refinancing,
              trade-in values,
              fuel costs,
              EV savings,
              and vehicle affordability planning.

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

              Vehicle Finance & Ownership Tools

            </h2>

            <p className="
              text-slate-600
              text-lg
              leading-8
              max-w-4xl
            ">

              Browse auto loan calculators,
              lease estimators,
              refinancing tools,
              fuel cost analysis resources,
              and long-term vehicle ownership planning calculators.

            </p>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {autoTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-sky-50
                  border
                  border-slate-200
                  hover:border-sky-500
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
                  from-sky-600
                  to-blue-700
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-black
                  mb-6
                ">

                  🚗

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-sky-700
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

              Vehicle Finance & Auto Loan Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Auto calculators help drivers estimate vehicle financing costs,
                monthly loan payments,
                lease expenses,
                refinancing opportunities,
                fuel costs,
                and long-term vehicle ownership expenses.

              </p>

              <p>

                These calculators are frequently used for auto loan planning,
                vehicle affordability analysis,
                trade-in valuation,
                refinancing decisions,
                and electric vehicle cost comparisons.

              </p>

              <p>

                Understanding financing costs and long-term ownership expenses may help drivers reduce borrowing costs,
                improve budgeting decisions,
                and optimize vehicle purchasing strategies.

              </p>

              <p>

                Vehicle finance planning often involves multiple variables including loan terms,
                down payments,
                interest rates,
                fuel expenses,
                depreciation rates,
                lease structures,
                and refinancing costs.

              </p>

              <p>

                Whether you are purchasing a new vehicle,
                refinancing an auto loan,
                comparing lease options,
                estimating fuel costs,
                or analyzing EV savings,
                these calculators provide fast and accurate financial estimates for smarter vehicle financing decisions.

              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}