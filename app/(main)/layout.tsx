import ClientProvider from "./components/ClientProvider";
import "../globals.css";
export const metadata = {
  title: "jglobalproperties",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <main>{children}</main>
    </ClientProvider>
  );
}
