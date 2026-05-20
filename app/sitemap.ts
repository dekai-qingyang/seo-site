import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://loanformulas.com";

  const routes = [

    "",

    // MAIN

    "/sitemap.xml",
    "/privacy-policy",
    "/terms-of-service",

    // MORTGAGE

    "/mortgage-calculator",
    "/refinance-calculator",
    "/affordability-calculator",
    "/down-payment-calculator",
    "/rent-vs-buy-calculator",
    "/extra-payment-calculator",
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

    // AUTO

    "/auto-loan-calculator",
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

    // LOANS

    "/loan-calculator",
    "/personal-loan-calculator",
    "/payday-loan-calculator",
    "/student-loan-calculator",
    "/student-loan-payoff-calculator",
    "/student-loan-refinance-calculator",
    "/interest-payoff-calculator",
    "/loan-payoff-calculator",
    "/line-of-credit-calculator",
    "/balance-transfer-calculator",
    "/debt-consolidation-calculator",

    // CREDIT & DEBT

    "/credit-card-payoff-calculator",
    "/debt-snowball-calculator",
    "/debt-avalanche-calculator",
    "/minimum-payment-calculator",
    "/debt-payoff-calculator",
    "/credit-utilization-calculator",

    // INTEREST & RETURNS

    "/compound-interest-calculator",
    "/apr-calculator",
    "/apy-calculator",
    "/simple-interest-calculator",
    "/investment-return-calculator",
    "/annual-return-calculator",
    "/future-value-calculator",
    "/present-value-calculator",
    "/inflation-calculator",
    "/real-return-calculator",
    "/risk-reward-calculator",

    // INVESTING

    "/investment-calculator",
    "/dividend-calculator",
    "/stock-calculator",
    "/etf-calculator",
    "/mutual-fund-calculator",
    "/portfolio-calculator",
    "/capital-gains-calculator",
    "/roi-calculator",
    "/retirement-calculator",
    "/savings-calculator",
    "/net-worth-calculator",
    "/wealth-calculator",
    "/financial-independence-calculator",
    "/fire-calculator",

    // MISC

    "/amortization-calculator",

  ];

  return routes.map((route) => ({

    url: `${baseUrl}${route}`,

    lastModified: new Date(),

    changeFrequency:
      route === ""
        ? "daily"
        : "weekly",

    priority:
      route === ""
        ? 1.0
        : route.includes("mortgage")
        ? 0.95
        : route.includes("loan")
        ? 0.92
        : route.includes("investment")
        ? 0.9
        : 0.85,

  }));
}