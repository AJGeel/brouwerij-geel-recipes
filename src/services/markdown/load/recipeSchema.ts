import { z } from "zod";

// ISO 8601 duration, with at least one component, e.g. `PT50M` or `P0Y0M0DT1H5M0S`
const isoDuration =
  /^P(?=\d|T\d)(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/;

const text = z.string().trim().min(1);

export const ingredientSchema = z.object({
  name: text,
  // YAML reads an unquoted `amount: 3` as a number
  amount: z.coerce.string().trim().min(1),
  imageSlug: z.string().startsWith("/"),
});

export const recipeMetadataSchema = z.object({
  title: text,
  imageSlug: z.string().startsWith("/"),
  ingredients: z.array(ingredientSchema).min(1),
  duration: z.string().regex(isoDuration, "Expected an ISO 8601 duration"),
  tags: z.array(text),
});
