export const navbarItems = [
  { menu: "Products", url: "/products" },
  {
    menu: "Solutions",
    sections: [
      {
        title: "BY STAGE",
        items: [
          { label: "Enterprises", icon: "building", url: "/solutions/enterprises" },
          { label: "Startups", icon: "rocket", url: "/solutions/startups" },
        ],
      },
      {
        title: "BY USE CASE",
        items: [
          { label: "Crypto", icon: "crypto", url: "/solutions/crypto" },
          { label: "In-app payments", icon: "mobile", url: "/solutions/in-app-payments" },
          { label: "E-commerce", icon: "cart", url: "/solutions/ecommerce" },
          { label: "Marketplaces", icon: "store", url: "/solutions/marketplaces" },
          { label: "Embedded finance", icon: "layers", url: "/solutions/embedded-finance" },
          { label: "Platforms", icon: "grid", url: "/solutions/platforms" },
          { label: "Finance automation", icon: "chart", url: "/solutions/finance-automation" },
          { label: "SaaS", icon: "cloud", url: "/solutions/saas" },
          { label: "Global businesses", icon: "globe", url: "/solutions/global-businesses" },
        ],
      },
      {
        title: "BY INDUSTRY",
        items: [
          { label: "AI companies", icon: "ai", url: "/solutions/ai-companies" },
          { label: "Media and entertainment", icon: "play", url: "/solutions/media-entertainment" },
          { label: "Creator economy", icon: "creator", url: "/solutions/creator-economy" },
          { label: "Non-profits", icon: "heart", url: "/solutions/non-profits" },
          { label: "Hospitality, travel and leisure", icon: "plane", url: "/solutions/hospitality-travel" },
          { label: "Retail", icon: "bag", url: "/solutions/retail" },
          { label: "Insurance", icon: "umbrella", url: "/solutions/insurance" },
        ],
      },
      {
        title: "ECOSYSTEM",
        items: [
          { label: "Stripe App Marketplace", icon: "marketplace", external: true, url: "https://stripe.com/apps" },
          { label: "Partners", icon: "partners", url: "/partners" },
        ],
      },
    ],
  },
  { menu: "Developers", url: "/developers" },
  { menu: "Resources", url: "/resources" },
  { menu: "Pricing", url: "/pricing" },
];

// convenience export for the Solutions sections only (used by StripeDropdown)
export const solutionsMenu = navbarItems.find((i) => i.menu === "Solutions").sections;
