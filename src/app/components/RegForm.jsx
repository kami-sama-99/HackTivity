"use client";

import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react"; // Import NextAuth's signIn method
import { useOnboarding } from "@/context/OnboardingContext";

export default function RegForm({ mode }) {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const router = useRouter();

  const { onboarding } = useOnboarding();
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        // Create the user in Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        // Sign out immediately to prevent login before verification
        await signOut(auth);

        setInfo("Verification email sent! Please verify your email to continue.");
        console.log("Verification email sent:", user);
      } else if (mode === "signin") {
        // Sign in with NextAuth (this will trigger the 'authorize' method)
        const res = await signIn("credentials", {
          redirect: false,
          email: email.current.value,
          password: password.current.value,
          callbackUrl: onboarding ? "/dashboard" : "/onboarding"
        });

        if (res.error) {
          setError(res.error);
        }
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    try {
      const res = await signIn(provider, { 
        redirect: false,
        callbackUrl: onboarding ? "/dashboard" : "/onboarding",
      });
      if (res?.error) {
        setError(`OAuth sign-in failed: ${res.error}`);
      }
    } catch (error) {
      setError(error.message);
      console.error("OAuth Sign-In Error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-red-400">{error}</p>
      <p className="text-green-400">{info}</p>

      {mode === "signup" && (
        <>
          <input
            name="email"
            type="email"
            placeholder="Email"
            ref={email}
            className="bg-white text-black h-12 w-full rounded-sm px-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            ref={password}
            className="bg-white text-black h-12 w-full rounded-sm px-2"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
            className="bg-white text-black h-12 w-full rounded-sm px-2"
          />
        </>
      )}

      {mode === "signin" && (
        <>
          <input
            name="email"
            type="email"
            placeholder="Email"
            ref={email}
            className="bg-white text-black h-12 w-full rounded-sm px-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            ref={password}
            className="bg-white text-black h-12 w-full rounded-sm px-2"
          />
        </>
      )}

      <button
        type="submit"
        className="w-full h-12 bg-gray-200 text-black hover:bg-gray-300"
      >
        {mode === "signin" ? "Sign in" : "Sign up"}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0a041d] px-2 text-gray-400">OR REGISTER WITH</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center h-12 px-4 border border-gray-700 hover:bg-gray-800"
          onClick={() => handleOAuthSignIn("google")}
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 px-4 border border-gray-700 hover:bg-gray-800"
          onClick={() => handleOAuthSignIn("github")}
        >
          <FaGithub className="mr-2 h-4 w-4" />
          Github
        </button>
      </div>
    </form>
  );
}
