import Script from "next/script"
import type { Metadata } from "next"
import Link from "next/link"

import "./globals.css"

export const metadata: Metadata = {

  title: {
    default: "LoanFormulas",
    template: "%s | LoanFormulas",
  },

  description:
    "Financial calculators for mortgages, loans, investing, retirement, debt payoff, and personal finance.",

  keywords: [
    "loan calculator",
    "mortgage calculator",
    "investment calculator",
    "retirement calculator",
    "finance calculator",
    "compound interest calculator",
  ],

  metadataBase: new URL(
    "https://loanformulas.com"
  ),

  openGraph: {

    title: "LoanFormulas",

    description:
      "Financial calculators for mortgages, loans, investing, retirement, debt payoff, and personal finance.",

    url: "https://loanformulas.com",

    siteName: "LoanFormulas",

    locale: "en_US",

    type: "website",

  },

  robots: {

    index: true,
    follow: true,

  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">

      <body className="bg-slate-100 text-slate-900">

        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7679960560339960"
          crossOrigin="anonymous"
        />

        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

          <div className="max-w-7xl mx-auto px-4">

            <div className="flex items-center justify-between h-16">

              <Link
                href="/"
                className="text-2xl font-black text-blue-600"
              >
                LoanFormulas
              </Link>

              <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">

                <Link
                  href="/mortgage-calculators"
                  className="hover:text-blue-600 transition"
                >
                  Mortgage
                </Link>

                <Link
                  href="/debt-calculators"
                  className="hover:text-blue-600 transition"
                >
                  Debt
                </Link>

                <Link
                  href="/investment-calculators"
                  className="hover:text-blue-600 transition"
                >
                  Investing
                </Link>

                <Link
                  href="/retirement-calculators"
                  className="hover:text-blue-600 transition"
                >
                  Retirement
                </Link>

              </nav>

            </div>

          </div>

        </header>

        {children}
        <footer className="bg-white border-t border-slate-200 mt-16">

  <div className="max-w-7xl mx-auto px-4 py-10">

    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 font-medium">

      <a
        href="/about"
        className="hover:text-blue-600 transition"
      >
        About
      </a>

      <a
        href="/contact"
        className="hover:text-blue-600 transition"
      >
        Contact
      </a>

      <a
        href="/privacy-policy"
        className="hover:text-blue-600 transition"
      >
        Privacy Policy
      </a>

      <a
        href="/terms-of-service"
        className="hover:text-blue-600 transition"
      >
        Terms of Service
      </a>

      <a
        href="/sitemap.xml"
        className="hover:text-blue-600 transition"
      >
        Sitemap
      </a>

    </div>

    <div className="text-center text-slate-500 text-sm mt-6">
      © 2026 LoanFormulas. All rights reserved.
    </div>

  </div>

</footer>

        <footer className="bg-white border-t border-slate-200 mt-20">

          <div className="max-w-7xl mx-auto px-4 py-12">

            <div className="grid md:grid-cols-4 gap-10">

              <div>

                <h3 className="text-xl font-black mb-4 text-blue-600">
                  LoanFormulas
                </h3>

                <p className="text-slate-600 leading-7">
                  Free financial calculators for mortgages,
                  loans,
                  investing,
                  retirement planning,
                  and personal finance.
                </p>

              </div>

              <div>

                <h3 className="font-bold mb-4">
                  Mortgage Calculators
                </h3>

                <div className="flex flex-col gap-3 text-slate-600 text-sm">

                  <Link href="/mortgage-calculator">
                    Mortgage Calculator
                  </Link>

                  <Link href="/refinance-calculator">
                    Refinance Calculator
                  </Link>

                  <Link href="/amortization-calculator">
                    Amortization Calculator
                  </Link>

                  <Link href="/down-payment-calculator">
                    Down Payment Calculator
                  </Link>

                  <Link href="/affordability-calculator">
                    Affordability Calculator
                  </Link>

                  <Link href="/rent-vs-buy-calculator">
                    Rent vs Buy Calculator
                  </Link>

                  <Link href="/extra-payment-calculator">
                    Extra Payment Calculator
                  </Link>

                  <Link href="/auto-loan-calculator">
                    Auto Loan Calculator
                  </Link>

                  <Link href="/biweekly-mortgage-calculator">
                    Biweekly Mortgage Calculator
                  </Link>

                </div>

              </div>

              <div>

                <h3 className="font-bold mb-4">
                  Debt Calculators
                </h3>

                <div className="flex flex-col gap-3 text-slate-600 text-sm">

                  <Link href="/credit-card-payoff-calculator">
                    Credit Card Payoff Calculator
                  </Link>

                  <Link href="/debt-snowball-calculator">
                    Debt Snowball Calculator
                  </Link>

                  <Link href="/debt-avalanche-calculator">
                    Debt Avalanche Calculator
                  </Link>

                  <Link href="/loan-calculator">
                    Loan Calculator
                  </Link>

                </div>

              </div>

              <div>

                <h3 className="font-bold mb-4">
                  Investment & Retirement
                </h3>

                <div className="flex flex-col gap-3 text-slate-600 text-sm">

                  <Link href="/compound-interest-calculator">
                    Compound Interest Calculator
                  </Link>

                  <Link href="/investment-calculator">
                    Investment Calculator
                  </Link>

                  <Link href="/dividend-calculator">
                    Dividend Calculator
                  </Link>

                  <Link href="/roi-calculator">
                    ROI Calculator
                  </Link>

                  <Link href="/savings-calculator">
                    Savings Calculator
                  </Link>

                  <Link href="/retirement-calculator">
                    Retirement Calculator
                  </Link>

                </div>

              </div>

            </div>

            <div className="border-t border-slate-200 mt-10 pt-6 text-sm text-slate-500 text-center">

              © 2026 LoanFormulas. All rights reserved.

            </div>

          </div>

        </footer>

      </body>

    </html>

  )
}