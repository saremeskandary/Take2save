"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to stores page after a delay
    const timer = setTimeout(() => {
      router.push("/stores");
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#FF4D00] flex flex-col items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-white text-5xl font-bold">
            Food
            <br />
            to
            <br />
            Save
          </h1>
        </div>

        {/* Loading indicator */}
        <div className="loading loading-spinner loading-lg text-white"></div>
      </div>
    </main>
  );
}
