"use client";

import { ArrowLeft, ShoppingBag } from "lucide-react";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button onClick={() => window.history.back()} className="mr-4">
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">Food to Save</span>
              </div>
            </div>
            <RainbowKitCustomConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around max-w-7xl mx-auto">
          <button className="text-orange-500 flex flex-col items-center">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs mt-1">Stores</span>
          </button>
          {/* Add more navigation items as needed */}
        </div>
      </nav>
    </div>
  );
}
