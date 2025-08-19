"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div>
    <Navbar />
    {children}
    <Footer />
    </div>;
}
