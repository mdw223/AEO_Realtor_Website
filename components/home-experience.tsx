"use client";

import { useState } from "react";
import { LeadMagnetModal } from "@/components/modals/lead-magnet-modal";
import { listingsSearchUrl } from "@/lib/site-config";

const cards = [
  {
    eyebrow: "Find your home",
    title: "Search all Listings",
    image: "/images/card-listings.jpg",
    href: listingsSearchUrl(),
  },
  {
    eyebrow: "Live in the Triangle",
    title: "Explore Areas",
    image: "/images/card-areas.jpg",
    href: "#guides",
  },
  {
    eyebrow: "First-time buyers",
    title: "Get the Guide",
    image: "/images/card-buyers.jpg",
    href: "#guide",
  },
  {
    eyebrow: "Financing",
    title: "Financing Guidance",
    image: "/images/card-finance.jpg",
    href: "#contact",
  },
];

export function HomeExperience() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <section className="experience" aria-label="Ways Fatima can help">
      <div className="experience__band">
        <p className="eyebrow">Trusted local advisor</p>
        <h2>A Guided Buyer Experience</h2>
        <p>
          Your next home is a major decision. Fatima brings local knowledge,
          mortgage experience, and steady communication so you can choose a
          place you will be glad to call home.
        </p>
      </div>
      <div className="experience__cards">
        {cards.map((card) =>
          card.href === "#guide" ? (
            <button
              key={card.title}
              type="button"
              className="experience-card"
              style={{ backgroundImage: `url(${card.image})` }}
              onClick={() => setGuideOpen(true)}
            >
              <span className="experience-card__shade" />
              <span className="experience-card__text">
                <span className="eyebrow">{card.eyebrow}</span>
                <span className="experience-card__title">{card.title}</span>
              </span>
            </button>
          ) : (
            <a
              key={card.title}
              className="experience-card"
              href={card.href}
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <span className="experience-card__shade" />
              <span className="experience-card__text">
                <span className="eyebrow">{card.eyebrow}</span>
                <span className="experience-card__title">{card.title}</span>
              </span>
            </a>
          ),
        )}
      </div>
      <LeadMagnetModal open={guideOpen} onOpenChange={setGuideOpen} />
    </section>
  );
}
