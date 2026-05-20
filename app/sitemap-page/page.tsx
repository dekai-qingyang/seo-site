const sections = [

    {
      title: "Mortgage Calculators",
      links: [
        ["Mortgage Calculator", "/mortgage-calculator"],
        ["Refinance Calculator", "/refinance-calculator"],
        ["Affordability Calculator", "/affordability-calculator"],
        ["HELOC Calculator", "/heloc-calculator"],
        ["Mortgage Payoff Calculator", "/mortgage-payoff-calculator"],
        ["Property Tax Calculator", "/property-tax-calculator"],
        ["ARM Calculator", "/arm-calculator"],
      ],
    },
  
    {
      title: "Loan Calculators",
      links: [
        ["Loan Calculator", "/loan-calculator"],
        ["Personal Loan Calculator", "/personal-loan-calculator"],
        ["Payday Loan Calculator", "/payday-loan-calculator"],
        ["Student Loan Calculator", "/student-loan-calculator"],
        ["Loan Payoff Calculator", "/loan-payoff-calculator"],
        ["APR Calculator", "/apr-calculator"],
        ["Simple Interest Calculator", "/simple-interest-calculator"],
      ],
    },
  
    {
      title: "Investment Calculators",
      links: [
        ["Investment Calculator", "/investment-calculator"],
        ["Stock Calculator", "/stock-calculator"],
        ["ETF Calculator", "/etf-calculator"],
        ["Mutual Fund Calculator", "/mutual-fund-calculator"],
        ["Portfolio Calculator", "/portfolio-calculator"],
        ["FIRE Calculator", "/fire-calculator"],
        ["Net Worth Calculator", "/net-worth-calculator"],
      ],
    },
  
  ];
  
  export default function SitemapPage() {
  
    return (
  
      <main className="min-h-screen bg-slate-100 py-10 px-4">
  
        <div className="max-w-7xl mx-auto">
  
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-12">
  
            <h1 className="text-5xl font-black text-slate-900 mb-4">
              Sitemap
            </h1>
  
            <p className="text-slate-600 text-lg mb-10">
              Browse all LoanFormulas financial calculators and tools.
            </p>
  
            <div className="grid lg:grid-cols-3 gap-10">
  
              {sections.map((section) => (
  
                <div
                  key={section.title}
                  className="bg-slate-50 rounded-3xl border border-slate-200 p-6"
                >
  
                  <h2 className="text-2xl font-black text-blue-700 mb-6">
                    {section.title}
                  </h2>
  
                  <div className="space-y-4">
  
                    {section.links.map(([title, link]) => (
  
                      <a
                        key={link}
                        href={link}
                        className="block text-lg font-semibold text-slate-700 hover:text-blue-600 transition"
                      >
                        {title}
                      </a>
  
                    ))}
  
                  </div>
  
                </div>
  
              ))}
  
            </div>
  
          </div>
  
        </div>
  
      </main>
  
    );
  }