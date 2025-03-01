"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "@/app/public/logo/HackTivity logo.png";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Set user if authenticated, otherwise null
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/signin"; // Redirect after logout
  };

  return (
    <nav className="flex justify-between items-center px-4 py-5">
      <div className="flex items-center gap-2 mx-8">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-100"
        />
        <span className="text-white text-xl font-bold">HackTivity</span>
      </div>

      {user ? (
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
    </nav>
  );
}
