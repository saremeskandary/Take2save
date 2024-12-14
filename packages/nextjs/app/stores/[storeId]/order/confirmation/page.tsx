"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Home, MapPin, MessageSquare } from "lucide-react";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleHomeClick = () => {
    router.push("/stores");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Success Message */}
      <div className="text-center mb-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order confirmed!</h1>
        <p className="text-base-content">Order #475601</p>
      </div>

      {/* Pickup Time */}
      <div className="bg-base-100 rounded-lg p-4 shadow-sm mb-4">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-orange-500 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Pickup time</h3>
            <p className="text-base-content">09:00 - 20:00</p>
            <p className="text-xs text-gray-500 mt-1">today, 13/12/2024</p>
          </div>
        </div>
      </div>

      {/* Pickup Location */}
      <div className="bg-base-100 rounded-lg p-4 shadow-sm mb-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-orange-500 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Pickup location</h3>
            <p className="text-base-content">PÃO DE AÇÚCAR - MARQUES DE ABRANTES</p>
            <p className="text-sm text-gray-500">Rua Marques de Abrantes, 165</p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-base-100 rounded-lg p-4 shadow-sm mb-6">
        <h3 className="font-semibold mb-3">Order details</h3>
        <div className="border-b border-gray-200 pb-3 mb-3">
          <div className="flex justify-between mb-1">
            <span>1x Panificação - MISTA</span>
            <span className="font-medium">R$ 23,22</span>
          </div>
          <p className="text-sm text-base-content">Mista surpresa para consumo imediato</p>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold">R$ 23,22</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => setShowSupportModal(true)}
          className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-full"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Issues with your order?</span>
        </button>
        <button
          onClick={handleHomeClick}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-full"
        >
          <Home className="h-5 w-5" />
          <span>Back to Stores</span>
        </button>
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-base-100 rounded-lg p-6 max-w-sm w-full">
            <h3 className="font-bold text-lg mb-4">Contact Support</h3>
            <p className="text-base-content mb-4">
              Our support team will help you with any issues regarding your order.
            </p>
            <div className="space-y-4">
              <a
                href="tel:+1234567890"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-full"
              >
                Call Support
              </a>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-full py-2 px-4 border border-gray-300 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
