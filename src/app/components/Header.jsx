"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/public/logo/HackTivity logo.png";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

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

      {status === "unauthenticated" ? (
        <div className="flex gap-4">
          <Link href="/signin" className="text-white hover:text-green-400">
            Login
          </Link>
          <Link href="/signup" className="text-white hover:text-green-400">
            Sign up
          </Link>
        </div>
      ) : (
        <div className="px-4">
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="text-white hover:text-green-400"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
