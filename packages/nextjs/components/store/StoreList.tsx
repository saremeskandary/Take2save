"use client";

import React, { useState } from "react";
import { HeartIcon, MapPinIcon, StarIcon } from "lucide-react";

type Store = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  availableUntil: string;
};

const DUMMY_STORES: Store[] = [
  {
    id: "1",
    name: "PÃO DE AÇÚCAR - MARQUES DE ABRANTES",
    image: "https://placehold.co/300x200",
    rating: 4.8,
    reviews: 142,
    distance: "1.5km",
    address: "Rua Marques de Abrantes, 165",
    availableUntil: "20:00",
  },
  // Add more dummy data as needed
];

const StoreList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredStores = DUMMY_STORES.filter(store => store.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleFavorite = (storeId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(storeId)) {
        newFavorites.delete(storeId);
      } else {
        newFavorites.add(storeId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search stores..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Store List */}
      <div className="space-y-4">
        {filteredStores.map(store => (
          <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Store Image */}
            <div className="relative h-48">
              <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleFavorite(store.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
              >
                <HeartIcon
                  className={`h-6 w-6 ${favorites.has(store.id) ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                />
              </button>
            </div>

            {/* Store Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{store.name}</h3>

              <div className="flex items-center gap-2 mb-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">
                  {store.rating} ({store.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="h-5 w-5" />
                <span className="text-sm">{store.address}</span>
              </div>

              <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                <span>{store.distance}</span>
                <span>Available until {store.availableUntil}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
