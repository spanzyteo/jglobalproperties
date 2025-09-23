"use client"

import { ReactNode } from "react"
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../store";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";

export default function ClientProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="bg-[#F2F2F2] w-full">
        <Sidebar />
        <MobileSidebar />
        <Header />
        {children}
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Provider>
  );
}