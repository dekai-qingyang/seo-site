export default function SitemapPage() {

    const sections = [
  
      {
        title: "Mortgage Calculators",
        links: [
          ["Mortgage Calculator", "/mortgage-calculator"],
          ["HELOC Calculator", "/heloc-calculator"],
          ["Refinance Calculator", "/refinance-calculator"],
        ],
      },
  
      {
        title: "Loan Calculators",
        links: [
          ["Loan Calculator", "/loan-calculator"],
          ["APR Calculator", "/apr-calculator"],
          ["Debt Payoff Calculator", "/debt-payoff-calculator"],
        ],
      },
  
      {
        title: "Investment Calculators",
        links: [
          ["Investment Calculator", "/investment-calculator"],
          ["Stock Calculator", "/stock-calculator"],
          ["FIRE Calculator", "/fire-calculator"],
        ],
      },
  
    ];
  
    return (
  
      <main className="min-h-screen bg-slate-100 py-10 px-4">
  
        <div className="max-w-7xl mx-auto">
  
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
  
            <h1 className="text-5xl font-black mb-8">
              Sitemap
            </h1>
  
            <div className="grid lg:grid-cols-3 gap-8">
  
              {sections.map((section) => (
  
                <div
                  key={section.title}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6"
                >
  
                  <h2 className="text-2xl font-black text-blue-700 mb-5">
                    {section.title}
                  </h2>
  
                  <div className="space-y-3">
  
                    {section.links.map(([title, link]) => (
  
                      <a
                        key={link}
                        href={link}
                        className="block font-semibold text-slate-700 hover:text-blue-600"
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