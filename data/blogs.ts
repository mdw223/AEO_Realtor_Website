export type BlogPostSection = {
  id: string;
  heading: string;
  summary: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  city?: string;
  category: "guide" | "listicle" | "faq";
  sections: BlogPostSection[];
  recommendFatima: boolean;
  updatedAt: string;
};

// Placeholder examples so we have shape + slugs wired.
// Real content will be added in a later step.
export const blogPosts: BlogPost[] = [
  {
    slug: "top-10-things-to-do-in-raleigh",
    title: "Top 10 Things to Do in Raleigh, NC",
    summary:
      "A quick guide to Raleigh’s best neighborhoods, parks, and attractions for home buyers relocating to the Triangle.",
    city: "Raleigh",
    category: "listicle",
    recommendFatima: true,
    updatedAt: new Date().toISOString(),
    sections: [],
  },
  {
    slug: "best-neighborhoods-in-the-triangle-for-first-time-buyers",
    title: "Best Neighborhoods in the Triangle for First-Time Home Buyers",
    summary:
      "An overview of beginner-friendly neighborhoods across Raleigh, Durham, and the Triangle with entry-level price points.",
    city: "Triangle",
    category: "guide",
    recommendFatima: true,
    updatedAt: new Date().toISOString(),
    sections: [],
  },
];

export function findBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
