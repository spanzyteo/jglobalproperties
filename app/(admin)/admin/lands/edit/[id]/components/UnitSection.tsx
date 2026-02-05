/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MdAdd, MdClose } from "react-icons/md";

export interface LandUnit {
  id?: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
}

interface UnitsSectionProps {
  units: LandUnit[];
  setUnits: (units: LandUnit[]) => void;
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

  const updateUnit = (index: number, field: keyof LandUnit, value: any) => {
    setUnits(
      units.map((unit, i) =>
        i === index ? { ...unit, [field]: value } : unit,
      ),
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={addUnit}
          className="flex items-center gap-2 px-4 py-2 bg-[#941A1A] text-white rounded hover:bg-[#7a1515] transition-colors text-sm font-medium"
        >
          <MdAdd className="h-5 w-5" />
          Add Unit
        </button>
      </div>

      <div className="space-y-4">
        {units.map((unit, index) => (
          <div
            key={index}
            className="border border-[#EFEFEF] rounded-lg p-6 bg-white hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
              <h3 className="font-semibold text-[#4A5568]">
                Unit #{index + 1}
              </h3>
              {units.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUnit(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                  title="Remove unit"
                >
                  <MdClose className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Size */}
              <div>
                <label className="block text-sm font-semibold text-[#4A5568] mb-2">
                  Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={unit.size || ""}
                  onChange={(e) =>
                    updateUnit(index, "size", parseFloat(e.target.value) || 0)
                  }
                  placeholder="e.g., 1000"
                  className="w-full border border-[#EFEFEF] bg-[#F9F9F6] rounded px-3 py-2.5 focus:outline-none focus:border-[#941A1A] focus:ring-1 focus:ring-[#941A1A] transition-colors text-[#4A5568]"
                  required
                />
              </div>

              {/* Unit Type */}
              <div>
                <label className="block text-sm font-semibold text-[#4A5568] mb-2">
                  Unit Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={unit.unit}
                  onChange={(e) => updateUnit(index, "unit", e.target.value)}
                  className="w-full border border-[#EFEFEF] bg-[#F9F9F6] rounded px-3 py-2.5 focus:outline-none focus:border-[#941A1A] focus:ring-1 focus:ring-[#941A1A] transition-colors cursor-pointer text-[#4A5568]"
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
                <label className="block text-sm font-semibold text-[#4A5568] mb-2">
                  Price (₦) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={unit.price}
                  onChange={(e) => updateUnit(index, "price", e.target.value)}
                  placeholder="e.g., 2400000"
                  className="w-full border border-[#EFEFEF] bg-[#F9F9F6] rounded px-3 py-2.5 focus:outline-none focus:border-[#941A1A] focus:ring-1 focus:ring-[#941A1A] transition-colors text-[#4A5568]"
                  required
                />
              </div>

              {/* Available */}
              <div>
                <label className="block text-sm font-semibold text-[#4A5568] mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={unit.available.toString()}
                  onChange={(e) =>
                    updateUnit(index, "available", e.target.value === "true")
                  }
                  className="w-full border border-[#EFEFEF] bg-[#F9F9F6] rounded px-3 py-2.5 focus:outline-none focus:border-[#941A1A] focus:ring-1 focus:ring-[#941A1A] transition-colors cursor-pointer text-[#4A5568]"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitsSection;
