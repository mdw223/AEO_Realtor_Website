"use client";

import { useState } from "react";
import { LeadMagnetModal } from "@/components/modals/lead-magnet-modal";
import { SearchModal } from "@/components/modals/search-modal";

export function HomeHero() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <h1>
            The Best Buying Experience
            <br /> in the Triangle
          </h1>
          <span className="hero__rule" />
          <p>
            Fatima Diallo guides buyers and sellers through every step in
            Raleigh and the Triangle, from the first conversation to closing
            day.
          </p>
          <div className="hero__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setSearchOpen(true)}
            >
              Search
            </button>
            <button
              type="button"
              className="btn btn--light"
              onClick={() => setGuideOpen(true)}
            >
              Get Buyers Guide
            </button>
          </div>
        </div>
      </section>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <LeadMagnetModal open={guideOpen} onOpenChange={setGuideOpen} />
    </>
  );
}
