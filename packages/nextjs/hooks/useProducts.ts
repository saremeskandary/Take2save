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

  const { writeContractAsync, isMining } = useScaffoldWriteContract("Product");

  const getProducts = async (): Promise<ProductStruct[]> => {
    if (!productContract) return [];
    try {
      // First get the product from read.products
      const product = await productContract.read.products([BigInt(0)]);

      if (!product) return [];

      // Convert the product tuple to a ProductStruct
      const productStruct: ProductStruct = {
        price: product[0],
        quantity: product[1],
        retailAddr: product[2],
        name: product[3],
        image: product[4],
        description: product[5],
        used: product[6],
        productId: 0,
      };

      return [productStruct];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const createOrder = async (productId: number, quantity: number) => {
    try {
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

      if (!product) return null;

      return {
        price: product[0],
        quantity: product[1],
        retailAddr: product[2],
        name: product[3],
        image: product[4],
        description: product[5],
        used: product[6],
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
