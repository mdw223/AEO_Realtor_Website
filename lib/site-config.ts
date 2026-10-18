function fromEnv(value: string | undefined, fallback = "") {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export const siteConfig = {
  name: "Find Your NC Home",
  tagline: "Helping you find your North Carolina home.",
  description:
    "Work with Fatima Diallo, a bilingual Raleigh-area real estate expert with 10+ years of mortgage finance experience, to buy or sell your next North Carolina home.",
  url: fromEnv(
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://www.findyournchome.com",
  ),
  phone: fromEnv(process.env.NEXT_PUBLIC_PHONE, "(919) 283-6363"),
  email: fromEnv(
    process.env.NEXT_PUBLIC_EMAIL,
    "fatima@findyournchome.com",
  ),
  calendlyUrl: fromEnv(process.env.NEXT_PUBLIC_CALENDLY_URL),
  serviceArea: fromEnv(
    process.env.NEXT_PUBLIC_SERVICE_AREA,
    "Raleigh-Durham & Greater Triangle, North Carolina",
  ),
  address: fromEnv(
    process.env.NEXT_PUBLIC_ADDRESS,
    "256 W Millbrook Rd, Raleigh, NC 27609",
  ),
  businessHours: fromEnv(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  googleMapsUrl: fromEnv(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL),
  listingsBaseUrl: fromEnv(
    process.env.NEXT_PUBLIC_LISTINGS_BASE_URL,
    "https://fatima.choiceresidential.com",
  ),
  analytics: {
    gaMeasurementId: fromEnv(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  },
  social: {
    facebook: fromEnv(
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      "https://www.facebook.com/Brokerfatima",
    ),
    linkedin: fromEnv(
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
      "https://www.linkedin.com/in/fatima-diallo-realtor/",
    ),
    linktree: fromEnv(process.env.NEXT_PUBLIC_SOCIAL_LINKTREE),
    instagram: fromEnv(
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      "https://www.instagram.com/fatima_realtor_go/",
    ),
    tiktok: fromEnv(
      process.env.NEXT_PUBLIC_SOCIAL_TIKTOK,
      "https://www.tiktok.com/@fatima__realtor_go",
    ),
    zillow: fromEnv(
      process.env.NEXT_PUBLIC_SOCIAL_ZILLOW,
      "https://www.zillow.com/profile/Fatima%20Diallo",
    ),
    homesDotCom: fromEnv(
      process.env.NEXT_PUBLIC_SOCIAL_HOMES_DOT_COM,
      "https://www.homes.com/real-estate-agents/fatima-diallo/9sdzq56/",
    ),
  },
} as const;

export function listingsSearchUrl(display?: string) {
  const url = new URL(siteConfig.listingsBaseUrl);
  url.searchParams.set("advanced", "1");
  url.searchParams.set("rtype", "map");
  if (display) url.searchParams.set("display", display);
  return url.toString();
}

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
