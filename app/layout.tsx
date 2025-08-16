import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./components/ClientProvider";

export const metadata: Metadata = {
  title: "Jglobalproperties",
  description: "Leveraging Real Estate Market Opportunities",
  icons: {
    icon: '/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
