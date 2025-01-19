'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to the landing page if not authenticated
    }
  }, [status, router]); // Dependency on status and router to trigger the redirect when necessary

  // Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>; // You can customize this with a spinner or any loading state
  }

  // If the user is authenticated, render the dashboard
  return (
    <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-semibold text-white">
            Welcome to your Dashboard, {session?.user?.email}
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/" })} // Optionally redirect to landing page after sign-out
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Sign out
        </button>
    </div>
  );
}
