"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

type LeadMagnetModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  timeframe: string;
  isFirstTimeBuyer: boolean;
  preferredLanguage: "English" | "French" | "Either";
};

export function LeadMagnetModal({ open, onOpenChange }: LeadMagnetModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    timeframe: "",
    isFirstTimeBuyer: true,
    preferredLanguage: "Either",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "submitting") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onOpenChange, status]);

  if (!open) return null;

  function close() {
    if (status === "submitting") return;
    setStep(1);
    onOpenChange(false);
  }

  function goNext(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.name.trim().length < 2 || !form.email.includes("@")) {
      setError("Please add your name and a valid email.");
      return;
    }
    setError(null);
    setStep(2);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
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

  const disableForm = status === "submitting" || status === "success";

  return (
    <div className="modal-backdrop" onClick={close}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-magnet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="sheet__close" onClick={close} aria-label="Close">
          ×
        </button>
        <h2 id="lead-magnet-title" className="sheet__title">
          First-Time Buyer Guide
        </h2>
        <p className="sheet__subtitle">
          Share a few details and Fatima will send a simple guide for buying
          your first home in North Carolina.
        </p>
        {status === "success" ? (
          <p className="sheet__success">
            Thank you. Your request is in. Fatima will follow up with the guide
            and a next step.
          </p>
        ) : (
          <>
            <ol className="sheet__steps">
              <li className={step === 1 ? "is-current" : undefined}>1. Contact Info</li>
              <li className={step === 2 ? "is-current" : undefined}>2. Your Plans</li>
            </ol>
            {step === 1 ? (
              <form className="sheet__form" onSubmit={goNext}>
                <label>
                  Your name *
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                </label>
                <div className="sheet__grid">
                  <label>
                    Your email address *
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Your phone number
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, phone: event.target.value }))
                      }
                    />
                  </label>
                </div>
                {error && <p className="sheet__error">{error}</p>}
                <button type="submit" className="btn btn--ghost">
                  Next
                </button>
              </form>
            ) : (
              <form className="sheet__form" onSubmit={handleSubmit}>
                <label>
                  When are you hoping to buy?
                  <select
                    name="timeframe"
                    value={form.timeframe}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, timeframe: event.target.value }))
                    }
                    disabled={disableForm}
                  >
                    <option value="">Select timeframe</option>
                    <option value="0–3 months">0–3 months</option>
                    <option value="3–6 months">3–6 months</option>
                    <option value="6–12 months">6–12 months</option>
                    <option value="12+ months">12+ months</option>
                    <option value="Just researching">Just researching</option>
                  </select>
                </label>
                <label>
                  Preferred language
                  <select
                    name="preferredLanguage"
                    value={form.preferredLanguage}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        preferredLanguage: event.target.value as FormState["preferredLanguage"],
                      }))
                    }
                    disabled={disableForm}
                  >
                    <option value="Either">Either</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                  </select>
                </label>
                <label className="sheet__check">
                  <input
                    type="checkbox"
                    checked={form.isFirstTimeBuyer}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        isFirstTimeBuyer: event.target.checked,
                      }))
                    }
                    disabled={disableForm}
                  />
                  <span>This will be my first home purchase.</span>
                </label>
                {error && <p className="sheet__error">{error}</p>}
                <div className="sheet__actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setStep(1)}
                    disabled={disableForm}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn--light" disabled={disableForm}>
                    {status === "submitting" ? "Sending..." : "Send Me the Guide"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
