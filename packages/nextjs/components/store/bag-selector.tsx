"use client";

import { useState } from "react";

const bagTypes = ["Bakery", "Supermarket", "Groceries", "Restaurant"];
const flavors = ["Sweet", "Salty", "Mixed"];

export default function BagSelector() {
  const [selectedType, setSelectedType] = useState(bagTypes[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Select Your Surprise Bag</h2>
      <div className="tabs tabs-boxed mb-4">
        {bagTypes.map(type => (
          <a
            key={type}
            className={`tab ${selectedType === type ? "tab-active bg-warning" : "bg-accent"}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </a>
        ))}
      </div>
      <div className="flex gap-4">
        {flavors.map(flavor => (
          <div key={flavor} className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="flavor"
                className="radio checked:bg-primary"
                checked={selectedFlavor === flavor}
                onChange={() => setSelectedFlavor(flavor)}
              />
              <span className="label-text ml-2">{flavor}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
