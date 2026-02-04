"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileSidebar from "./MobileSidebar";
import { Provider } from "react-redux";
import { store } from "../store";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <div>
        <Navbar />
        <MobileSidebar />
        {children}
        <Footer />
      </div>
    </Provider>
  );
}
