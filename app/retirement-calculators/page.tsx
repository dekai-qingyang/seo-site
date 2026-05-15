import Link from "next/link"

export default function RetirementCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-black mb-6">
            Retirement Calculators
          </h1>

          <p className="text-slate-600 text-lg mb-8">
            Explore retirement calculators for retirement planning,
            investment growth,
            savings projections,
            and future income estimates.
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            <Link
              href="/retirement-calculator"
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Retirement Calculator
            </Link>

            <Link
              href="/compound-interest-calculator"
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Compound Interest Calculator
            </Link>

            <Link
              href="/investment-calculator"
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Investment Calculator
            </Link>

            <Link
              href="/savings-calculator"
              className="bg-slate-100 hover:bg-purple-50 rounded-2xl p-5 font-bold"
            >
              Savings Calculator
            </Link>

          </div>

        </div>

      </div>

    </main>

  )
}