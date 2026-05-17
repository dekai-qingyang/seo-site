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
    {
      title: "Dividend Calculator",
      link: "/dividend-calculator",
      description:
      "Estimate dividend income, passive income growth, and long-term investment returns.",
    },
    {
      title: "Roi Calculator",
      link: "/roi-calculator",
      description:
        "Calculate return on investment, profit percentage, and investment performance estimates.",
    },
    {
      title: "Amortization Calculator",
      link: "/amortization-calculator",
      description:
        "Calculate loan amortization schedules, monthly payments, principal balances, and total interest costs.",
    },
    
    {
      title: "Down Payment Calculator",
      link: "/down-payment-calculator",
      description:
        "Estimate down payments, mortgage affordability, monthly payments, and home buying costs.",
    },
    
    {
      title: "Rent vs Buy Calculator",
      link: "/rent-vs-buy-calculator",
      description:
        "Compare renting versus buying a home with cost analysis, mortgage estimates, and long-term housing expenses.",
    },
    
    {
      title: "Extra Payment Calculator",
      link: "/extra-payment-calculator",
      description:
        "Calculate mortgage savings, interest reduction, and loan payoff timelines with extra monthly payments.",
    },
    
    {
      title: "Credit Card Payoff Calculator",
      link: "/credit-card-payoff-calculator",
      description:
        "Estimate credit card payoff schedules, interest savings, debt repayment timelines, and monthly payment strategies.",
    },
    
    {
      title: "Debt Snowball Calculator",
      link: "/debt-snowball-calculator",
      description:
        "Calculate debt snowball repayment plans, monthly debt payoff schedules, and interest reduction strategies.",
    },
    
    {
      title: "Debt Avalanche Calculator",
      link: "/debt-avalanche-calculator",
      description:
        "Estimate debt avalanche repayment plans, high-interest debt payoff strategies, and total interest savings.",
    },
    {
      title: "Biweekly Mortgage Calculator",
      link: "/biweekly-mortgage-calculator",
      description:
        "Estimate biweekly mortgage payments, interest savings, and faster mortgage payoff schedules.",
    },
    {
      title: "Mortgage Payoff Calculator",
      link: "/mortgage-payoff-calculator",
      description:
        "Estimate mortgage payoff schedules, interest savings, and early repayment timelines.",
    },
    
    {
      title: "Mortgage Interest Calculator",
      link: "/mortgage-interest-calculator",
      description:
        "Calculate mortgage interest costs, total loan payments, and long-term borrowing expenses.",
    },
    
    {
      title: "Mortgage Points Calculator",
      link: "/mortgage-points-calculator",
      description:
        "Estimate mortgage points costs, interest rate reductions, and long-term savings.",
    },
    
    {
      title: "Mortgage Insurance Calculator",
      link: "/mortgage-insurance-calculator",
      description:
        "Calculate PMI costs, mortgage insurance payments, and total home loan expenses.",
    },
    
    {
      title: "Property Tax Calculator",
      link: "/property-tax-calculator",
      description:
        "Estimate annual property taxes, monthly tax payments, and homeownership costs.",
    },
    
    {
      title: "Home Equity Calculator",
      link: "/home-equity-calculator",
      description:
        "Estimate home equity value, remaining mortgage balance, and property ownership percentage.",
    },
    
    {
      title: "Home Equity Loan Calculator",
      link: "/home-equity-loan-calculator",
      description:
        "Calculate home equity loan payments, interest costs, and borrowing estimates.",
    },
    
    {
      title: "Home Equity Line of Credit Calculator",
      link: "/home-equity-line-of-credit-calculator",
      description:
        "Estimate HELOC payments, credit line borrowing costs, and home equity usage.",
    },
    
    {
      title: "HELOC Calculator",
      link: "/heloc-calculator",
      description:
        "Estimate HELOC payments, interest costs, and flexible home equity borrowing schedules.",
    },
    
    {
      title: "Closing Cost Calculator",
      link: "/closing-cost-calculator",
      description:
        "Calculate home closing costs, lender fees, taxes, and total purchase expenses.",
    },
    
    {
      title: "House Payment Calculator",
      link: "/house-payment-calculator",
      description:
        "Estimate monthly house payments including mortgage, taxes, insurance, and HOA fees.",
    },
    
    {
      title: "Home Affordability Calculator",
      link: "/home-affordability-calculator",
      description:
        "Estimate how much house you can afford based on income, debt, and mortgage payments.",
    },
    
    {
      title: "Real Estate Calculator",
      link: "/real-estate-calculator",
      description:
        "Estimate real estate investment returns, property costs, and long-term value growth.",
    },
    
    {
      title: "Cash Out Refinance Calculator",
      link: "/cash-out-refinance-calculator",
      description:
        "Estimate cash-out refinance payments, equity withdrawal amounts, and refinancing costs.",
    },
    
    {
      title: "Adjustable Rate Mortgage Calculator",
      link: "/adjustable-rate-mortgage-calculator",
      description:
        "Estimate adjustable-rate mortgage payments, interest rate changes, and ARM loan costs.",
    },
    
    {
      title: "ARM Calculator",
      link: "/arm-calculator",
      description:
        "Calculate ARM mortgage payments, adjustable interest rates, and future loan estimates.",
    },
    
    {
      title: "Principal and Interest Calculator",
      link: "/principal-and-interest-calculator",
      description:
        "Estimate principal and interest mortgage payments with detailed loan repayment schedules.",
    },
    
    {
      title: "Escrow Calculator",
      link: "/escrow-calculator",
      description:
        "Estimate escrow payments for property taxes, insurance, and monthly mortgage expenses.",
    },
    
    {
      title: "Mortgage Amortization Calculator",
      link: "/mortgage-amortization-calculator",
      description:
        "Calculate mortgage amortization schedules, principal payments, and long-term interest costs.",
    },
    {
      title: "Car Payment Calculator",
      link: "/car-payment-calculator",
      description:
        "Estimate monthly car payments, auto loan interest, and vehicle financing costs.",
    },
    
    {
      title: "Car Affordability Calculator",
      link: "/car-affordability-calculator",
      description:
        "Estimate how much car you can afford based on income, debt, and monthly budget.",
    },
    
    {
      title: "Lease Calculator",
      link: "/lease-calculator",
      description:
        "Calculate monthly lease payments, lease costs, and financing estimates.",
    },
    
    {
      title: "Car Lease Calculator",
      link: "/car-lease-calculator",
      description:
        "Estimate car lease payments, lease terms, residual values, and financing costs.",
    },
    
    {
      title: "Used Car Calculator",
      link: "/used-car-calculator",
      description:
        "Estimate financing costs and monthly payments for used vehicle purchases.",
    },
    
    {
      title: "Vehicle Loan Calculator",
      link: "/vehicle-loan-calculator",
      description:
        "Calculate vehicle loan payments, total interest costs, and auto financing estimates.",
    },
    
    {
      title: "Trade In Calculator",
      link: "/trade-in-calculator",
      description:
        "Estimate vehicle trade-in values and financing savings for your next car purchase.",
    },
    
    {
      title: "Auto Refinance Calculator",
      link: "/auto-refinance-calculator",
      description:
        "Estimate savings from refinancing your auto loan with lower interest rates.",
    },
    
    {
      title: "Gas Cost Calculator",
      link: "/gas-cost-calculator",
      description:
        "Estimate fuel costs, gasoline expenses, and driving costs for road trips and commuting.",
    },
    
    {
      title: "Fuel Cost Calculator",
      link: "/fuel-cost-calculator",
      description:
        "Calculate fuel expenses, mileage costs, and total driving fuel consumption estimates.",
    },
    
    {
      title: "EV Savings Calculator",
      link: "/ev-savings-calculator",
      description:
        "Compare electric vehicle savings versus gasoline vehicle ownership costs.",
    },
    
    {
      title: "Vehicle Depreciation Calculator",
      link: "/vehicle-depreciation-calculator",
      description:
        "Estimate vehicle depreciation, resale value, and long-term car ownership costs.",
    },
    
    
  ]

  return (

    <main className="min-h-screen bg-slate-100">
{/* CATEGORY SECTIONS */}

<section className="max-w-7xl mx-auto px-4 py-10">

  <h2 className="text-4xl font-black mb-8">
    Financial Calculator Categories
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* MORTGAGE */}

    <a
      href="/mortgage-calculators"
      className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 hover:-translate-y-1 transition"
    >

      <div className="text-5xl mb-4">
        🏠
      </div>

      <h3 className="text-2xl font-black mb-3">
        Mortgage Calculators
      </h3>

      <p className="text-slate-600 leading-7">
        Mortgage,
        refinance,
        amortization,
        ARM,
        affordability,
        HELOC,
        and home loan calculators.
      </p>

    </a>

    {/* DEBT */}

    <a
      href="/debt-calculators"
      className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 hover:-translate-y-1 transition"
    >

      <div className="text-5xl mb-4">
        💳
      </div>

      <h3 className="text-2xl font-black mb-3">
        Debt Calculators
      </h3>

      <p className="text-slate-600 leading-7">
        Debt payoff,
        avalanche,
        snowball,
        credit card,
        and repayment strategy calculators.
      </p>

    </a>

    {/* INVESTMENT */}

    <a
      href="/investment-calculators"
      className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 hover:-translate-y-1 transition"
    >

      <div className="text-5xl mb-4">
        📈
      </div>

      <h3 className="text-2xl font-black mb-3">
        Investment Calculators
      </h3>

      <p className="text-slate-600 leading-7">
        Compound interest,
        ROI,
        dividend,
        savings,
        and investment growth calculators.
      </p>

    </a>

    {/* RETIREMENT */}

    <a
      href="/retirement-calculators"
      className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 hover:-translate-y-1 transition"
    >

      <div className="text-5xl mb-4">
        🏖️
      </div>

      <h3 className="text-2xl font-black mb-3">
        Retirement Calculators
      </h3>

      <p className="text-slate-600 leading-7">
        Retirement planning,
        savings,
        future income,
        and financial independence calculators.
      </p>

    </a>

  </div>

</section>
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