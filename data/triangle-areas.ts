export type TriangleArea = {
  slug: string;
  name: string;
  type: "city" | "suburb" | "town";
  primaryGuideSlug?: string;
};

// Used for the Triangle area list and map. Clicks route to Fatima's listing search.
export const triangleAreas: TriangleArea[] = [
  { slug: "angier", name: "Angier", type: "town" },
  { slug: "apex", name: "Apex", type: "town" },
  { slug: "cary", name: "Cary", type: "suburb" },
  { slug: "chapel-hill", name: "Chapel Hill", type: "city" },
  { slug: "clayton", name: "Clayton", type: "town" },
  { slug: "creedmoor", name: "Creedmoor", type: "town" },
  { slug: "durham", name: "Durham", type: "city" },
  { slug: "franklinton", name: "Franklinton", type: "town" },
  { slug: "fuquay-varina", name: "Fuquay-Varina", type: "town" },
  { slug: "garner", name: "Garner", type: "suburb" },
  { slug: "hillsborough", name: "Hillsborough", type: "town" },
  { slug: "holly-springs", name: "Holly Springs", type: "town" },
  { slug: "knightdale", name: "Knightdale", type: "suburb" },
  { slug: "louisburg", name: "Louisburg", type: "town" },
  { slug: "mebane", name: "Mebane", type: "town" },
  { slug: "morrisville", name: "Morrisville", type: "suburb" },
  { slug: "pittsboro", name: "Pittsboro", type: "town" },
  {
    slug: "raleigh",
    name: "Raleigh",
    type: "city",
    primaryGuideSlug: "top-10-things-to-do-in-raleigh",
  },
  { slug: "rolesville", name: "Rolesville", type: "town" },
  { slug: "sanford", name: "Sanford", type: "city" },
  { slug: "smithfield", name: "Smithfield", type: "city" },
  { slug: "wake-forest", name: "Wake Forest", type: "town" },
  { slug: "wendell", name: "Wendell", type: "town" },
  { slug: "youngsville", name: "Youngsville", type: "town" },
  { slug: "zebulon", name: "Zebulon", type: "town" },
];

export function getTriangleArea(slug: string): TriangleArea | undefined {
  return triangleAreas.find((area) => area.slug === slug);
}
