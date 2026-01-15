/**
 * Overview (Markdown Editor) Section Component
 */

"use client";

import React from "react";
import MDEditor from "@uiw/react-markdown-editor";
import { useAddNewLandState, useAddNewLandActions } from "../hooks";

export const OverviewSection: React.FC = () => {
  const { overview } = useAddNewLandState();
  const { setOverview } = useAddNewLandActions();

  return (
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-0">
      <h1 className="font-semibold text-[#4A5568]">Overview</h1>
      <div className="lg:w-134.75 w-full">
        <MDEditor
          value={overview}
          height="300px"
          onChange={(val) => setOverview(val || "")}
        />
      </div>
    </div>
  );
};
