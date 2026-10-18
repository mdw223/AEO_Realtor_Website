import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  preferredLanguage: z
    .enum(["English", "French", "Either"])
    .default("Either")
    .optional(),
  service: z.enum([
    "Buy a Home",
    "Sell a Home",
    "First-Time Home Buyer",
    "Investment Property",
    "General Question",
    "Other",
  ]),
  priceRange: z
    .enum([
      "Under $250k",
      "$250k–$400k",
      "$400k–$650k",
      "$650k+",
      "Not sure yet",
    ])
    .optional(),
  timeframe: z
    .enum([
      "0–3 months",
      "3–6 months",
      "6–12 months",
      "12+ months",
      "Just researching",
    ])
    .optional(),
  needsIslamicFinancing: z.boolean().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0, "Bot detected"), // honeypot
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSignupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().optional(),
  source: z.string().optional(), // e.g. "homepage", "blog", "triangle-map"
  website: z.string().max(0, "Bot detected"), // honeypot
});

export type NewsletterSignupData = z.infer<typeof newsletterSignupSchema>;

export const leadMagnetSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  isFirstTimeBuyer: z.boolean().default(true).optional(),
  timeframe: z
    .enum([
      "0–3 months",
      "3–6 months",
      "6–12 months",
      "12+ months",
      "Just researching",
    ])
    .optional(),
  preferredLanguage: z
    .enum(["English", "French", "Either"])
    .default("Either")
    .optional(),
  website: z.string().max(0, "Bot detected"), // honeypot
});

export type LeadMagnetData = z.infer<typeof leadMagnetSchema>;
