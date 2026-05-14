"use client"

import Link from "next/link"
import { useState } from "react"

export default function HomePage() {

  const [display, setDisplay] = useState("0")

  const handleClick = (value: string) => {

    if (value === "AC") {
      setDisplay("0")
      return
    }

    if (value === "=") {

      try {

        const result = Function(
          `"use strict"; return (${display})`
        )()

        setDisplay(String(result))

      } catch {

        setDisplay("Error")

      }

      return
    }

    if (display === "0" || display === "Error") {
      setDisplay(value)
    } else {
      setDisplay(display + value)
    }
  }

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
  ]

  const tools = [
    {
      title: "Mortgage Calculator",
      link: "/mortgage-calculator",
      description:
        "Estimate monthly mortgage payments and amortization schedules.",
    },
    {
      title: "Loan Calculator",
      link: "/loan-calculator",
      description:
        "Calculate loan payments, total interest, and repayment costs.",
    },
    {
      title: "Refinance Calculator",
      link: "/refinance-calculator",
      description:
        "Compare refinance rates and estimate savings over time.",
    },
    {
      title: "Auto Loan Calculator",
      link: "/auto-loan-calculator",
      description:
        "Calculate car loan payments and total financing costs.",
    },
    {
      title: "Affordability Calculator",
      link: "/affordability-calculator",
      description:
        "Estimate how much house you can afford based on income.",
    },
    {
      title: "Compound Interest Calculator",
      link: "/compound-interest-calculator",
      description:
        "Estimate compound investment growth and long-term returns.",
    },
    {
      title: "Retirement Calculator",
      link: "/retirement-calculator",
      description:
        "Calculate retirement savings, investment growth, and future retirement income projections.",
    },
    {
      title: "Savings Calculator",
      link: "/savings-calculator",
      description:
        "Estimate dividend income and investment returns.",
    },
    {
      title: "Investment Calculator",
      link: "/investment-calculator",
      description:
        "Estimate investment growth, compound returns, and long-term wealth accumulation.",
    },
    
  ]

  return (

    <main className="min-h-screen bg-slate-100">

      {/* HERO */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">

          <div className="max-w-4xl">

            <h1 className="text-4xl lg:text-7xl font-black leading-tight mb-6">
              Online Financial & Math Calculators
            </h1>

            <p className="text-lg lg:text-2xl text-blue-100 leading-9">
              Free online mortgage, loan, refinance, auto loan,
              affordability, compound interest, and scientific calculators.
            </p>

          </div>

        </div>

      </section>

      {/* SCIENTIFIC CALCULATOR */}

      <section className="max-w-7xl mx-auto px-3 lg:px-4 py-8 lg:py-14">

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 lg:p-6">

            <h2 className="text-2xl lg:text-4xl font-black text-white mb-2">
              Scientific Calculator
            </h2>

            <p className="text-blue-100">
              Simple online calculator for quick calculations.
            </p>

          </div>

          <div className="p-4 lg:p-8">

            {/* DISPLAY */}

            <div className="bg-slate-900 rounded-2xl p-5 lg:p-7 mb-5 lg:mb-8">

              <div className="text-right text-white text-3xl lg:text-5xl font-black break-all min-h-[50px]">
                {display}
              </div>

            </div>

            {/* BUTTONS */}

            <div className="grid grid-cols-4 gap-3 lg:gap-4">

              {buttons.map((btn) => (

                <button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  className={`rounded-2xl py-4 lg:py-6 text-xl lg:text-3xl font-bold transition-all shadow-md hover:scale-105 ${
                    ["+", "-", "*", "/", "="].includes(btn)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  {btn}
                </button>

              ))}

              <button
                onClick={() => handleClick("AC")}
                className="col-span-4 rounded-2xl py-4 lg:py-5 bg-red-500 text-white text-xl lg:text-2xl font-bold shadow-md hover:scale-[1.01]"
              >
                Clear Calculator
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* TOOL GRID */}

      <section className="max-w-7xl mx-auto px-3 lg:px-4 pb-10 lg:pb-20">

        <div className="flex items-center justify-between mb-6 lg:mb-10">

          <h2 className="text-3xl lg:text-5xl font-black">
            Popular Calculators
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">

          {tools.map((tool) => (

            <Link
              key={tool.title}
              href={tool.link}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 lg:p-8 hover:-translate-y-1 transition-all"
            >

              <div className="mb-5">

                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl lg:text-3xl font-black">
                  $
                </div>

              </div>

              <h3 className="text-2xl font-black mb-4">
                {tool.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {tool.description}
              </p>

            </Link>

          ))}

        </div>

      </section>

      {/* ARTICLE */}

      <section className="bg-white border-t border-slate-200">

        <div className="max-w-5xl mx-auto px-4 py-14 lg:py-20">

          <h2 className="text-3xl lg:text-5xl font-black mb-8">
            Free Online Calculator Tools
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-base lg:text-lg">

            <p>
              Online calculators help users estimate financial costs,
              mortgage payments, loan interest, refinancing savings,
              investment growth, and affordability instantly.
            </p>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Mortgage Calculators
              </h3>

              <p>
                Mortgage calculators estimate monthly payments,
                amortization schedules, and total home financing costs.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Loan Calculators
              </h3>

              <p>
                Loan calculators help borrowers understand repayment
                schedules, total interest costs, and monthly installments.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Compound Interest Tools
              </h3>

              <p>
                Compound interest calculators help investors estimate
                future investment growth and long-term wealth accumulation.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Financial Planning Tools
              </h3>

              <p>
                Financial calculators simplify budgeting, refinancing,
                affordability analysis, and investment planning.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  )
}