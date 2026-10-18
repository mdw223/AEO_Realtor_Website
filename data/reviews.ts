export type Review = {
  id: string;
  author: string;
  rating: number;
  source: "Google";
  // Short, entity-rich summary of the review; actual text can be added later.
  summary: string;
  url?: string;
};

// Placeholder structure for Google reviews. In a later step we can either
// paste in curated review snippets or integrate a dedicated reviews solution.
export const reviews: Review[] = [
  {
    id: "example-1",
    author: "Google Reviewer",
    rating: 5,
    source: "Google",
    summary:
      "Fatima guided us through buying our first home in Raleigh with clear explanations of every mortgage and closing step.",
  },
];
