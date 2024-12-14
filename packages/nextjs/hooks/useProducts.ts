import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

export interface ProductStruct {
  price: bigint;
  quantity: bigint;
  retailAddr: string;
  name: string;
  image: string;
  description: string;
  used: boolean;
  productId?: number;
}

export const useProducts = (storeId: string) => {
  const { data: productContract, isLoading: contractLoading } = useScaffoldContract({
    contractName: "Product",
  });

  // Correctly type the contract write hook
  const { writeContractAsync, isMining } = useScaffoldWriteContract("Product");

  const getProducts = async (): Promise<ProductStruct[]> => {
    if (!productContract) return [];

    try {
      const productsOfOwner = await productContract.read.productsOdOwner([storeId]);
      return (productsOfOwner as ProductStruct[]).map((product, index) => ({
        ...product,
        productId: index,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const createOrder = async (productId: number, quantity: number) => {
    try {
      // Use the correct function name and arguments structure
      const tx = await writeContractAsync({
        functionName: "safeMint",
        args: [BigInt(productId), BigInt(quantity)],
      });
      return tx;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const getProductDetails = async (productId: number): Promise<ProductStruct | null> => {
    if (!productContract) return null;

    try {
      const product = await productContract.read.products([BigInt(productId)]);
      return {
        ...(product as ProductStruct),
        productId,
      };
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  return {
    getProducts,
    getProductDetails,
    createOrder,
    isLoading: contractLoading || isMining,
  };
};
