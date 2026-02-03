/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MdAdd, MdClose } from "react-icons/md";

export interface HouseUnit {
  id?: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
}

interface UnitsSectionProps {
  units: HouseUnit[];
  setUnits: (units: HouseUnit[]) => void;
}

const unitOptions = ["sqm", "acres", "hectares", "plots"];

const UnitsSection: React.FC<UnitsSectionProps> = ({ units, setUnits }) => {
  const addUnit = () => {
    setUnits([...units, { size: 0, unit: "sqm", price: "", available: true }]);
  };

  const removeUnit = (index: number) => {
    if (units.length > 1) {
      setUnits(units.filter((_, i) => i !== index));
    }
  };

  const updateUnit = (index: number, field: keyof HouseUnit, value: any) => {
    setUnits(
      units.map((unit, i) =>
        i === index ? { ...unit, [field]: value } : unit,
      ),
    );
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#4A5568]">House Units</h2>
        <button
          type="button"
          onClick={addUnit}
          className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          <MdAdd className="h-4 w-4" />
          Add Unit
        </button>
      </div>

      {units.map((unit, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-white"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-700">Unit #{index + 1}</h3>
            {units.length > 1 && (
              <button
                type="button"
                onClick={() => removeUnit(index)}
                className="text-red-500 hover:text-red-700"
              >
                <MdClose className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="number"
                value={unit.size || ""}
                onChange={(e) =>
                  updateUnit(index, "size", parseFloat(e.target.value) || 0)
                }
                placeholder="e.g., 1000"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Unit Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Type
              </label>
              <select
                value={unit.unit}
                onChange={(e) => updateUnit(index, "unit", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                {unitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₦)
              </label>
              <input
                type="text"
                value={unit.price}
                onChange={(e) => updateUnit(index, "price", e.target.value)}
                placeholder="e.g., 2400000"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Available */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available
              </label>
              <select
                value={unit.available.toString()}
                onChange={(e) =>
                  updateUnit(index, "available", e.target.value === "true")
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnitsSection;
