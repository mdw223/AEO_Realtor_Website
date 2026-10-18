"use client";

import { useState } from "react";
import { LeadMagnetModal } from "@/components/modals/lead-magnet-modal";

export function HomeLeadMagnet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="guide-band">
        <p className="eyebrow">First-time buyers</p>
        <h2>A clearer way to buy your first North Carolina home</h2>
        <p>
          Get Fatima&apos;s short guide to budgets, timelines, and assistance
          programs that can lower your upfront costs.
        </p>
        <button
          type="button"
          className="btn btn--light"
          onClick={() => setOpen(true)}
        >
          Get Buyers Guide
        </button>
      </section>
      <LeadMagnetModal open={open} onOpenChange={setOpen} />
    </>
  );
}
