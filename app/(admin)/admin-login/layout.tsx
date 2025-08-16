import "../../globals.css";
import type { Metadata } from "next";
import ClientLayout from "./component/ClientLayout";
export const metadata: Metadata = {
  title: "jglobalproperties | Admin",
  description: "Login to the admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <main>{children}</main>
    </ClientLayout>
  );
}
