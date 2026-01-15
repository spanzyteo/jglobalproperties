/**
 * Overview Section - Reusable Markdown Editor
 * Located at: app/(admin)/admin/lands/features/components/OverviewSection.tsx
 */

"use client";

import React from "react";
import MDEditor from "@uiw/react-markdown-editor";

interface OverviewSectionProps {
  overview: string;
  onOverviewChange: (value: string) => void;
  readOnly?: boolean;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  overview,
  onOverviewChange,
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-0">
      <h1 className="font-semibold text-[#4A5568]">Overview</h1>
      <div className="lg:w-[539px] w-full">
        {readOnly ? (
          <div className="border border-[#EFEFEF] bg-[#F9F9F6] rounded-[5px] p-3 min-h-[300px]">
            <MDEditor.Markdown source={overview} />
          </div>
        ) : (
          <MDEditor
            value={overview}
            height="300"
            onChange={(val) => onOverviewChange(val || "")}
          />
        )}
      </div>
    </div>
  );
};
