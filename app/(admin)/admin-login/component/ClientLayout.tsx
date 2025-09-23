'use client'
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      {children}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}