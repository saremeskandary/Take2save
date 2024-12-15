"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react";
import { DUMMY_STORES } from "~~/components/store/DUMMY_STORES";
import { useProducts } from "~~/hooks/useProducts";
import { notification } from "~~/utils/scaffold-eth";
import { Store } from "~~/schemas/storeSchema";

export default function StoreDetailsPage({ params }: { params: { storeId: string } }) {
  const router = useRouter();
  const [store, setStore] = useState<Store | undefined>();
  const { getProducts, isLoading } = useProducts(params.storeId);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Find store by matching either string or number ID
    const foundStore = DUMMY_STORES.find(s => String(s.id) === String(params.storeId));
    console.log("Looking for store:", {
      requestedId: params.storeId,
      availableStores: DUMMY_STORES.map(s => ({ id: s.id, name: s.name })),
      foundStore,
    });

    setStore(foundStore);

    if (!foundStore) {
      notification.error("Store not found!");
      return;
    }

    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        notification.error("Failed to load products");
      }
    };

    loadProducts();
  }, [params.storeId, getProducts]);

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg max-w-sm mx-auto">
          <h2 className="text-2xl font-bold mb-2">Store Not Found</h2>
          <p className="text-base-content mb-6">
            We couldn't find the store you're looking for. It may have been removed or the link might be incorrect.
          </p>
          <button onClick={() => router.push("/stores")} className="btn btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Store Header */}
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="relative h-48">
          <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
          <button
            onClick={() => router.push("/stores")}
            className="absolute top-4 left-4 btn btn-circle btn-sm bg-base-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{store.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="ml-1">{store.rating}</span>
            </div>
            <span>({store.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-4 text-base-content/80">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{store.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Until {store.availableUntil}</span>
            </div>
          </div>
          <p className="mt-2 text-base-content/70">{store.address}</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Available Products</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-4">
            {products.map((product, index) => (
              <div key={index} className="bg-base-100 rounded-lg shadow p-4">
                <div className="flex gap-4">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-base-content/70">{product.description}</p>
                    <p className="mt-2 font-bold">Price: ${Number(product.price) / 100}</p>
                    <p className="text-sm">Available: {product.quantity.toString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-base-content/70">No products available at this time</p>
        )}
      </div>
    </div>
  );
}