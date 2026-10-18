import { listingsSearchUrl } from "@/lib/site-config";

export function HomeAbout() {
  return (
    <section id="about" className="partner-wrap section">
      <div className="section__inner partner">
        <div className="partner__media">
          <img
            src="/images/about.jpg"
            width={1400}
            height={933}
            alt="Sunlit kitchen in a Triangle home"
          />
        </div>
        <div className="partner__copy">
          <p className="eyebrow">Premium buying experience</p>
          <h2>In The Triangle Area</h2>
          <h3>Your trusted partner in finding the perfect home</h3>
          <p>
            Fatima Diallo is a bilingual Raleigh realtor with Choice Residential
            Real Estate. She helps first-time buyers, move-up sellers,
            investors, and families relocating to North Carolina buy and sell
            with a clear plan.
          </p>
          <hr className="partner__rule" />
          <h3>Expertise that gives you an edge</h3>
          <p>
            With 10+ years in mortgage finance and a decade of buying,
            remodeling, and selling homes, Fatima explains the numbers, the
            contract, and the closing. She is an Accredited Buyer
            Representative and a guide for down payment assistance and
            Sharia-compliant financing.
          </p>
          <div className="partner__actions">
            <a className="btn btn--navy" href={listingsSearchUrl()}>
              Property Search
            </a>
            <a className="btn btn--gold" href="#contact">
              Start Buying
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
