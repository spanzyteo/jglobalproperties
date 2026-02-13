"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleNewsletter } from "../../store/sidebarSlice";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

const NewsletterSidebarSection = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  return (
    <div className="w-57.5 flex flex-col gap-3">
      <button
        onClick={() => dispatch(toggleNewsletter())}
        className="flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 -ml-2 transition-all duration-200 w-full"
      >
        <div className="flex items-center gap-3">
          <MdOutlineMailOutline className="h-5 w-5" />
          <h1>Newsletter</h1>
        </div>
        <FiChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            sections.newsletter ? "rotate-180" : ""
          }`}
        />
      </button>
      {sections.newsletter && (
        <div className="flex flex-col gap-1 ml-4">
          <Link
            href={"/admin/newsletter"}
            className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
          >
            Subscribers
          </Link>
          <Link
            href={"/admin/newsletter/compose"}
            className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
          >
            Compose
          </Link>
          <Link
            href={"/admin/newsletter/history"}
            className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
          >
            History
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewsletterSidebarSection;
