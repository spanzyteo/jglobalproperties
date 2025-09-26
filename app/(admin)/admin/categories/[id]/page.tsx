/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { ThreeCircles } from "react-loader-spinner";
import { MdArrowBack } from "react-icons/md";

type CategoriesType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    blogs: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: CategoriesType;
};

const CategoriesId = () => {
  return <div>page</div>;
};

export default CategoriesId;
