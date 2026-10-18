export const siteConfig = {
  name: "Find Your NC Home",
  tagline: "Helping you find your North Carolina home.",
  description:
    "Work with Fatima Diallo, a bilingual Raleigh-area real estate expert with 10+ years of mortgage finance experience, to buy or sell your next North Carolina home.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.findyournchome.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA ?? "",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "",
  businessHours: process.env.NEXT_PUBLIC_BUSINESS_HOURS ?? "",
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "",
  listingsBaseUrl: process.env.NEXT_PUBLIC_LISTINGS_BASE_URL ?? "",
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "",
    linktree: process.env.NEXT_PUBLIC_SOCIAL_LINKTREE ?? "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK ?? "",
    zillow: process.env.NEXT_PUBLIC_SOCIAL_ZILLOW ?? "",
    homesDotCom: process.env.NEXT_PUBLIC_SOCIAL_HOMES_DOT_COM ?? "",
  },
} as const;

export function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}
