"use client"

import { useMemo, useState } from "react"

const stateTaxRates: Record<string, number> = {
  Alabama: 4,
  Alaska: 0,
  Arizona: 5.6,
  Arkansas: 6.5,
  California: 7.25,
  Colorado: 2.9,
  Connecticut: 6.35,
  Delaware: 0,
  Florida: 6,
  Georgia: 4,
  Hawaii: 4,
  Idaho: 6,
  Illinois: 6.25,
  Indiana: 7,
  Iowa: 6,
  Kansas: 6.5,
  Kentucky: 6,
  Louisiana: 4.45,
  Maine: 5.5,
  Maryland: 6,
  Massachusetts: 6.25,
  Michigan: 6,
  Minnesota: 6.875,
  Mississippi: 7,
  Missouri: 4.225,
  Montana: 0,
  Nebraska: 5.5,
  Nevada: 6.85,
  "New Hampshire": 0,
  "New Jersey": 6.625,
  "New Mexico": 5.125,
  "New York": 4,
  "North Carolina": 4.75,
  "North Dakota": 5,
  Ohio: 5.75,
  Oklahoma: 4.5,
  Oregon: 0,
  Pennsylvania: 6,
  "Rhode Island": 7,
  "South Carolina": 6,
  "South Dakota": 4.2,
  Tennessee: 7,
  Texas: 6.25,
  Utah: 6.1,
  Vermont: 6,
  Virginia: 5.3,
  Washington: 6.5,
  "West Virginia": 6,
  Wisconsin: 5,
  Wyoming: 4,
}

const currencies = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  SGD: "S$",
  AUD: "A$",
}

export default function AutoLoanCalculator() {
  const [mode, setMode] = useState("monthly")
  const [currency, setCurrency] = useState("USD")

  const [autoPrice, setAutoPrice] = useState(35000)
  const [desiredMonthlyPayment, setDesiredMonthlyPayment] = useState(600)

  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(5.5)
  const [cashIncentives, setCashIncentives] = useState(1000)
  const [downPayment, setDownPayment] = useState(5000)
  const [tradeInValue, setTradeInValue] = useState(3000)
  const [amountOwed, setAmountOwed] = useState(1000)
  const [state, setState] = useState("California")
  const [otherFees, setOtherFees] = useState(1200)

  const symbol = currencies[currency as keyof typeof currencies]
  const salesTax = stateTaxRates[state]

  const calculations = useMemo(() => {
    const taxableAmount = autoPrice - cashIncentives

    const taxAmount = taxableAmount * (salesTax / 100)

    const totalPrice =
      autoPrice +
      taxAmount +
      otherFees -
      cashIncentives

    const loanAmount =
      totalPrice -
      downPayment -
      tradeInValue +
      amountOwed

    const monthlyInterest = interestRate / 100 / 12

    const monthlyPayment =
      loanAmount *
      (monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm)) /
      (Math.pow(1 + monthlyInterest, loanTerm) - 1)

    const totalPayment = monthlyPayment * loanTerm
    const totalInterest = totalPayment - loanAmount

    const reverseLoanAmount =
      desiredMonthlyPayment *
      ((Math.pow(1 + monthlyInterest, loanTerm) - 1) /
        (monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm)))

    const estimatedAutoPrice =
      reverseLoanAmount +
      downPayment +
      tradeInValue -
      amountOwed -
      otherFees

    return {
      taxAmount,
      totalPrice,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      estimatedAutoPrice,
    }
  }, [
    autoPrice,
    desiredMonthlyPayment,
    loanTerm,
    interestRate,
    cashIncentives,
    downPayment,
    tradeInValue,
    amountOwed,
    salesTax,
    otherFees,
  ])

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-200">

          <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>

                <h1 className="text-5xl font-black tracking-tight mb-3">
                  Auto Loan Calculator
                </h1>

                <p className="text-blue-100 text-lg">
                  Calculate monthly payments, total financing cost, and vehicle affordability.
                </p>

              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-white text-black rounded-2xl px-4 py-3 min-w-[140px]"
                >
                  {Object.keys(currencies).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-2">

            <div className="p-8 border-r border-slate-200">

              <div className="flex gap-4 mb-8">

                <button
                  onClick={() => setMode("monthly")}
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${
                    mode === "monthly"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  Monthly Pay
                </button>

                <button
                  onClick={() => setMode("price")}
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${
                    mode === "price"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  Auto Price
                </button>

              </div>

              <div className="space-y-6">

                {mode === "monthly" ? (
                  <InputField
                    label="Auto Price"
                    value={autoPrice}
                    setValue={setAutoPrice}
                    symbol={symbol}
                  />
                ) : (
                  <InputField
                    label="Desired Monthly Payment"
                    value={desiredMonthlyPayment}
                    setValue={setDesiredMonthlyPayment}
                    symbol={symbol}
                  />
                )}

                <InputField
                  label="Loan Term (Months)"
                  value={loanTerm}
                  setValue={setLoanTerm}
                />

                <InputField
                  label="Interest Rate (%)"
                  value={interestRate}
                  setValue={setInterestRate}
                />

                <InputField
                  label="Cash Incentives"
                  value={cashIncentives}
                  setValue={setCashIncentives}
                  symbol={symbol}
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  setValue={setDownPayment}
                  symbol={symbol}
                />

                <InputField
                  label="Trade-in Value"
                  value={tradeInValue}
                  setValue={setTradeInValue}
                  symbol={symbol}
                />

                <InputField
                  label="Amount Owed on Trade-in"
                  value={amountOwed}
                  setValue={setAmountOwed}
                  symbol={symbol}
                />

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Your State
                  </label>

                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl p-4 bg-white shadow-sm"
                  >
                    {Object.keys(stateTaxRates).map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Sales Tax (%)
                  </label>

                  <input
                    type="number"
                    value={salesTax}
                    readOnly
                    className="w-full border border-slate-200 rounded-2xl p-4 bg-slate-100"
                  />

                </div>

                <InputField
                  label="Title, Registration and Other Fees"
                  value={otherFees}
                  setValue={setOtherFees}
                  symbol={symbol}
                />

              </div>

            </div>

            <div className="bg-gradient-to-b from-blue-50 to-white p-8">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 mb-8 shadow-lg">

                <p className="text-blue-100 mb-3 text-lg">
                  {mode === "monthly"
                    ? "Estimated Monthly Payment"
                    : "Estimated Vehicle Price"}
                </p>

                <h2 className="text-5xl font-black">

                  {symbol}

                  {mode === "monthly"
                    ? calculations.monthlyPayment.toFixed(2)
                    : calculations.estimatedAutoPrice.toFixed(2)}

                </h2>

              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">

                <div className="px-6 py-5 border-b border-slate-200">
                  <h3 className="text-2xl font-bold">
                    Loan Overview
                  </h3>
                </div>

                <div className="divide-y divide-slate-200">

                  <SummaryRow
                    label="Vehicle Price"
                    value={autoPrice}
                    symbol={symbol}
                  />

                  <SummaryRow
                    label="Sales Tax"
                    value={calculations.taxAmount}
                    symbol={symbol}
                  />

                  <SummaryRow
                    label="Loan Amount"
                    value={calculations.loanAmount}
                    symbol={symbol}
                  />

                  <SummaryRow
                    label="Monthly Payment"
                    value={calculations.monthlyPayment}
                    symbol={symbol}
                  />

                  <SummaryRow
                    label="Total Interest"
                    value={calculations.totalInterest}
                    symbol={symbol}
                  />

                </div>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

                <h3 className="text-2xl font-bold mb-6">
                  Payment Breakdown
                </h3>

                <div className="space-y-5">

                  <Bar label="Principal" value={70} />
                  <Bar label="Interest" value={20} />
                  <Bar label="Taxes & Fees" value={10} />

                </div>

              </div>

            </div>

          </div>

        </div>

        <section className="max-w-7xl mx-auto mt-10 bg-white rounded-[32px] shadow-xl border border-slate-200 p-10">

          <h2 className="text-4xl font-black mb-8 text-slate-900">
            Complete Auto Loan Guide
          </h2>

          <div className="space-y-8 text-slate-700 leading-8 text-lg">

            <p>
              Use our Auto Loan Calculator to estimate your monthly payment,
              total financing cost, taxes, and overall vehicle affordability before purchasing a car.
            </p>

            <div>

              <h3 className="text-2xl font-bold mb-4 text-black">
                How Auto Loans Work
              </h3>

              <p>
                Auto loans allow buyers to finance a vehicle purchase through monthly payments.
                Most U.S. auto loans range from 36 to 84 months depending on lender terms.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-4 text-black">
                Direct Lending vs Dealership Financing
              </h3>

              <p>
                Buyers can finance through banks, credit unions, online lenders,
                or dealership financing programs.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-4 text-black">
                Understanding Trade-ins
              </h3>

              <p>
                Trade-in value can reduce the total amount financed and lower monthly payments.
                Some states also reduce sales tax when a trade-in is applied.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-4 text-black">
                Frequently Asked Questions
              </h3>

              <div className="space-y-6">

                <div>
                  <h4 className="font-bold text-xl mb-2 text-black">
                    What is a good APR for a car loan?
                  </h4>

                  <p>
                    Buyers with strong credit scores may qualify for rates below 5%.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xl mb-2 text-black">
                    Does a larger down payment help?
                  </h4>

                  <p>
                    Yes. Larger down payments reduce loan amounts and monthly payments.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xl mb-2 text-black">
                    Can I pay off my auto loan early?
                  </h4>

                  <p>
                    Many lenders allow early payoff, although some may charge fees.
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
  symbol,
}: {
  label: string
  value: number
  setValue: (value: number) => void
  symbol?: string
}) {
  return (
    <div>

      <label className="block text-sm font-semibold mb-2 text-slate-700">
        {label}
      </label>

      <div className="relative">

        {symbol && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {symbol}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={`w-full border border-slate-200 rounded-2xl p-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            symbol ? "pl-10" : ""
          }`}
        />

      </div>

    </div>
  )
}

function SummaryRow({
  label,
  value,
  symbol,
}: {
  label: string
  value: number
  symbol: string
}) {
  return (
    <div className="flex justify-between items-center px-6 py-5">

      <span className="text-slate-600 font-medium">
        {label}
      </span>

      <span className="font-bold text-lg text-slate-900">
        {symbol}
        {value.toFixed(2)}
      </span>

    </div>
  )
}

function Bar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <span className="font-medium text-slate-700">
          {label}
        </span>

        <span className="text-slate-500">
          {value}%
        </span>

      </div>

      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">

        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  )
}
