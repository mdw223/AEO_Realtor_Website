"use client";

import { useEffect, useState } from "react";
import { triangleAreas } from "@/data/triangle-areas";

type SearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [area, setArea] = useState("");
  const [beds, setBeds] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/listing-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area, beds, min, max }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) {
        setError(data.error ?? "Search is unavailable right now.");
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError("Search is unavailable right now.");
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={() => onOpenChange(false)}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="sheet__close"
          onClick={() => onOpenChange(false)}
          aria-label="Close search"
        >
          ×
        </button>
        <h2 id="search-title" className="sheet__title">
          Search Homes
        </h2>
        <p className="sheet__subtitle">
          Choose a Triangle area and a few basics. You will continue on
          Fatima&apos;s live listing search.
        </p>
        <form className="sheet__form" onSubmit={handleSubmit}>
          <label>
            Area
            <select value={area} onChange={(event) => setArea(event.target.value)}>
              <option value="">All Triangle areas</option>
              {triangleAreas.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="sheet__grid">
            <label>
              Bedrooms
              <select value={beds} onChange={(event) => setBeds(event.target.value)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </label>
            <label>
              Minimum price
              <select value={min} onChange={(event) => setMin(event.target.value)}>
                <option value="">No min</option>
                <option value="200000">$200,000</option>
                <option value="350000">$350,000</option>
                <option value="500000">$500,000</option>
                <option value="750000">$750,000</option>
              </select>
            </label>
          </div>
          <label>
            Maximum price
            <select value={max} onChange={(event) => setMax(event.target.value)}>
              <option value="">No max</option>
              <option value="350000">$350,000</option>
              <option value="500000">$500,000</option>
              <option value="750000">$750,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="1500000">$1,500,000+</option>
            </select>
          </label>
          {error && <p className="sheet__error">{error}</p>}
          <button type="submit" className="btn btn--light" disabled={submitting}>
            {submitting ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
}
