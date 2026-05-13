import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  return [

    {
      url: "https://loanformulas.com",
      lastModified: new Date(),
    },

    {
      url: "https://loanformulas.com/loan-calculator",
      lastModified: new Date(),
    },

    {
      url: "https://loanformulas.com/mortgage-calculator",
      lastModified: new Date(),
    },

    {
      url: "https://loanformulas.com/refinance-calculator",
      lastModified: new Date(),
    },

    {
      url: "https://loanformulas.com/auto-loan-calculator",
      lastModified: new Date(),
    },

    {
      url: "https://loanformulas.com/affordability-calculator",
      lastModified: new Date(),
    },

    {
      url: "https://loanformulas.com/compound-interest-calculator",
      lastModified: new Date(),
    },

  ]
}