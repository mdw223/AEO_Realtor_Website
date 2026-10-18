import { listingsSearchUrl } from "@/lib/site-config";

const services = [
  {
    id: "buy",
    eyebrow: "Buy",
    title: "Buy a Home",
    description:
      "Search Raleigh and the Triangle with a clear read on price, payment, and every step through closing.",
    href: listingsSearchUrl(),
    link: "Search homes",
  },
  {
    id: "sell",
    eyebrow: "Sell",
    title: "Sell My Home",
    description:
      "Price, present, and market your home so it reaches the right buyers and you can move on your timeline.",
    href: "#contact",
    link: "Talk about selling",
  },
  {
    id: "relocate",
    eyebrow: "Move",
    title: "Relocate to NC",
    description:
      "Learn the neighborhoods, commute patterns, and local costs before you choose where to land.",
    href: "#guides",
    link: "Explore areas",
  },
  {
    id: "first-time",
    eyebrow: "First home",
    title: "First-Time Buyers",
    description:
      "Get help with North Carolina down payment and closing cost assistance, in English or French.",
    href: "#contact",
    link: "Ask Fatima",
  },
];

export function HomeServices() {
  return (
    <section className="section services" aria-label="Real estate services">
      <div className="section__inner">
        <header className="center-copy">
          <p className="eyebrow">Full-service</p>
          <h2 className="section-title">Services For Buyers</h2>
          <p className="section-subtitle">
            Buying a home happens only a few times in most lives. Fatima walks
            with you through each phase so the decision feels steady.
          </p>
        </header>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.id} id={service.id}>
              <p className="eyebrow">{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={service.href}>{service.link}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
