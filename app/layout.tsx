import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoanFormulas",
  description:
    "Financial calculators for loans, mortgages, investments, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body className="bg-slate-100 text-slate-900">

        {/* NAVBAR */}

        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

          <div className="max-w-7xl mx-auto px-4">

            <div className="flex items-center justify-between h-16">

              {/* LOGO */}

              <a
                href="/"
                className="text-2xl font-black text-blue-600"
              >
                LoanFormulas
              </a>

              {/* MENU */}

              <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">

                <a
                  href="/loan-calculator"
                  className="hover:text-blue-600 transition"
                >
                  Loans
                </a>

                <a
                  href="/mortgage-calculator"
                  className="hover:text-blue-600 transition"
                >
                  Mortgage
                </a>

                <a
                  href="/compound-interest-calculator"
                  className="hover:text-blue-600 transition"
                >
                  Investing
                </a>

                <a
                  href="/auto-loan-calculator"
                  className="hover:text-blue-600 transition"
                >
                  Auto
                </a>

              </nav>

            </div>

          </div>

        </header>

        {/* PAGE */}

        {children}

      </body>

    </html>

  )
}