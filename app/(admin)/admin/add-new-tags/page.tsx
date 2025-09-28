/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddNewTags = () => {
  const router = useRouter();

  // Category information
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        name: name.trim(),
      };

      const response = await axios.post(
        "https://jglobalproperties-api.onrender.com/api/v1/tags",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Tag added successfully!");
        router.push("/admin/tags");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while adding the tag";
      toast.error(message);
    }
  };
 return (
   <div className="bg-white flex flex-col pb-[3rem]">
     <form onSubmit={handleSubmit}>
       <div className="xl:ml-[27rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[777px] rounded-xl mx-auto mb-8 pb-8">
         <h1 className="text-xl font-semibold mt-4">Tag Information</h1>

         {/* Name */}
         <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
           <h1 className="font-semibold text-[#4A5568]">Name</h1>
           <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             placeholder="Tag name"
             className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
             required
           />
         </div>

         {/* Info Note */}
         <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
           <p className="text-sm text-blue-700">
             <strong>Note:</strong> The category slug will be automatically
             generated from the name.
           </p>
         </div>
       </div>

       <button
         type="submit"
         disabled={loading}
         className="bg-[#941A1A] flex items-center justify-center h-[40px] w-[140px] text-white rounded-[5px] mb-10 text-[14px] font-semibold xl:ml-[27rem] mx-auto hover:opacity-75 active:opacity-55 transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
       >
         {loading ? "Submitting..." : "Submit"}
       </button>
     </form>
   </div>
 );
};

export default AddNewTags;
