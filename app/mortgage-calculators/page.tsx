export default function MortgageCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-black mb-6">
            Mortgage Calculators
          </h1>

          <p className="text-slate-600 text-lg mb-8">
            Explore mortgage calculators for home loans,
            refinancing,
            amortization,
            affordability,
            and mortgage payoff planning.
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            <a
              href="/mortgage-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Mortgage Calculator
            </a>

            <a
              href="/refinance-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Refinance Calculator
            </a>

            <a
              href="/amortization-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Amortization Calculator
            </a>

            <a
              href="/down-payment-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Down Payment Calculator
            </a>

            <a
              href="/affordability-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Affordability Calculator
            </a>

            <a
              href="/rent-vs-buy-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Rent vs Buy Calculator
            </a>

            <a
              href="/extra-payment-calculator"
              className="bg-slate-100 hover:bg-blue-50 rounded-2xl p-5 font-bold"
            >
              Extra Payment Calculator
            </a>

          </div>

        </div>

      </div>

    </main>

  )
}