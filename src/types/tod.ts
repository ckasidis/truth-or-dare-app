export type Mode = "truth" | "dare" | "tod";

export type Rating = "pg" | "pg13" | "r";

export type Question = {
  translations: {
    bn: string | null;
    de: string | null;
    es: string | null;
    fr: string | null;
    hi: string | null;
    tl: string | null;
  };
  id: string;
  type: "TRUTH" | "DARE";
  rating: "PG" | "PG13" | "R";
  question: string;
};
