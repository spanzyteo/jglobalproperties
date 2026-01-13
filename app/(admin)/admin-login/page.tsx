/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const AdminLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  useEffect(() => {
    if (key !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      notFound();
    }
  }, [key]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const data = response.data;

      if (response.status === 200) {
        toast.success("Login Successful");
        console.log("Login Successful");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An error occurred while logging in";
      toast.error(message);
      console.log(message)
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center mx-auto gap-6">
      <Image
        width={150}
        height={150}
        alt="profile"
        src={"/logo.svg"}
        className="h-[150px] w-[150px] object-cover rounded-full"
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center w-full"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border-2 border-gray-700 md:w-[300px] w-[95%] rounded-[8px] focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border-2 border-gray-700 md:w-[300px] w-[95%] rounded-[8px] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="py-[0.78rem] lg:py-4 px-[1.5rem] lg:px-8 flex items-center justify-center rounded-[0.5rem] bg-[#941A1A] text-[0.78rem] lg:text-[1rem] leading-[1rem] lg:leading-[1.25rem] text-white hover:bg-[#7a1616] transition-colors cursor-pointer w-[95%] md:w-[300px]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
