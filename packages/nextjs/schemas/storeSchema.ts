import { z } from "zod";


// Schema definitions
export const storeSchema = z.object({
  id: z.union([z.string(), z.number()]), // Allow string or number for ID
  name: z.string(),
  image: z.string().url(),
  rating: z.number().min(0).max(5),
  reviews: z.number().nonnegative().optional(), // Optional in case reviews are missing
  distance: z.string(),
  address: z.string(),
  type: z.enum(["Supermarket", "Restaurant", "Pharmacy", "Clothing", "Electronics"]), // Added 5 types of stores
  location: z.string(),
  hours: z.string(),
  originalPrice: z.string(),
  price: z.string(),
  delivery: z.string(),
  bags: z.number().int(),
  pickup: z.boolean(),
  tokenReward: z.number().nonnegative(),
  availableUntil: z.string().optional(), // Optional to allow flexibility
});

export const storesSchema = z.array(storeSchema);

// TypeScript type inference
export type Store = z.infer<typeof storeSchema>;