"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react"; // Icons for mobile menu
import logo from "@/app/public/logo/HackTivity logo.png";

export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false); // Track logout process
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true); // Show loading state for logout
    await signOut(auth);
    window.location.href = "/"; // Redirect after logout
  };

  return (
    <nav className="flex justify-between items-center px-4 py-5">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mx-8">
        <Image src={logo} alt="Logo" width={40} height={40} className="rounded-100" />
        <span className="text-white text-xl font-bold">HackTivity</span>
      </div>

      {/* Mobile: Show menu only if signed in */}
      {isMobile && user ? (
        <div className="flex items-center gap-4">
        {/* Logout Button */}
        {!loading && !loggingOut && (
          <button onClick={handleLogout} className="text-white hover:text-green-400">
            Logout
          </button>
        )}
      
        {/* Invisible Placeholder to Maintain Layout */}
        <div className="w-10 h-10"></div>
      </div>
      
      ) : (
        // Desktop: Show logout/login options normally
        <>
          {loading ? null : user && !loggingOut ? (
            <div className="px-4">
              <button onClick={handleLogout} className="text-white hover:text-green-400">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/signin" className="text-white hover:text-green-400">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:text-green-400">
                Sign up
              </Link>
            </div>
          )}
        </>
      )}
    </nav>
  );
}
