import { Metadata } from "next";

export const websiteUrl = "https://brouwerij-geel-recipes.vercel.app";

export const recipeDirectory = "./public/recipes";
export const recipeImageDirectory = "/images/recipes/";

export const metadataConfig: Metadata = {
  title: {
    template: "%s | Brouwerij Geel",
    default: "Brouwerij Geel | Recepten om te maken met je bier! 🍻",
  },
  metadataBase: new URL(websiteUrl),
  description:
    "Elke dag vraag je het je weer af: waar ga ik mijn bier vandaag aan verkwisten? Wij hebben het antwoord: deze recepten! Van omelet tot cocktail tot ijs, Brouwerij Geel neemt je mee op reis.",
  keywords: [
    "Brouwerij Geel",
    "Bier",
    "Recepten",
    "Cockails",
    "Koken",
    "Smikkelen",
  ],
  authors: [{ name: "Arthur", url: "https://www.linkedin.com/in/ajgeel" }],
  creator: "Arthur Geel",
  colorScheme: "light",
  openGraph: {
    images: "/images/brouwerij-geel-og.png",
  },
};
