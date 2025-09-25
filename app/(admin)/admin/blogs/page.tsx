/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

type BlogsImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

type BlogTag = {
  id: string;
  name: string;
};

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type BlogsType = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  viewCount: number;
  category: BlogCategory;
  tags: BlogTag[];
  images: BlogsImage[];
  totalComments: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string
};

type ApiResponse = {
  success: boolean;
  data: {
    blogs: BlogsType[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
};
const Blogs = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogsType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://jglobalproperties-api.onrender.com/api/v1/blogs/admin?search=${search}&page=${page}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        console.log("Blogs data:", data);

        setBlogs(data.blogs);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching blogs";
        console.error(message);
        toast.error(message);
      }
    };

    fetchBlogs();
  }, [search, page]);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this blog?")) {
        return;
      }

      await axios.delete(
        `https://jglobalproperties-api.onrender.com/api/v1/blogs/${id}`,
        {
          withCredentials: true,
        }
      );

      setBlogs((prev) => prev.filter((item) => item.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting blog";
      toast.error(message);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
          <h1 className="font-semibold sm:text-xl text-lg">Blogs List</h1>
          <button
            onClick={() => router.push("/admin/add-new-lands")}
            className="px-7 py-2 bg-[#941A1A] rounded-[5px] text-white text-[13px] font-semibold hover:opacity-75 active:opacity-60 transition-all duration-500 ease-in-out cursor-pointer"
          >
            Add Blogs
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Total: {blogs.length} blogs
          </div>
          <div>
            <label className="mr-3">Search</label>
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              title="search"
              className="border bg-inherit border-black focus:outline-none pl-2 h-[35px] w-[150px] rounded-[4px]"
            />
          </div>
        </div>

        <div className="mt-8 overflow-x-auto relative">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <ThreeCircles
                visible={true}
                height="50"
                width="50"
                color="#000000"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">No Blog found</p>
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200 rounded-[6px] text-[#4A5568]">
                  <th className="px-4 py-2 whitespace-nowrap">Title</th>
                  <th className="px-4 py-2 whitespace-nowrap">Excerpt</th>
                  <th className="px-4 py-2 whitespace-nowrap">Content</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">View Count</th>
                  <th className="px-4 py-2 whitespace-nowrap">Category</th>
                  <th className="px-4 py-2 whitespace-nowrap">Tags</th>
                  <th className="px-4 py-2 whitespace-nowrap">Images</th>
                  <th className="px-4 py-2 whitespace-nowrap">
                    Total Comments
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap">Created At</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((item) => (
                  <tr
                    key={item.id}
                    className="even:bg-white odd:bg-[#F2F2F2] border-b"
                  >
                    <td className="px-4 py-3">
                      <h1 className="text-md text-[#4A5568] font-medium">
                        {truncateText(item.title, 3)}
                      </h1>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] max-w-[200px]">
                        {item.excerpt}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {truncateText(item.content, 10)}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {item.status}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">{item.viewCount}</p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {item.category.name}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      {item.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">
                          No tags
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.images.length > 0 ? (
                          <div className="flex -space-x-2">
                            {item.images.slice(0, 3).map((image, index) => (
                              <div key={image.id} className="relative">
                                <Image
                                  width={40}
                                  height={40}
                                  src={image.url}
                                  alt={
                                    image.caption || `Land image ${index + 1}`
                                  }
                                  className="h-10 w-10 object-cover rounded-full border-2 border-white"
                                  unoptimized
                                />
                              </div>
                            ))}
                            {item.images.length > 3 && (
                              <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                                +{item.images.length - 3}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              No img
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {item.totalComments}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/lands/${item.id}`}>
                          <MdOutlineRemoveRedEye className="h-5 w-5 text-purple-400 hover:text-purple-300 cursor-pointer" />
                        </Link>
                        <Link href={`/admin/lands/edit/${item.id}`}>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              Previous
            </button>

            <span className="px-4 py-1 text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
