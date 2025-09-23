import type { Metadata } from "next";
import "../../globals.css";
import { ReactNode } from "react";
import ClientProvider from "./components/ClientProvider";

export const metadata: Metadata = {
  title: "JglobalProperties | Admin",
  description: ""
}

export default function RootLayout({
  children,
}: Readonly<{
  children:ReactNode
}>) {
  return (
    <ClientProvider>
      <main>{children}</main>
    </ClientProvider>
  )
}
