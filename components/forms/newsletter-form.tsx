"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "homepage",
          website: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const disabled = status === "submitting" || status === "success";

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label className="newsletter-form__label">
        <span>Stay updated on Triangle real estate</span>
        <div className="newsletter-form__controls">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={disabled}
          />
          <button type="submit" className="btn btn--secondary" disabled={disabled}>
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </label>
      {error && <p className="newsletter-form__error">{error}</p>}
      {status === "success" && (
        <p className="newsletter-form__success">
          Thank you for subscribing. You&apos;ll receive occasional guides and
          updates from Fatima.
        </p>
      )}
    </form>
  );
}

