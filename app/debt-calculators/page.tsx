import Link from "next/link"

export default function DebtCalculatorsPage() {

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-black mb-6">
            Debt Calculators
          </h1>

          <p className="text-slate-600 text-lg mb-8">
            Explore debt payoff calculators,
            credit card repayment tools,
            and debt reduction strategies.
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            <Link
              href="/credit-card-payoff-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Credit Card Payoff Calculator
            </Link>

            <Link
              href="/debt-snowball-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Debt Snowball Calculator
            </Link>

            <Link
              href="/debt-avalanche-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Debt Avalanche Calculator
            </Link>

            <Link
              href="/loan-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Loan Calculator
            </Link>

            <Link
              href="/extra-payment-calculator"
              className="bg-slate-100 hover:bg-red-50 rounded-2xl p-5 font-bold"
            >
              Extra Payment Calculator
            </Link>

          </div>

        </div>

      </div>

    </main>

  )
}