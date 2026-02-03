import React from "react";
import Editor from "@/app/(admin)/admin/components/editor/TipTapEditor";

interface BasicInfoSectionProps {
  title: string;
  setTitle: (value: string) => void;
  overview: string;
  setOverview: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  metaTitle: string;
  setMetaTitle: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
}

const statusOptions = [
  { value: "FOR_SALE", label: "For Sale" },
  { value: "SOLD", label: "Sold" },
  { value: "RESERVED", label: "Reserved" },
  { value: "DRAFT", label: "Draft" },
];

const FormField: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
    <h1 className="font-semibold text-[#4A5568] lg:w-32">{label}</h1>
    {children}
  </div>
);

const TextInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}> = ({ value, onChange, placeholder, required = false }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
    required={required}
  />
);

const SelectInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}> = ({ value, onChange, options, required = false }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 rounded-[5px] text-[#4A5568] pl-3"
    required={required}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  title,
  setTitle,
  overview,
  setOverview,
  location,
  setLocation,
  state,
  setState,
  country,
  setCountry,
  status,
  setStatus,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <FormField label="Title">
        <TextInput
          value={title}
          onChange={setTitle}
          placeholder="Land title"
          required
        />
      </FormField>

      {/* Overview */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
        <h1 className="font-semibold text-[#4A5568] lg:w-32">Overview</h1>
        <div className="lg:w-134.75 w-full">
          <Editor value={overview} onChange={(val) => setOverview(val || "")} />
        </div>
      </div>

      {/* Location */}
      <FormField label="Location">
        <TextInput
          value={location}
          onChange={setLocation}
          placeholder="e.g., Victoria Island"
          required
        />
      </FormField>

      {/* State */}
      <FormField label="State">
        <TextInput
          value={state}
          onChange={setState}
          placeholder="e.g., Lagos"
          required
        />
      </FormField>

      {/* Country */}
      <FormField label="Country">
        <TextInput
          value={country}
          onChange={setCountry}
          placeholder="Country"
          required
        />
      </FormField>

      {/* Status */}
      <FormField label="Status">
        <SelectInput
          value={status}
          onChange={setStatus}
          options={statusOptions}
          required
        />
      </FormField>

      {/* Meta Title */}
      <FormField label="Meta Title">
        <TextInput
          value={metaTitle}
          onChange={setMetaTitle}
          placeholder="SEO meta title (optional)"
        />
      </FormField>

      {/* Meta Description */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
        <h1 className="font-semibold text-[#4A5568] lg:w-32">
          Meta Description
        </h1>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="SEO meta description (optional)"
          rows={3}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
