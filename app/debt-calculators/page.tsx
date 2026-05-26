import Link from "next/link";

const debtTools = [

  {
    title: "Loan Calculator",
    link: "/loan-calculator",
    description:
      "Estimate monthly loan payments, borrowing costs, and long-term repayment schedules.",
  },

  {
    title: "Personal Loan Calculator",
    link: "/personal-loan-calculator",
    description:
      "Calculate personal loan payments, interest costs, and repayment timelines.",
  },

  {
    title: "Payday Loan Calculator",
    link: "/payday-loan-calculator",
    description:
      "Estimate payday loan costs, fees, and short-term borrowing expenses.",
  },

  {
    title: "Student Loan Calculator",
    link: "/student-loan-calculator",
    description:
      "Estimate student loan payments, interest accumulation, and repayment costs.",
  },

  {
    title: "Student Loan Payoff Calculator",
    link: "/student-loan-payoff-calculator",
    description:
      "Analyze student loan payoff timelines and repayment acceleration strategies.",
  },

  {
    title: "Student Loan Refinance Calculator",
    link: "/student-loan-refinance-calculator",
    description:
      "Compare refinancing scenarios and estimate student loan savings opportunities.",
  },

  {
    title: "Interest Payoff Calculator",
    link: "/interest-payoff-calculator",
    description:
      "Estimate loan interest repayment costs and long-term borrowing expenses.",
  },

  {
    title: "Loan Payoff Calculator",
    link: "/loan-payoff-calculator",
    description:
      "Calculate loan payoff schedules and repayment acceleration strategies.",
  },

  {
    title: "Line of Credit Calculator",
    link: "/line-of-credit-calculator",
    description:
      "Estimate revolving credit payments, balances, and borrowing costs.",
  },

  {
    title: "Balance Transfer Calculator",
    link: "/balance-transfer-calculator",
    description:
      "Compare credit card balance transfer options and interest savings opportunities.",
  },

  {
    title: "Debt Consolidation Calculator",
    link: "/debt-consolidation-calculator",
    description:
      "Estimate debt consolidation payments and long-term interest savings.",
  },

  {
    title: "Credit Card Payoff Calculator",
    link: "/credit-card-payoff-calculator",
    description:
      "Estimate credit card repayment timelines, minimum payments, and interest costs.",
  },

  {
    title: "Debt Snowball Calculator",
    link: "/debt-snowball-calculator",
    description:
      "Analyze debt snowball repayment strategies focused on smaller balances first.",
  },

  {
    title: "Debt Avalanche Calculator",
    link: "/debt-avalanche-calculator",
    description:
      "Estimate debt avalanche repayment strategies prioritizing high-interest balances.",
  },

  {
    title: "Minimum Payment Calculator",
    link: "/minimum-payment-calculator",
    description:
      "Estimate repayment timelines when making only minimum debt payments.",
  },

  {
    title: "Debt Payoff Calculator",
    link: "/debt-payoff-calculator",
    description:
      "Calculate total debt payoff timelines and repayment cost projections.",
  },

  {
    title: "Credit Utilization Calculator",
    link: "/credit-utilization-calculator",
    description:
      "Estimate credit utilization ratios and analyze credit score impacts.",
  },

  {
    title: "Extra Payment Calculator",
    link: "/extra-payment-calculator",
    description:
      "Estimate how extra payments may reduce debt balances and interest costs.",
  },

];

export default function DebtCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <section className="
          bg-gradient-to-br
          from-red-700
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

              Debt Management Tools

            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            ">

              Debt Calculators

            </h1>

            <p className="
              text-slate-300
              text-xl
              leading-9
              max-w-3xl
            ">

              Explore free debt calculators for loans,
              credit cards,
              debt payoff planning,
              student loans,
              refinancing,
              consolidation,
              and repayment strategies.

            </p>

          </div>

        </section>

        {/* TOOLS */}

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

              Debt & Loan Repayment Tools

            </h2>

            <p className="
              text-slate-600
              text-lg
              leading-8
              max-w-4xl
            ">

              Browse calculators for debt payoff strategies,
              loan repayment planning,
              balance transfers,
              consolidation analysis,
              and credit management tools.

            </p>

          </div>

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            {debtTools.map((tool) => (

              <Link
                key={tool.link}
                href={tool.link}
                className="
                  group
                  bg-slate-50
                  hover:bg-red-50
                  border
                  border-slate-200
                  hover:border-red-400
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
                  from-red-600
                  to-rose-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-black
                  mb-6
                ">

                  💳

                </div>

                <h3 className="
                  text-2xl
                  font-black
                  text-slate-900
                  group-hover:text-red-700
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

              Debt Repayment & Loan Calculators

            </h2>

            <div className="
              space-y-8
              text-slate-700
              text-lg
              leading-9
            ">

              <p>

                Debt calculators help borrowers estimate monthly loan payments,
                repayment timelines,
                credit card balances,
                interest costs,
                refinancing opportunities,
                and long-term debt reduction strategies.

              </p>

              <p>

                These calculators are frequently used for personal loans,
                student loans,
                balance transfers,
                debt consolidation,
                credit card repayment planning,
                and loan payoff acceleration strategies.

              </p>

              <p>

                Understanding repayment schedules and borrowing costs may help users reduce debt faster,
                improve budgeting decisions,
                and minimize long-term interest expenses.

              </p>

              <p>

                Debt management calculators often compare repayment methods such as debt snowball and debt avalanche strategies,
                helping borrowers prioritize balances and optimize repayment efficiency.

              </p>

              <p>

                Whether you are managing credit card balances,
                consolidating loans,
                refinancing debt,
                or planning long-term repayment goals,
                these calculators provide fast and accurate financial estimates for smarter debt management.

              </p>

            </div>

            {/* RELATED LINKS */}

            <div className="
              mt-14
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
            ">

              <Link
                href="/loan-calculator"
                className="
                  bg-slate-50
                  hover:bg-red-50
                  border
                  border-slate-200
                  hover:border-red-400
                  rounded-2xl
                  p-6
                  transition
                "
              >

                <h3 className="text-xl font-black mb-3">
                  Loan Calculator
                </h3>

                <p className="text-slate-600 leading-7">
                  Estimate monthly loan payments,
                  borrowing costs,
                  and repayment schedules.
                </p>

              </Link>

              <Link
                href="/credit-card-payoff-calculator"
                className="
                  bg-slate-50
                  hover:bg-red-50
                  border
                  border-slate-200
                  hover:border-red-400
                  rounded-2xl
                  p-6
                  transition
                "
              >

                <h3 className="text-xl font-black mb-3">
                  Credit Card Payoff Calculator
                </h3>

                <p className="text-slate-600 leading-7">
                  Analyze repayment timelines,
                  interest costs,
                  and payoff strategies.
                </p>

              </Link>

              <Link
                href="/debt-snowball-calculator"
                className="
                  bg-slate-50
                  hover:bg-red-50
                  border
                  border-slate-200
                  hover:border-red-400
                  rounded-2xl
                  p-6
                  transition
                "
              >

                <h3 className="text-xl font-black mb-3">
                  Debt Snowball Calculator
                </h3>

                <p className="text-slate-600 leading-7">
                  Organize balances from smallest to largest
                  for faster payoff momentum.
                </p>

              </Link>

              <Link
                href="/debt-avalanche-calculator"
                className="
                  bg-slate-50
                  hover:bg-red-50
                  border
                  border-slate-200
                  hover:border-red-400
                  rounded-2xl
                  p-6
                  transition
                "
              >

                <h3 className="text-xl font-black mb-3">
                  Debt Avalanche Calculator
                </h3>

                <p className="text-slate-600 leading-7">
                  Prioritize high-interest balances
                  to reduce long-term borrowing costs.
                </p>

              </Link>

              <Link
                href="/student-loan-calculator"
                className="
                  bg-slate-50
                  hover:bg-red-50
                  border
                  border-slate-200
                  hover:border-red-400
                  rounded-2xl
                  p-6
                  transition
                "
              >

                <h3 className="text-xl font-black mb-3">
                  Student Loan Calculator
                </h3>

                <p className="text-slate-600 leading-7">
                  Estimate education loan payments,
                  interest costs,
                  and repayment timelines.
                </p>

              </Link>

              <Link
                href="/debt-consolidation-calculator"
                className="
                  bg-slate-50
                  hover:bg-red-50
                  border
                  border-slate-200
                  hover:border-red-400
                  rounded-2xl
                  p-6
                  transition
                "
              >

                <h3 className="text-xl font-black mb-3">
                  Debt Consolidation Calculator
                </h3>

                <p className="text-slate-600 leading-7">
                  Compare consolidation options
                  and estimate long-term interest savings.
                </p>

              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}