import Link from "next/link"

export default function InvestmentCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-black mb-6">
            Investment Calculators
          </h1>

          <p className="text-slate-600 text-lg mb-8">
            Explore investment calculators for returns,
            compound interest,
            dividends,
            ROI,
            and long-term wealth growth.
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            <Link
              href="/compound-interest-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Compound Interest Calculator
            </Link>

            <Link
              href="/investment-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Investment Calculator
            </Link>

            <Link
              href="/dividend-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Dividend Calculator
            </Link>

            <Link
              href="/roi-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              ROI Calculator
            </Link>

            <Link
              href="/savings-calculator"
              className="bg-slate-100 hover:bg-green-50 rounded-2xl p-5 font-bold"
            >
              Savings Calculator
            </Link>

          </div>

        </div>

      </div>

    </main>

  )
}