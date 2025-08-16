'use client'
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

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
        <ThreeCircles
          visible={true}
          height="50"
          width="50"
          color={`${"#000000"}`}
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return <>{children}</>;
}
