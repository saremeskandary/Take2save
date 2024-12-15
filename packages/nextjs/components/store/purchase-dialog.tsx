"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  price: string;
  tokenReward: number;
}

export default function PurchaseDialog({ isOpen, onClose, storeName, price, tokenReward }: PurchaseDialogProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPurchasing(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      (document.getElementById("purchase_modal") as HTMLDialogElement)?.showModal();
    } else {
      (document.getElementById("purchase_modal") as HTMLDialogElement)?.close();
    }
  }, [isOpen]);

  return (
    <dialog id="purchase_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Purchase</h3>
        <p className="py-4">You are about to purchase a surprise bag from {storeName}</p>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-70">Price:</span>
            <span className="font-medium">{price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-70">Token Reward:</span>
            <span className="font-medium text-error">+{tokenReward} Tokens</span>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-outline mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={handlePurchase} disabled={isPurchasing}>
              {isPurchasing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Confirm Purchase"
              )}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
