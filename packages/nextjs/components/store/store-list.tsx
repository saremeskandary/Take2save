"use client";

import { useState } from "react";
import Image from "next/image";
import PurchaseDialog from "./purchase-dialog";
import { Heart } from "lucide-react";

const stores = [
  {
    id: 1,
    name: "KWIK-E-MART",
    type: "Supermarket",
    rating: 4.0,
    distance: "0.4 km",
    hours: "08:00 às 20:00",
    originalPrice: "R$ 45,26",
    price: "R$ 22,63",
    delivery: "R$ 5,99",
    image: "/placeholder.svg?height=80&width=80",
    bags: 5,
    pickup: true,
    tokenReward: 5,
  },
  {
    id: 2,
    name: "LOS POLLOS HERMANOS",
    type: "Restaurant",
    rating: 4.4,
    distance: "0.5 km",
    hours: "08:00 às 19:00",
    originalPrice: "R$ 45,00",
    price: "R$ 22,99",
    image: "/placeholder.svg?height=80&width=80",
    bags: 5,
    topSaver: true,
    pickup: true,
    tokenReward: 5,
  },
  {
    id: 3,
    name: "DELHI' STAR",
    type: "Bakery",
    rating: 3.4,
    distance: "0.6 km",
    hours: "08:00 às 23:00",
    originalPrice: "R$ 45,00",
    price: "R$ 22,99",
    image: "/placeholder.svg?height=80&width=80",
    bags: 4,
    pickup: true,
    tokenReward: 5,
  },
];

export default function StoreList() {
  const [selectedStore, setSelectedStore] = useState<(typeof stores)[0] | null>(null);

  return (
    <>
      <div className="space-y-4 p-4">
        {stores.map(store => (
          <div key={store.id} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image src={store.image} alt={store.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm">{store.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <span className="text-sm text-warning">★</span>
                          <span className="text-sm ml-1">{store.rating}</span>
                        </div>
                        {store.topSaver && <span className="badge badge-warning badge-sm text-xs">#TOPSAVER</span>}
                        <span className="text-sm text-base-content/60">•</span>
                        <span className="text-sm text-base-content/60">{store.type}</span>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-circle">
                      <Heart className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                      <span>🕒 {store.hours}</span>
                      <span>•</span>
                      <span>{store.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-error badge-sm">🛍️ {store.bags}+</span>
                      <span className="text-sm line-through text-base-content/60">{store.originalPrice}</span>
                      <span className="text-sm font-semibold">{store.price}</span>
                    </div>
                    <div className="flex gap-2">
                      {store.pickup && <span className="badge badge-outline badge-sm">📦 retire hoje</span>}
                      {store.delivery && (
                        <span className="badge badge-outline badge-sm">🚲 entrega • {store.delivery}</span>
                      )}
                    </div>
                    <button className="btn btn-error btn-block mt-2" onClick={() => setSelectedStore(store)}>
                      Purchase Bag • +{store.tokenReward} Tokens
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedStore && (
        <PurchaseDialog
          isOpen={!!selectedStore}
          onClose={() => setSelectedStore(null)}
          storeName={selectedStore.name}
          price={selectedStore.price}
          tokenReward={selectedStore.tokenReward}
        />
      )}
    </>
  );
}
