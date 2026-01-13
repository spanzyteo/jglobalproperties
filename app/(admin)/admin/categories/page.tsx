/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "@/app/components/shared/Loader";

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
  data: CategoriesType[];
};

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://jglobalproperties-api.onrender.com/api/v1/categories`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;

        setCategories(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching categories";
        console.error(message);
        toast.error(message);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this Category?")) {
        return;
      }

      await axios.delete(
        `https://jglobalproperties-api.onrender.com/api/v1/categories/${id}`,
        {
          withCredentials: true,
        }
      );

      setCategories((prev) => prev.filter((item) => item.id !== id));
      toast.success("Category deleted successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting category";
      toast.error(message);
    }
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-[3rem]">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
        <div className="flex items-center justify-between mt-4">
          <h1 className="font-semibold sm:text-xl text-lg">Categories List</h1>
          <button
            onClick={() => router.push("/admin/add-new-categories")}
            className="px-7 py-2 bg-[#941A1A] rounded-[5px] text-white text-[13px] font-semibold hover:opacity-75 active:opacity-60 transition-all duration-500 ease-in-out cursor-pointer"
          >
            Add Categories
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Total: {categories.length} categories
          </div>
          {/* <div>
            <label className="mr-3">Search</label>
            <input
              type="text"
              placeholder="Search lands..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              title="search"
              className="border bg-inherit border-black focus:outline-none pl-2 h-[35px] w-[150px] rounded-[4px]"
            />
          </div> */}
        </div>

        <div className="mt-8 overflow-x-auto relative">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          ) : categories.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">No Category found</p>
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200 rounded-[6px] text-[#4A5568]">
                  <th className="px-4 py-2 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2 whitespace-nowrap">Description</th>
                  <th className="px-4 py-2 whitespace-nowrap">Blogs</th>
                  <th className="px-4 py-2 whitespace-nowrap">Created At</th>
                  <th className="px-4 py-2 whitespace-nowrap">Updated At</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr
                    key={item.id}
                    className="even:bg-white odd:bg-[#F2F2F2] border-b"
                  >
                    <td className="px-4 py-3">
                      <h1 className="text-md text-[#4A5568] font-medium">
                        {item.name}
                      </h1>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] max-w-[200px]">
                        {truncateText(item.description, 15)}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {item._count.blogs}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/categories/${item.id}`}>
                          <MdOutlineRemoveRedEye className="h-5 w-5 text-purple-400 hover:text-purple-300 cursor-pointer" />
                        </Link>
                        <Link href={`/admin/categories/edit/${item.id}`}>
                          <MdOutlineEdit className="h-5 w-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
                        </Link>
                        <RiDeleteBin5Line
                          onClick={() => handleDelete(item.id)}
                          className="h-5 w-5 text-red-400 hover:text-red-300 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
