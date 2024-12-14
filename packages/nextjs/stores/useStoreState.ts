import { fetchStoresFromIPFS } from "~~/services/ipfsService";
import { Store, storesSchema } from "../schemas/storeSchema";
import { create } from "zustand";

type StoreState = {
  stores: Store[];
  loading: boolean;
  error: string | null;
  fetchStores: () => Promise<void>;
};

export const useStoreState = create<StoreState>(set => ({
  stores: [],
  loading: false,
  error: null,
  fetchStores: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchStoresFromIPFS();
      const validatedStores = storesSchema.parse(data);
      set({ stores: validatedStores, loading: false });
    } catch (error) {
      console.error("Error fetching stores:", error);
      set({ error: "Failed to fetch stores", loading: false });
    }
  },
}));
