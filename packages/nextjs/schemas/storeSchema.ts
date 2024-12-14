import { z } from "zod";

// Schema definitions
export const storeSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url(),
  rating: z.number().min(0).max(5),
  reviews: z.number().nonnegative(),
  distance: z.string(),
  address: z.string(),
  availableUntil: z.string(),
});

export const storesSchema = z.array(storeSchema);

// TypeScript type inference
export type Store = z.infer<typeof storeSchema>;
