'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import RegForm from "../components/RegForm";

export default function SignupForm({ params: initialParams }) {
  const [params, setParams] = useState(null); // State to store unwrapped params

  // Unwrap the params with useEffect
  useEffect(() => {
    async function fetchParams() {
      const unwrappedParams = await initialParams; // Await the promise
      setParams(unwrappedParams); // Store the unwrapped params
    }
    fetchParams();
  }, [initialParams]);

  // Loading state until params are resolved
  if (!params) {
    return <div>Loading...</div>;
  }

  const mode = params.mode;

  return (
    <div className="min-h-screen bg-[#0a041d] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-8">
        <div className="space-y-6 max-w-[400px]">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium">
              {mode === "signup" ? "Create an account" : "Sign in to your account"}
            </h1>
            <p className="text-gray-400">
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link
                href={mode === "signup" ? "/signin" : "/signup"}
                className="text-blue-500 hover:underline"
              >
                {mode === "signup" ? "Sign in" : "Sign up"}
              </Link>
            </p>
          </div>
          <RegForm
            mode={mode}
          />
        </div>

        <div className="hidden lg:block">
          <div className="h-full w-full rounded-[2rem] border border-gray-800"></div>
        </div>
      </div>
    </div>
  );
}
