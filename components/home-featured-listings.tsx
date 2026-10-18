"use client";

import { useRef } from "react";
import { listingsSearchUrl } from "@/lib/site-config";

const spots = [
  { city: "Raleigh", image: "/images/home-raleigh.jpg" },
  { city: "Apex", image: "/images/home-apex.jpg" },
  { city: "Cary", image: "/images/home-cary.jpg" },
  { city: "Wake Forest", image: "/images/home-wake.jpg" },
  { city: "Durham", image: "/images/home-durham.jpg" },
  { city: "Chapel Hill", image: "/images/home-chapel.jpg" },
];

export function HomeFeaturedListings() {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: number) {
    const node = scroller.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>(".listing-card");
    const amount = (card?.offsetWidth ?? 280) + 12;
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className="listings" aria-label="Featured areas">
      <header className="center-copy">
        <p className="eyebrow">Check out our homes for sale</p>
        <h2 className="section-title">Our Featured Listings</h2>
      </header>
      <div className="listings__scroller" ref={scroller}>
        {spots.map((spot) => (
          <a
            key={spot.city}
            className="listing-card"
            href={listingsSearchUrl(spot.city)}
          >
            <img src={spot.image} alt="" width={900} height={600} />
            <span className="listing-card__caption">
              <strong>{spot.city}, NC</strong>
              <span>Browse homes for sale</span>
            </span>
          </a>
        ))}
      </div>
      <div className="listings__controls">
        <button
          type="button"
          className="icon-btn"
          aria-label="Previous areas"
          onClick={() => scrollByCard(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Next areas"
          onClick={() => scrollByCard(1)}
        >
          ›
        </button>
      </div>
      <div className="listings__actions">
        <a className="btn btn--navy" href={listingsSearchUrl()}>
          View All Active Listings
        </a>
        <a className="btn btn--gold" href="#contact">
          Talk With Fatima
        </a>
      </div>
    </section>
  );
}
