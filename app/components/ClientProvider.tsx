'use client'
import { useEffect, useState } from "react";
import Loader from "./shared/Loader";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
