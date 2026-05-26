"use client"

import Link from "next/link"

import { useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts"

export default function RoiCalculatorPage() {

  const [investmentCost, setInvestmentCost] = useState(10000)

  const [investmentReturn, setInvestmentReturn] = useState(15000)

  const [years, setYears] = useState(5)

  const profit =
    investmentReturn - investmentCost

  const roi =
    (profit / investmentCost) * 100

  const annualizedROI =
    (
      (
        Math.pow(
          investmentReturn / investmentCost,
          1 / years
        ) - 1
      ) * 100
    )

  const monthlyProfit =
    profit / (years * 12)

  const chartData = [
    {
      name: "Investment",
      value: investmentCost,
    },
    {
      name: "Profit",
      value: profit,
    },
  ]

  const growthData = useMemo(() => {

    const rows = []

    for (
      let year = 1;
      year <= years;
      year++
    ) {

      const value =
        investmentCost +
        (
          (profit / years) * year
        )

      rows.push({
        year: `Year ${year}`,
        value,
      })
    }

    return rows

  }, [
    investmentCost,
    profit,
    years,
  ])

  const comparisonData = [
    {
      name: "Cost",
      amount: investmentCost,
    },
    {
      name: "Return",
      amount: investmentReturn,
    },
    {
      name: "Profit",
      amount: profit,
    },
  ]

  return (

    <main className="min-h-screen bg-slate-100 py-4 lg:py-10 px-2 lg:px-4">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="
          bg-gradient-to-r
          from-orange-600
          to-red-600
          rounded-3xl
          overflow-hidden
          shadow-2xl
          text-white
          mb-6
        ">

          <div className="p-6 lg:p-10">

            <div className="
              inline-flex
              items-center
              rounded-full
              bg-white/10
              px-4
              py-2
              text-sm
              font-semibold
              mb-5
            ">

              Investment & Profitability Tool

            </div>

            <h1 className="
              text-4xl
              lg:text-6xl
              font-black
              mb-5
            ">

              ROI Calculator

            </h1>

            <p className="
              text-orange-100
              text-lg
              leading-8
              max-w-3xl
            ">

              Calculate return on investment,
              investment profitability,
              annualized returns,
              long-term portfolio growth,
              and business investment performance.

            </p>

          </div>

        </div>

        {/* CALCULATOR */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          overflow-hidden
        ">

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-5 lg:p-8 border-r border-slate-200">

              <h2 className="
                text-3xl
                font-black
                mb-8
              ">

                ROI Inputs

              </h2>

              <div className="space-y-6">

                <InputField
                  label="Investment Cost"
                  value={investmentCost}
                  setValue={setInvestmentCost}
                  prefix="$"
                />

                <InputField
                  label="Investment Return"
                  value={investmentReturn}
                  setValue={setInvestmentReturn}
                  prefix="$"
                />

                <InputField
                  label="Investment Period (Years)"
                  value={years}
                  setValue={setYears}
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="
              bg-gradient-to-b
              from-orange-50
              to-white
              p-5
              lg:p-8
            ">

              <div className="
                bg-gradient-to-r
                from-orange-600
                to-red-600
                rounded-3xl
                text-white
                p-6
                mb-6
              ">

                <div className="text-orange-100 mb-2">
                  Estimated ROI
                </div>

                <div className="
                  text-5xl
                  font-black
                ">

                  {roi.toFixed(2)}%

                </div>

              </div>

              {/* SUMMARY */}

              <div className="
                grid
                sm:grid-cols-2
                gap-4
              ">

                <SummaryCard
                  title="Total Profit"
                  value={`$${profit.toFixed(2)}`}
                />

                <SummaryCard
                  title="Annualized ROI"
                  value={`${annualizedROI.toFixed(2)}%`}
                />

                <SummaryCard
                  title="Monthly Profit"
                  value={`$${monthlyProfit.toFixed(2)}`}
                />

                <SummaryCard
                  title="Investment Period"
                  value={`${years} Years`}
                />

              </div>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            Investment Breakdown

          </h2>

          <div className="
            grid
            lg:grid-cols-2
            gap-10
            items-center
          ">

            <div className="h-[350px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >

                    <Cell fill="#ea580c" />
                    <Cell fill="#fdba74" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="space-y-5">

              <div className="
                bg-orange-50
                rounded-2xl
                p-6
              ">

                <div className="text-slate-600 mb-2">
                  Investment Cost
                </div>

                <div className="
                  text-3xl
                  font-black
                ">

                  ${investmentCost.toFixed(2)}

                </div>

              </div>

              <div className="
                bg-slate-100
                rounded-2xl
                p-6
              ">

                <div className="text-slate-600 mb-2">
                  Investment Profit
                </div>

                <div className="
                  text-3xl
                  font-black
                ">

                  ${profit.toFixed(2)}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            ROI Growth Chart

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={growthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ea580c"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            ROI Comparison

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={comparisonData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#ea580c"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EXPLANATION */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-10
          mt-6
        ">

          <h2 className="
            text-4xl
            font-black
            mb-8
          ">

            ROI Calculator Explanation

          </h2>

          <div className="
            space-y-8
            text-slate-700
            text-lg
            leading-9
          ">

            <p>

              Return on Investment,
              commonly referred to as ROI,
              is one of the most widely used financial metrics for evaluating profitability and investment performance.
              ROI measures how much profit or loss an investment generates relative to its original cost.
              Investors,
              businesses,
              and financial analysts frequently use ROI calculations to compare different investment opportunities and evaluate financial efficiency.

            </p>

            <p>

              The ROI formula is relatively simple.
              It calculates the percentage difference between investment returns and investment costs.
              A positive ROI indicates profitability,
              while a negative ROI suggests a loss.
              ROI calculations may help investors understand whether a project,
              stock,
              business investment,
              or real estate purchase produces acceptable financial returns over time.

            </p>

            <p>

              This ROI calculator estimates total profit,
              annualized ROI,
              monthly profit averages,
              and long-term investment growth projections.
              Investors may use these estimates to compare portfolio strategies,
              evaluate business opportunities,
              or analyze financial planning goals.

            </p>

            <p>

              For example,
              if an investor contributes $10,000 into a project and later receives $15,000,
              the total profit equals $5,000.
              Dividing the profit by the original investment produces an ROI of 50%.
              This means the investment generated a 50% return relative to the original cost.

            </p>

            <p>

              ROI calculations are commonly used in stock market investing,
              retirement planning,
              business expansion analysis,
              cryptocurrency investing,
              real estate investing,
              and startup financial modeling.
              Businesses often analyze ROI before launching advertising campaigns,
              hiring employees,
              purchasing equipment,
              or investing in operational improvements.

            </p>

            <p>

              Investors should also understand the difference between total ROI and annualized ROI.
              Total ROI measures cumulative profitability,
              while annualized ROI estimates average yearly returns.
              Annualized returns are useful when comparing investments with different holding periods.

            </p>

            <p>

              Long-term investment performance depends on several financial variables including market conditions,
              inflation,
              taxes,
              reinvestment strategies,
              and risk exposure.
              While ROI calculators provide useful estimates,
              actual investment performance may vary significantly depending on economic conditions and investment volatility.

            </p>

            <p>

              You can also explore our{" "}

              <Link
                href="/investment-calculator"
                className="text-orange-600 font-bold hover:underline"
              >
                Investment Calculator
              </Link>

              {" "}for long-term portfolio growth analysis,
              or use the{" "}

              <Link
                href="/compound-interest-calculator"
                className="text-orange-600 font-bold hover:underline"
              >
                Compound Interest Calculator
              </Link>

              {" "}to estimate compounded investment returns and recurring contribution growth projections.

            </p>

            <p>

              Understanding ROI may help individuals and businesses improve financial planning decisions,
              optimize investment allocations,
              reduce unnecessary expenses,
              and evaluate long-term profitability opportunities more effectively.

            </p>

          </div>

        </div>

        {/* FORMULA */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
        ">

          <h2 className="
            text-3xl
            font-black
            mb-6
          ">

            ROI Formula

          </h2>

          <div className="
            bg-slate-100
            rounded-2xl
            p-6
            overflow-x-auto
          ">

            <p className="
              text-xl
              font-mono
            ">

              ROI = ((Return - Investment Cost) / Investment Cost) × 100

            </p>

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
        ">

          <h2 className="
            text-3xl
            font-black
            mb-6
          ">

            ROI Examples

          </h2>

          <div className="
            space-y-6
            text-slate-700
            text-lg
            leading-9
          ">

            <p>

              Example 1:
              An investor purchases a stock portfolio for $20,000 and later sells it for $28,000.
              The total profit equals $8,000 and the ROI equals 40%.

            </p>

            <p>

              Example 2:
              A business spends $5,000 on advertising and generates $12,000 in additional revenue.
              The investment profit equals $7,000 and the ROI equals 140%.

            </p>

            <p>

              Example 3:
              A real estate investor purchases a rental property for $250,000 and later sells it for $320,000.
              The investment profit equals $70,000 and the ROI equals 28%.

            </p>

          </div>

        </div>

        {/* FAQ */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            ROI Calculator FAQ

          </h2>

          <div className="space-y-8">

            <div>

              <h3 className="
                text-2xl
                font-black
                mb-3
              ">

                What is ROI?

              </h3>

              <p className="
                text-slate-700
                leading-8
              ">

                ROI stands for Return on Investment.
                It measures investment profitability relative to the original investment cost.

              </p>

            </div>

            <div>

              <h3 className="
                text-2xl
                font-black
                mb-3
              ">

                What is a good ROI?

              </h3>

              <p className="
                text-slate-700
                leading-8
              ">

                A good ROI depends on investment risk,
                market conditions,
                industry performance,
                and investment objectives.

              </p>

            </div>

            <div>

              <h3 className="
                text-2xl
                font-black
                mb-3
              ">

                Why is annualized ROI important?

              </h3>

              <p className="
                text-slate-700
                leading-8
              ">

                Annualized ROI helps compare investments with different holding periods by estimating average yearly returns.

              </p>

            </div>

            <div>

              <h3 className="
                text-2xl
                font-black
                mb-3
              ">

                Can ROI be negative?

              </h3>

              <p className="
                text-slate-700
                leading-8
              ">

                Yes.
                Negative ROI indicates that an investment produced a financial loss instead of profit.

              </p>

            </div>

          </div>

        </div>

        {/* RELATED TOOLS */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          lg:p-8
          mt-6
          mb-10
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            Related Calculators

          </h2>

          <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          ">

            <Link
              href="/investment-calculator"
              className="
                bg-slate-100
                hover:bg-orange-50
                rounded-2xl
                p-5
                font-bold
              "
            >
              Investment Calculator
            </Link>

            <Link
              href="/compound-interest-calculator"
              className="
                bg-slate-100
                hover:bg-orange-50
                rounded-2xl
                p-5
                font-bold
              "
            >
              Compound Interest Calculator
            </Link>

            <Link
              href="/dividend-calculator"
              className="
                bg-slate-100
                hover:bg-orange-50
                rounded-2xl
                p-5
                font-bold
              "
            >
              Dividend Calculator
            </Link>

            <Link
              href="/retirement-calculator"
              className="
                bg-slate-100
                hover:bg-orange-50
                rounded-2xl
                p-5
                font-bold
              "
            >
              Retirement Calculator
            </Link>

          </div>

        </div>

      </div>

    </main>
  )
}

function InputField({
  label,
  value,
  setValue,
  prefix,
}: {
  label: string
  value: number
  setValue: (value: number) => void
  prefix?: string
}) {

  return (

    <div>

      <label className="
        block
        text-sm
        font-semibold
        mb-2
        text-slate-700
      ">

        {label}

      </label>

      <div className="relative">

        {prefix && (

          <span className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-700
          ">

            {prefix}

          </span>

        )}

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className={`
            w-full
            border
            border-slate-200
            rounded-2xl
            py-4
            px-4
            bg-white
            text-lg
            font-semibold
            ${prefix ? "pl-9" : ""}
          `}
        />

      </div>

    </div>

  )
}

function SummaryCard({
  title,
  value,
}: {
  title: string
  value: string
}) {

  return (

    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
    ">

      <div className="
        text-slate-600
        mb-2
      ">

        {title}

      </div>

      <div className="
        text-2xl
        font-black
      ">

        {value}

      </div>

    </div>

  )
}