/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Units Section - Reusable for Add/Edit/View
 * Located at: app/(admin)/admin/lands/features/components/UnitsSection.tsx
 */

"use client";

import React from "react";
import { MdClose, MdAdd } from "react-icons/md";
import { Unit } from "../types";
import { UNIT_OPTIONS } from "../constants";

interface UnitsSectionProps {
  units: Unit[];
  onAddUnit: () => void;
  onRemoveUnit: (index: number) => void;
  onUpdateUnit: (index: number, field: keyof Unit, value: any) => void;
  readOnly?: boolean;
}

export const UnitsSection: React.FC<UnitsSectionProps> = ({
  units,
  onAddUnit,
  onRemoveUnit,
  onUpdateUnit,
  readOnly = false,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[#4A5568]">Units/Specifications</h1>
        {!readOnly && (
          <button
            type="button"
            onClick={onAddUnit}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <MdAdd className="h-5 w-5" />
            Add Unit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {units.map((unit, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white space-y-3"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700">Unit {index + 1}</h3>
              {!readOnly && units.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveUnit(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdClose className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                {readOnly ? (
                  <p className="text-gray-700">{unit.size}</p>
                ) : (
                  <input
                    type="number"
                    value={unit.size}
                    onChange={(e) =>
                      onUpdateUnit(
                        index,
                        "size",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                )}
              </div>

              {/* Unit Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Type
                </label>
                {readOnly ? (
                  <p className="text-gray-700">{unit.unit}</p>
                ) : (
                  <select
                    value={unit.unit}
                    onChange={(e) =>
                      onUpdateUnit(index, "unit", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {UNIT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                {readOnly ? (
                  <p className="text-gray-700">₦{unit.price}</p>
                ) : (
                  <input
                    type="text"
                    value={unit.price}
                    onChange={(e) =>
                      onUpdateUnit(index, "price", e.target.value)
                    }
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                )}
              </div>

              {/* Available */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={unit.available}
                    onChange={(e) =>
                      onUpdateUnit(index, "available", e.target.checked)
                    }
                    disabled={readOnly}
                    className="w-4 h-4 text-blue-600 rounded disabled:opacity-50"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Available
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
