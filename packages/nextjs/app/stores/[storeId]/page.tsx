"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Clock, MapPin, StarIcon } from "lucide-react";
import { ProductStruct, useProducts } from "~~/hooks/useProducts";
import { notification } from "~~/utils/scaffold-eth";


export default function StoreDetailPage({ params }: { params: { storeId: string } }) {
  const router = useRouter();
  const [selectedBag, setSelectedBag] = useState<ProductStruct | null>(null);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [products, setProducts] = useState<ProductStruct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);

  const { getProducts, createOrder, isLoading } = useProducts(params.storeId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        notification.error("Error loading products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [getProducts]);

  const handleBagSelect = (bag: ProductStruct) => {
    setSelectedBag(bag);
    setShowSurpriseModal(true);
  };

  const handleConfirmBag = async () => {
    if (!selectedBag || selectedBag.productId === undefined) return;

    setIsOrdering(true);
    try {
      const tx = await createOrder(selectedBag.productId, 1);

      // In the handleConfirmBag function:
      notification.success(
        <div className="flex flex-col">
          <span>Order created successfully!</span>
          <span className="text-sm">Transaction: {tx}</span>
        </div>,
      );

      setShowSurpriseModal(false);
      router.push(`/stores/${params.storeId}/order`);
    } catch (error: any) {
      notification.error(error?.message || "Failed to create order");
    } finally {
      setIsOrdering(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      {/* ...rest of the JSX remains the same until the modal buttons... */}

      {/* Update the modal buttons to show loading state */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowSurpriseModal(false)}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-full"
          disabled={isOrdering}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmBag}
          disabled={isOrdering}
          className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 flex items-center justify-center gap-2"
        >
          {isOrdering ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              <span>Confirming...</span>
            </>
          ) : (
            "Got it!"
          )}
        </button>
      </div>

      {/* Bottom Order Button - now with loading state */}
      {products.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-400"
            onClick={() => handleBagSelect(products[0])}
            disabled={isOrdering}
          >
            {isOrdering ? "Processing..." : "Order Now"}
          </button>
        </div>
      )}
    </div>
  );
}