"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, CreditCard, MapPin, Wallet } from "lucide-react";

type DeliveryMethod = "pickup" | "delivery";
type PaymentMethod = "credit" | "pix";

export default function OrderPage() {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");

  const handlePlaceOrder = () => {
    router.push("/stores/[storeId]/order/confirmation");
  };

  return (
    <div className="max-w-2xl mx-auto pb-32">
      {/* Order Header */}
      <div className="bg-base-100 p-4 shadow-sm mb-4">
        <h1 className="text-xl font-bold">Order Review</h1>
      </div>

      {/* Order Items */}
      <div className="bg-base-100 p-4 mb-4">
        <h2 className="font-semibold mb-3">Your Bag</h2>
        <div className="border rounded-lg p-3">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">1x Panificação - MISTA</p>
              <p className="text-sm text-base-content">Mista surpresa para consumo imediato</p>
            </div>
            <span className="font-semibold">R$ 23,22</span>
          </div>
        </div>
      </div>

      {/* Delivery Method */}
      <div className="bg-base-100 p-4 mb-4">
        <h2 className="font-semibold mb-3">Delivery Method</h2>
        <div className="space-y-2">
          <button
            className={`w-full p-3 rounded-lg border ${
              deliveryMethod === "pickup" ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
            onClick={() => setDeliveryMethod("pickup")}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <div className="text-left">
                  <p className="font-medium">Store Pickup</p>
                  <p className="text-sm text-base-content">Today • 09:00 - 20:00</p>
                </div>
              </div>
              <span className="font-medium text-green-600">Free</span>
            </div>
          </button>

          <button
            className={`w-full p-3 rounded-lg border ${
              deliveryMethod === "delivery" ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
            onClick={() => setDeliveryMethod("delivery")}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-500" />
                <div className="text-left">
                  <p className="font-medium">Home Delivery</p>
                  <p className="text-sm text-base-content">30-45 min</p>
                </div>
              </div>
              <span className="font-medium">R$ 5,99</span>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-base-100 p-4 mb-4">
        <h2 className="font-semibold mb-3">Payment Method</h2>
        <div className="space-y-2">
          <button
            className={`w-full p-3 rounded-lg border ${
              paymentMethod === "credit" ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
            onClick={() => setPaymentMethod("credit")}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Credit Card</span>
            </div>
          </button>

          <button
            className={`w-full p-3 rounded-lg border ${
              paymentMethod === "pix" ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
            onClick={() => setPaymentMethod("pix")}
          >
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-orange-500" />
              <span className="font-medium">PIX</span>
            </div>
          </button>
        </div>
      </div>

      {/* Order Total and Submit */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">R$ {(23.22 + (deliveryMethod === "delivery" ? 5.99 : 0)).toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
