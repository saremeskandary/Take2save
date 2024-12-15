import { MapPin, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";

export default function Header() {
  return (
    <div className="sticky top-0 bg-base-100 z-10 px-4 pt-2 pb-4 space-y-3 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-error" />
          <div>
            <p className="text-sm font-medium">93 St. Patrick's Ave.</p>
            <p className="text-xs text-base-content/60">7A</p>
          </div>
        </div>
        <ShoppingBag className="h-6 w-6" />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/60" />
        <input
          type="text"
          placeholder="Busque por estabelecimentos"
          className="input input-bordered w-full pl-9 bg-base-200"
        />
        <button className="btn btn-ghost btn-circle absolute right-2 top-1/2 transform -translate-y-1/2">
          <SlidersHorizontal className="h-4 w-4 text-base-content/60" />
        </button>
      </div>
    </div>
  );
}
