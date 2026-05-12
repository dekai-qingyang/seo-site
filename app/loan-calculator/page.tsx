"use client"

import { useMemo, useState } from "react"

export default function LoanCalculator() {

  const [loanAmount, setLoanAmount] = useState(25000)
  const [interestRate, setInterestRate] = useState(7.5)
  const [loanTerm, setLoanTerm] = useState(5)
  const [loanType, setLoanType] = useState("amortized")

  const monthlyInterest = interestRate / 100 / 12

  const totalPayments = loanTerm * 12

  const monthlyPayment =
    loanType === "amortized"
      ? loanAmount *
        (monthlyInterest *
          Math.pow(1 + monthlyInterest, totalPayments)) /
        (Math.pow(1 + monthlyInterest, totalPayments) - 1)
      : loanAmount * monthlyInterest

  const totalInterest =
    loanType === "amortized"
      ? monthlyPayment * totalPayments - loanAmount
      : loanAmount * (interestRate / 100) * loanTerm

  const totalCost = loanAmount + totalInterest

  const report = useMemo(() => {

    let balance = loanAmount

    const rows = []

    for (let i = 1; i <= totalPayments; i++) {

      const interest = balance * monthlyInterest

      const principal =
        loanType === "amortized"
          ? monthlyPayment - interest
          : 0

      balance -= principal

      rows.push({
        payment: i,
        interest,
        principal,
        balance: balance > 0 ? balance : 0,
      })
    }

    return rows

  }, [
    loanAmount,
    monthlyInterest,
    monthlyPayment,
    totalPayments,
    loanType,
  ])

  return (
    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 lg:p-8">

            <h1 className="text-3xl lg:text-5xl font-black mb-2 lg:mb-4">
              Loan Calculator
            </h1>

            <p className="text-blue-100 text-sm lg:text-lg leading-7">
              A loan is a contract between a borrower and a lender
              in which the borrower receives money that must be
              repaid over time with interest.
            </p>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-4 lg:p-8 border-r border-slate-200">

              <div className="space-y-5">

                <InputField
                  label="Loan Amount"
                  value={loanAmount}
                  setValue={setLoanAmount}
                  prefix="$"
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  setValue={setInterestRate}
                  suffix="%"
                />

                <InputField
                  label="Loan Term"
                  value={loanTerm}
                  setValue={setLoanTerm}
                  suffix="Years"
                />

                {/* LOAN TYPE */}

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Loan Type
                  </label>

                  <select
                    value={loanType}
                    onChange={(e) =>
                      setLoanType(e.target.value)
                    }
                    className="w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white shadow-sm"
                  >
                    <option value="amortized">
                      Amortized Loan
                    </option>

                    <option value="deferred">
                      Deferred Payment Loan
                    </option>

                    <option value="bond">
                      Bond
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-b from-blue-50 to-white p-4 lg:p-8">

              {/* RESULT */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-5 lg:p-8 mb-5 lg:mb-8">

                <p className="text-blue-100 text-sm lg:text-lg mb-2">
                  Estimated Monthly Payment
                </p>

                <h2 className="text-3xl lg:text-5xl font-black break-all">
                  ${monthlyPayment.toFixed(2)}
                </h2>

              </div>

              {/* SUMMARY */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-5 lg:mb-8">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Loan Summary
                  </h3>

                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Loan Amount"
                    value={loanAmount}
                  />

                  <SummaryRow
                    label="Interest Rate"
                    value={interestRate}
                    suffix="%"
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={totalInterest}
                  />

                  <SummaryRow
                    label="Total Cost"
                    value={totalCost}
                  />

                </div>

              </div>

              {/* REPORT */}

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                <div className="px-4 lg:px-6 py-4 border-b border-slate-200">

                  <h3 className="text-xl lg:text-2xl font-bold">
                    Loan Report
                  </h3>

                </div>

                {/* MOBILE */}

                <div className="block lg:hidden divide-y divide-slate-200">

                  {report.slice(0, 12).map((row, index) => (

                    <div
                      key={index}
                      className="p-4"
                    >

                      <div className="flex justify-between items-center mb-3">

                        <div className="font-bold text-lg">
                          Payment {index + 1}
                        </div>

                        <div className="text-sm text-slate-500">
                          Month
                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="bg-slate-50 rounded-2xl p-3">

                          <div className="text-slate-500 mb-1">
                            Interest
                          </div>

                          <div className="font-bold">
                            ${row.interest.toFixed(0)}
                          </div>

                        </div>

                        <div className="bg-slate-50 rounded-2xl p-3">

                          <div className="text-slate-500 mb-1">
                            Principal
                          </div>

                          <div className="font-bold">
                            ${row.principal.toFixed(0)}
                          </div>

                        </div>

                        <div className="bg-blue-50 rounded-2xl p-3 col-span-2">

                          <div className="text-slate-500 mb-1">
                            Remaining Balance
                          </div>

                          <div className="font-black text-lg">
                            ${row.balance.toFixed(0)}
                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* DESKTOP */}

                <div className="hidden lg:block overflow-x-auto">

                  <table className="w-full text-left">

                    <thead className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">

                      <tr>

                        <th className="py-4 px-4 text-lg font-bold">
                          Payment
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Interest
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Principal
                        </th>

                        <th className="py-4 px-4 text-lg font-bold">
                          Balance
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {report.slice(0, 12).map((row, index) => (

                        <tr
                          key={index}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >

                          <td className="py-4 px-4 font-semibold">
                            {index + 1}
                          </td>

                          <td className="py-4 px-4">
                            ${row.interest.toFixed(2)}
                          </td>

                          <td className="py-4 px-4">
                            ${row.principal.toFixed(2)}
                          </td>

                          <td className="py-4 px-4 font-bold">
                            ${row.balance.toFixed(2)}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ARTICLE */}

        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 lg:p-10 mt-6 lg:mt-10">

          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            Understanding Loans
          </h2>

          <div className="space-y-6 text-slate-700 leading-8 text-base lg:text-lg">

            <p>
              A loan is a financial agreement in which a borrower
              receives money from a lender and agrees to repay it
              over time with interest.
            </p>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Amortized Loan
              </h3>

              <p>
                An amortized loan is repaid with fixed payments
                over time. Each payment includes both principal
                and interest.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Deferred Payment Loan
              </h3>

              <p>
                Deferred payment loans delay repayment until the
                loan reaches maturity. Borrowers often pay a lump
                sum at the end.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Bond Loans
              </h3>

              <p>
                Bonds are fixed-income investments where borrowers
                repay principal at maturity while paying interest
                periodically.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                How Loan Interest Works
              </h3>

              <p>
                Loan interest is the cost of borrowing money.
                Higher interest rates increase total repayment costs,
                while lower rates reduce monthly payments.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Frequently Asked Questions
              </h3>

              <div className="space-y-5">

                <div>

                  <h4 className="font-bold text-xl mb-2 text-black">
                    What is a good loan interest rate?
                  </h4>

                  <p>
                    Good loan rates vary depending on credit score,
                    loan type, and market conditions.
                  </p>

                </div>

                <div>

                  <h4 className="font-bold text-xl mb-2 text-black">
                    How can I reduce loan interest?
                  </h4>

                  <p>
                    Paying extra toward the principal and improving
                    your credit score may help reduce borrowing costs.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  )
}

function InputField({
  label,
  value,
  setValue,
  prefix,
  suffix,
}: {
  label: string
  value: number
  setValue: (value: number) => void
  prefix?: string
  suffix?: string
}) {
  return (
    <div>

      <label className="block text-sm font-semibold mb-2 text-slate-700">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={`w-full border border-slate-200 rounded-2xl py-3 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            prefix ? "pl-9" : ""
          } ${
            suffix ? "pr-20" : ""
          }`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
            {suffix}
          </span>
        )}

      </div>

    </div>
  )
}

function SummaryRow({
  label,
  value,
  suffix,
}: {
  label: string
  value: number
  suffix?: string
}) {
  return (

    <div className="px-4 lg:px-6 py-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1">

        <span className="text-slate-500 text-sm lg:text-base">
          {label}
        </span>

        <span className="font-bold text-base lg:text-lg break-all">

          {suffix === "%"
            ? `${value.toFixed(2)}%`
            : suffix
            ? `${value}${suffix}`
            : `$${value.toFixed(2)}`}

        </span>

      </div>

    </div>

  )
}