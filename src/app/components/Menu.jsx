"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react"; // Icons for mobile menu toggle

export default function Menu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Courses", path: "/courses" },
    { name: "Mock Interviews", path: "/mock" },
    { name: "Resume", path: "/resume" },
    { name: "Profile Settings", path: "/profile" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 bg-blue-500 p-2 rounded-lg text-white z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Background Overlay when Mobile Menu is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)} // Close when clicking outside menu
        ></div>
      )}

      {/* Sidebar Menu */}
      <aside
        className={`bg-navy-600 text-gray-200 p-6 rounded-lg shadow-md
        md:w-64 md:h-fit md:sticky md:top-10 md:flex md:flex-col
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-4/5 md:w-64`}
      >
        <nav className="flex flex-col space-y-3">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <button
                className={`w-full font-medium py-2 px-4 rounded-lg transition duration-300 ${
                  pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "text-gray-200 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)} // Close menu on click (mobile)
              >
                {item.name}
              </button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
