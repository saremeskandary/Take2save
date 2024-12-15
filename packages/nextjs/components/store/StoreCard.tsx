"use client";

import React from "react";
import { useRouter } from "next/navigation";
// Import useRouter for navigation
import { HeartIcon, MapPinIcon, StarIcon } from "lucide-react";
import { Store } from "~~/schemas/storeSchema";

type StoreCardProps = {
  store: Store;
  isFavorite: boolean;
  toggleFavorite: (storeId: string) => void;
};

const StoreCard: React.FC<StoreCardProps> = ({ store, isFavorite, toggleFavorite }) => {
  const router = useRouter(); // Initialize useRouter

  const navigateToStore = () => {
    router.push(`/stores/${store.id}`); // Navigate to the store details page
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
      {/* Store Image */}
      <div className="relative h-48">
        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
        <button
          onClick={() => toggleFavorite(String(store.id))}
          className="absolute top-2 right-2 p-2 rounded-full bg-secondary shadow-md"
        >
          <HeartIcon className={`h-6 w-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-base-content"}`} />
        </button>
      </div>

      {/* Store Details */}
      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-2 cursor-pointer text-orange-500 hover:underline"
          onClick={navigateToStore} // Attach click handler for navigation
        >
          {store.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="text-sm">
            {store.rating} ({store.reviews} reviews)
          </span>
        </div>
        <div className="flex items-center gap-2 text-base-content">
          <MapPinIcon className="h-5 w-5" />
          <span className="text-sm">{store.address}</span>
        </div>
        <div className="mt-2 flex justify-between items-center text-sm text-base-content">
          <span>{store.distance}</span>
          <span>Available until {store.availableUntil}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
