import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

type SearchParams = {
  area?: string;
  min?: string;
  max?: string;
  beds?: string;
  baths?: string;
};

// This builds a URL pointing at the external IDX site (fatima.choiceresidential.com)
// using a simple subset of filters. The frontend can redirect the browser to the
// returned URL.
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchParams;

    const baseUrl = siteConfig.listingsBaseUrl;
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Listings search is not configured." },
        { status: 500 },
      );
    }

    const url = new URL(baseUrl);

    // These query params are based on an example URL provided in the build plan.
    // We keep things simple here and let the frontend choose an `area` preset, etc.
    if (body.area) {
      url.searchParams.set("display", body.area);
    }

    if (body.min) url.searchParams.set("min", body.min);
    if (body.max) url.searchParams.set("max", body.max);
    if (body.beds) url.searchParams.set("beds", body.beds);
    if (body.baths) url.searchParams.set("baths", body.baths);

    // Always default to "advanced" search and map results.
    if (!url.searchParams.has("advanced")) {
      url.searchParams.set("advanced", "1");
    }
    if (!url.searchParams.has("rtype")) {
      url.searchParams.set("rtype", "map");
    }

    return NextResponse.json({ url: url.toString() });
  } catch (err) {
    console.error("Listing search API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
