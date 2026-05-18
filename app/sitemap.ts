import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl =
    "https://loanformulas.com"

  const routes = [

    "",

    "/loan-calculator",

    "/mortgage-calculator",

    "/refinance-calculator",

    "/auto-loan-calculator",

    "/affordability-calculator",

    "/compound-interest-calculator",

    "/retirement-calculator",

    "/savings-calculator",

    "/investment-calculator",

    "/dividend-calculator",

    "/roi-calculator",

    "/amortization-calculator",

    "/down-payment-calculator",

    "/rent-vs-buy-calculator",

    "/extra-payment-calculator",

    "/credit-card-payoff-calculator",

    "/debt-snowball-calculator",

    "/debt-avalanche-calculator",

    "/biweekly-mortgage-calculator",

    "/mortgage-payoff-calculator",

    "/mortgage-interest-calculator",

    "/mortgage-points-calculator",

    "/mortgage-insurance-calculator",

    "/property-tax-calculator",

    "/home-equity-calculator",

    "/home-equity-loan-calculator",

    "/home-equity-line-of-credit-calculator",

    "/heloc-calculator",

    "/closing-cost-calculator",

    "/house-payment-calculator",

    "/home-affordability-calculator",

    "/real-estate-calculator",

    "/cash-out-refinance-calculator",

    "/adjustable-rate-mortgage-calculator",

    "/arm-calculator",

    "/principal-and-interest-calculator",

    "/escrow-calculator",
    
    "/mortgage-amortization-calculator",

    "/car-payment-calculator",

    "/car-affordability-calculator",

    "/lease-calculator",

    "/car-lease-calculator",

    "/used-car-calculator",

    "/vehicle-loan-calculator",

    "/trade-in-calculator",

    "/auto-refinance-calculator",

    "/gas-cost-calculator",

    "/fuel-cost-calculator",

    "/ev-savings-calculator",
    
    "/vehicle-depreciation-calculator",

    "/minimum-payment-calculator",

    "/debt-payoff-calculator",

    "/personal-loan-calculator",

    "/payday-loan-calculator",

    "/student-loan-calculator",

    "/student-loan-payoff-calculator",

    "/student-loan-refinance-calculator",

    "/interest-payoff-calculator",

    "/loan-payoff-calculator",

    "/line-of-credit-calculator",

    "/credit-utilization-calculator",

    "/balance-transfer-calculator",

    "/debt-consolidation-calculator",

    "/apr-calculator",

    "/apy-calculator",

    "/simple-interest-calculator",


  ]

  return routes.map((route) => ({

    url: `${baseUrl}${route}`,

    lastModified: new Date(),

    changeFrequency: "weekly",

    priority: route === ""
      ? 1
      : 0.8,

  }))
}