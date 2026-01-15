/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa"; // For Lands
import { HiOutlineDocumentText } from "react-icons/hi"; // For Blogs
import { BiCategory } from "react-icons/bi"; // For Categories
import { FaHome } from "react-icons/fa"; // For Houses
import { MdOutlineRateReview } from "react-icons/md"; // For Reviews
import { FaTags } from "react-icons/fa"; // For Tags
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  const [reviews, setReviews] = useState([]);
  const [lands, setLands] = useState([]);
  const [houses, setHouses] = useState([]);
  const [categories, setCategories] = useState([])
  const [blogs, setBlogs] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.jglobalproperties.com/api/v1/reviews",
          { withCredentials: true }
        );

        const { data } = response.data;
        setReviews(data.reviews || data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching reviews";
        toast.error(message);
      }
    };
    fetchReviews();
  }, []);
  useEffect(() => {
    const fetchLands = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.jglobalproperties.com/api/v1/lands",
          { withCredentials: true }
        );

        const { data } = response.data;
        setLands(data.lands || data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching lands";
        toast.error(message);
      }
    };
    fetchLands();
  }, []);
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jglobalproperties-api.onrender.com/api/v1/houses",
          { withCredentials: true }
        );

        const { data } = response.data;
        setHouses(data.house || data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching houses";
        toast.error(message);
      }
    };
    fetchHouses();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jglobalproperties-api.onrender.com/api/v1/categories",
          { withCredentials: true }
        );

        const { data } = response.data;
        setCategories(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching categories";
        toast.error(message);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jglobalproperties-api.onrender.com/api/v1/blogs",
          { withCredentials: true }
        );

        const { data } = response.data;
        setBlogs(data.blogs);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching blogs";
        toast.error(message);
      }
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jglobalproperties-api.onrender.com/api/v1/tags",
          { withCredentials: true }
        );

        const { data } = response.data;
        setTags(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching tags";
        toast.error(message);
      }
    };
    fetchTags();
  }, []);
  return (
    <div className="bg-white flex flex-col pb-[5rem]">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 mt-8 xl:ml-[20rem] lg:gap-4 gap-4"
        data-testid="dashboard-container"
      >
        {/* Total Lands */}
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#10B981]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Lands</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {lands.length}
              </h1>
            </div>
          </div>
          <div className="bg-[#10B9811A] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <FaMapMarkedAlt
              className="h-[30px] w-[30px] text-[#10B981]"
              data-testid="icon-lands"
            />
          </div>
        </div>

        {/* Total Blogs */}
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#3B82F6]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Blogs</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {blogs?.length}
              </h1>
            </div>
          </div>
          <div className="bg-[#3B82F61A] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <HiOutlineDocumentText
              className="h-[30px] w-[30px] text-[#3B82F6]"
              data-testid="icon-blogs"
            />
          </div>
        </div>

        {/* Total Categories */}
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#8B5CF6]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Categories</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {categories?.length}
              </h1>
            </div>
          </div>
          <div className="bg-[#8B5CF61A] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <BiCategory
              className="h-[30px] w-[30px] text-[#8B5CF6]"
              data-testid="icon-categories"
            />
          </div>
        </div>

        {/* Total Houses */}
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#F59E0B]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Houses</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {houses?.length}
              </h1>
            </div>
          </div>
          <div className="bg-[#F59E0B1A] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <FaHome
              className="h-[30px] w-[30px] text-[#F59E0B]"
              data-testid="icon-houses"
            />
          </div>
        </div>

        {/* Total Reviews */}
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#EF4444]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Reviews</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {reviews?.length}
              </h1>
            </div>
          </div>
          <div className="bg-[#EF44441A] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <MdOutlineRateReview
              className="h-[30px] w-[30px] text-[#EF4444]"
              data-testid="icon-reviews"
            />
          </div>
        </div>

        {/* Total Tags */}
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#06B6D4]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Tags</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {tags?.length}
              </h1>
            </div>
          </div>
          <div className="bg-[#06B6D41A] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <FaTags
              className="h-[30px] w-[30px] text-[#06B6D4]"
              data-testid="icon-tags"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
