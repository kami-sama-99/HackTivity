"use client";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
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
        if (password.current.value !== confirmPassword.current.value) {
          setError("Passwords do not match.");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;
        await sendEmailVerification(user);
        await signOut(auth);
        setInfo("Verification email sent! Please verify your email to continue.");
      } else if (mode === "signin") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in.");
          await signOut(auth);
        } else {
          router.push(onboarding ? "/dashboard" : "/onboarding");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOAuthSignIn = async (providerType) => {
    try {
      const provider =
        providerType === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      router.push(onboarding ? "/dashboard" : "/onboarding");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-red-400">{error}</p>
      <p className="text-green-400">{info}</p>

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
      {mode === "signup" && (
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          ref={confirmPassword}
          className="bg-white text-black h-12 w-full rounded-sm px-2"
        />
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
