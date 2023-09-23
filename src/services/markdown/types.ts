export interface Ingredient {
  name: string;
  amount: string;
  imageSlug: string;
}

export interface RecipeMetadata {
  title: string;
  imageSlug: string;
  ingredients: Ingredient[];
  time: string;
  tags: string[];
}
