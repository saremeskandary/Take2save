"use client";

import { Coins } from "lucide-react";

export default function TokenBalance() {
  return (
    <div className="card mx-4 mt-4 bg-gradient-to-r from-error to-error-content text-primary-content">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium opacity-90">Your Token Balance</h2>
            <p className="text-2xl font-bold">15 Tokens</p>
          </div>
          <Coins className="h-8 w-8 opacity-90" />
        </div>
      </div>
    </div>
  );
}
