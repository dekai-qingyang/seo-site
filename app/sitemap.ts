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