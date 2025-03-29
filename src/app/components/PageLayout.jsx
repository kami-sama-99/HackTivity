"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";

export default function PageLayout({ content }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change layout if width is less than 768px
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize); // Listen for screen resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className={isMobile ? "flex flex-col" : "grid grid-cols-[1fr_4fr] gap-1 px-6"}>
        <div className={isMobile ? "w-full" : "md:sticky md:top-10 md:w-64"}>
          <Menu />
        </div>
        <div className="w-full">{content}</div>
      </div>
    </div>
  );
}
