export type TriangleArea = {
  slug: string;
  name: string;
  type: "city" | "suburb" | "town";
  primaryGuideSlug?: string;
};

// Used for the interactive Triangle map; the frontend can route clicks on a city
// to the matching blog/guide slug.
export const triangleAreas: TriangleArea[] = [
  {
    slug: "raleigh",
    name: "Raleigh",
    type: "city",
    primaryGuideSlug: "top-10-things-to-do-in-raleigh",
  },
  {
    slug: "durham",
    name: "Durham",
    type: "city",
  },
  {
    slug: "chapel-hill",
    name: "Chapel Hill",
    type: "city",
  },
  {
    slug: "wendell",
    name: "Wendell",
    type: "town",
  },
  {
    slug: "cary",
    name: "Cary",
    type: "suburb",
  },
  {
    slug: "apex",
    name: "Apex",
    type: "town",
  },
];

export function getTriangleArea(slug: string): TriangleArea | undefined {
  return triangleAreas.find((area) => area.slug === slug);
}
