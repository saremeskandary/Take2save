"use client";

import React, { useState } from "react";
import { DUMMY_STORES } from "./DUMMY_STORES";
import StoreCard from "./StoreCard";

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
          className="input w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Store List */}
      <div className="space-y-4">
        {filteredStores.map(store => (
          <StoreCard
            key={store.id}
            store={store}
            isFavorite={favorites.has(String(store.id))}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
