"use client"

import { useState } from "react"

export default function HomeEquityLineOfCreditCalculator() {

  const [creditLimit, setCreditLimit] =
    useState(150000)

  const [borrowedAmount, setBorrowedAmount] =
    useState(80000)

  const [interestRate, setInterestRate] =
    useState(8)

  const monthlyInterest =
    borrowedAmount *
    (interestRate / 100 / 12)

  const annualInterest =
    monthlyInterest * 12

  return (

    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-8">

            <h1 className="text-5xl font-black mb-4">
              Home Equity Line of Credit Calculator
            </h1>

            <p className="text-blue-100 text-lg">
              Estimate HELOC payments,
              credit line borrowing costs,
              and home equity usage.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 space-y-5">

              <InputField
                label="Credit Limit"
                value={creditLimit}
                setValue={setCreditLimit}
                prefix="$"
              />

              <InputField
                label="Borrowed Amount"
                value={borrowedAmount}
                setValue={setBorrowedAmount}
                prefix="$"
              />

              <InputField
                label="Interest Rate"
                value={interestRate}
                setValue={setInterestRate}
                suffix="%"
              />

            </div>

            <div className="bg-slate-50 p-8">

              <div className="bg-blue-600 text-white rounded-3xl p-8 mb-6">

                <p className="text-blue-100 mb-2">
                  Monthly Interest
                </p>

                <h2 className="text-5xl font-black">
                  ${monthlyInterest.toFixed(0)}
                </h2>

              </div>

              <div className="space-y-4">

                <SummaryCard
                  title="Annual Interest"
                  value={`$${annualInterest.toFixed(0)}`}
                />

                <SummaryCard
                  title="Available Credit"
                  value={`$${(
                    creditLimit - borrowedAmount
                  ).toFixed(0)}`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Explanation */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            Home Equity Line of Credit Explanation
          </h2>

          <div className="space-y-6 text-slate-700 text-lg leading-8">

            <p>
              A home equity line of credit,
              commonly called a HELOC,
              allows homeowners to borrow money
              against available home equity.
              HELOCs function similarly to revolving credit lines,
              giving borrowers flexibility
              to withdraw funds when needed.
            </p>

            <p>
              Unlike traditional home equity loans,
              HELOCs typically use variable interest rates
              and flexible borrowing structures.
            </p>

            <p>
              Homeowners often use HELOCs for:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Home renovations</li>

              <li>Debt consolidation</li>

              <li>Emergency expenses</li>

              <li>Investment opportunities</li>

              <li>Large purchases</li>

            </ul>

            <p>
              A HELOC calculator estimates:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Monthly interest costs</li>

              <li>Total borrowing expenses</li>

              <li>Available remaining credit</li>

              <li>Long-term repayment affordability</li>

            </ul>

            <p>
              HELOCs commonly include two phases:
              a draw period
              and a repayment period.
              During the draw period,
              borrowers may withdraw funds
              up to approved credit limits.
            </p>

            <p>
              During repayment periods,
              borrowers must repay principal balances
              and accumulated interest expenses.
            </p>

            <p>
              Because HELOC interest rates are usually variable,
              rising market rates
              may significantly increase borrowing costs over time.
            </p>

            <p>
              Responsible borrowing is important
              because homes secure HELOC loans.
              Failure to repay HELOC balances
              may increase foreclosure risks.
            </p>

          </div>

        </section>

        {/* Formula */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            HELOC Formula
          </h2>

          <div className="bg-slate-100 rounded-2xl p-6 font-mono text-lg">

            Monthly Interest = Borrowed Amount × (Interest Rate ÷ 12)

          </div>

        </section>

        {/* FAQ */}

        <section className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-4xl font-black mb-6">
            HELOC FAQ
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-lg">

            <div>

              <h3 className="font-black text-2xl mb-3">
                What is a HELOC?
              </h3>

              <p>
                A HELOC is a revolving line of credit
                secured by home equity.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                Are HELOC interest rates fixed?
              </h3>

              <p>
                Most HELOCs use variable interest rates
                that may change over time.
              </p>

            </div>

            <div>

              <h3 className="font-black text-2xl mb-3">
                What can HELOC funds be used for?
              </h3>

              <p>
                HELOCs are commonly used
                for renovations,
                debt consolidation,
                and large financial expenses.
              </p>

            </div>

          </div>

        </section>

      </div>
{/* ARTICLE SECTION */}

<section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-8 mb-10">

  <h2 className="text-4xl font-black mb-6">
    What Is a Home Equity Line of Credit (HELOC)?
  </h2>

  <div className="space-y-6 text-slate-600 leading-8">

    <p>
      A home equity line of credit, commonly called a HELOC,
      is a revolving line of credit secured by the equity in
      your home. Homeowners can borrow money as needed while
      using their property as collateral.
    </p>

    <p>
      Unlike traditional loans that provide a lump sum,
      a HELOC allows flexible borrowing during the draw period.
      Borrowers can withdraw funds multiple times up to their
      approved credit limit.
    </p>

    <h3 className="text-2xl font-bold text-slate-900">
      How Does a HELOC Work?
    </h3>

    <p>
      A HELOC is based on your available home equity.
      Lenders usually calculate equity by subtracting
      your remaining mortgage balance from your home's value.
    </p>

    <div className="bg-slate-100 rounded-2xl p-6">

      <p>
        Home Value: $500,000
      </p>

      <p>
        Mortgage Balance: $300,000
      </p>

      <p>
        Available Equity: $200,000
      </p>

    </div>

    <p>
      Depending on lender requirements, homeowners may borrow
      a percentage of that equity through a revolving credit line.
    </p>

    <h3 className="text-2xl font-bold text-slate-900">
      HELOC Draw Period vs Repayment Period
    </h3>

    <p>
      Most HELOCs have two stages: the draw period and the
      repayment period.
    </p>

    <p>
      During the draw period, borrowers can access funds and
      often make interest-only payments. During the repayment
      period, both principal and interest payments become required.
    </p>

    <h3 className="text-2xl font-bold text-slate-900">
      HELOC Interest Rates
    </h3>

    <p>
      Most HELOCs use variable interest rates tied to benchmark
      indexes such as the prime rate. This means monthly payments
      may increase or decrease over time.
    </p>

    <div className="bg-slate-100 rounded-2xl p-6 overflow-auto">

      <code className="text-lg">
        Interest = Outstanding Balance × Annual Interest Rate ÷ 12
      </code>

    </div>

    <h3 className="text-2xl font-bold text-slate-900">
      Benefits of a HELOC
    </h3>

    <ul className="list-disc pl-6 space-y-3">

      <li>
        Lower interest rates compared to credit cards
      </li>

      <li>
        Flexible borrowing access
      </li>

      <li>
        Large borrowing limits
      </li>

      <li>
        Useful for home renovations and debt consolidation
      </li>

      <li>
        Potential tax advantages in certain situations
      </li>

    </ul>

    <h3 className="text-2xl font-bold text-slate-900">
      Risks of a HELOC
    </h3>

    <p>
      Because a HELOC uses your home as collateral,
      failure to repay could increase foreclosure risk.
      Borrowers should also understand that variable
      interest rates can increase monthly costs over time.
    </p>

    <h3 className="text-2xl font-bold text-slate-900">
      Frequently Asked Questions
    </h3>

    <div className="space-y-5">

      <div className="border rounded-2xl p-5">

        <h4 className="font-bold text-lg mb-2 text-slate-900">
          Is a HELOC a good idea?
        </h4>

        <p>
          A HELOC may be useful for homeowners who need flexible
          access to funds with relatively lower interest rates.
        </p>

      </div>

      <div className="border rounded-2xl p-5">

        <h4 className="font-bold text-lg mb-2 text-slate-900">
          What credit score is needed for a HELOC?
        </h4>

        <p>
          Many lenders prefer credit scores above 620 to 680,
          although requirements vary between lenders.
        </p>

      </div>

      <div className="border rounded-2xl p-5">

        <h4 className="font-bold text-lg mb-2 text-slate-900">
          Can HELOC interest rates change?
        </h4>

        <p>
          Yes. Most HELOCs use variable rates that fluctuate
          based on market interest conditions.
        </p>

      </div>

      <div className="border rounded-2xl p-5">

        <h4 className="font-bold text-lg mb-2 text-slate-900">
          Can I pay off a HELOC early?
        </h4>

        <p>
          Many lenders allow early repayment without penalties,
          but borrowers should review individual loan terms.
        </p>

      </div>

    </div>

  </div>

</section>
    </main>

  )
}

function InputField({
  label,
  value,
  setValue,
  prefix,
  suffix,
}: any) {

  return (

    <div>

      <label className="block font-semibold mb-2">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white"
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {suffix}
          </span>
        )}

      </div>

    </div>

  )
}

function SummaryCard({
  title,
  value,
}: any) {

  return (

    <div className="bg-white rounded-2xl border p-5">

      <p className="text-slate-500 mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-black">
        {value}
      </h3>

    </div>

  )
}