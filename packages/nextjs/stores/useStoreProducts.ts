import { useCallback, useEffect, useState } from "react";
import { isAddress } from "viem";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

export interface StoreProduct {
  productId: bigint;
  price: bigint;
  quantity: bigint;
  retailAddr: string;
  name: string;
  image: string;
  description: string;
  used: boolean;
}

export interface UseStoreProductsReturn {
  products: StoreProduct[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useStoreProducts = (storeAddress: string): UseStoreProductsReturn => {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Validate store address
  const isValidAddress = isAddress(storeAddress);

  // Get contract instance
  const { data: productContract } = useScaffoldContract({
    contractName: "Product",
  });

  const fetchProducts = useCallback(async () => {
    if (!productContract || !storeAddress || !isValidAddress) {
      setIsLoading(false);
      if (storeAddress && !isValidAddress) {
        setError(new Error("Invalid store address format"));
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let storeProducts: StoreProduct[] = [];
      let index = 0;

      while (true) {
        try {
          const productId = await productContract.read.productsOdOwner([storeAddress, BigInt(index)]);
          const product = await productContract.read.products([productId]);

          if (product[2] === storeAddress) {
            storeProducts.push({
              productId,
              price: product[0],
              quantity: product[1],
              retailAddr: product[2],
              name: product[3],
              image: product[4],
              description: product[5],
              used: product[6],
            });
          }

          index++;
        } catch (err) {
          break;
        }
      }

      setProducts(storeProducts);
    } catch (err) {
      console.error("Error fetching store products:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch store products"));
    } finally {
      setIsLoading(false);
    }
  }, [productContract, storeAddress, isValidAddress]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};
