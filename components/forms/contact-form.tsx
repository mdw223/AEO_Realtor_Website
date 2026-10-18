"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  preferredLanguage: "English" | "French" | "Either";
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "Buy a Home",
    message: "",
    preferredLanguage: "Either",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          priceRange: "Not sure yet",
          timeframe: "Just researching",
          needsIslamicFinancing: false,
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
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <label className="contact-form__field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            disabled={disabled}
          />
        </label>
        <label className="contact-form__field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            disabled={disabled}
          />
        </label>
      </div>
      <div className="contact-form__grid">
        <label className="contact-form__field">
          <span>Phone (optional)</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, phone: event.target.value }))
            }
            disabled={disabled}
          />
        </label>
        <label className="contact-form__field">
          <span>Preferred language</span>
          <select
            name="preferredLanguage"
            value={form.preferredLanguage}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                preferredLanguage: event.target
                  .value as FormState["preferredLanguage"],
              }))
            }
            disabled={disabled}
          >
            <option value="Either">Either</option>
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
        </label>
      </div>
      <label className="contact-form__field">
        <span>How can Fatima help?</span>
        <select
          name="service"
          value={form.service}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, service: event.target.value }))
          }
          disabled={disabled}
        >
          <option value="Buy a Home">Buy a Home</option>
          <option value="Sell a Home">Sell a Home</option>
          <option value="First-Time Home Buyer">First-Time Home Buyer</option>
          <option value="Investment Property">Investment Property</option>
          <option value="General Question">General Question</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="contact-form__field">
        <span>Share a bit about your plans</span>
        <textarea
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          disabled={disabled}
        />
      </label>
      {error && <p className="contact-form__error">{error}</p>}
      {status === "success" && (
        <p className="contact-form__success">
          Thank you for reaching out. Fatima will follow up with you shortly.
        </p>
      )}
      <button type="submit" className="btn btn--primary" disabled={disabled}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

