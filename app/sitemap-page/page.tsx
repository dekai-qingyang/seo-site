import Link from "next/link";

const calculators = [

  {
    title: "Mortgage Calculator",
    link: "/mortgage-calculator",
  },

  {
    title: "Refinance Calculator",
    link: "/refinance-calculator",
  },

  {
    title: "Affordability Calculator",
    link: "/affordability-calculator",
  },

  {
    title: "Down Payment Calculator",
    link: "/down-payment-calculator",
  },

  {
    title: "Rent vs Buy Calculator",
    link: "/rent-vs-buy-calculator",
  },

  {
    title: "Extra Payment Calculator",
    link: "/extra-payment-calculator",
  },

  {
    title: "Biweekly Mortgage Calculator",
    link: "/biweekly-mortgage-calculator",
  },

  {
    title: "Mortgage Payoff Calculator",
    link: "/mortgage-payoff-calculator",
  },

  {
    title: "Mortgage Interest Calculator",
    link: "/mortgage-interest-calculator",
  },

  {
    title: "Mortgage Points Calculator",
    link: "/mortgage-points-calculator",
  },

  {
    title: "Mortgage Insurance Calculator",
    link: "/mortgage-insurance-calculator",
  },

  {
    title: "Property Tax Calculator",
    link: "/property-tax-calculator",
  },

  {
    title: "Home Equity Calculator",
    link: "/home-equity-calculator",
  },

  {
    title: "HELOC Calculator",
    link: "/heloc-calculator",
  },

  {
    title: "Closing Cost Calculator",
    link: "/closing-cost-calculator",
  },

  {
    title: "Home Affordability Calculator",
    link: "/home-affordability-calculator",
  },

  {
    title: "Real Estate Calculator",
    link: "/real-estate-calculator",
  },

  {
    title: "ARM Calculator",
    link: "/arm-calculator",
  },

  {
    title: "Escrow Calculator",
    link: "/escrow-calculator",
  },

  {
    title: "Auto Loan Calculator",
    link: "/auto-loan-calculator",
  },

  {
    title: "Car Payment Calculator",
    link: "/car-payment-calculator",
  },

  {
    title: "Car Affordability Calculator",
    link: "/car-affordability-calculator",
  },

  {
    title: "Lease Calculator",
    link: "/lease-calculator",
  },

  {
    title: "Car Lease Calculator",
    link: "/car-lease-calculator",
  },

  {
    title: "Used Car Calculator",
    link: "/used-car-calculator",
  },

  {
    title: "Trade In Calculator",
    link: "/trade-in-calculator",
  },

  {
    title: "Vehicle Depreciation Calculator",
    link: "/vehicle-depreciation-calculator",
  },

  {
    title: "Loan Calculator",
    link: "/loan-calculator",
  },

  {
    title: "Personal Loan Calculator",
    link: "/personal-loan-calculator",
  },

  {
    title: "Student Loan Calculator",
    link: "/student-loan-calculator",
  },

  {
    title: "Student Loan Payoff Calculator",
    link: "/student-loan-payoff-calculator",
  },

  {
    title: "Student Loan Refinance Calculator",
    link: "/student-loan-refinance-calculator",
  },

  {
    title: "Loan Payoff Calculator",
    link: "/loan-payoff-calculator",
  },

  {
    title: "Line of Credit Calculator",
    link: "/line-of-credit-calculator",
  },

  {
    title: "Debt Consolidation Calculator",
    link: "/debt-consolidation-calculator",
  },

  {
    title: "Credit Card Payoff Calculator",
    link: "/credit-card-payoff-calculator",
  },

  {
    title: "Debt Snowball Calculator",
    link: "/debt-snowball-calculator",
  },

  {
    title: "Debt Avalanche Calculator",
    link: "/debt-avalanche-calculator",
  },

  {
    title: "Debt Payoff Calculator",
    link: "/debt-payoff-calculator",
  },

  {
    title: "Credit Utilization Calculator",
    link: "/credit-utilization-calculator",
  },

  {
    title: "Compound Interest Calculator",
    link: "/compound-interest-calculator",
  },

  {
    title: "APR Calculator",
    link: "/apr-calculator",
  },

  {
    title: "APY Calculator",
    link: "/apy-calculator",
  },

  {
    title: "Simple Interest Calculator",
    link: "/simple-interest-calculator",
  },

  {
    title: "Investment Return Calculator",
    link: "/investment-return-calculator",
  },

  {
    title: "Annual Return Calculator",
    link: "/annual-return-calculator",
  },

  {
    title: "Future Value Calculator",
    link: "/future-value-calculator",
  },

  {
    title: "Present Value Calculator",
    link: "/present-value-calculator",
  },

  {
    title: "Inflation Calculator",
    link: "/inflation-calculator",
  },

  {
    title: "Real Return Calculator",
    link: "/real-return-calculator",
  },

  {
    title: "Risk Reward Calculator",
    link: "/risk-reward-calculator",
  },

  {
    title: "Investment Calculator",
    link: "/investment-calculator",
  },

  {
    title: "Dividend Calculator",
    link: "/dividend-calculator",
  },

  {
    title: "Stock Calculator",
    link: "/stock-calculator",
  },

  {
    title: "ETF Calculator",
    link: "/etf-calculator",
  },

  {
    title: "Mutual Fund Calculator",
    link: "/mutual-fund-calculator",
  },

  {
    title: "Portfolio Calculator",
    link: "/portfolio-calculator",
  },

  {
    title: "Capital Gains Calculator",
    link: "/capital-gains-calculator",
  },

  {
    title: "ROI Calculator",
    link: "/roi-calculator",
  },

  {
    title: "Retirement Calculator",
    link: "/retirement-calculator",
  },

  {
    title: "Savings Calculator",
    link: "/savings-calculator",
  },

  {
    title: "Net Worth Calculator",
    link: "/net-worth-calculator",
  },

  {
    title: "Wealth Calculator",
    link: "/wealth-calculator",
  },

  {
    title: "Financial Independence Calculator",
    link: "/financial-independence-calculator",
  },

  {
    title: "FIRE Calculator",
    link: "/fire-calculator",
  },

  {
    title: "Certificate of Deposit Calculator",
    link: "/certificate-of-deposit-calculator",
  },

  {
    title: "CD Calculator",
    link: "/cd-calculator",
  },
  
  {
    title: "High Yield Savings Calculator",
    link: "/high-yield-savings-calculator",
  },
  
  {
    title: "Emergency Fund Calculator",
    link: "/emergency-fund-calculator",
  },
  
  {
    title: "Bank Interest Calculator",
    link: "/bank-interest-calculator",
  },
  
  {
    title: "Recurring Deposit Calculator",
    link: "/recurring-deposit-calculator",
  },
  
  {
    title: "Budget Calculator",
    link: "/budget-calculator",
  },
  
  {
    title: "Expense Calculator",
    link: "/expense-calculator",
  },
  
  {
    title: "Cash Flow Calculator",
    link: "/cash-flow-calculator",
  },
  
  {
    title: "Monthly Budget Calculator",
    link: "/monthly-budget-calculator",
  },
  
  {
    title: "Weekly Savings Calculator",
    link: "/weekly-savings-calculator",
  },
  
  {
    title: "401k Calculator",
    link: "/401k-calculator",
  },
  
  {
    title: "Roth IRA Calculator",
    link: "/roth-ira-calculator",
  },
  
  {
    title: "IRA Calculator",
    link: "/ira-calculator",
  },
  
  {
    title: "Pension Calculator",
    link: "/pension-calculator",
  },
  
  {
    title: "Social Security Calculator",
    link: "/social-security-calculator",
  },
  
  {
    title: "Retirement Savings Calculator",
    link: "/retirement-savings-calculator",
  },
  
  {
    title: "Retirement Income Calculator",
    link: "/retirement-income-calculator",
  },
  
  {
    title: "Retirement Withdrawal Calculator",
    link: "/retirement-withdrawal-calculator",
  },
  
  {
    title: "Early Retirement Calculator",
    link: "/early-retirement-calculator",
  },
  
  {
    title: "Salary Calculator",
    link: "/salary-calculator",
  },
  
  {
    title: "Hourly Wage Calculator",
    link: "/hourly-wage-calculator",
  },
  
  {
    title: "Take Home Pay Calculator",
    link: "/take-home-pay-calculator",
  },
  
  {
    title: "Tax Calculator",
    link: "/tax-calculator",
  },
  
  {
    title: "Income Tax Calculator",
    link: "/income-tax-calculator",
  },
  
  {
    title: "Bonus Tax Calculator",
    link: "/bonus-tax-calculator",
  },
  
  {
    title: "Overtime Calculator",
    link: "/overtime-calculator",
  },
  
  {
    title: "Commission Calculator",
    link: "/commission-calculator",
  },
  
  {
    title: "Freelance Tax Calculator",
    link: "/freelance-tax-calculator",
  },
  
  {
    title: "Self Employment Tax Calculator",
    link: "/self-employment-tax-calculator",
  },
  
  {
    title: "Paycheck Calculator",
    link: "/paycheck-calculator",
  },
  
  {
    title: "Profit Margin Calculator",
    link: "/profit-margin-calculator",
  },
  
  {
    title: "Break Even Calculator",
    link: "/break-even-calculator",
  },
  
  {
    title: "Business Loan Calculator",
    link: "/business-loan-calculator",
  },
  
  {
    title: "Cash Runway Calculator",
    link: "/cash-runway-calculator",
  },
  
  {
    title: "Revenue Calculator",
    link: "/revenue-calculator",
  },
  
  {
    title: "Gross Profit Calculator",
    link: "/gross-profit-calculator",
  },
  
  {
    title: "Net Profit Calculator",
    link: "/net-profit-calculator",
  },
  
  {
    title: "Markup Calculator",
    link: "/markup-calculator",
  },
  
  {
    title: "Discount Calculator",
    link: "/discount-calculator",
  },
  
  {
    title: "Sales Tax Calculator",
    link: "/sales-tax-calculator",
  },

];

export default function SitemapPage() {

  return (

    <main className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* BREADCRUMB */}

        <div className="text-sm text-slate-500 mb-6">

          <Link
            href="/"
            className="hover:text-slate-900"
          >
            Home
          </Link>

          <span className="mx-2">
            /
          </span>

          <span>
            Sitemap
          </span>

        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-black text-slate-900 mb-4">
          Sitemap
        </h1>

        <p className="text-slate-600 text-lg leading-8 max-w-3xl mb-10">

          Browse all financial calculators available on LoanFormulas.
          Quickly access mortgage calculators,
          loan payoff tools,
          investment calculators,
          retirement planning tools,
          savings estimators,
          and more.

        </p>

        {/* GRID */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">

            {calculators.map((item) => (

              <Link
                key={item.link}
                href={item.link}
                className="group flex items-center text-lg font-semibold text-slate-800 hover:text-blue-600 transition"
              >

                <span className="mr-3 text-slate-400 group-hover:text-blue-500 transition">
                  →
                </span>

                <span className="border-b border-transparent group-hover:border-blue-500">
                  {item.title}
                </span>

              </Link>

            ))}

          </div>

        </div>

        {/* FOOTER LINKS */}

        <div className="mt-16 flex flex-wrap gap-8 text-slate-600 text-lg">

          <Link
            href="/"
            className="hover:text-slate-900"
          >
            Home Page
          </Link>

          <Link
            href="/about"
            className="hover:text-slate-900"
          >
            About Us
          </Link>

          <Link
            href="/privacy-policy"
            className="hover:text-slate-900"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms-of-service"
            className="hover:text-slate-900"
          >
            Terms of Use
          </Link>

          <Link
             href="/sitemap-page"
             className="hover:text-slate-900"
          >
           Sitemap
        </Link>

        </div>

      </div>

    </main>

  );
}